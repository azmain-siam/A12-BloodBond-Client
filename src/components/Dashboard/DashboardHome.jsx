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
      {role === "admin" ? <AdminDashboardHome /> : <DonorHome />}

      {role === "volunteer" && (
        <div className="card w-full bg-base-100 shadow-xl">
          <div className="card-body">
            <h2 className="card-title">Welcome, {user?.displayName}!</h2>
            <p>
              We are glad to see you back. Here you can manage your blood
              donation requests, track your donation history, and get the latest
              updates on blood donation campaigns!
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default DashboardHome;
