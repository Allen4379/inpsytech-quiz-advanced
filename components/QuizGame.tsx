import React, { useState } from 'react';
import { QUESTIONS } from '../constants';
import { ArrowRight, CheckCircle2, XCircle, Lightbulb, Cpu } from 'lucide-react';

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
         <div className="flex items-center gap-2 bg-white/5 px-3 py-1.5 rounded-full border border-white/5 backdrop-blur-sm">
            <div className="w-5 h-5 flex items-center justify-center">
               <img 
                 src="/logo.png" 
                 alt="Logo" 
                 className="w-full h-full object-contain"
                 onError={(e) => {
                    e.currentTarget.style.display = 'none';
                    e.currentTarget.parentElement?.classList.add('hidden'); // Hide container if image fails
                 }} 
               />
               {/* Fallback Icon hidden by default, shown via CSS if img fails logic was complex, keeping simple here */}
               <Cpu className="w-full h-full text-inpsy-cyan hidden" /> 
            </div>
            <span className="font-bold text-white text-sm tracking-wide">InPsytech</span>
         </div>
         <div className="text-xs font-semibold text-inpsy-cyan/90 bg-inpsy-cyan/10 px-3 py-1.5 rounded-full border border-inpsy-cyan/20">
            {currentQIndex + 1} / {QUESTIONS.length}
         </div>
      </div>

      {/* Progress Bar */}
      <div className="w-full px-2">
        <div className="w-full h-1 bg-white/10 rounded-full overflow-hidden">
          <div 
            className="h-full bg-gradient-to-r from-inpsy-cyan to-blue-500 transition-all duration-500 ease-out shadow-[0_0_8px_#00E5FF]"
            style={{ width: `${((currentQIndex + 1) / QUESTIONS.length) * 100}%` }}
          />
        </div>
      </div>
      
      {/* Scrollable Content Area */}
      <div className="flex-1 overflow-y-auto no-scrollbar pb-24 px-2">
          {/* Question Card */}
          <div className="bg-white/5 p-6 rounded-[1.5rem] border border-white/10 shadow-xl backdrop-blur-md relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-inpsy-cyan/5 rounded-full blur-2xl -mr-10 -mt-10 pointer-events-none"></div>
            
            <h3 className="text-lg md:text-xl font-bold text-white mb-6 leading-relaxed relative z-10">
              {currentQuestion.q}
            </h3>

            <div className="space-y-3 relative z-10">
              {currentQuestion.options.map((option, idx) => {
                let buttonStyle = "border-white/5 bg-white/5 text-gray-200";
                let icon = null;

                if (showResult) {
                  if (option === currentQuestion.answer) {
                    buttonStyle = "bg-green-500/20 border-green-500/50 text-green-100 shadow-[0_0_15px_rgba(74,222,128,0.1)]";
                    icon = <CheckCircle2 className="w-5 h-5 text-green-400" />;
                  } else if (option === selectedOption) {
                    buttonStyle = "bg-red-500/20 border-red-500/50 text-red-100";
                    icon = <XCircle className="w-5 h-5 text-red-400" />;
                  } else {
                    buttonStyle = "border-transparent bg-black/20 text-gray-600 opacity-30";
                  }
                } else {
                    buttonStyle = "bg-white/5 border-white/10 hover:bg-white/10 active:bg-inpsy-cyan active:text-black active:border-inpsy-cyan active:shadow-neon";
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
              <div className={`p-5 rounded-[1.25rem] border border-l-4 backdrop-blur-md shadow-lg ${isCorrect ? 'bg-green-950/40 border-green-500/30 border-l-green-500' : 'bg-red-950/40 border-red-500/30 border-l-red-500'}`}>
                <div className="flex items-center gap-2 mb-3">
                   {isCorrect ? <CheckCircle2 className="w-5 h-5 text-green-400"/> : <XCircle className="w-5 h-5 text-red-400"/>}
                   <span className={`font-bold text-base ${isCorrect ? 'text-green-400' : 'text-red-400'}`}>
                      {isCorrect ? '答對了！ Correct!' : '答錯了！ Incorrect'}
                   </span>
                </div>
                
                <div className="flex items-start gap-3">
                  <Lightbulb className="w-5 h-5 shrink-0 mt-0.5 text-yellow-400/90" />
                  <p className="text-gray-200 leading-relaxed text-sm">
                    {currentQuestion.explanation}
                  </p>
                </div>
              </div>

              {/* Next Button */}
              <button
                onClick={handleNext}
                className="w-full py-4 bg-inpsy-cyan text-inpsy-bg font-bold text-lg rounded-[1.5rem] shadow-[0_0_20px_rgba(0,229,255,0.4)] active:scale-[0.98] transition-all flex items-center justify-center gap-2 hover:bg-white"
              >
                {currentQIndex < QUESTIONS.length - 1 ? "下一題 Next Question" : "查看結果 View Result"} 
                <ArrowRight className="w-5 h-5" />
              </button>
            </div>
          )}
      </div>
    </div>
  );
};

export default QuizGame;