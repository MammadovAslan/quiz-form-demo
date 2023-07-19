export interface Quiz {
  id: number;
  title: string;
  description: string;
  answers: AnswerText[];
  answersType: string;
}

export interface AnswerText {
  answerTitle: string;
  isCorrect: boolean;
}

export interface AnswerImage{
  source:string
  isCorrect:boolean
}

export interface Question {
  id: string;
  questionTitle: string;
  questionType: string;
  answers: AnswerText[];
}

export interface NewQuiz {
  title: string;
  description: string;
  questions: Question[];
}
