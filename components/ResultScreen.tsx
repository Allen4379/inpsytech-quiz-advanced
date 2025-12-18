import React, { useEffect } from 'react';
import confetti from 'canvas-confetti';
import { Trophy, RotateCcw, Building2 } from 'lucide-react';
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
    <div className="flex flex-col items-center justify-center min-h-[60vh] text-center space-y-8 animate-fade-in w-full max-w-lg mx-auto">
      
      <div className="relative">
        <div className="absolute -inset-6 bg-inpsy-cyan/20 blur-2xl rounded-full animate-pulse"></div>
        <div className="relative bg-inpsy-dark p-6 rounded-full border-4 border-inpsy-cyan shadow-neon">
            <Trophy className="w-16 h-16 text-inpsy-cyan" />
        </div>
      </div>

      <div className="space-y-2">
        <h2 className="text-3xl font-bold text-white">挑戰完成！</h2>
        <p className="text-inpsy-cyan text-lg">InPsytech Challenge Completed</p>
      </div>

      <div className="w-full bg-inpsy-dark/50 p-8 rounded-xl border border-inpsy-cyan/30 backdrop-blur-sm">
        <div className="text-gray-400 mb-2 uppercase tracking-widest text-xs">Your Score</div>
        <div className="text-6xl font-black text-white mb-4 drop-shadow-neon">
          {score} <span className="text-2xl text-gray-500 font-normal">/ {QUESTIONS.length}</span>
        </div>
        
        <div className="h-2 w-full bg-gray-700 rounded-full overflow-hidden mb-4">
          <div 
            className="h-full bg-inpsy-cyan transition-all duration-1000 ease-out"
            style={{ width: `${percentage}%` }}
          />
        </div>

        <p className="text-lg">
          {isPerfect 
            ? "太強了！您是真正的乾瞻專家！🚀" 
            : score > 2 
              ? "不錯喔！您對乾瞻有相當的了解！👍" 
              : "再接再厲！讓我們一起重新認識乾瞻！💪"}
        </p>
      </div>

      <div className="space-y-4 w-full">
         <p className="text-gray-400 text-sm">
            感謝您的參與，讓我們一起瞻望未來 (Insight the Future)！
        </p>

        <button
          onClick={onRestart}
          className="w-full py-4 bg-transparent border-2 border-inpsy-cyan text-inpsy-cyan font-bold text-lg rounded-lg hover:bg-inpsy-cyan hover:text-black transition-all duration-300 flex items-center justify-center gap-2"
        >
          <RotateCcw className="w-5 h-5" />
          重新挑戰
        </button>

        <div className="pt-8 flex items-center justify-center gap-2 text-gray-600 text-xs">
             <Building2 className="w-4 h-4" />
             <span>© 2025 InPsytech 乾瞻科技</span>
        </div>
      </div>
    </div>
  );
};

export default ResultScreen;