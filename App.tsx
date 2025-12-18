import React, { useState } from 'react';
import StartScreen from './components/StartScreen';
import QuizGame from './components/QuizGame';
import ResultScreen from './components/ResultScreen';
import { QuizState } from './types';

const App: React.FC = () => {
  const [gameState, setGameState] = useState<QuizState>(QuizState.START);
  const [finalScore, setFinalScore] = useState(0);

  const handleStart = () => {
    setGameState(QuizState.PLAYING);
    setFinalScore(0);
  };

  const handleFinish = (score: number) => {
    setFinalScore(score);
    setGameState(QuizState.FINISHED);
  };

  const handleRestart = () => {
    setGameState(QuizState.START);
    setFinalScore(0);
  };

  return (
    <div className="min-h-screen w-full bg-inpsy-bg text-inpsy-text selection:bg-inpsy-cyan selection:text-black font-sans overflow-x-hidden">
      {/* Background Decor */}
      <div className="fixed top-0 left-0 w-full h-full overflow-hidden pointer-events-none z-0">
        <div className="absolute top-[-10%] right-[-5%] w-96 h-96 bg-blue-600/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-[-10%] left-[-5%] w-96 h-96 bg-inpsy-cyan/5 rounded-full blur-3xl"></div>
        {/* Grid Pattern Overlay */}
        <div className="absolute inset-0 opacity-[0.03]" 
             style={{ 
               backgroundImage: 'linear-gradient(#00E5FF 1px, transparent 1px), linear-gradient(90deg, #00E5FF 1px, transparent 1px)', 
               backgroundSize: '40px 40px' 
             }}>
        </div>
      </div>

      <main className="relative z-10 container mx-auto px-4 py-8 min-h-screen flex flex-col items-center justify-center">
        {gameState === QuizState.START && (
          <StartScreen onStart={handleStart} />
        )}
        
        {gameState === QuizState.PLAYING && (
          <QuizGame onFinish={handleFinish} />
        )}

        {gameState === QuizState.FINISHED && (
          <ResultScreen score={finalScore} onRestart={handleRestart} />
        )}
      </main>
    </div>
  );
};

export default App;