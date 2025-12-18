import React from 'react';
import { ChevronRight } from 'lucide-react';

interface StartScreenProps {
  onStart: () => void;
}

const StartScreen: React.FC<StartScreenProps> = ({ onStart }) => {
  return (
    <div className="flex flex-col h-[85vh] w-full max-w-md mx-auto justify-between font-sans animate-fade-in relative">
      
      {/* Top Section: Branding */}
      <div className="flex-1 flex flex-col items-center justify-center space-y-10">
        
        {/* App Icon Container / Logo */}
        <div className="relative group">
           <div className="absolute -inset-1 bg-gradient-to-tr from-inpsy-cyan to-blue-600 rounded-[2rem] blur opacity-40 group-hover:opacity-60 transition duration-500"></div>
           <div className="relative w-40 h-40 bg-inpsy-dark/80 backdrop-blur-xl rounded-[2rem] border border-white/10 flex items-center justify-center shadow-2xl overflow-hidden p-6">
              <img 
                src="/logo.png" 
                alt="InPsytech Logo" 
                className="w-full h-full object-contain drop-shadow-lg"
                onError={(e) => {
                  e.currentTarget.style.display = 'none';
                  const fallback = document.getElementById('logo-fallback');
                  if (fallback) fallback.style.display = 'flex';
                }}
              />
              <div id="logo-fallback" className="hidden flex-col items-center justify-center text-center">
                 <span className="text-3xl font-bold text-inpsy-cyan">InPsy</span>
                 <span className="text-xs text-white tracking-widest">TECH</span>
              </div>
           </div>
        </div>

        {/* Text Hierarchy */}
        <div className="text-center space-y-3">
          <h1 className="text-4xl font-bold text-white tracking-tight drop-shadow-md">
            InPsytech
          </h1>
          <h2 className="text-xl text-inpsy-cyan/90 font-medium tracking-[0.2em] uppercase">
            乾瞻科技
          </h2>
        </div>

        {/* Description Tag */}
        <div className="px-6 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-md">
           <p className="text-sm text-gray-300">
             Interactive Quiz Challenge
           </p>
        </div>
      </div>

      {/* Bottom Section: Action */}
      <div className="w-full pb-8 space-y-6">
        
        {/* iOS-style Action Button */}
        <button
          onClick={onStart}
          className="w-full group relative flex items-center justify-between p-1 pr-2 bg-white/5 hover:bg-white/10 border border-white/10 rounded-[2rem] backdrop-blur-md transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]"
        >
           {/* Swipe indicator visual */}
           <div className="h-14 w-14 bg-inpsy-cyan rounded-full flex items-center justify-center shadow-[0_0_15px_rgba(0,229,255,0.4)] group-hover:shadow-[0_0_25px_rgba(0,229,255,0.6)] transition-all">
              <ChevronRight className="w-8 h-8 text-black ml-1" />
           </div>
           
           <span className="flex-1 text-center text-xl font-semibold text-white tracking-wide pr-10">
             開始挑戰
           </span>
        </button>

        {/* Footer Info */}
        <div className="text-center space-y-1">
          <p className="text-[10px] text-gray-500 uppercase tracking-widest">
            Insight the Future
          </p>
          <p className="text-[10px] text-gray-600">
            v1.0.24 • iOS26 Design System
          </p>
        </div>
      </div>
    </div>
  );
};

export default StartScreen;