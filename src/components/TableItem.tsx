interface TableItemProps {
  title: string;
  id: number;
  answers: string[];
}

const TableItem: React.FC<TableItemProps> = ({ answers, id, title }) => {
  return (
    <>
      <div className="table-item">{id}</div>
      <div className="table-item">{title}</div>
      <div className="table-item">
        {answers.length === 0 ? "Ответ текстом" : answers.join(", ")}
      </div>
    </>
  );
};

export default TableItem;
