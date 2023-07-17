export interface Quiz {
  id: number;
  title: string;
  description: string;
  answers: Answer[];
  answersType: string;
}

export interface Answer {
  answerTitle: string;
  isCorrect: boolean;
}

export interface Question {
  questionTitle: string;
  answersType: string;
  answers: Answer[];
}

export interface NewQuiz {
  id: number;
  title: string;
  description: string;
  questions: Question[];
}
