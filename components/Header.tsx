
import React from 'react';

const Header: React.FC = () => {
  return (
    <header className="relative flex flex-col md:flex-row md:items-center justify-between gap-6 py-8">
      <div className="flex items-center gap-6">
        <div className="w-14 h-14 bg-gradient-to-br from-indigo-500 to-blue-600 rounded-2xl flex items-center justify-center shadow-xl shadow-blue-500/20 rotate-3">
          <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><path d="M12 2a7 7 0 1 0 10 10"/><path d="M12 22a7 7 0 1 0-10-10"/><circle cx="12" cy="12" r="3"/></svg>
        </div>
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="px-2 py-0.5 rounded bg-blue-50 text-blue-600 font-bold uppercase text-[10px] tracking-widest border border-blue-100">Pro Suite v4</span>
            <span className="w-1 h-1 rounded-full bg-slate-300"></span>
            <span className="text-slate-400 font-medium text-[10px] uppercase tracking-widest">Active Intelligence</span>
          </div>
          <h1 className="text-3xl md:text-4xl font-outfit font-bold text-slate-900 tracking-tight leading-none">
            Visual <span className="text-blue-600">DNA Analyst</span>
          </h1>
        </div>
      </div>
      
      <div className="hidden lg:block max-w-sm text-right">
        <p className="text-slate-500 text-sm font-light leading-relaxed">
          The elite standard for <span className="text-slate-900 font-semibold">reverse-prompt engineering</span>. 
          Deconstruct aesthetics into production-ready syntax.
        </p>
      </div>
    </header>
  );
};

export default Header;
