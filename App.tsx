import React, { useState, useCallback, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { type PromptItem, GenerationStatus } from './types';
import { generateImage, extractPromptsFromPdfText } from './services/geminiService';
import PdfUploader from './components/PdfUploader';
import ImageGallery from './components/ImageGallery';
import { SpinnerIcon } from './components/icons/SpinnerIcon';
import { FileIcon } from './components/icons/FileIcon';
import { BotIcon } from './components/icons/BotIcon';
import { WandIcon } from './components/icons/WandIcon';


// This is to satisfy TypeScript since pdfjs is loaded from a script tag.
declare const pdfjsLib: any;

type ProcessingState = 'idle' | 'parsing' | 'extracting' | 'generating';

const App: React.FC = () => {
    const [file, setFile] = useState<File | null>(null);
    const [prompts, setPrompts] = useState<PromptItem[]>([]);
    const [processingState, setProcessingState] = useState<ProcessingState>('idle');
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (typeof pdfjsLib !== 'undefined') {
            pdfjsLib.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjsLib.version}/pdf.worker.min.mjs`;
        }
    }, []);

    const handleFileSelect = (selectedFile: File) => {
        setFile(selectedFile);
        setError(null);
        setPrompts([]);
    };

    const processPdfAndGenerateImages = useCallback(async (fileToParse: File) => {
        if (!fileToParse) return;
        if (typeof pdfjsLib === 'undefined') {
            setError("PDF processing library is not available. Please refresh the page.");
            return;
        }

        setProcessingState('parsing');
        setError(null);
        setPrompts([]);

        try {
            const reader = new FileReader();
            reader.onload = async (event) => {
                if (!event.target?.result) {
                    setError("Failed to read the PDF file.");
                    setProcessingState('idle');
                    return;
                }
                
                let fullText;
                try {
                    const pdfData = new Uint8Array(event.target.result as ArrayBuffer);
                    const pdf = await pdfjsLib.getDocument({ data: pdfData }).promise;
                    fullText = '';
                    for (let i = 1; i <= pdf.numPages; i++) {
                        const page = await pdf.getPage(i);
                        const textContent = await page.getTextContent();
                        const pageText = textContent.items.map((item: any) => item.str).join(' ');
                        fullText += pageText + '\n';
                    }
                } catch (parseError) {
                     console.error("PDF Parsing Error:", parseError);
                     setError("The selected file could not be parsed as a PDF. It might be corrupt or protected.");
                     setProcessingState('idle');
                     return;
                }

                if (fullText.trim().length < 20) { // Check for minimal content
                    setError("Could not extract enough text from the PDF to find prompts.");
                    setProcessingState('idle');
                    return;
                }
                
                setProcessingState('extracting');
                let extractedPrompts: PromptItem[] = [];
                try {
                    const extractedTexts = await extractPromptsFromPdfText(fullText);
                     extractedPrompts = extractedTexts.map(text => ({
                        id: uuidv4(),
                        text,
                        status: GenerationStatus.PENDING,
                    }));

                    if (extractedPrompts.length === 0) {
                        setError("The AI assistant couldn't identify any suitable image prompts in this document. Please try a different PDF.");
                        setProcessingState('idle');
                        return;
                    }
                    setPrompts(extractedPrompts);

                } catch(aiError: any) {
                    console.error("AI extraction error:", aiError);
                    setError(aiError.message || "The AI assistant failed to extract prompts.");
                    setProcessingState('idle');
                    return;
                }
                
                // Automatically start generating images sequentially
                setProcessingState('generating');
                
                for (const prompt of extractedPrompts) {
                    setPrompts(currentPrompts =>
                        currentPrompts.map(p =>
                            p.id === prompt.id ? { ...p, status: GenerationStatus.GENERATING } : p
                        )
                    );

                    try {
                        const imageUrl = await generateImage(prompt.text);
                        setPrompts(currentPrompts =>
                            currentPrompts.map(p =>
                                p.id === prompt.id
                                    ? { ...p, status: GenerationStatus.SUCCESS, imageUrl }
                                    : p
                            )
                        );
                    } catch (err: any) {
                        console.error(`Failed to generate image for prompt: "${prompt.text}"`, err);
                        setPrompts(currentPrompts =>
                            currentPrompts.map(p =>
                                p.id === prompt.id
                                    ? { ...p, status: GenerationStatus.FAILED, error: err.message || 'An unknown error occurred' }
                                    : p
                            )
                        );
                    }
                    
                    // Proactively wait between requests to stay under the rate limit.
                    // The service handles retries, this handles the successful-path pacing.
                    // Only wait if there are more prompts to process.
                    const currentIndex = extractedPrompts.findIndex(p => p.id === prompt.id);
                    if (currentIndex < extractedPrompts.length - 1) {
                         // 5 RPM = 1 request every 12 seconds. Wait 15s to be safe.
                         await new Promise(resolve => setTimeout(resolve, 15000));
                    }
                }

                setProcessingState('idle');
            };
            reader.onerror = () => {
                setError("Error reading the file.");
                setProcessingState('idle');
            };
            reader.readAsArrayBuffer(fileToParse);
        } catch (err) {
            console.error(err);
            setError("An unexpected error occurred while processing the PDF.");
            setProcessingState('idle');
        }
    }, []);

    useEffect(() => {
        if (file) {
            processPdfAndGenerateImages(file);
        }
    }, [file, processPdfAndGenerateImages]);


    const handleReset = () => {
        setFile(null);
        setPrompts([]);
        setError(null);
        setProcessingState('idle');
    };
    
    const getStatusContent = () => {
        const baseClass = "flex items-center justify-center gap-3 p-8 text-gray-300 bg-gray-900/30 rounded-lg font-semibold";
        const generatingCount = prompts.filter(p => p.status === GenerationStatus.GENERATING || p.status === GenerationStatus.SUCCESS || p.status === GenerationStatus.FAILED).length;
        const totalCount = prompts.length;

        switch (processingState) {
            case 'parsing':
                return <div className={baseClass}><SpinnerIcon className="w-6 h-6" /> <p>Parsing your PDF, please wait...</p></div>;
            case 'extracting':
                return <div className={baseClass}><BotIcon className="w-6 h-6 text-indigo-400 animate-pulse" /> <p>Gemini Assistant is extracting prompts...</p></div>;
            case 'generating':
                 return <div className={baseClass}><WandIcon className="w-6 h-6 text-purple-400 animate-pulse" /> <p>Whisk is creating your images... ({generatingCount}/{totalCount})</p></div>;
            default:
                return null;
        }
    };

    return (
        <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center p-4 sm:p-8 font-sans">
            <header className="w-full max-w-5xl text-center mb-8">
                <h1 className="text-4xl sm:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-indigo-600">
                    PDF to Image with Gemini & Whisk
                </h1>
                <p className="text-gray-400 mt-2">Upload a PDF, let Gemini find the best ideas, and watch Whisk create the images.</p>
            </header>

            <main className="w-full max-w-5xl flex-grow">
                {!file ? (
                    <PdfUploader onFileSelect={handleFileSelect} disabled={processingState !== 'idle'} />
                ) : (
                    <div className="bg-gray-800/50 rounded-xl p-6 border border-gray-700 shadow-lg">
                        <div className="flex flex-col sm:flex-row justify-between items-center mb-6 gap-4">
                            <div className="flex items-center gap-3 text-lg">
                                <FileIcon className="w-6 h-6 text-indigo-400" />
                                <span className="font-medium truncate">{file.name}</span>
                                <span className="text-gray-400 text-sm">({(file.size / 1024).toFixed(1)} KB)</span>
                            </div>
                            <button
                                onClick={handleReset}
                                disabled={processingState !== 'idle'}
                                className="px-4 py-2 bg-gray-600 hover:bg-gray-500 rounded-md text-white font-semibold transition-colors duration-200 disabled:bg-gray-700 disabled:cursor-not-allowed"
                            >
                                Start Over
                            </button>
                        </div>

                        {processingState !== 'idle' && (
                            <div className="mb-6">{getStatusContent()}</div>
                        )}

                        {error && (
                            <div className="bg-red-900/50 border border-red-700 text-red-300 p-4 rounded-lg my-4">
                                <p className="font-bold">An error occurred:</p>
                                <p>{error}</p>
                            </div>
                        )}

                        {prompts.length > 0 && <ImageGallery items={prompts} />}
                    </div>
                )}
            </main>
             <footer className="w-full max-w-5xl text-center mt-12 text-gray-500 text-sm">
                <p>Powered by Google Gemini. Images generated with imagen-3.0-generate-002.</p>
            </footer>
        </div>
    );
};

export default App;