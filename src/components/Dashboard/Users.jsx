import useAxiosSecure from "../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import LoadingBars from "../LoadingBars";
import useAuth from "../../hooks/useAuth";

const Users = () => {
  const axiosSecure = useAxiosSecure();
  const { loading } = useAuth();

  const { data: users = [], isLoading } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const res = await axiosSecure.get("/users");
      return res.data;
    },
  });
  if (loading || isLoading) {
    return (
      <div className="h-[80vh]">
        <LoadingBars />
      </div>
    );
  }
  console.log(users);

  return (
    <div>
      <h3 className="text-xl">Users Page</h3>
    </div>
  );
};

export default Users;
