import React from 'react';
import { ChevronRight } from 'lucide-react';
import { Logo } from './Logo';

interface StartScreenProps {
  onStart: () => void;
}

const StartScreen: React.FC<StartScreenProps> = ({ onStart }) => {
  return (
    <div className="flex flex-col h-full justify-between py-8 font-sans animate-fade-in relative">
      
      {/* Top Section: Branding */}
      <div className="flex-1 flex flex-col items-center justify-center space-y-10">
        
        {/* App Icon Container / Logo */}
        <div className="relative group cursor-default">
           {/* Logo Box */}
           <div className="relative w-48 h-48 bg-white/5 backdrop-blur-2xl rounded-[2.5rem] border border-white/10 flex flex-col items-center justify-center shadow-2xl overflow-hidden p-6 ring-1 ring-white/20">
              <div className="absolute inset-0 bg-gradient-to-br from-inpsy-cyan/10 to-transparent opacity-50"></div>
              <Logo variant="full" className="scale-110" />
           </div>
        </div>

        {/* Tagline */}
        <div className="px-5 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-md shadow-lg">
           <p className="text-xs text-gray-400 font-medium tracking-wide flex items-center gap-2">
             <span className="w-1.5 h-1.5 rounded-full bg-inpsy-cyan animate-pulse"></span>
             Interactive Quiz Challenge
           </p>
        </div>
      </div>

      {/* Bottom Section: Action */}
      <div className="w-full space-y-8 pb-6 px-2">
        
        {/* iOS-style Action Button */}
        <button
          onClick={onStart}
          className="w-full group relative flex items-center justify-between p-2 bg-white/10 hover:bg-white/15 active:bg-white/20 border border-white/10 rounded-[3rem] backdrop-blur-xl transition-all duration-300 active:scale-[0.98] shadow-glass"
        >
           {/* Swipe indicator visual */}
           <div className="h-14 w-14 bg-gradient-to-tr from-inpsy-cyan to-cyan-600 rounded-full flex items-center justify-center shadow-[0_0_20px_rgba(0,229,255,0.4)] relative z-10 group-hover:scale-110 transition-transform">
              <ChevronRight className="w-8 h-8 text-white ml-0.5" />
           </div>
           
           <span className="flex-1 text-center text-xl font-semibold text-white tracking-wide pr-16 drop-shadow-md">
             開始挑戰
           </span>
        </button>

        {/* Footer Info */}
        <div className="text-center space-y-1 opacity-50">
          <p className="text-[10px] text-gray-400 uppercase tracking-widest font-medium">
            Insight the Future
          </p>
          <div className="w-10 h-1 bg-white/10 rounded-full mx-auto mt-4"></div>
        </div>
      </div>
    </div>
  );
};

export default StartScreen;