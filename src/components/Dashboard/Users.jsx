import useAxiosSecure from "../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";

const Users = () => {
  const axiosSecure = useAxiosSecure();

  const { data: users = [] } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const res = await axiosSecure.get("/users", {
        headers: {
          authorization: `${localStorage.getItem("token")}`,
        },
      });
      return res.data;
    },
  });

  console.log(users);

  return (
    <div>
      <h3 className="text-xl">Users Page</h3>
    </div>
  );
};

export default Users;
