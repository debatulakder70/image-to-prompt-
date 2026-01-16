
import React, { useState } from 'react';
import { AnalysisResult } from '../types';

interface AnalysisResultViewProps {
  result: AnalysisResult;
}

const AnalysisResultView: React.FC<AnalysisResultViewProps> = ({ result }) => {
  const [copied, setCopied] = useState<boolean>(false);

  const copyFullPrompt = () => {
    const fullText = `PROMPT:
${result.prompt}

STYLE TAGS:
${result.styleTags}

NEGATIVE PROMPT:
${result.negativePrompt}`;

    navigator.clipboard.writeText(fullText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="mt-12 space-y-8 animate-in fade-in slide-in-from-bottom-6 duration-1000">
      {/* Category Header */}
      <div className="flex items-center gap-4">
        <span className="px-4 py-1.5 rounded-full bg-indigo-50 text-indigo-600 text-[11px] font-bold uppercase tracking-widest border border-indigo-100 shadow-sm">
          {result.imageType} Analysis
        </span>
        <div className="h-px flex-1 bg-slate-100"></div>
      </div>

      {/* Unified Prompt Display Card */}
      <div className="bg-white rounded-[2.5rem] border border-slate-200 overflow-hidden shadow-2xl shadow-slate-200/50">
        <div className="flex items-center justify-between px-8 py-6 border-b border-slate-100 bg-slate-50/50">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-blue-500 flex items-center justify-center text-white">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"/><polyline points="14 2 14 8 20 8"/></svg>
            </div>
            <div>
              <h3 className="text-slate-900 font-outfit font-bold text-lg leading-none">Engineered Configuration</h3>
              <p className="text-slate-400 text-[10px] uppercase font-bold tracking-widest mt-1">Master Ready • Non-Destructive</p>
            </div>
          </div>
          <button 
            onClick={copyFullPrompt}
            className={`flex items-center gap-2 px-6 py-3 rounded-2xl font-bold text-sm transition-all shadow-lg shadow-blue-500/10 ${
              copied 
              ? 'bg-green-500 text-white' 
              : 'bg-blue-600 text-white hover:bg-blue-700'
            }`}
          >
            {copied ? (
              <>
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
                Copied Success
              </>
            ) : (
              <>
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><rect width="14" height="14" x="8" y="8" rx="2" ry="2"/><path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"/></svg>
                Copy Full Prompt
              </>
            )}
          </button>
        </div>
        
        <div className="p-8 md:p-12 space-y-10">
          {/* Main Content Area */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-blue-500"></span>
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Primary Description</label>
            </div>
            <div className="text-slate-800 text-xl md:text-2xl leading-relaxed font-outfit font-medium">
              {result.prompt}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            {/* Metadata Columns */}
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-violet-500"></span>
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Technical Tags</label>
              </div>
              <div className="text-slate-600 text-sm font-mono leading-relaxed bg-slate-50 p-5 rounded-2xl border border-slate-100 italic">
                {result.styleTags}
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-rose-500"></span>
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Negative Constraints</label>
              </div>
              <div className="text-slate-600 text-sm font-mono leading-relaxed bg-slate-50 p-5 rounded-2xl border border-slate-100">
                {result.negativePrompt}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Logic Guide */}
      <div className="p-8 rounded-[2rem] bg-amber-50 border border-amber-100 shadow-sm relative overflow-hidden group">
        <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:rotate-12 transition-transform">
           <svg xmlns="http://www.w3.org/2000/svg" width="80" height="80" viewBox="0 0 24 24" fill="none" stroke="#b45309" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2v2"/><path d="M12 20v2"/><path d="m4.93 4.93 1.41 1.41"/><path d="m17.66 17.66 1.41 1.41"/><path d="M2 12h2"/><path d="M20 12h2"/><path d="m6.34 17.66-1.41 1.41"/><path d="m19.07 4.93-1.41 1.41"/></svg>
        </div>
        <div className="relative">
          <h4 className="text-amber-700 text-xs font-black uppercase tracking-[0.2em] mb-3 flex items-center gap-2">
            Deployment Logic
          </h4>
          <p className="text-slate-600 text-sm leading-relaxed font-medium">
            {result.userReplacementGuide}
          </p>
        </div>
      </div>
    </div>
  );
};

export default AnalysisResultView;
