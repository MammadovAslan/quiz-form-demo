import { Answer } from "../interfaces/interfaces";

interface TableItemProps {
  title: string;
  id: number;
  answers: Answer[];
}

const TableItem: React.FC<TableItemProps> = ({ answers, id, title }) => {
  return (
    <>
      <div className="table-item">{id}</div>
      <div className="table-item">{title}</div>
      <div className="table-item">
        {answers.length === 0
          ? "Ответ текстом"
          : answers.map((el) => (
              <span className={`${el.isCorrect ? "text-green-500" : ""}`} key={`${id}-${el.text}`}>
                {el.text},{" "}
              </span>
            ))}
      </div>
    </>
  );
};

export default TableItem;
