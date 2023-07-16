import React from "react";
import { useState } from "react";
import Form from "../components/Form";
const Main = () => {
  const [showForm, setShowForm] = useState(false);

  return (
    <div className="flex flex-col gap-8 px-2 sm:px-6">
      <button className="btn-main mt-4 mr-4" onClick={() => setShowForm((prev) => !prev)}>
        Создать
      </button>
      {/* {showForm && <Form />} */}
      <Form />
    </div>
  );
};

export default Main;
