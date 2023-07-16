import { Outlet } from "react-router-dom";
import ThemeSwitcher from "../components/ThemeSwitcher";
const Layout = () => {
  return (
    <>
      <ThemeSwitcher />
      <Outlet />
    </>
  );
};

export default Layout;
