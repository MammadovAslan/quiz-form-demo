import { useState } from "react";
import FormAnswerOptions from "./FormAnswerOptions";
import { handleKeyDown } from "../utils/formUtils";

// interface FormProps {
// }

const Form: React.FC<any> = () => {
  const [selectedOption, setSelectedOption] = useState<string>("Один ответ");
  const [description, setDescription] = useState("");

  const submitHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("run");
  };

  return (
    <form className="form" onSubmit={submitHandler}>
      <div className="form-header focus-border-left ease-transition">
        <h2 className="title mb-4">Создать Квиз</h2>
        <input
          type="text"
          placeholder="Описание"
          className="input custom-input"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          onKeyDown={handleKeyDown}
        />
      </div>

      <FormAnswerOptions selectedOption={selectedOption} setSelectedOption={setSelectedOption} />

      <button className="btn-main">Добавить Квиз</button>
    </form>
  );
};

export default Form;
