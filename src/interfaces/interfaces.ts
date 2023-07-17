export interface Quiz{
    title:string,
    description:string,
    answers:Answer[]
    answersType:string,
    id:number
}

export interface Answer {
    text: string;
    isCorrect: boolean;
  }