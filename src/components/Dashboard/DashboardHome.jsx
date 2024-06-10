import useAuth from "../../hooks/useAuth";
import useRole from "../../hooks/useRole";
import LoadingBars from "../LoadingBars";
import AdminDashboardHome from "./AdminDashboardHome";
import DonorHome from "./DonorHome";

const DashboardHome = () => {
  const { user, loading } = useAuth();

  const [role, isLoading] = useRole();

  if (isLoading || loading) {
    return (
      <div className="h-[80vh]">
        <LoadingBars />
      </div>
    );
  }

  if (!user) {
    return;
  }

  return (
    <div>
      {role === "admin" && <AdminDashboardHome />}

      {role === "donor" && <DonorHome />}

      {role === "volunteer" && <AdminDashboardHome />}
    </div>
  );
};

export default DashboardHome;
