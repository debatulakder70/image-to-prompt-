
import React, { useState } from 'react';
import Header from './components/Header';
import ImageUploader from './components/ImageUploader';
import AnalysisResultView from './components/AnalysisResultView';
import PromptGallery from './components/PromptGallery';
import { AppState } from './types';
import { analyzeImage } from './geminiService';

const App: React.FC = () => {
  const [state, setState] = useState<AppState>({
    image: null,
    analyzing: false,
    result: null,
    error: null,
  });

  const handleImageSelect = (image: string) => {
    setState(prev => ({
      ...prev,
      image,
      result: null,
      error: null
    }));
  };

  const startAnalysis = async () => {
    if (!state.image) return;

    setState(prev => ({ ...prev, analyzing: true, error: null }));

    try {
      const result = await analyzeImage(state.image);
      setState(prev => ({
        ...prev,
        analyzing: false,
        result
      }));
    } catch (err) {
      console.error(err);
      setState(prev => ({
        ...prev,
        analyzing: false,
        error: 'Engine failure. Neural mapping failed to resolve the visual source.'
      }));
    }
  };

  return (
    <div className="min-h-screen selection:bg-blue-100 selection:text-blue-900">
      {/* Soft Background Accents */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none -z-10 bg-[#f8fafc]">
        <div className="absolute top-0 right-0 w-[60%] h-[60%] bg-blue-50 blur-[140px] rounded-full opacity-60"></div>
        <div className="absolute bottom-0 left-0 w-[50%] h-[50%] bg-indigo-50 blur-[140px] rounded-full opacity-60"></div>
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <Header />

        <main className="mt-8 space-y-20">
          {/* Main Laboratory Area */}
          <section className="animate-in fade-in slide-in-from-top-4 duration-700">
            <div className="flex items-center gap-3 mb-8">
               <div className="flex -space-x-2">
                 <div className="w-2 h-2 rounded-full bg-blue-500"></div>
                 <div className="w-2 h-2 rounded-full bg-blue-300"></div>
               </div>
               <h2 className="text-[10px] font-black uppercase tracking-[0.4em] text-slate-400">Laboratory • Visual Deconstruction</h2>
            </div>
            
            <div className="bg-white p-4 rounded-[2.5rem] shadow-xl shadow-slate-200/40 border border-slate-100">
              <ImageUploader 
                image={state.image} 
                onImageSelect={handleImageSelect}
                isAnalyzing={state.analyzing}
              />

              {state.image && !state.result && !state.analyzing && (
                <div className="py-12 flex justify-center">
                  <button
                    onClick={startAnalysis}
                    className="group relative px-20 py-5 rounded-3xl font-outfit font-bold text-xl transition-all overflow-hidden bg-slate-900 text-white hover:bg-blue-600 active:scale-95 shadow-2xl shadow-blue-500/10"
                  >
                    <span>Analyze Subject</span>
                  </button>
                </div>
              )}

              {state.error && (
                <div className="mt-4 p-6 text-center text-rose-600 bg-rose-50 border border-rose-100 rounded-[2rem] mx-8 mb-8 text-sm font-medium">
                  {state.error}
                </div>
              )}
            </div>

            {state.result && <AnalysisResultView result={state.result} />}
          </section>

          {/* Prompt Archetype Gallery */}
          <PromptGallery />
        </main>

        <footer className="mt-32 pb-16 text-center">
           <div className="flex items-center justify-center gap-4 mb-8">
             <div className="h-px w-12 bg-slate-200"></div>
             <svg className="text-slate-300 w-5 h-5" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z"/></svg>
             <div className="h-px w-12 bg-slate-200"></div>
           </div>
           <p className="text-slate-400 text-[10px] uppercase tracking-[0.5em] font-black">
             Visual Logic OS v4.2 // Production Grade
           </p>
        </footer>
      </div>

      {/* Floating Action Menu */}
      {state.result && (
        <div className="fixed bottom-10 left-1/2 -translate-x-1/2 z-50 animate-in fade-in slide-in-from-bottom-6 duration-500">
          <div className="bg-white p-2 rounded-3xl flex items-center gap-2 shadow-[0_20px_50px_rgba(0,0,0,0.15)] border border-slate-100">
            <button 
              onClick={() => setState({ image: null, analyzing: false, result: null, error: null })}
              className="px-8 py-4 bg-slate-900 text-white rounded-2xl font-bold text-sm hover:bg-blue-600 transition-all transform hover:scale-105 active:scale-95"
            >
              New Project
            </button>
            <button 
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="p-4 text-slate-400 hover:text-slate-900 transition-colors bg-slate-50 rounded-2xl"
              title="Return to Dashboard"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="m18 15-6-6-6 6"/></svg>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default App;
