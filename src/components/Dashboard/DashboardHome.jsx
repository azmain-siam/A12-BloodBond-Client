import useAuth from "../../hooks/useAuth";
import { useQuery } from "@tanstack/react-query";
import useAxiosCommon from "../../hooks/useAxiosCommon";

const DashboardHome = () => {
  const { user } = useAuth();
  const axiosCommon = useAxiosCommon();

  const { data, isLoading } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const { data } = await axiosCommon.get("/users");
      return data;
    },
  });
  console.log(data);

  // const admin = data.find((d) => d.role === "admin");
  // console.log("admin", admin);

  if (isLoading || !user) {
    return;
  }
  console.log(user);

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
