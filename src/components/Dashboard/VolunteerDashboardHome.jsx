import { useQuery } from "@tanstack/react-query";
import useAuth from "../../hooks/useAuth";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import LoadingBars from "../LoadingBars";

const VolunteerDashboardHome = () => {
  const { user, loading } = useAuth();

  const axiosSecure = useAxiosSecure();
  const { data: allData, isLoading: allDataLoading } = useQuery({
    queryKey: ["request"],
    queryFn: async () => {
      const { data } = await axiosSecure.get(`/requests`);
      return data;
    },
  });

  const { data: users = [], isLoading: usersLoading } = useQuery({
    queryKey: ["user"],
    queryFn: async () => {
      const res = await axiosSecure.get("/users");
      return res.data;
    },
  });

  const donors = users.filter((donor) => donor.role === "donor");

  if (loading || allDataLoading || usersLoading) {
    return <LoadingBars />;
  }

  return (
    <div>
      <div className="card w-full bg-base-100 shadow-xl">
        <div className="card-body">
          <h2 className="card-title">
            Welcome, {user?.displayName}! {users?.length}
          </h2>
          <p>
            We are glad to see you back. Here you can manage your blood donation
            requests, track your donation history, and get the latest updates on
            blood donation campaigns!
          </p>
        </div>
      </div>

      {/* Cards */}
      <div className="mt-10 grid md:grid-cols-2 gap-5">
        {/* Users Card */}
        <div className="flex items-center bg-white border rounded-lg overflow-hidden shadow">
          <div className="p-4 bg-green-400">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-12 w-12 text-white"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
              ></path>
            </svg>
          </div>
          <div className="px-4 text-gray-700">
            <h3 className="text-lg tracking-wider">Total Donors</h3>
            <p className="text-3xl">{donors.length}</p>
          </div>
        </div>

        {/* Total Requests Card */}
        <div className="flex items-center bg-white border rounded-lg overflow-hidden shadow">
          <div className="p-4 bg-blue-400">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-12 w-12 text-white"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M8 7v8a2 2 0 002 2h6M8 7V5a2 2 0 012-2h4.586a1 1 0 01.707.293l4.414 4.414a1 1 0 01.293.707V15a2 2 0 01-2 2h-2M8 7H6a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2v-2"
              ></path>
            </svg>
          </div>
          <div className="px-4 text-gray-700">
            <h3 className="text-lg tracking-wider">Total Requests</h3>
            <p className="text-3xl">{allData.length}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VolunteerDashboardHome;
