import React, { useEffect } from 'react';
import confetti from 'canvas-confetti';
import { Trophy, RotateCcw, Clapperboard, Sparkles, Zap, Ticket, Coffee, PartyPopper, ChevronDown } from 'lucide-react';
import { QUESTIONS } from '../constants';

interface ResultScreenProps {
  score: number;
  onRestart: () => void;
}

const ResultScreen: React.FC<ResultScreenProps> = ({ score, onRestart }) => {
  const isPerfect = score === QUESTIONS.length;
  const percentage = Math.round((score / QUESTIONS.length) * 100);
  const isPass = percentage >= 60; // 60% to get the reward

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
      
      <div className="flex-1 flex flex-col items-center space-y-6 pb-20">
        
        {/* Header */}
        <div className="flex items-center gap-2 opacity-90">
           <span className="font-bold text-inpsy-cyan tracking-[0.3em] text-xs uppercase border-b border-inpsy-cyan/30 pb-1">InPsytech Systems</span>
        </div>

        {/* --- SCORE SECTION --- */}
        <div className="w-full flex flex-col items-center">
            <div className="relative group scale-90">
            <div className="absolute -inset-10 bg-gradient-to-t from-inpsy-cyan/30 to-inpsy-purple/30 blur-3xl rounded-full animate-pulse-bio"></div>
            <div className="relative bg-black/40 p-6 rounded-full border border-inpsy-cyan/30 shadow-bio backdrop-blur-md">
                <Trophy className={`w-12 h-12 ${isPerfect ? 'text-yellow-400 drop-shadow-[0_0_15px_rgba(250,204,21,0.6)]' : 'text-inpsy-cyan'}`} />
            </div>
            </div>

            <div className="mt-4 text-center">
                <h2 className="text-2xl font-bold text-white tracking-tight drop-shadow-lg">
                    {isPass ? "挑戰成功 Mission Cleared" : "挑戰結束"}
                </h2>
                <div className="flex items-center justify-center gap-2 mt-2">
                    <div className="h-1.5 w-24 bg-gray-800 rounded-full overflow-hidden ring-1 ring-white/10">
                        <div className="h-full bg-gradient-to-r from-inpsy-cyan to-inpsy-purple" style={{ width: `${percentage}%` }} />
                    </div>
                    <span className="text-inpsy-cyan font-mono font-bold">{percentage}%</span>
                </div>
            </div>
        </div>

        {/* --- DIGITAL TICKET (REDEMPTION PASS) --- */}
        {isPass && (
            <div className="w-full bg-gradient-to-br from-gray-900 to-black rounded-2xl border-2 border-inpsy-cyan/50 shadow-[0_0_20px_rgba(0,255,255,0.2)] overflow-hidden relative group">
                {/* Holographic Texture */}
                <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/diagmonds-light.png')] opacity-10"></div>
                <div className="absolute -inset-[100%] bg-gradient-to-r from-transparent via-white/10 to-transparent rotate-45 animate-[shimmer_3s_infinite]"></div>

                {/* Ticket Content */}
                <div className="relative z-10 p-5 flex flex-col items-center text-center space-y-3">
                    <div className="bg-inpsy-cyan/20 p-2 rounded-full ring-1 ring-inpsy-cyan/50 animate-pulse">
                        <Ticket className="w-8 h-8 text-inpsy-cyan" />
                    </div>
                    
                    <div>
                        <h3 className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-inpsy-cyan to-white uppercase tracking-wider">
                            電影套餐兌換券
                        </h3>
                        <p className="text-[10px] text-gray-400 tracking-widest mt-1">MOVIE APPRECIATION EVENT PASS</p>
                    </div>

                    <div className="w-full h-px bg-gradient-to-r from-transparent via-inpsy-purple to-transparent opacity-50"></div>

                    <div className="flex gap-6 justify-center text-inpsy-text">
                        <div className="flex flex-col items-center gap-1">
                            <PartyPopper className="w-6 h-6 text-yellow-400" />
                            <span className="text-xs font-bold">爆米花</span>
                        </div>
                        <div className="w-px h-10 bg-gray-700"></div>
                        <div className="flex flex-col items-center gap-1">
                            <Coffee className="w-6 h-6 text-blue-400" />
                            <span className="text-xs font-bold">飲料</span>
                        </div>
                    </div>

                    <div className="w-full bg-inpsy-cyan/10 rounded-lg py-2 mt-2 border border-inpsy-cyan/20">
                        <p className="text-xs text-inpsy-cyan font-bold animate-pulse">請向工作人員出示此畫面</p>
                    </div>
                </div>

                {/* Left/Right Cutouts for Ticket look */}
                <div className="absolute top-1/2 -left-3 w-6 h-6 bg-[#050b14] rounded-full border-r border-inpsy-cyan/50"></div>
                <div className="absolute top-1/2 -right-3 w-6 h-6 bg-[#050b14] rounded-full border-l border-inpsy-cyan/50"></div>
            </div>
        )}

        {/* --- COMPANY INTRO (SPONSORSHIP) --- */}
        <div className="w-full space-y-3">
            <div className="flex items-center gap-2 text-inpsy-purple/80 px-1">
                <Sparkles className="w-4 h-4" />
                <span className="text-xs font-bold tracking-widest uppercase">About The Sponsor</span>
            </div>

            <div className="w-full bg-white/5 backdrop-blur-md rounded-xl border border-white/10 p-5 space-y-4">
                <div className="flex items-center gap-3 border-b border-white/5 pb-3">
                    <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center p-1">
                        <img src="/logo.png" alt="InPsytech" className="w-full h-full object-contain" />
                    </div>
                    <div>
                        <h4 className="text-white font-bold text-lg leading-none">乾瞻科技</h4>
                        <span className="text-inpsy-cyan text-xs tracking-wider font-medium">InPsytech Inc.</span>
                    </div>
                </div>

                <div className="space-y-3 text-sm text-gray-300 leading-relaxed">
                    <p>
                        <span className="text-inpsy-cyan font-bold">先進製程 IP 領航者：</span><br/>
                        專注於 5nm / 3nm 晶片設計，提供世界級的高速介面 (UCIe, DDR, SerDes) 解決方案。
                    </p>
                    <p>
                        <span className="text-inpsy-purple font-bold">Egis 神盾集團成員：</span><br/>
                        強強聯手，整合集團資源，瞄準全球 AI 與 HPC (高效能運算) 市場。
                    </p>
                    <p>
                        <span className="text-white font-bold">未來展望：</span><br/>
                        預計 2026 年邁向國際舞台與 IPO，打造世界級的半導體 IP 獨角獸。
                    </p>
                </div>

                <div className="pt-2 border-t border-white/5">
                    <p className="text-[10px] text-center text-gray-500">
                        © 2024 InPsytech Inc. All Rights Reserved.
                    </p>
                </div>
            </div>
        </div>

        {/* Action Button */}
        <button
          onClick={onRestart}
          className="w-full py-3 bg-transparent border border-gray-600 text-gray-400 font-bold text-sm rounded-xl hover:bg-white/5 transition-all flex items-center justify-center gap-2"
        >
          <RotateCcw className="w-4 h-4" />
          重新挑戰 Re-Sync
        </button>

      </div>
    </div>
  );
};

export default ResultScreen;