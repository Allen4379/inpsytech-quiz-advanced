import React, { useEffect } from 'react';
import confetti from 'canvas-confetti';
import { Trophy, RotateCcw } from 'lucide-react';
import { QUESTIONS } from '../constants';

interface ResultScreenProps {
  score: number;
  onRestart: () => void;
}

const ResultScreen: React.FC<ResultScreenProps> = ({ score, onRestart }) => {
  const isPerfect = score === QUESTIONS.length;
  const percentage = Math.round((score / QUESTIONS.length) * 100);

  useEffect(() => {
    const duration = 3000;
    const end = Date.now() + duration;

    const frame = () => {
      confetti({
        particleCount: 2,
        angle: 60,
        spread: 55,
        origin: { x: 0 },
        colors: ['#00E5FF', '#FFFFFF', '#162B4D']
      });
      confetti({
        particleCount: 2,
        angle: 120,
        spread: 55,
        origin: { x: 1 },
        colors: ['#00E5FF', '#FFFFFF', '#162B4D']
      });

      if (Date.now() < end) {
        requestAnimationFrame(frame);
      }
    };

    frame();
  }, []);

  return (
    <div className="flex flex-col h-full justify-center items-center text-center space-y-8 animate-fade-in w-full py-8 px-4">
      
      {/* Small Logo Header */}
      <div className="flex items-center gap-2 opacity-80">
         <div className="w-6 h-6">
            <img src="/logo.png" alt="Logo" className="w-full h-full object-contain" />
         </div>
         <span className="font-bold text-white tracking-widest text-sm">INPSYTECH</span>
      </div>

      {/* Main Visual */}
      <div className="relative group">
        <div className="absolute -inset-10 bg-inpsy-cyan/20 blur-3xl rounded-full animate-pulse"></div>
        <div className="relative bg-gradient-to-b from-white/10 to-white/5 p-8 rounded-full border border-white/10 shadow-[0_0_30px_rgba(0,229,255,0.2)] backdrop-blur-md">
            <Trophy className={`w-16 h-16 ${isPerfect ? 'text-yellow-400 drop-shadow-neon' : 'text-inpsy-cyan'}`} />
        </div>
      </div>

      <div className="space-y-1">
        <h2 className="text-3xl font-bold text-white tracking-tight">挑戰完成</h2>
        <p className="text-inpsy-cyan text-sm tracking-[0.3em] font-medium">MISSION COMPLETED</p>
      </div>

      {/* Score Card */}
      <div className="w-full bg-white/5 p-8 rounded-[2rem] border border-white/10 backdrop-blur-xl shadow-2xl relative overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-inpsy-cyan to-transparent opacity-50"></div>
        
        <div className="text-gray-400 mb-2 uppercase tracking-widest text-[10px] font-semibold">Final Score</div>
        
        <div className="flex items-baseline justify-center gap-3 mb-6">
            <span className="text-6xl font-black text-white drop-shadow-lg tracking-tighter">{score}</span>
            <span className="text-xl text-gray-500 font-medium">/ {QUESTIONS.length}</span>
        </div>
        
        <div className="h-2 w-full bg-gray-700/30 rounded-full overflow-hidden mb-6 ring-1 ring-white/5">
          <div 
            className="h-full bg-gradient-to-r from-inpsy-cyan to-blue-500 transition-all duration-1000 ease-out shadow-[0_0_10px_#00E5FF]"
            style={{ width: `${percentage}%` }}
          />
        </div>

        <p className="text-[15px] text-gray-200 leading-relaxed font-medium">
          {isPerfect 
            ? "完美！您對公司有著絕對的洞察力！🚀" 
            : score > 2 
              ? "表現優異！您掌握了大部分的關鍵資訊！✨" 
              : "再接再厲！讓我們一起深入了解乾瞻科技！💪"}
        </p>
      </div>

      {/* Actions */}
      <div className="w-full space-y-6 pt-4">
        <button
          onClick={onRestart}
          className="w-full py-4 bg-transparent border border-inpsy-cyan text-inpsy-cyan font-bold text-lg rounded-[2rem] hover:bg-inpsy-cyan hover:text-black transition-all duration-300 flex items-center justify-center gap-2 active:scale-95 shadow-[0_0_10px_rgba(0,229,255,0.1)]"
        >
          <RotateCcw className="w-5 h-5" />
          重新挑戰 Restart
        </button>

        <p className="text-gray-600 text-[10px] tracking-widest">
             © 2025 INPSYTECH DESIGN SYSTEM
        </p>
      </div>
    </div>
  );
};

export default ResultScreen;