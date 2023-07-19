import React, { useState } from "react";
import { Question } from "../interfaces/interfaces";
import { v4 as uuidv4 } from "uuid";
import { FiEdit, FiDelete } from "react-icons/fi";
import FormAnswers from "./FormAnswers";

interface QuizQuestionProps extends Question {
  questions: Question[];
  setQuestions: React.Dispatch<React.SetStateAction<Question[]>>;
}

const QuizQuestion: React.FC<QuizQuestionProps> = ({
  id,
  answers,
  questionTitle,
  questionType,
  questions,
  setQuestions,
}) => {
  const [isModifiable, setIsModifiable] = useState(false);
  const [modifiedQuestionTitle, setModifiedQuestionTitle] = useState(questionTitle);
  const [modifiedQuestionType, setModifiedQuestionType] = useState(questionType);
  const [modifiedAnswers, setModifiedAnswers] = useState(answers);
  const [newAnswer, setNewAnswer] = useState("");

  const clickHandler = () => {
    setIsModifiable((prev) => !prev);

    if (!isModifiable) {
      setModifiedQuestionTitle(questionTitle);
      setModifiedQuestionType(questionType);
      setModifiedAnswers(answers);
    } else {
      const updatedQuestions = questions.map((q) => {
        if (q.id === id) {
          return {
            ...q,
            questionTitle: modifiedQuestionTitle,
            questionType: modifiedQuestionType,
            answers: modifiedAnswers,
          };
        }
        return q;
      });

      setQuestions(updatedQuestions);
    }
  };

  const handleOptionSelect = (option: string) => {
    setModifiedQuestionType(option);
  };

  const renderDropdownOptions = () => {
    const options = [
      "Один ответ",
      "Несколько ответов",
      "Текст",
      "Изображения(одно)",
      "Изображения(несколько)",
    ];

    return options.map((option) => (
      <li key={option}>
        <a
          className={modifiedQuestionType === option ? "selected-option" : ""}
          onClick={() => handleOptionSelect(option)}
        >
          {option}
        </a>
      </li>
    ));
  };

  const deleteAnswer = () => {
    const arr = [...questions].filter((q) => q.id !== id);

    setQuestions(arr);
  };

  const isImageQuestion =
    questionType === "Изображения(одно)" || questionType === "Изображения(несколько)";

  if (isModifiable) {
    return (
      <div className="question relative group">
        <div className="flex flex-col sm:flex-row gap-2 justify-between mb-2">
          <input
            type="text"
            value={modifiedQuestionTitle}
            onChange={(e) => setModifiedQuestionTitle(e.target.value)}
            className="font-bold focus-border-bottom"
          />
          <div className="dropdown sm:dropdown-left">
            <label tabIndex={0} className="btn m-1 capitalize border-2 border-gray-300">
              {modifiedQuestionType}
            </label>
            <ul
              tabIndex={0}
              className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52"
            >
              {renderDropdownOptions()}
            </ul>
          </div>
        </div>
        <FormAnswers
          answers={modifiedAnswers}
          setAnswers={setModifiedAnswers}
          answer={newAnswer}
          setAnswer={setNewAnswer}
          questionType={modifiedQuestionType}
        />

        <div className="flex buttons-container">
          <button onClick={clickHandler} className="edit-button">
            Save
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="question  group relative sm:w-[36rem]">
      <div className="flex flex-col sm:flex-row gap-2 justify-between mb-2">
        <h3 className="font-bold">{questionTitle}</h3>
        <div className="p-2 border border-1-grey self-start rounded-lg">{questionType}</div>
      </div>
      <ul className={`${isImageQuestion ? "image-grid" : ""} mb-8`}>
        {answers.map((answer) => (
          <li
            key={uuidv4()}
            className={`${answer.isCorrect && !isImageQuestion ? "correct-answer" : ""}  answer`}
          >
            {isImageQuestion ? (
              <img
                src={answer.answerTitle}
                className={`border-2 ${answer.isCorrect ? "image-correct" : ""}`}
              />
            ) : (
              answer.answerTitle
            )}
          </li>
        ))}
      </ul>

      <div className="buttons-container">
        <button onClick={deleteAnswer} className="delete-button" title="Удалить">
          <FiDelete />
        </button>
        <button onClick={clickHandler} className="edit-button" title="Изменить">
          <FiEdit />
        </button>
        <br />
      </div>
    </div>
  );
};

export default QuizQuestion;
