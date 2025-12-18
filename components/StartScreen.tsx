import React from 'react';
import { Rocket, Zap } from 'lucide-react';

interface StartScreenProps {
  onStart: () => void;
}

const StartScreen: React.FC<StartScreenProps> = ({ onStart }) => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] text-center space-y-8 animate-fade-in">
      <div className="relative">
        <div className="absolute -inset-4 bg-inpsy-cyan/20 blur-xl rounded-full"></div>
        <Rocket className="w-24 h-24 text-inpsy-cyan relative z-10 animate-bounce" />
      </div>
      
      <div className="space-y-4">
        <h1 className="text-4xl md:text-5xl font-bold text-inpsy-cyan drop-shadow-neon">
          乾瞻科技 InPsytech
        </h1>
        <h2 className="text-xl md:text-2xl text-inpsy-text font-light tracking-wider">
          互動挑戰賽
        </h2>
      </div>

      <div className="bg-inpsy-accent/50 p-6 rounded-lg border-l-4 border-inpsy-cyan max-w-md mx-auto backdrop-blur-sm">
        <p className="text-lg leading-relaxed">
          請回答 5 個關於公司的關鍵問題，測試您對 <span className="text-inpsy-cyan font-bold">InPsytech</span> 的了解程度！
        </p>
      </div>

      <button
        onClick={onStart}
        className="group relative px-8 py-4 bg-inpsy-dark text-white text-xl font-bold rounded-lg border border-inpsy-cyan overflow-hidden transition-all duration-300 hover:shadow-neon hover:text-inpsy-bg"
      >
        <div className="absolute inset-0 w-0 bg-inpsy-cyan transition-all duration-[250ms] ease-out group-hover:w-full opacity-100"></div>
        <span className="relative flex items-center justify-center gap-2">
          開始挑戰 <Zap className="w-5 h-5" />
        </span>
      </button>

      <p className="text-sm text-gray-500 mt-8">
        Insight the Future
      </p>
    </div>
  );
};

export default StartScreen;