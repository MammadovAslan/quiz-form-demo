import React from "react";
import { Question } from "../interfaces/interfaces";
import { v4 as uuidv4 } from "uuid";

const QuizQuestion: React.FC<Question> = ({ answers, questionTitle, questionType }) => {
  return (
    <div className="question">
      <div>{questionTitle}</div>
      <div>{questionType}</div>
      <ul>
        {answers.map((answer) => (
          <li key={uuidv4()} className={`${answer.isCorrect ? "text-green-600" : ""}`}>
            {answer.answerTitle}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default QuizQuestion;
