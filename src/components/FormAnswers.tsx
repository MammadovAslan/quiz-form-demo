import { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";

interface AnswersProps {
  answers: { text: string; isCorrect: boolean }[];
  setAnswers: React.Dispatch<React.SetStateAction<{ text: string; isCorrect: boolean }[]>>;
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
        setAnswers((prevAnswers) => [...prevAnswers, { text: answer, isCorrect: false }]);
        answerType !== "Текст" && setAnswer("");
        setAnswersCount((prevCount) => prevCount + 1);
      }
    }
  };

  useEffect(() => {
    // Reset all checkboxes when answerType changes
    setAnswers((prevAnswers) => {
      return prevAnswers.map((answer) => {
        return {
          ...answer,
          isCorrect: false,
        };
      });
    });

    if (answerType === "Текст") setAnswers([]);
  }, [answerType]);

  if (answerType === "Текст") return <p className="h-8 m-0">Текстовый ответ</p>;

  const handleAnswerClick = (index: number): void => {
    setEditingIndex(index);
  };

  const handleAnswerChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setAnswers((prevAnswers) => {
      const updatedAnswers = [...prevAnswers];
      updatedAnswers[editingIndex!].text = e.target.value;
      return updatedAnswers;
    });
  };

  const handleAnswerBlur = (): void => {
    if (editingIndex !== null && answers[editingIndex].text.trim() === "") {
      setAnswers((prevAnswers) => prevAnswers.filter((_, index) => index !== editingIndex));
      setEditingIndex(null);
    }
  };

  const handleAnswerKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, _index: number): void => {
    if (e.key === "Enter") {
      e.preventDefault();
      setEditingIndex(null);
    }
  };

  const handleCheckboxChange = (index: number): void => {
    setAnswers((prevAnswers) => {
      const updatedAnswers = [...prevAnswers];
      const currentAnswer = updatedAnswers[index];

      if (answerType === "Один ответ") {
        updatedAnswers.forEach((answer) => {
          answer.isCorrect = false;
        });
        currentAnswer.isCorrect = !currentAnswer.isCorrect;
      } else {
        currentAnswer.isCorrect = !currentAnswer.isCorrect;
      }

      return updatedAnswers;
    });
  };

  return (
    <ul className="mx-4 flex-column gap-4">
      <li>
        <input
          type="text"
          placeholder={`Вариант ${answersCount + 1}`}
          className="focus-border-bottom ease-transition"
          value={answer}
          onKeyDown={handleKeyDown}
          onChange={(e) => setAnswer(e.target.value)}
        />
      </li>
      {answers.length !== 0 &&
        answers.map((el, index) => (
          <li key={uuidv4()} className="h-8 flex items-center">
            <div className="flex items-center gap-2">
              <label className="checkbox-container cursor-pointer">
                <input
                  type="checkbox"
                  checked={el.isCorrect}
                  onChange={() => handleCheckboxChange(index)}
                  className="checkbox checkbox-xs checkbox-primary"
                />
                <span className="checkmark"></span>
              </label>
              {editingIndex === index ? (
                <input
                  type="text"
                  className="py-0 focus-border-bottom flex-grow"
                  value={el.text}
                  onChange={handleAnswerChange}
                  onBlur={handleAnswerBlur}
                  onKeyDown={(e) => handleAnswerKeyDown(e, index)}
                  autoFocus
                />
              ) : (
                <p
                  onClick={() => handleAnswerClick(index)}
                  className="py-0 border-b-4 border-transparent flex-grow"
                >
                  {el.text}
                </p>
              )}
            </div>
          </li>
        ))}
    </ul>
  );
};

export default FormAnswers;
