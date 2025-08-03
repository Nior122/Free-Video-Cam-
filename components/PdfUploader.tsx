import React, { useState, useCallback } from 'react';
import { UploadIcon } from './icons/UploadIcon';

interface PdfUploaderProps {
  onFileSelect: (file: File) => void;
  disabled: boolean;
}

const PdfUploader: React.FC<PdfUploaderProps> = ({ onFileSelect, disabled }) => {
  const [isDragging, setIsDragging] = useState(false);

  const handleDragEnter = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    if (!disabled) setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    if (disabled) return;

    const files = e.dataTransfer.files;
    if (files && files.length > 0) {
      if (files[0].type === "application/pdf") {
        onFileSelect(files[0]);
      }
    }
  }, [disabled, onFileSelect]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      onFileSelect(files[0]);
    }
  };

  const dragClass = isDragging ? 'border-indigo-500 bg-gray-700/50' : 'border-gray-600 hover:border-indigo-500';

  return (
    <div
      className={`relative w-full p-10 text-center border-2 border-dashed rounded-xl transition-all duration-300 ${dragClass}`}
      onDragEnter={handleDragEnter}
      onDragLeave={handleDragLeave}
      onDragOver={handleDragOver}
      onDrop={handleDrop}
    >
      <input
        type="file"
        id="pdf-upload"
        className="absolute w-full h-full opacity-0 cursor-pointer"
        accept=".pdf"
        onChange={handleFileChange}
        disabled={disabled}
      />
      <label htmlFor="pdf-upload" className="flex flex-col items-center justify-center cursor-pointer">
        <UploadIcon className="w-12 h-12 text-gray-500 mb-4 transition-colors group-hover:text-indigo-400"/>
        <p className="text-lg font-semibold text-white">
          <span className="text-indigo-400">Click to upload</span> or drag and drop a PDF file
        </p>
        <p className="text-sm text-gray-400 mt-1">A Gemini Assistant will analyze the document to create image prompts.</p>
      </label>
    </div>
  );
};

export default PdfUploader;