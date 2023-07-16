import { Route, Routes } from "react-router-dom";
import Main from "./pages/Main";
import Layout from "./layout/Layout";

const App = () => {
  return (
    <div>
      <Routes>
        <Route element={<Layout />}>
          <Route element={<Main />} path="/" />
        </Route>
      </Routes>
    </div>
  );
};

export default App;
