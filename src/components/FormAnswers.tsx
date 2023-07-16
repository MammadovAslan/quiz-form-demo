import { useState } from "react";

const FormAnswers = () => {
  const [answersCount, setAnswersCount] = useState(1);

  return (
    <div>
      <input type="text" placeholder={`Вариант ${answersCount}`} className="input h-8" />
    </div>
  );
};

export default FormAnswers;
