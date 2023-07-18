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
  id: string;
  questionTitle: string;
  questionType: string;
  answers: Answer[];
}

export interface NewQuiz {
  title: string;
  description: string;
  questions: Question[];
}
