import { useState, useRef, useEffect } from "react";
import FormAnswerOptions from "./FormAnswerOptions";
import { preventSubmit } from "../utils/formUtils";
import { NewQuiz, Answer, Question } from "../interfaces/interfaces";
import { v4 as uuidv4 } from "uuid";
import QuizQuestion from "./QuizQuestion";

interface FormProps {
  data: NewQuiz | undefined;
  setData: React.Dispatch<React.SetStateAction<NewQuiz | undefined>>;
}

const Form: React.FC<FormProps> = ({ data, setData }) => {
  const [questionType, setQuestionType] = useState<string>("Один ответ");
  const [description, setDescription] = useState("");
  const [answers, setAnswers] = useState<Answer[]>([]);
  const [question, setQuestion] = useState("");
  const [quizTitle, setQuizTitle] = useState("");
  const [modifiable, setModifiable] = useState(false);
  const [questions, setQuestions] = useState<Question[]>([]);
  const [answer, setAnswer] = useState("");

  const titleRef = useRef<HTMLInputElement>(null);

  // adding quiz, here will be POST request to server
  const submitHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  const clickHandler = () => {
    setModifiable(true);
  };

  const addQuiz = () => {
    if (
      question.length !== 0 &&
      (questionType === "Текст" || answers.length >= 2) &&
      answers.some((answer) => answer.isCorrect)
    ) {
      const obj: Question = {
        answers,
        questionType,
        questionTitle: question,
      };

      setQuestions((prev) => [...prev, obj]);
      setQuestionType("Один ответ");
      setDescription("");
      setAnswers([]);
      setQuestion("");
    }
  };

  useEffect(() => {
    if (modifiable && titleRef.current) {
      titleRef.current.focus();
    }
  }, [modifiable]);

  useEffect(() => {
    const obj: NewQuiz = {
      description,
      questions,
      title: quizTitle,
    };

    questions.length > 0 && setData(obj);
  }, [questions]);

  useEffect(() => {
    console.log(data);
  }, [data]);

  return (
    <div className="self-center flex flex-col">
      <form className="form " onSubmit={submitHandler}>
        <div className="form-header focus-border-left ease-transition bg-white">
          {modifiable ? (
            <input
              type="text"
              className="focus-border-bottom w-full mb-4 leading-7 h-[28px] title"
              value={quizTitle}
              ref={titleRef}
              placeholder="Название квиза"
              onChange={(e) => setQuizTitle(e.target.value)}
              onBlur={() => setModifiable(false)}
            />
          ) : (
            <h2 className="title mb-4 h-[28px]" onClick={clickHandler}>
              {quizTitle || "Название квиза"}
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
          questionType={questionType}
          setQuestionType={setQuestionType}
          setAnswers={setAnswers}
          answers={answers}
          question={question}
          setQuestion={setQuestion}
          answer={answer}
          setAnswer={setAnswer}
        />
        <button className="btn-main self-end" onClick={addQuiz}>
          +
        </button>
      </form>

      {questions.length > 0 &&
        questions.map((el) => (
          <QuizQuestion
            key={uuidv4()}
            answers={el.answers}
            questionTitle={el.questionTitle}
            questionType={el.questionType}
          />
        ))}
    </div>
  );
};

export default Form;
