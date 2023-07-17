import { Quiz } from "../interfaces/interfaces";
import TableItem from "./TableItem";

interface TableProps {
  data: Quiz[];
}

const Table: React.FC<TableProps> = ({ data }) => {
  return (
    <div className="table bg-white p-4 border-2">
      <div className="table-header">ID</div>
      <div className="table-header">Вопрос</div>
      <div className="table-header">Ответы</div>

      {data?.length > 0 &&
        data.map((quiz: Quiz) => (
          <TableItem answers={quiz.answers } id={quiz.id} title={quiz.title} key={quiz.id} />
        ))}
    </div>
  );
};

export default Table;
