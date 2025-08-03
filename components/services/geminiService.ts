import { GoogleGenAI, Type } from "@google/genai";

// Ensure the API key is available in the environment variables
if (!process.env.API_KEY) {
    throw new Error("API_KEY environment variable not set.");
}

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

/**
 * Analyzes text from a PDF and extracts image generation prompts using a Gemini chat model.
 * @param pdfText The full text content from the PDF.
 * @returns A promise that resolves to an array of prompt strings.
 */
export const extractPromptsFromPdfText = async (pdfText: string): Promise<string[]> => {
    try {
        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: pdfText,
            config: {
                systemInstruction: `You are an AI assistant specialized in creating image generation prompts.
                Analyze the following text extracted from a document. Your goal is to identify and list distinct,
                imaginative, and clear prompts for an AI image generator. Each prompt should be a self-contained instruction.
                Ignore any non-descriptive text like headers, page numbers, or irrelevant content.
                Return ONLY a JSON array of strings, where each string is a unique prompt.`,
                responseMimeType: "application/json",
                responseSchema: {
                    type: Type.ARRAY,
                    description: "A list of image generation prompts extracted from the text. Each prompt should be concise and descriptive.",
                    items: {
                        type: Type.STRING,
                    },
                },
            },
        });

        const jsonText = response.text.trim();
        if (!jsonText) {
            return [];
        }

        const prompts = JSON.parse(jsonText);
        if (Array.isArray(prompts) && prompts.every(p => typeof p === 'string')) {
            return prompts;
        } else {
            throw new Error("AI returned data in an unexpected format.");
        }

    } catch (error: any) {
        console.error("Gemini API Error (extractPrompts):", error);
        throw new Error(error.message || "Failed to extract prompts due to an API error.");
    }
};

/**
 * Generates an image based on a text prompt using the Gemini API, with built-in retry logic for rate limiting.
 * @param prompt The text prompt to generate an image from.
 * @returns A promise that resolves to a base64-encoded JPEG image string.
 */
export const generateImage = async (prompt: string): Promise<string> => {
    let attempts = 0;
    const maxAttempts = 3;
    let delay = 15000; // 15 seconds initial delay, respecting ~5 RPM limit for free tier

    while (attempts < maxAttempts) {
        attempts++;
        try {
            const response = await ai.models.generateImages({
                model: 'imagen-3.0-generate-002',
                prompt: prompt,
                config: {
                    numberOfImages: 1,
                    outputMimeType: 'image/jpeg',
                    aspectRatio: '1:1',
                },
            });

            if (response.generatedImages && response.generatedImages.length > 0) {
                const base64ImageBytes = response.generatedImages[0].image.imageBytes;
                return `data:image/jpeg;base64,${base64ImageBytes}`;
            } else {
                throw new Error("No image was generated. The response was empty.");
            }
        } catch (error: any) {
            console.error(`Gemini API Error (Attempt ${attempts}):`, error);

            let isRateLimitError = false;
            let errorMessage = error.message || "An unknown error occurred during image generation.";

            // The error message from the SDK might be a JSON string.
            try {
                const parsedError = JSON.parse(errorMessage);
                if (parsedError?.error?.code === 429 || parsedError?.error?.status === 'RESOURCE_EXHAUSTED') {
                    isRateLimitError = true;
                    errorMessage = "API rate limit exceeded.";
                }
            } catch (e) {
                // Not a JSON error message, check the string content
                if (errorMessage.includes('429') || errorMessage.toLowerCase().includes('quota')) {
                    isRateLimitError = true;
                }
            }

            if (isRateLimitError) {
                if (attempts < maxAttempts) {
                    console.log(`Rate limit hit. Retrying in ${delay / 1000}s...`);
                    await sleep(delay);
                    delay *= 2; // Exponential backoff for subsequent retries
                } else {
                    throw new Error("Failed after multiple retries due to API rate limits.");
                }
            } else {
                // It's a different kind of error, fail immediately.
                throw new Error(errorMessage);
            }
        }
    }
    
    // This should not be reached, but is a fallback.
    throw new Error("Failed to generate image after all attempts.");
};