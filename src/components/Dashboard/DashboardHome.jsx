import useAuth from "../../hooks/useAuth";
import useRole from "../../hooks/useRole";

const DashboardHome = () => {
  const { user } = useAuth();

  const [role] = useRole();
  console.log(role);

  if (!user) {
    return;
  }

  return (
    <div>
      <div className="card w-full bg-base-100 shadow-xl">
        <div className="card-body">
          <h2 className="card-title">Welcome, {user.displayName}!</h2>
          <p>
            We are glad to see you back. Here you can manage your blood donation
            requests, track your donation history, and get the latest updates on
            blood donation campaigns!
          </p>
        </div>
      </div>
    </div>
  );
};

export default DashboardHome;
