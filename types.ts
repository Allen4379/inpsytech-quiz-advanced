export interface Question {
  q: string;
  options: string[];
  answer: string;
  explanation: string;
}

export enum QuizState {
  START = 'START',
  PLAYING = 'PLAYING',
  FINISHED = 'FINISHED'
}