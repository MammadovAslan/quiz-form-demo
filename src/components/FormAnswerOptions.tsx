import { preventSubmit } from "../utils/formUtils";
import FormAnswers from "./FormAnswers";
import { AnswerText } from "../interfaces/interfaces";

interface OptionsProps {
  questionType: string;
  answers: AnswerText[];
  answer: string;
  setAnswer: React.Dispatch<React.SetStateAction<string>>;
  setQuestionType: React.Dispatch<React.SetStateAction<string>>;
  setAnswers: React.Dispatch<React.SetStateAction<AnswerText[]>>;
  question: string;
  setQuestion: React.Dispatch<React.SetStateAction<string>>;
}

const FormAnswerOptions: React.FC<OptionsProps> = ({
  questionType,
  setQuestionType,
  answers,
  setAnswers,
  question,
  setQuestion,
  answer,
  setAnswer,
}) => {
  const handleOptionSelect = (option: string) => {
    setQuestionType(option);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuestion(e.target.value);
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
          className={questionType === option ? "selected-option" : ""}
          onClick={() => handleOptionSelect(option)}
        >
          {option}
        </a>
      </li>
    ));
  };

  return (
    <div className="quiz focus-border-left ease-transition flex-column bg-white">
      <div className="form-settings">
        <p className="required">
          <input
            type="text"
            placeholder="Вопрос"
            className="focus-border-bottom ease-transition required"
            onKeyDown={preventSubmit}
            value={question}
            onChange={handleChange}
            required
          />
        </p>
        <div className="dropdown sm:dropdown-left ">
          <label tabIndex={0} className="btn m-1 capitalize border-2 border-gray-300">
            {questionType}
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
        answers={answers}
        setAnswers={setAnswers}
        answer={answer}
        setAnswer={setAnswer}
        questionType={questionType}
      />
    </div>
  );
};

export default FormAnswerOptions;
