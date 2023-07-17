import { useState, useRef, useEffect } from "react";
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
  const [quizeTitle, setQuizeTitle] = useState("");
  const [modifiable, setModifiable] = useState(false);

  const titleRef = useRef<HTMLInputElement>(null);

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

  const clickHandler = () => {
    setModifiable(true);
  };

  useEffect(() => {
    if (modifiable && titleRef.current) {
      titleRef.current.focus();
    }
  }, [modifiable]);

  return (
    <div className="self-center flex flex-col">
      <form className="form " onSubmit={submitHandler}>
        <div className="form-header focus-border-left ease-transition bg-white">
          {modifiable ? (
            <input
              type="text"
              className="focus-border-bottom w-full mb-4 leading-7 h-[28px] title"
              value={quizeTitle}
              ref={titleRef}
              placeholder="Название квиза"
              onChange={(e) => setQuizeTitle(e.target.value)}
              onBlur={() => setModifiable(false)}
            />
          ) : (
            <h2 className="title mb-4 h-[28px]" onClick={clickHandler}>
              {quizeTitle || "Название квиза"}
            </h2>
          )}
          <input
            type="text"
            placeholder="Описание"
            className="focus-border-bottom ease-transition"
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
        <button className="btn-main self-end">+</button>
      </form>
    </div>
  );
};

export default Form;
