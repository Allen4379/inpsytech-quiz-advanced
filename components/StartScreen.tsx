import React from 'react';
import { ChevronRight, Cpu, Clapperboard, Sparkles, Wand2 } from 'lucide-react';

interface StartScreenProps {
  onStart: () => void;
  onImageLab: () => void;
}

const StartScreen: React.FC<StartScreenProps> = ({ onStart, onImageLab }) => {
  return (
    <div className="flex flex-col h-full justify-between py-6 font-sans animate-fade-in relative">
      
      {/* Top Section: Branding */}
      <div className="flex-1 flex flex-col items-center justify-center space-y-6">
        
        {/* App Icon Container / Logo */}
        <div className="relative group cursor-default">
           {/* Organic Glow */}
           <div className="absolute -inset-2 bg-gradient-to-r from-inpsy-cyan via-inpsy-purple to-inpsy-cyan rounded-full blur-xl opacity-40 group-hover:opacity-70 transition duration-1000 animate-pulse-bio"></div>
           
           {/* Logo Box */}
           <div className="relative w-44 h-44 bg-black/30 backdrop-blur-2xl rounded-full border border-inpsy-cyan/30 flex items-center justify-center shadow-bio overflow-hidden p-8 ring-1 ring-white/10">
              
              {/* Image Logo */}
              <img 
                src="/logo.png" 
                alt="InPsytech Logo" 
                className="w-full h-full object-contain drop-shadow-[0_0_10px_rgba(255,255,255,0.5)] relative z-10"
                onError={(e) => {
                  e.currentTarget.style.display = 'none';
                  const fallback = document.getElementById('logo-fallback');
                  if (fallback) fallback.style.display = 'flex';
                }}
              />

              {/* Fallback */}
              <div id="logo-fallback" className="hidden flex-col items-center justify-center text-center absolute inset-0 z-0">
                 <Cpu className="w-12 h-12 text-inpsy-cyan mb-2 animate-pulse" />
                 <span className="text-xl font-bold text-white tracking-tighter">InPsy</span>
              </div>
           </div>
        </div>

        {/* Text Hierarchy */}
        <div className="text-center space-y-1">
          <h1 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-inpsy-cyan to-white tracking-tight drop-shadow-md">
            InPsy<span className="text-inpsy-purple">tech</span>
          </h1>
          <h2 className="text-sm text-inpsy-cyan/80 font-medium tracking-[0.4em] uppercase">
            乾瞻科技 • 潘朵拉連結
          </h2>
        </div>

        {/* Tagline Badge */}
        <div className="px-4 py-1.5 rounded-full bg-inpsy-cyan/10 border border-inpsy-cyan/30 backdrop-blur-md shadow-lg flex items-center gap-2">
             <div className="w-2 h-2 rounded-full bg-inpsy-cyan animate-pulse shadow-[0_0_8px_#00ffff]"></div>
             <p className="text-[10px] text-inpsy-cyan tracking-widest font-semibold uppercase">
               Neural Network Online
             </p>
        </div>
      </div>

      {/* Bottom Section: Actions */}
      <div className="w-full space-y-4 pb-4 px-2">
        
        {/* Main Game Button */}
        <button
          onClick={onStart}
          className="w-full group relative flex items-center justify-between p-1.5 bg-gradient-to-r from-inpsy-cyan/20 to-inpsy-purple/20 border border-inpsy-cyan/40 rounded-full backdrop-blur-xl transition-all duration-300 hover:shadow-bio-strong active:scale-[0.98]"
        >
           <div className="h-12 w-12 bg-inpsy-cyan/20 rounded-full flex items-center justify-center shadow-[0_0_15px_rgba(0,255,255,0.3)] relative z-10 border border-inpsy-cyan/50 group-hover:bg-inpsy-cyan group-hover:text-black transition-colors">
              <ChevronRight className="w-6 h-6 text-white group-hover:text-black transition-colors" />
           </div>
           
           <span className="flex-1 text-center text-lg font-bold text-white tracking-widest uppercase pr-14 drop-shadow-md">
             開始挑戰
           </span>
        </button>

        {/* AI Image Lab Button (New Feature) */}
        <button
          onClick={onImageLab}
          className="w-full group relative flex items-center justify-between p-1.5 bg-black/40 border border-inpsy-purple/40 rounded-full backdrop-blur-xl transition-all duration-300 hover:border-inpsy-purple hover:shadow-bio active:scale-[0.98]"
        >
           <div className="h-12 w-12 bg-inpsy-purple/20 rounded-full flex items-center justify-center relative z-10 border border-inpsy-purple/50 group-hover:bg-inpsy-purple transition-colors">
              <Wand2 className="w-5 h-5 text-inpsy-purple group-hover:text-white" />
           </div>
           
           <span className="flex-1 text-center text-sm font-semibold text-inpsy-purple tracking-wider uppercase pr-14 group-hover:text-white transition-colors">
             靈視實驗室 (AI)
           </span>
        </button>

        {/* Footer Info */}
        <div className="text-center space-y-2 opacity-60 mt-4">
          <div className="flex items-center justify-center gap-2 text-inpsy-cyan/80">
              <Clapperboard className="w-3 h-3" />
              <span className="text-[10px] tracking-wider font-medium">電影欣賞會限定</span>
          </div>
          <div className="flex justify-center gap-1">
             <Sparkles className="w-2 h-2 text-inpsy-purple" />
             <p className="text-[9px] text-gray-500 uppercase tracking-widest font-medium">
                InPsytech x Avatar
             </p>
             <Sparkles className="w-2 h-2 text-inpsy-purple" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default StartScreen;