import { useState } from "react";
import { preventSubmit } from "../utils/formUtils";
import FormAnswers from "./FormAnswers";
import { Answer } from "../interfaces/interfaces";

interface OptionsProps {
  answerType: string;
  answers: Answer[];
  setAnswersType: React.Dispatch<React.SetStateAction<string>>;
  setAnswers: React.Dispatch<React.SetStateAction<Answer[]>>;
  question: string;
  setQuestion: React.Dispatch<React.SetStateAction<string>>;
}

const FormAnswerOptions: React.FC<OptionsProps> = ({
  answerType,
  setAnswersType,
  answers,
  setAnswers,
  question,
  setQuestion,
}) => {
  const [answer, setAnswer] = useState("");

  const handleOptionSelect = (option: string) => {
    setAnswersType(option);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // const newString = e.target.value[0].toUpperCase() + e.target.value.slice(1);
    setQuestion(e.target.value);
  };

  return (
    <div className="focus-border-left ease-transition flex-column bg-white">
      <div className="form-settings">
        <input
          type="text"
          placeholder="Вопрос"
          className="focus-border-bottom ease-transition"
          onKeyDown={preventSubmit}
          value={question}
          onChange={handleChange}
        />
        <div className="dropdown sm:dropdown-left ">
          <label tabIndex={0} className="btn m-1 capitalize border-2 border-gray-300">
            {answerType}
          </label>
          <ul
            tabIndex={0}
            className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52"
          >
            <li>
              <a
                className={answerType === "Один ответ" ? "selected-option" : ""}
                onClick={() => handleOptionSelect("Один ответ")}
              >
                Один ответ
              </a>
            </li>
            <li>
              <a
                className={answerType === "Несколько ответов" ? "selected-option" : ""}
                onClick={() => handleOptionSelect("Несколько ответов")}
              >
                Несколько ответов
              </a>
            </li>
            <li>
              <a
                className={answerType === "Текст" ? "selected-option" : ""}
                onClick={() => handleOptionSelect("Текст")}
              >
                Текст
              </a>
            </li>
          </ul>
        </div>
      </div>

      <FormAnswers
        answers={answers}
        setAnswers={setAnswers}
        answer={answer}
        setAnswer={setAnswer}
        answerType={answerType}
      />
    </div>
  );
};

export default FormAnswerOptions;
