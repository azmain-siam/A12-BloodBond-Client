import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const MainLayout = () => {
  return (
    <div className="font-poppins">
      <Navbar />
      <div className="min-h-[calc(100vh-334px)] w-[93%] md:w-[95%] max-w-7xl mx-auto mt-[30px]">
        <Outlet />
      </div>
      <Footer />
    </div>
  );
};

export default MainLayout;
