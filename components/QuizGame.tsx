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
  const progress = ((currentQIndex) / QUESTIONS.length) * 100;

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

  return (
    <div className="w-full max-w-2xl mx-auto space-y-6 animate-fade-in-up">
      {/* Progress Bar */}
      <div className="w-full h-2 bg-inpsy-dark rounded-full overflow-hidden border border-inpsy-accent">
        <div 
          className="h-full bg-inpsy-cyan transition-all duration-500 ease-out shadow-[0_0_10px_#00E5FF]"
          style={{ width: `${((currentQIndex + 1) / QUESTIONS.length) * 100}%` }}
        />
      </div>
      
      <div className="flex justify-between text-sm text-inpsy-cyan font-mono">
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
                buttonStyle = "bg-green-500/20 border-green-400 text-green-300 shadow-[0_0_15px_rgba(74,222,128,0.3)]";
                icon = <CheckCircle2 className="w-5 h-5 text-green-400" />;
              } else if (option === selectedOption) {
                // Wrong Selected Style
                buttonStyle = "bg-red-500/20 border-red-400 text-red-300";
                icon = <XCircle className="w-5 h-5 text-red-400" />;
              } else {
                // Unselected options
                buttonStyle = "border-inpsy-dark bg-inpsy-dark/30 text-gray-500 opacity-50";
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
                <span className="font-medium text-lg">{option}</span>
                {icon}
              </button>
            );
          })}
        </div>
      </div>

      {/* Explanation & Next Button */}
      {showResult && (
        <div className="space-y-6 animate-fade-in">
          <div className="bg-inpsy-accent p-5 rounded-lg border-l-4 border-inpsy-cyan shadow-lg">
            <div className="flex items-start gap-3">
              <Lightbulb className="w-6 h-6 text-inpsy-cyan shrink-0 mt-1" />
              <div>
                <h4 className="font-bold text-inpsy-cyan mb-2">💡 解析</h4>
                <p className="text-gray-200 leading-relaxed text-sm md:text-base">
                  {currentQuestion.explanation}
                </p>
              </div>
            </div>
          </div>

          <button
            onClick={handleNext}
            className="w-full py-4 bg-inpsy-cyan text-inpsy-bg font-bold text-xl rounded-lg shadow-neon hover:shadow-neon-hover hover:bg-white transition-all duration-300 flex items-center justify-center gap-2"
          >
            {currentQIndex < QUESTIONS.length - 1 ? "下一題" : "查看結果"} 
            <ArrowRight className="w-6 h-6" />
          </button>
        </div>
      )}
    </div>
  );
};

export default QuizGame;