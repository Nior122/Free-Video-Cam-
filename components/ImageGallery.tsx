
import React from 'react';
import { type PromptItem, GenerationStatus } from '../types';
import { SpinnerIcon } from './icons/SpinnerIcon';
import { DownloadIcon } from './icons/DownloadIcon';
import { ErrorIcon } from './icons/ErrorIcon';

interface ImageGalleryProps {
  items: PromptItem[];
}

const ImageGallery: React.FC<ImageGalleryProps> = ({ items }) => {
    if (items.length === 0) {
        return (
            <div className="text-center py-16 text-gray-500">
                <p>No prompts found. Upload a PDF to get started.</p>
            </div>
        );
    }
    
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {items.map((item) => (
                <ImageCard key={item.id} item={item} />
            ))}
        </div>
    );
};


const ImageCard: React.FC<{ item: PromptItem }> = ({ item }) => {
    
    const handleDownload = () => {
        if (!item.imageUrl) return;
        const link = document.createElement('a');
        link.href = item.imageUrl;
        link.download = `${item.text.slice(0, 20).replace(/\s/g, '_')}.jpeg`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    const renderCardContent = () => {
        switch (item.status) {
            case GenerationStatus.GENERATING:
                return (
                    <div className="absolute inset-0 flex flex-col items-center justify-center bg-gray-900/50 text-white p-4">
                        <SpinnerIcon className="w-10 h-10 mb-3" />
                        <span className="text-sm font-semibold">Generating...</span>
                    </div>
                );
            case GenerationStatus.SUCCESS:
                return (
                    item.imageUrl && (
                        <>
                            <img src={item.imageUrl} alt={item.text} className="w-full h-full object-cover" />
                             <div className="absolute inset-0 bg-black/70 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                                <button
                                    onClick={handleDownload}
                                    className="p-3 bg-white/20 hover:bg-white/30 rounded-full text-white backdrop-blur-sm"
                                    aria-label="Download image"
                                >
                                    <DownloadIcon className="w-6 h-6" />
                                </button>
                            </div>
                        </>
                    )
                );
            case GenerationStatus.FAILED:
                 return (
                    <div className="absolute inset-0 flex flex-col items-center justify-center bg-red-900/80 text-white p-4 text-center">
                        <ErrorIcon className="w-10 h-10 mb-3 text-red-300" />
                        <span className="text-sm font-bold text-red-200">Generation Failed</span>
                        <p className="text-xs text-red-300 mt-1 line-clamp-3">{item.error}</p>
                    </div>
                );
            case GenerationStatus.PENDING:
            default:
                return (
                    <div className="absolute inset-0 flex items-center justify-center bg-gray-900/50 text-gray-400 p-4">
                        <span className="text-sm font-semibold">Pending...</span>
                    </div>
                );
        }
    }

    return (
        <div className="bg-gray-800 rounded-lg overflow-hidden shadow-lg border border-gray-700 flex flex-col group">
            <div className="relative aspect-square bg-gray-900">
                {renderCardContent()}
            </div>
            <div className="p-3 bg-gray-800">
                <p className="text-sm text-gray-300 line-clamp-2" title={item.text}>{item.text}</p>
            </div>
        </div>
    )
}

export default ImageGallery;
