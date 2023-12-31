import { useState } from "react";
import Form from "../components/Form";
import { NewQuiz } from "../interfaces/interfaces";
// import Table from "../components/Table";

const Main = () => {
  // const [showForm, setShowForm] = useState(false);
  const [data, setData] = useState<NewQuiz | undefined>();

  return (
    <div className="flex flex-col gap-8 px-2 sm:px-6 pt-12">
      {/* <button className="btn-main mt-4 mr-4" onClick={() => setShowForm((prev) => !prev)}>
        Создать
      </button> */}
      {/* {showForm && <Form data={data} setData={setData} />} */}
      <Form data={data} setData={setData} />
      {/* <Table data={data} /> */}
    </div>
  );
};

export default Main;
