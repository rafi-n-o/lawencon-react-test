import { Outlet } from "react-router-dom";
import Nav from "../../components/molecules/molecules/Nav";

const MainApp = () => {
  return (
    <>
      <Nav />
      <Outlet />
    </>
  );
};

export default MainApp;
