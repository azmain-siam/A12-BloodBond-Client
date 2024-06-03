import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";

const MainLayout = () => {
  return (
    <div className="font-poppins">
      <Navbar />
      <Outlet />
    </div>
  );
};

export default MainLayout;
