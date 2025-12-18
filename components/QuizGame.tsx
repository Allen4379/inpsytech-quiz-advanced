import React, { useState } from 'react';
import { QUESTIONS } from '../constants';
import { ArrowRight, CheckCircle2, XCircle, Lightbulb, Cpu, Sprout } from 'lucide-react';

interface QuizGameProps {
  onFinish: (score: number) => void;
}

const QuizGame: React.FC<QuizGameProps> = ({ onFinish }) => {
  const [currentQIndex, setCurrentQIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);

  const currentQuestion = QUESTIONS[currentQIndex];
  
  const handleOptionClick = (option: string) => {
    if (showResult) return;
    
    setSelectedOption(option);
    setShowResult(true);
    
    if (option === currentQuestion.answer) {
      setScore(prev => prev + 1);
    }
  };

  const handleNext = () => {
    if (currentQIndex + 1 < QUESTIONS.length) {
      setCurrentQIndex(prev => prev + 1);
      setShowResult(false);
      setSelectedOption(null);
    } else {
      onFinish(score + (selectedOption === currentQuestion.answer ? 0 : 0));
    }
  };

  const isCorrect = selectedOption === currentQuestion.answer;

  return (
    <div className="w-full h-full flex flex-col space-y-5 animate-fade-in-up font-sans py-4">
      {/* Header Area */}
      <div className="flex items-center justify-between px-2 pt-2">
         {/* Small Logo */}
         <div className="flex items-center gap-2 bg-black/40 px-3 py-1.5 rounded-full border border-inpsy-cyan/30 backdrop-blur-md shadow-bio">
            <div className="w-5 h-5 flex items-center justify-center">
               <img 
                 src="/logo.png" 
                 alt="Logo" 
                 className="w-full h-full object-contain"
                 onError={(e) => {
                    e.currentTarget.style.display = 'none';
                 }} 
               />
               <Cpu className="w-full h-full text-inpsy-cyan hidden" /> 
            </div>
            <span className="font-bold text-white text-sm tracking-wide">InPsytech</span>
         </div>
         <div className="text-xs font-bold text-inpsy-purple bg-inpsy-purple/10 px-3 py-1.5 rounded-full border border-inpsy-purple/40 shadow-[0_0_10px_rgba(168,85,247,0.2)]">
            {currentQIndex + 1} <span className="text-gray-500">/</span> {QUESTIONS.length}
         </div>
      </div>

      {/* Progress Bar - Neural Strand */}
      <div className="w-full px-2">
        <div className="w-full h-1.5 bg-gray-800 rounded-full overflow-hidden border border-white/5 relative">
          <div 
            className="h-full bg-gradient-to-r from-inpsy-cyan via-blue-500 to-inpsy-purple transition-all duration-500 ease-out shadow-[0_0_10px_#00ffff]"
            style={{ width: `${((currentQIndex + 1) / QUESTIONS.length) * 100}%` }}
          />
          {/* Sparkle on the end of the bar */}
          <div 
             className="absolute top-0 bottom-0 w-2 h-full bg-white blur-[2px] transition-all duration-500"
             style={{ left: `calc(${((currentQIndex + 1) / QUESTIONS.length) * 100}% - 4px)` }}
          ></div>
        </div>
      </div>
      
      {/* Scrollable Content Area */}
      <div className="flex-1 overflow-y-auto no-scrollbar pb-24 px-2">
          {/* Question Card */}
          <div className="bg-black/30 p-6 rounded-[1.5rem] border border-inpsy-cyan/20 shadow-glass backdrop-blur-xl relative overflow-hidden group">
            {/* Holographic corner */}
            <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-bl from-inpsy-cyan/20 to-transparent rounded-bl-3xl border-b border-l border-inpsy-cyan/10"></div>
            
            <h3 className="text-lg md:text-xl font-bold text-white mb-6 leading-relaxed relative z-10 drop-shadow-md">
              {currentQuestion.q}
            </h3>

            <div className="space-y-3 relative z-10">
              {currentQuestion.options.map((option, idx) => {
                let buttonStyle = "border-white/5 bg-white/5 text-gray-200";
                let icon = null;

                if (showResult) {
                  if (option === currentQuestion.answer) {
                    buttonStyle = "bg-green-500/20 border-green-400 text-green-100 shadow-[0_0_15px_rgba(74,222,128,0.2)]";
                    icon = <CheckCircle2 className="w-5 h-5 text-green-400 animate-pulse" />;
                  } else if (option === selectedOption) {
                    buttonStyle = "bg-red-500/20 border-red-500 text-red-100";
                    icon = <XCircle className="w-5 h-5 text-red-400" />;
                  } else {
                    buttonStyle = "border-transparent bg-black/40 text-gray-600 opacity-40";
                  }
                } else {
                    buttonStyle = "bg-white/5 border-white/10 hover:bg-inpsy-cyan/10 hover:border-inpsy-cyan/50 hover:text-inpsy-cyan active:bg-inpsy-cyan/20 active:border-inpsy-cyan";
                }

                return (
                  <button
                    key={idx}
                    disabled={showResult}
                    onClick={() => handleOptionClick(option)}
                    className={`w-full text-left p-4 rounded-xl border transition-all duration-200 flex items-center justify-between text-[15px] leading-snug ${buttonStyle}`}
                  >
                    <span className="font-medium pr-2">{option}</span>
                    {icon}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Explanation & Feedback Section */}
          {showResult && (
            <div className="space-y-4 animate-fade-in py-4">
              <div className={`p-5 rounded-[1.25rem] border backdrop-blur-md shadow-lg relative overflow-hidden ${isCorrect ? 'bg-green-950/40 border-green-500/30' : 'bg-red-950/40 border-red-500/30'}`}>
                {/* Organic overlay */}
                <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>
                
                <div className="flex items-center gap-2 mb-3 relative z-10">
                   {isCorrect ? <CheckCircle2 className="w-5 h-5 text-green-400"/> : <XCircle className="w-5 h-5 text-red-400"/>}
                   <span className={`font-bold text-base ${isCorrect ? 'text-green-400' : 'text-red-400'}`}>
                      {isCorrect ? '連結成功！ Connection Established!' : '連結失敗！ Connection Lost'}
                   </span>
                </div>
                
                <div className="flex items-start gap-3 relative z-10">
                  <Sprout className="w-5 h-5 shrink-0 mt-0.5 text-inpsy-cyan" />
                  <p className="text-gray-200 leading-relaxed text-sm">
                    {currentQuestion.explanation}
                  </p>
                </div>
              </div>

              {/* Next Button */}
              <button
                onClick={handleNext}
                className="w-full py-4 bg-gradient-to-r from-inpsy-cyan to-blue-500 text-black font-bold text-lg rounded-[1.5rem] shadow-bio active:scale-[0.98] transition-all flex items-center justify-center gap-2 hover:brightness-110"
              >
                {currentQIndex < QUESTIONS.length - 1 ? "下一題 Next Node" : "查看結果 View Result"} 
                <ArrowRight className="w-5 h-5" />
              </button>
            </div>
          )}
      </div>
    </div>
  );
};

export default QuizGame;