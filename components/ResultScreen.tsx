import React, { useEffect } from 'react';
import confetti from 'canvas-confetti';
import { Trophy, RotateCcw, Clapperboard, Sparkles, Zap } from 'lucide-react';
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
        colors: ['#00FFFF', '#A855F7', '#FFFFFF']
      });
      confetti({
        particleCount: 2,
        angle: 120,
        spread: 55,
        origin: { x: 1 },
        colors: ['#00FFFF', '#A855F7', '#FFFFFF']
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
        
        {/* Header */}
        <div className="flex items-center gap-2 opacity-90">
           <span className="font-bold text-inpsy-cyan tracking-[0.3em] text-xs uppercase border-b border-inpsy-cyan/30 pb-1">InPsytech Systems</span>
        </div>

        {/* Main Visual */}
        <div className="relative group scale-90 md:scale-100">
          <div className="absolute -inset-10 bg-gradient-to-t from-inpsy-cyan/30 to-inpsy-purple/30 blur-3xl rounded-full animate-pulse-bio"></div>
          <div className="relative bg-black/40 p-8 rounded-full border border-inpsy-cyan/30 shadow-bio backdrop-blur-md">
              <Trophy className={`w-14 h-14 ${isPerfect ? 'text-yellow-400 drop-shadow-[0_0_15px_rgba(250,204,21,0.6)]' : 'text-inpsy-cyan'}`} />
          </div>
        </div>

        <div className="space-y-1">
          <h2 className="text-3xl font-bold text-white tracking-tight drop-shadow-lg">挑戰完成</h2>
          <p className="text-inpsy-purple text-sm tracking-[0.3em] font-medium uppercase">Mission Completed</p>
        </div>

        {/* Score Card */}
        <div className="w-full bg-black/30 p-6 rounded-[2rem] border border-inpsy-cyan/20 backdrop-blur-xl shadow-glass relative overflow-hidden">
          {/* Decorative circuit lines */}
          <div className="absolute top-0 right-0 w-32 h-32 opacity-10 border-t border-r border-inpsy-cyan rounded-tr-[2rem]"></div>
          
          <div className="text-gray-400 mb-2 uppercase tracking-widest text-[10px] font-semibold flex items-center justify-center gap-2">
            <Zap className="w-3 h-3 text-inpsy-cyan" />
            Synchronize Rate
          </div>
          
          <div className="flex items-baseline justify-center gap-3 mb-4">
              <span className="text-6xl font-black text-white drop-shadow-md tracking-tighter">{percentage}%</span>
          </div>
          
          <div className="h-2 w-full bg-gray-800/50 rounded-full overflow-hidden mb-4 ring-1 ring-white/10">
            <div 
              className="h-full bg-gradient-to-r from-inpsy-cyan via-blue-400 to-inpsy-purple transition-all duration-1000 ease-out shadow-[0_0_10px_#a855f7]"
              style={{ width: `${percentage}%` }}
            />
          </div>

          <p className="text-[14px] text-gray-200 leading-relaxed font-medium">
            {isPerfect 
              ? "完美！您已與乾瞻科技的核心精神完全同步！🌟" 
              : score > 2 
                ? "表現優異！您的神經連結非常穩定！✨" 
                : "再接再厲！請重新建立連結以獲取更多資訊！💪"}
          </p>
        </div>

        {/* Action Button */}
        <button
          onClick={onRestart}
          className="w-full py-4 bg-transparent border border-inpsy-cyan text-inpsy-cyan font-bold text-lg rounded-[2rem] hover:bg-inpsy-cyan hover:text-black transition-all duration-300 flex items-center justify-center gap-2 active:scale-95 shadow-bio"
        >
          <RotateCcw className="w-5 h-5" />
          重新同步 Re-Sync
        </button>
      </div>

      {/* SPONSORSHIP FOOTER */}
      <div className="w-full mt-6 pt-6 pb-2">
          <div className="relative border-t border-white/10 pt-5 flex flex-col items-center space-y-3">
              <div className="absolute -top-2.5 bg-[#050b14] px-3 text-[10px] text-inpsy-cyan/60 tracking-widest uppercase font-semibold">
                  Event Sponsor
              </div>

              <div className="flex flex-col items-center space-y-2">
                  <div className="flex items-center gap-2">
                      <Sparkles className="w-3.5 h-3.5 text-inpsy-purple animate-pulse" />
                      <span className="text-base font-bold text-white tracking-wide drop-shadow-md">
                        乾瞻科技 InPsytech
                      </span>
                      <Sparkles className="w-3.5 h-3.5 text-inpsy-purple animate-pulse" />
                  </div>
                  
                  {/* Movie Event Badge */}
                  <div className="flex items-center gap-2 bg-gradient-to-r from-inpsy-cyan/5 via-inpsy-purple/10 to-inpsy-cyan/5 px-5 py-2 rounded-full border border-white/15 shadow-glass backdrop-blur-sm">
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