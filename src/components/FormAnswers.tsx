/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { Answer } from "../interfaces/interfaces";

interface AnswersProps {
  answers: Answer[];
  setAnswers: React.Dispatch<React.SetStateAction<Answer[]>>;
  answer: string;
  setAnswer: React.Dispatch<React.SetStateAction<string>>;
  questionType: string;
}

const FormAnswers: React.FC<AnswersProps> = ({
  answers,
  setAnswers,
  answer,
  setAnswer,
  questionType,
}) => {
  const [editingIndex, setEditingIndex] = useState<number | null>(null);

  useEffect(() => {
    setAnswer("");
  }, [editingIndex, setAnswer]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>): void => {
    if (e.key === "Enter" && answer.trim() !== "") {
      const defaultCorrect = questionType === "Текст" ? true : false;
      setAnswers((prevAnswers) => [
        ...prevAnswers,
        { answerTitle: answer, isCorrect: defaultCorrect },
      ]);
      setAnswer("");
    }
  };

  const handleAnswerClick = (index: number): void => {
    setEditingIndex(index);
  };

  const handleAnswerChange = (e: React.ChangeEvent<HTMLInputElement>, index: number): void => {
    setAnswers((prevAnswers) => {
      const updatedAnswers = [...prevAnswers];
      updatedAnswers[index].answerTitle = e.target.value;
      return updatedAnswers;
    });
  };

  const handleAnswerBlur = (index: number): void => {
    if (answers[index].answerTitle.trim() === "") {
      setAnswers((prevAnswers) => prevAnswers.filter((_, i) => i !== index));
    }
    setEditingIndex(null);
  };

  const handleCheckboxChange = (index: number): void => {
    setAnswers((prevAnswers) => {
      const updatedAnswers = [...prevAnswers];
      const currentAnswer = updatedAnswers[index];

      if (questionType === "Один ответ") {
        updatedAnswers.forEach((answer) => {
          answer.isCorrect = false;
        });
      }

      currentAnswer.isCorrect = !currentAnswer.isCorrect;

      return updatedAnswers;
    });
  };

  useEffect(() => {
    setAnswers((prevAnswers) => {
      return prevAnswers.map((answer) => {
        return {
          ...answer,
          isCorrect: false,
        };
      });
    });

    if (questionType === "Текст") {
      setAnswer("");

      if (answers.length > 1) {
        const arr = [...answers];

        for (let i = 0; i < arr.length; i++) {
          arr.pop();
        }
        arr[0].isCorrect = true;
        setAnswers(arr);
      }
    }
  }, [questionType, setAnswers, setAnswer]);

  const canAddAnswer = questionType !== "Текст" || answers.length === 0;

  return (
    <ul className="mx-4 flex-column gap-4">
      {answers.map((el, index) => (
        <li key={uuidv4()} className="h-8 flex items-center">
          <div className="flex items-center gap-2">
            <label className="checkbox-container cursor-pointer">
              <input
                type="checkbox"
                checked={el.isCorrect}
                onChange={() => handleCheckboxChange(index)}
                className="checkbox checkbox-xs checkbox-primary no-animation"
              />
              <span className="checkmark"></span>
            </label>
            {editingIndex === index ? (
              <input
                type="text"
                className="py-0 focus-border-bottom flex-grow"
                value={el.answerTitle}
                onChange={(e) => handleAnswerChange(e, index)}
                onBlur={() => handleAnswerBlur(index)}
                autoFocus
              />
            ) : (
              <p
                onClick={() => handleAnswerClick(index)}
                className="py-0 border-b-4 border-transparent flex-grow"
              >
                {el.answerTitle}
              </p>
            )}
          </div>
        </li>
      ))}

      {canAddAnswer && (
        <li>
          <input
            type="text"
            placeholder={
              questionType !== "Текст" ? `Вариант ${answers.length + 1}` : "Введите ответ"
            }
            className="focus-border-bottom ease-transition"
            value={answer}
            onKeyDown={handleKeyDown}
            onChange={(e) => setAnswer(e.target.value)}
          />
        </li>
      )}
    </ul>
  );
};

export default FormAnswers;
