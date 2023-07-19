import { AnswerText } from "../interfaces/interfaces";
import { v4 as uuidv4 } from "uuid";
import React, { useState, useEffect } from "react";

interface ImageAnswersProps {
  answers: AnswerText[];
  setAnswers: React.Dispatch<React.SetStateAction<AnswerText[]>>;
  answer: string;
  setAnswer: React.Dispatch<React.SetStateAction<string>>;
  questionType: string;
}

const ImageAnswers: React.FC<ImageAnswersProps> = ({
  answer,
  answers,
  questionType,
  setAnswer,
  setAnswers,
}) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;

    const files = e.target.files;

    setAnswers((prev) => [
      ...prev,
      {
        answerTitle: URL.createObjectURL(files[0]),
        isCorrect: false,
      },
    ]);
  };

  const handleCheckboxChange = (index: number) => {
    setAnswers((prevAnswers) => {
      const updatedAnswers = [...prevAnswers];
      const currentAnswer = updatedAnswers[index];

      if (questionType === "Изображения(одно)") {
        updatedAnswers.forEach((answer) => {
          answer.isCorrect = false;
        });
      }

      currentAnswer.isCorrect = !currentAnswer.isCorrect;

      return updatedAnswers;
    });
  };

  useEffect(() => {
    // Reset all checkboxes when the questionType changes
    setAnswers((prev) => prev.map((answer) => ({ ...answer, isCorrect: false })));
  }, [questionType, answers.length, setAnswers]);

  return (
    <div className="sm:w-[32rem]">
      <p className="required">
        <input
          type="file"
          onChange={handleChange}
          className="file file-input-bordered w-36 border rounded-lg"
        />
      </p>

      <div className="grid sm:grid-cols-2 gap-2 sm:gap-12 mt-6 ml-4">
        {answers.map((answer, index) => (
          <div
            className={`border-2 rounded-sm relative cursor-pointer ${
              answer.isCorrect ? "image-correct" : ""
            }`}
            key={uuidv4()}
            onClick={() => handleCheckboxChange(index)}
          >
            <img key={index} src={answer.answerTitle} alt={`Answer ${index + 1}`} />

            <input
              type="checkbox"
              className="checkbox checkbox-xs checkbox-primary no-animation absolute top-2 left-2 bg-white"
              checked={answer.isCorrect}
              onChange={() => handleCheckboxChange(index)}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ImageAnswers;
