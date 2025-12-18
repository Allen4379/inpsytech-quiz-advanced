import React, { useState } from 'react';
import { QUESTIONS } from '../constants';
import { ArrowRight, CheckCircle2, XCircle, Lightbulb } from 'lucide-react';

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
      onFinish(score + (selectedOption === currentQuestion.answer ? 0 : 0)); // Score already updated
    }
  };

  const isCorrect = selectedOption === currentQuestion.answer;

  return (
    <div className="w-full max-w-2xl mx-auto space-y-6 animate-fade-in-up font-sans">
      {/* Mini Header with Logo */}
      <div className="flex justify-center mb-2">
         <img src="/logo.png" alt="InPsytech" className="h-8 md:h-10 w-auto opacity-80 object-contain" />
      </div>

      {/* Progress Bar */}
      <div className="w-full h-2 bg-inpsy-dark rounded-full overflow-hidden border border-inpsy-accent">
        <div 
          className="h-full bg-inpsy-cyan transition-all duration-500 ease-out shadow-[0_0_10px_#00E5FF]"
          style={{ width: `${((currentQIndex + 1) / QUESTIONS.length) * 100}%` }}
        />
      </div>
      
      <div className="flex justify-between text-sm text-inpsy-cyan font-bold">
        <span>Question {currentQIndex + 1}</span>
        <span>{QUESTIONS.length} Total</span>
      </div>

      {/* Question Card */}
      <div className="bg-inpsy-dark/50 p-6 md:p-8 rounded-xl border border-inpsy-cyan/30 shadow-lg backdrop-blur-sm">
        <h3 className="text-xl md:text-2xl font-bold text-white mb-6 leading-relaxed">
          {currentQuestion.q}
        </h3>

        <div className="space-y-3">
          {currentQuestion.options.map((option, idx) => {
            let buttonStyle = "border-inpsy-cyan/50 text-inpsy-text hover:bg-inpsy-cyan hover:text-inpsy-bg hover:border-white";
            let icon = null;

            if (showResult) {
              if (option === currentQuestion.answer) {
                // Correct Answer Style
                buttonStyle = "bg-green-900/40 border-green-400 text-green-100 shadow-[0_0_10px_rgba(74,222,128,0.2)]";
                icon = <CheckCircle2 className="w-5 h-5 text-green-400" />;
              } else if (option === selectedOption) {
                // Wrong Selected Style
                buttonStyle = "bg-red-900/40 border-red-400 text-red-100";
                icon = <XCircle className="w-5 h-5 text-red-400" />;
              } else {
                // Unselected options
                buttonStyle = "border-inpsy-dark bg-inpsy-dark/30 text-gray-500 opacity-30";
              }
            } else {
                // Default active state
                buttonStyle = "bg-inpsy-dark border-inpsy-cyan text-white hover:bg-inpsy-cyan hover:text-black hover:shadow-neon hover:border-white cursor-pointer";
            }

            return (
              <button
                key={idx}
                disabled={showResult}
                onClick={() => handleOptionClick(option)}
                className={`w-full text-left p-4 rounded-lg border transition-all duration-300 flex items-center justify-between group ${buttonStyle}`}
              >
                <span className="font-medium text-lg font-sans">{option}</span>
                {icon}
              </button>
            );
          })}
        </div>
      </div>

      {/* Explanation & Feedback Section */}
      {showResult && (
        <div className="space-y-6 animate-fade-in">
          {/* Feedback Card */}
          <div className={`p-5 rounded-lg border-l-4 shadow-lg backdrop-blur-md ${isCorrect ? 'bg-green-950/40 border-green-500' : 'bg-red-950/40 border-red-500'}`}>
            {/* Header: Correct/Wrong */}
            <h4 className={`text-xl font-bold mb-3 flex items-center gap-2 ${isCorrect ? 'text-green-400' : 'text-red-400'}`}>
               {isCorrect ? <CheckCircle2 className="w-6 h-6"/> : <XCircle className="w-6 h-6"/>}
               {isCorrect ? '答對了！ Correct!' : '答錯了！ Wrong!'}
            </h4>
            
            {/* Divider */}
            <div className={`h-px w-full mb-3 ${isCorrect ? 'bg-green-500/30' : 'bg-red-500/30'}`}></div>

            {/* Explanation Content */}
            <div className="flex items-start gap-3">
              <Lightbulb className={`w-5 h-5 shrink-0 mt-1 ${isCorrect ? 'text-green-400' : 'text-red-400'}`} />
              <div>
                <p className="text-gray-200 leading-relaxed text-base font-sans">
                  {currentQuestion.explanation}
                </p>
              </div>
            </div>
          </div>

          <button
            onClick={handleNext}
            className="w-full py-4 bg-inpsy-cyan text-inpsy-bg font-bold text-xl rounded-lg shadow-neon hover:shadow-neon-hover hover:bg-white transition-all duration-300 flex items-center justify-center gap-2 font-sans"
          >
            {currentQIndex < QUESTIONS.length - 1 ? "下一題 Next" : "查看結果 View Result"} 
            <ArrowRight className="w-6 h-6" />
          </button>
        </div>
      )}
    </div>
  );
};

export default QuizGame;