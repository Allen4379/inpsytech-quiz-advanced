import React, { useState } from 'react';
import StartScreen from './components/StartScreen';
import QuizGame from './components/QuizGame';
import ResultScreen from './components/ResultScreen';
import ImageEditor from './components/ImageEditor';

export enum AppState {
  START = 'START',
  PLAYING = 'PLAYING',
  FINISHED = 'FINISHED',
  IMAGE_LAB = 'IMAGE_LAB'
}

const App: React.FC = () => {
  const [appState, setAppState] = useState<AppState>(AppState.START);
  const [finalScore, setFinalScore] = useState(0);

  const handleStart = () => {
    setAppState(AppState.PLAYING);
    setFinalScore(0);
  };

  const handleFinish = (score: number) => {
    setFinalScore(score);
    setAppState(AppState.FINISHED);
  };

  const handleRestart = () => {
    setAppState(AppState.START);
    setFinalScore(0);
  };

  const goToImageLab = () => {
    setAppState(AppState.IMAGE_LAB);
  };

  const backToHome = () => {
    setAppState(AppState.START);
  };

  return (
    <div className="min-h-[100dvh] w-full bg-inpsy-bg text-inpsy-text selection:bg-inpsy-cyan selection:text-black font-sans overflow-hidden relative">
      {/* Avatar x InPsytech Background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        {/* Deep Forest Gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#020617] via-[#0f172a] to-[#020617]"></div>
        
        {/* Floating "Woodsprites" (Atokirina) - represented as glowing particles */}
        <div className="absolute top-10 left-10 w-2 h-2 bg-inpsy-text rounded-full blur-[1px] animate-float opacity-60"></div>
        <div className="absolute top-1/3 right-20 w-1.5 h-1.5 bg-inpsy-cyan rounded-full blur-[2px] animate-pulse-bio opacity-50"></div>
        <div className="absolute bottom-1/4 left-1/4 w-3 h-3 bg-inpsy-purple rounded-full blur-[3px] animate-float opacity-40" style={{ animationDelay: '2s' }}></div>

        {/* Circuit Vines - representing Connection & Technology */}
        <svg className="absolute inset-0 w-full h-full opacity-20" xmlns="http://www.w3.org/2000/svg">
          <path d="M0,100 Q200,300 400,100 T800,200" stroke="#00ffff" strokeWidth="2" fill="none" className="animate-pulse-bio" strokeDasharray="10 20"/>
          <path d="M-100,500 Q200,400 500,800" stroke="#a855f7" strokeWidth="2" fill="none" opacity="0.5"/>
        </svg>

        {/* Grid Overlay for Tech feel */}
        <div className="absolute inset-0 bg-circuit-pattern opacity-10"></div>
        
        {/* Glow Orbs */}
        <div className="absolute top-[-10%] right-[-5%] w-96 h-96 bg-inpsy-cyan/10 rounded-full blur-[100px] animate-pulse-slow"></div>
        <div className="absolute bottom-[-10%] left-[-5%] w-96 h-96 bg-inpsy-purple/10 rounded-full blur-[100px] animate-pulse-slow" style={{ animationDelay: '1.5s' }}></div>
      </div>

      {/* Main Content */}
      <main className="relative z-10 w-full h-[100dvh] pt-[env(safe-area-inset-top)] pb-[env(safe-area-inset-bottom)] px-6 flex flex-col">
        <div className="flex-1 flex flex-col justify-center w-full max-w-md mx-auto h-full">
          {appState === AppState.START && (
            <StartScreen onStart={handleStart} onImageLab={goToImageLab} />
          )}
          
          {appState === AppState.PLAYING && (
            <QuizGame onFinish={handleFinish} />
          )}

          {appState === AppState.FINISHED && (
            <ResultScreen score={finalScore} onRestart={handleRestart} />
          )}

          {appState === AppState.IMAGE_LAB && (
            <ImageEditor onBack={backToHome} />
          )}
        </div>
      </main>
    </div>
  );
};

export default App;