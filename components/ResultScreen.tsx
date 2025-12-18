import React, { useEffect } from 'react';
import confetti from 'canvas-confetti';
import { Trophy, RotateCcw, Clapperboard, Sparkles } from 'lucide-react';
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
    <div className="flex flex-col h-full animate-fade-in w-full py-4 px-4 overflow-y-auto no-scrollbar">
      
      {/* Top Content Container */}
      <div className="flex-1 flex flex-col justify-center items-center text-center space-y-6">
        {/* Small Logo Header */}
        <div className="flex items-center gap-2 opacity-80">
           <div className="w-6 h-6">
              <img src="/logo.png" alt="Logo" className="w-full h-full object-contain" />
           </div>
           <span className="font-bold text-white tracking-widest text-sm">INPSYTECH</span>
        </div>

        {/* Main Visual */}
        <div className="relative group scale-90 md:scale-100">
          <div className="absolute -inset-10 bg-inpsy-cyan/20 blur-3xl rounded-full animate-pulse"></div>
          <div className="relative bg-gradient-to-b from-white/10 to-white/5 p-8 rounded-full border border-white/10 shadow-[0_0_30px_rgba(0,229,255,0.2)] backdrop-blur-md">
              <Trophy className={`w-14 h-14 ${isPerfect ? 'text-yellow-400 drop-shadow-neon' : 'text-inpsy-cyan'}`} />
          </div>
        </div>

        <div className="space-y-1">
          <h2 className="text-3xl font-bold text-white tracking-tight">挑戰完成</h2>
          <p className="text-inpsy-cyan text-sm tracking-[0.3em] font-medium">MISSION COMPLETED</p>
        </div>

        {/* Score Card */}
        <div className="w-full bg-white/5 p-6 rounded-[2rem] border border-white/10 backdrop-blur-xl shadow-2xl relative overflow-hidden">
          {/* Decorative elements */}
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-inpsy-cyan to-transparent opacity-50"></div>
          
          <div className="text-gray-400 mb-2 uppercase tracking-widest text-[10px] font-semibold">Final Score</div>
          
          <div className="flex items-baseline justify-center gap-3 mb-4">
              <span className="text-6xl font-black text-white drop-shadow-lg tracking-tighter">{score}</span>
              <span className="text-xl text-gray-500 font-medium">/ {QUESTIONS.length}</span>
          </div>
          
          <div className="h-2 w-full bg-gray-700/30 rounded-full overflow-hidden mb-4 ring-1 ring-white/5">
            <div 
              className="h-full bg-gradient-to-r from-inpsy-cyan to-blue-500 transition-all duration-1000 ease-out shadow-[0_0_10px_#00E5FF]"
              style={{ width: `${percentage}%` }}
            />
          </div>

          <p className="text-[14px] text-gray-200 leading-relaxed font-medium">
            {isPerfect 
              ? "完美！您對公司有著絕對的洞察力！🚀" 
              : score > 2 
                ? "表現優異！您掌握了大部分的關鍵資訊！✨" 
                : "再接再厲！讓我們一起深入了解乾瞻科技！💪"}
          </p>
        </div>

        {/* Action Button */}
        <button
          onClick={onRestart}
          className="w-full py-4 bg-transparent border border-inpsy-cyan text-inpsy-cyan font-bold text-lg rounded-[2rem] hover:bg-inpsy-cyan hover:text-black transition-all duration-300 flex items-center justify-center gap-2 active:scale-95 shadow-[0_0_10px_rgba(0,229,255,0.1)]"
        >
          <RotateCcw className="w-5 h-5" />
          重新挑戰 Restart
        </button>
      </div>

      {/* SPONSORSHIP FOOTER - Fixed at bottom area */}
      <div className="w-full mt-6 pt-6 pb-2">
          <div className="relative border-t border-white/10 pt-5 flex flex-col items-center space-y-3">
              {/* Decoration line label */}
              <div className="absolute -top-2.5 bg-inpsy-bg px-3 text-[10px] text-inpsy-cyan/60 tracking-widest uppercase font-semibold">
                  Event Sponsor
              </div>

              <div className="flex flex-col items-center space-y-2">
                  <div className="flex items-center gap-2">
                      <Sparkles className="w-3.5 h-3.5 text-yellow-400 animate-pulse" />
                      <span className="text-base font-bold text-white tracking-wide drop-shadow-md">
                        乾瞻科技 InPsytech
                      </span>
                      <Sparkles className="w-3.5 h-3.5 text-yellow-400 animate-pulse" />
                  </div>
                  
                  {/* Movie Event Badge */}
                  <div className="flex items-center gap-2 bg-gradient-to-r from-white/5 via-white/10 to-white/5 px-5 py-2 rounded-full border border-white/15 shadow-glass">
                      <Clapperboard className="w-4 h-4 text-inpsy-cyan" />
                      <span className="text-xs text-gray-200 font-medium tracking-wide">
                        電影欣賞會 • 特別企劃
                      </span>
                  </div>
              </div>
          </div>
      </div>
    </div>
  );
};

export default ResultScreen;