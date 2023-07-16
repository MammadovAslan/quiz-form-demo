import { useEffect, useState } from "react";

interface AnswersProps {
  answers: string[];
  setAnswers: React.Dispatch<React.SetStateAction<string[]>>;
  answer: string;
  setAnswer: React.Dispatch<React.SetStateAction<string>>;
  answerType: string;
}

const FormAnswers: React.FC<AnswersProps> = ({
  answers,
  setAnswers,
  answer,
  setAnswer,
  answerType,
}) => {
  const [answersCount, setAnswersCount] = useState(0);
  const [editingIndex, setEditingIndex] = useState<number | null>(null);

  useEffect(() => {
    setAnswersCount(answers.length);
  }, [answers]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>): void => {
    if (e.key === "Enter") {
      e.preventDefault();
      if (answer.trim() !== "") {
        setAnswers((prevAnswers) => [...prevAnswers, answer]);
        answerType !== "Текст" && setAnswer("");
        setAnswersCount((prevCount) => prevCount + 1);
      }
    }
  };

  if (answerType === "Текст") return <p className="h-8 m-0">Текстовый ответ</p>;

  const handleAnswerClick = (index: number): void => {
    setEditingIndex(index);
  };

  const handleAnswerChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setAnswers((prevAnswers) => {
      const updatedAnswers = [...prevAnswers];
      updatedAnswers[editingIndex!] = e.target.value;
      return updatedAnswers;
    });
  };

  const handleAnswerKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, _index: number): void => {
    if (e.key === "Enter") {
      e.preventDefault();
      setEditingIndex(null);
    }
  };

  return (
    <ul className="list-disc mx-4 flex-column gap-4">
      <li>
        <input
          type="text"
          placeholder={`Вариант ${answersCount + 1}`}
          className=" focus-border-bottom "
          value={answer}
          onKeyDown={handleKeyDown}
          onChange={(e) => setAnswer(e.target.value)}
        />
      </li>
      {answers.length !== 0 &&
        answers.map((el, index) => (
          <li key={`${el}id`} className="h-8">
            {editingIndex === index ? (
              <input
                type="text"
                className="py-0  focus-border-bottom "
                value={el}
                onChange={handleAnswerChange}
                onKeyDown={(e) => handleAnswerKeyDown(e, index)}
                onBlur={() => setEditingIndex(null)}
                autoFocus
              />
            ) : (
              <p
                onClick={() => handleAnswerClick(index)}
                className=" py-0 border-b-4 border-transparent "
              >
                {el}
              </p>
            )}
          </li>
        ))}
    </ul>
  );
};

export default FormAnswers;
