import { Outlet } from "react-router-dom";
import DashboardNav from "../components/Dashboard/DashboardNav";

const Dashboard = () => {
  return (
    <div className="font-poppins">
      <div>
        <DashboardNav />
        {/* Outlet */}
        <div className="p-4 sm:ml-64">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
