import React from 'react';
import { Zap } from 'lucide-react';

interface StartScreenProps {
  onStart: () => void;
}

const StartScreen: React.FC<StartScreenProps> = ({ onStart }) => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] text-center space-y-8 animate-fade-in font-sans">
      <div className="relative mb-4">
        <div className="absolute -inset-8 bg-inpsy-cyan/10 blur-2xl rounded-full"></div>
        {/* Logo Image - Needs logo.png in public folder */}
        <img 
          src="/logo.png" 
          alt="InPsytech Logo" 
          className="relative z-10 w-64 md:w-80 h-auto drop-shadow-neon object-contain"
          onError={(e) => {
            // Fallback if image not found
            e.currentTarget.style.display = 'none';
            const fallback = document.getElementById('logo-fallback');
            if (fallback) fallback.style.display = 'block';
          }}
        />
        {/* Fallback Text if Image Fails */}
        <div id="logo-fallback" className="hidden">
           <h1 className="text-4xl md:text-5xl font-bold text-inpsy-cyan drop-shadow-neon">
            InPsytech
          </h1>
        </div>
      </div>
      
      <div className="space-y-2">
        <h2 className="text-xl md:text-2xl text-inpsy-text font-bold tracking-wider">
          乾瞻科技互動挑戰賽
        </h2>
        <p className="text-inpsy-cyan/80 text-lg italic">Insight the Future</p>
      </div>

      <div className="bg-inpsy-accent/50 p-6 rounded-lg border-l-4 border-inpsy-cyan max-w-md mx-auto backdrop-blur-sm shadow-lg">
        <p className="text-lg leading-relaxed">
          請回答 5 個關於公司的關鍵問題，測試您對 <span className="text-inpsy-cyan font-bold">InPsytech</span> 的了解程度！
        </p>
      </div>

      <button
        onClick={onStart}
        className="group relative px-8 py-4 bg-inpsy-dark text-white text-xl font-bold rounded-lg border border-inpsy-cyan overflow-hidden transition-all duration-300 hover:shadow-neon hover:text-inpsy-bg mt-4"
      >
        <div className="absolute inset-0 w-0 bg-inpsy-cyan transition-all duration-[250ms] ease-out group-hover:w-full opacity-100"></div>
        <span className="relative flex items-center justify-center gap-2 font-sans">
          開始挑戰 <Zap className="w-5 h-5" />
        </span>
      </button>
    </div>
  );
};

export default StartScreen;