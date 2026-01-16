
import React, { useRef } from 'react';

interface ImageUploaderProps {
  image: string | null;
  onImageSelect: (image: string) => void;
  isAnalyzing: boolean;
}

const ImageUploader: React.FC<ImageUploaderProps> = ({ image, onImageSelect, isAnalyzing }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        onImageSelect(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const triggerUpload = () => {
    if (!isAnalyzing) {
      fileInputRef.current?.click();
    }
  };

  return (
    <div className="w-full">
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        className="hidden"
        accept="image/*"
      />
      
      {!image ? (
        <button
          onClick={triggerUpload}
          className="w-full aspect-[21/9] flex flex-col items-center justify-center bg-white rounded-[2rem] border-dashed border-2 border-slate-200 hover:border-blue-400 hover:bg-blue-50/30 transition-all group overflow-hidden relative shadow-sm"
        >
          <div className="shimmer absolute inset-0 opacity-10 pointer-events-none"></div>
          <div className="w-20 h-20 rounded-3xl bg-slate-50 border border-slate-100 flex items-center justify-center mb-6 group-hover:scale-105 transition-all duration-500 shadow-sm">
            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#3b82f6" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <rect width="18" height="18" x="3" y="3" rx="2" ry="2"/><circle cx="9" cy="9" r="2"/><path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21"/>
            </svg>
          </div>
          <p className="text-slate-800 text-xl font-outfit font-semibold mb-1">Import Visual Reference</p>
          <p className="text-slate-400 text-sm font-light">Select high-fidelity imagery to begin extraction</p>
        </button>
      ) : (
        <div className="relative group rounded-[2rem] overflow-hidden bg-slate-100 border border-slate-200 shadow-xl">
          {isAnalyzing && <div className="scanner-line"></div>}
          <div className={`relative transition-all duration-1000 ${isAnalyzing ? 'brightness-90 contrast-125' : 'brightness-100'}`}>
            <img src={image} alt="Visual Subject" className="w-full h-auto max-h-[600px] object-cover mx-auto" />
          </div>
          
          <div className={`absolute inset-0 flex items-center justify-center transition-all duration-500 ${isAnalyzing ? 'opacity-100' : 'opacity-0 group-hover:opacity-100 bg-white/40 backdrop-blur-sm'}`}>
            {!isAnalyzing && (
              <button
                onClick={triggerUpload}
                className="bg-slate-900 text-white px-8 py-3 rounded-2xl font-bold shadow-2xl hover:bg-slate-800 transition-all transform hover:scale-105 active:scale-95"
              >
                Switch Asset
              </button>
            )}
            {isAnalyzing && (
              <div className="text-center p-8 bg-white/80 backdrop-blur-xl rounded-3xl border border-white shadow-2xl">
                 <div className="relative mb-4">
                    <svg className="animate-spin h-10 w-10 text-blue-500 mx-auto" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                       <circle className="opacity-10" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                       <path className="opacity-90" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                 </div>
                 <p className="text-slate-900 font-outfit font-bold text-lg tracking-tight">Extracting DNA Layers</p>
                 <p className="text-slate-500 text-xs mt-1 uppercase tracking-widest font-semibold">AI Neural Mapping in Progress</p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default ImageUploader;
