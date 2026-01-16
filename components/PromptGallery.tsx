
import React, { useState } from 'react';

interface PromptItem {
  id: number;
  title: string;
  tag: string;
  image: string;
  prompt: string;
  color: string;
}

const VIRAL_PROMPTS: PromptItem[] = [
  {
    id: 1,
    title: "Cyberpunk Neural-Link",
    tag: "Trending",
    color: "bg-blue-500",
    image: "https://images.unsplash.com/photo-1614728263952-84ea256f9679?auto=format&fit=crop&q=80&w=800",
    prompt: "A cinematic medium shot of an android with exposed translucent skull sections revealing glowing neural circuits, soft blue and pink neon reflections on high-gloss obsidian plating, dense cinematic smoke, ultra-detailed skin pores, shot on ARRI Alexa, 8k hyper-realistic."
  },
  {
    id: 2,
    title: "Organic Architecture",
    tag: "Concept",
    color: "bg-emerald-500",
    image: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&q=80&w=800",
    prompt: "An architectural masterpiece of a skyscraper made entirely of living emerald ivy and flowing white silk, towering over a futuristic city during a misty golden hour, ray-traced reflections, intricate organic patterns, Zaha Hadid style, ethereal lighting, high-contrast editorial photography."
  },
  {
    id: 3,
    title: "Vogue Kinetic Shot",
    tag: "Editorial",
    color: "bg-violet-500",
    image: "https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&q=80&w=800",
    prompt: "Dynamic fashion action shot of a model wearing a liquid-gold structured garment captured mid-motion, sharp shards of light, high-speed photography, minimalist grey studio background, intense focus on garment texture, high-fashion color grading, film grain, Vogue aesthetic."
  },
  {
    id: 4,
    title: "Deep Sea Bio-Mech",
    tag: "Portrait",
    color: "bg-indigo-500",
    image: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&q=80&w=800",
    prompt: "A close-up portrait of a deep-sea diver in a mechanical suit integrated with bioluminescent jellyfish parts, bubbles reflecting shimmering teal light, underwater atmospheric perspective, realistic water physics, masterpiece quality, Unreal Engine 5 render style."
  }
];

const PromptGallery: React.FC = () => {
  const [copiedId, setCopiedId] = useState<number | null>(null);

  const copyPrompt = (prompt: string, id: number) => {
    navigator.clipboard.writeText(prompt);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <section className="py-16">
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="w-8 h-1 bg-slate-900 rounded-full"></span>
            <h2 className="text-sm font-black uppercase tracking-[0.3em] text-slate-900">Inspiration Vault</h2>
          </div>
          <p className="text-slate-500 text-lg font-outfit">Curated viral prompts from leading visual architects.</p>
        </div>
        <div className="flex gap-2">
          {['Featured', 'Weekly', 'Trending'].map(tab => (
            <button key={tab} className="px-5 py-2 rounded-xl border border-slate-200 text-xs font-bold text-slate-500 hover:bg-slate-50 hover:text-slate-900 transition-all">
              {tab}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {VIRAL_PROMPTS.map((item) => (
          <div key={item.id} className="card-hover group relative rounded-[2rem] bg-white border border-slate-200 overflow-hidden">
            <div className="aspect-[4/5] overflow-hidden relative">
              <img 
                src={item.image} 
                alt={item.title} 
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-transparent to-transparent"></div>
              
              <div className="absolute top-4 left-4">
                <span className={`px-2 py-1 rounded-lg text-[10px] font-black uppercase tracking-widest text-white ${item.color} shadow-lg shadow-black/20`}>
                  {item.tag}
                </span>
              </div>

              <div className="absolute bottom-6 left-6 right-6">
                <h4 className="text-white font-outfit font-bold text-xl mb-1">{item.title}</h4>
                <div className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-blue-400"></span>
                  <span className="text-white/70 text-[10px] font-bold uppercase tracking-widest">Verified Logic</span>
                </div>
              </div>
            </div>
            
            <div className="p-6">
              <div className="relative bg-slate-50 p-4 rounded-2xl mb-6">
                <p className="text-slate-600 text-[11px] leading-relaxed line-clamp-3 italic">
                  "{item.prompt}"
                </p>
              </div>
              <button 
                onClick={() => copyPrompt(item.prompt, item.id)}
                className={`w-full py-4 rounded-2xl font-bold text-sm flex items-center justify-center gap-3 transition-all ${
                  copiedId === item.id 
                  ? 'bg-green-100 text-green-700' 
                  : 'bg-slate-900 text-white hover:bg-slate-800 shadow-xl shadow-slate-200/50'
                }`}
              >
                {copiedId === item.id ? (
                  <>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
                    Copied
                  </>
                ) : (
                  <>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><rect width="14" height="14" x="8" y="8" rx="2" ry="2"/><path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"/></svg>
                    Extract Prompt
                  </>
                )}
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default PromptGallery;
