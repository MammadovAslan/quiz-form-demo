import { useState } from "react";
import FormAnswerOptions from "./FormAnswerOptions";
import { preventSubmit } from "../utils/formUtils";
import { Quiz, Answer } from "../interfaces/interfaces";

interface FormProps {
  data: Quiz[];
  setData: React.Dispatch<React.SetStateAction<Quiz[]>>;
}

const Form: React.FC<FormProps> = ({ data, setData }) => {
  const [answersType, setAnswerType] = useState<string>("Один ответ");
  const [description, setDescription] = useState("");
  const [answers, setAnswers] = useState<Answer[]>([]);
  const [question, setQuestion] = useState("");

  //TODO validation

  // adding quiz, here will be POST request to server
  const submitHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (
      question.length !== 0 &&
      (answersType === "Текст" || answers.length >= 2) &&
      answers.some((answer) => answer.isCorrect)
    ) {
      const id = data.length > 0 ? data[data.length - 1].id + 1 : 1;

      const object: Quiz = {
        title: question,
        answers,
        answersType,
        description,
        id,
      };

      setData((prev) => [...prev, object]);
      setAnswerType("Один ответ");
      setDescription("");
      setAnswers([]);
      setQuestion("");
    }
  };

  return (
    <form className="form" onSubmit={submitHandler}>
      <div className="form-header focus-border-left ease-transition bg-white">
        <h2 className="title mb-4">Создать Квиз</h2>
        <input
          type="text"
          placeholder="Описание"
          className="input custom-input"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          onKeyDown={preventSubmit}
        />
      </div>

      <FormAnswerOptions
        answerType={answersType}
        setAnswersType={setAnswerType}
        setAnswers={setAnswers}
        answers={answers}
        question={question}
        setQuestion={setQuestion}
      />

      <button className="btn-main">Добавить Квиз</button>
    </form>
  );
};

export default Form;
