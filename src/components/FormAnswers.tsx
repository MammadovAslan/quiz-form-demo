/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { AnswerText } from "../interfaces/interfaces";
import ImageAnswers from "./ImageAnswers";
import usePrevious from "../hooks/usePrevious";

interface AnswersProps {
  answers: AnswerText[];
  setAnswers: React.Dispatch<React.SetStateAction<AnswerText[]>>;
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
  const prevQuestionType = usePrevious(questionType);

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
        const arr = [...answers].slice(0, 1);

        // for (let i = 0; i < arr.length - 1; i++) {
        //   arr.pop();
        // }
        arr[0].isCorrect = true;
        setAnswers(arr);
      }
    }
  }, [questionType, setAnswers, setAnswer]);

  useEffect(() => {
    const textOptions = ["Один ответ", "Несколько ответов", "Текст"];
    const imageOptions = ["Изображения(одно)", "Изображения(несколько)"];

    if (prevQuestionType) {
      if (
        (textOptions.includes(questionType) && imageOptions.includes(prevQuestionType)) ||
        (imageOptions.includes(questionType) && textOptions.includes(prevQuestionType))
      ) {
        setAnswers([]);
      }
    }
  }, [questionType]);

  const canAddAnswer = questionType !== "Текст" || answers.length === 0;

  if (questionType === "Изображения(одно)" || questionType === "Изображения(несколько)")
    return (
      <ImageAnswers
        answer={answer}
        answers={answers}
        questionType={questionType}
        setAnswer={setAnswer}
        setAnswers={setAnswers}
      />
    );

  return (
    <ul className="mx-4 flex-column gap-4 ">
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
