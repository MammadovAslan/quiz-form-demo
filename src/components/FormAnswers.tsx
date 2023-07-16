import { useState } from "react";

interface AnswersProps {
  answers: string[];
  setAnswers: React.Dispatch<React.SetStateAction<string[]>>;
}

const FormAnswers: React.FC<AnswersProps> = ({ answers, setAnswers }) => {
  const [answersCount, setAnswersCount] = useState(answers.length);
  const [answer, setAnswer] = useState("");
  const [editingIndex, setEditingIndex] = useState<number | null>(null);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>): void => {
    if (e.key === "Enter") {
      e.preventDefault();
      if (answer.trim() !== "") {
        setAnswers((prevAnswers) => [...prevAnswers, answer]);
        setAnswer("");
        setAnswersCount((prevCount) => prevCount + 1);
      }
    }
  };

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

  const handleAnswerKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, index: number): void => {
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
                className=" py-0  focus-border-bottom "
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
