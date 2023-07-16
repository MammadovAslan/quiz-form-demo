import { handleKeyDown } from "../utils/formUtils";
import FormAnswers from "./FormAnswers";

interface OptionsProps {
  selectedOption: string;
  setSelectedOption: React.Dispatch<React.SetStateAction<string>>;
}

const FormAnswerOptions: React.FC<OptionsProps> = ({ selectedOption, setSelectedOption }) => {
  const handleOptionSelect = (option: string) => {
    setSelectedOption(option);
  };

  return (
    <div className="focus-border-left ease-transition flex-column">
      <div className="form-settings">
        <input
          type="text"
          placeholder="Вопрос"
          className="input custom-input"
          onKeyDown={handleKeyDown}
        />
        <div className="dropdown dropdown-left dropdown-start">
          <label tabIndex={0} className="btn m-1 capitalize">
            {selectedOption}
          </label>
          <ul
            tabIndex={0}
            className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52"
          >
            <li>
              <a
                className={selectedOption === "Один ответ" ? "selected-option" : ""}
                onClick={() => handleOptionSelect("Один ответ")}
              >
                Один ответ
              </a>
            </li>
            <li>
              <a
                className={selectedOption === "Несколько ответов" ? "selected-option" : ""}
                onClick={() => handleOptionSelect("Несколько ответов")}
              >
                Несколько ответов
              </a>
            </li>
            <li>
              <a
                className={selectedOption === "Текст" ? "selected-option" : ""}
                onClick={() => handleOptionSelect("Текст")}
              >
                Текст
              </a>
            </li>
          </ul>
        </div>
      </div>

      <FormAnswers />
    </div>
  );
};

export default FormAnswerOptions;
