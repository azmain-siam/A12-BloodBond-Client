import useAxiosSecure from "../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import LoadingBars from "../LoadingBars";
import useAuth from "../../hooks/useAuth";
import { useState } from "react";

const Users = () => {
  const axiosSecure = useAxiosSecure();
  const { loading } = useAuth();

  const [status, setStatus] = useState("");

  const { data: users = [], isLoading } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const res = await axiosSecure.get("/users");
      return res.data;
    },
  });

  const handleStatus = (status) => {
    console.log(status);
  };

  if (loading || isLoading) {
    return (
      <div className="h-[80vh]">
        <LoadingBars />
      </div>
    );
  }

  return (
    <div>
      <h2 className="mb-6 mt-1 pl-2 text-2xl font-extrabold leading-none tracking-tight text-gray-900 md:text-3xl ">
        All Users
      </h2>

      <div className="relative overflow-auto h-screen ">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500">
          <thead className="text-xs text-gray-700 uppercase bg-gray-100">
            <tr>
              <th scope="col" className="px-6 py-3 rounded-s-lg">
                Image
              </th>
              <th scope="col" className="px-6 py-3">
                Name
              </th>
              <th scope="col" className="px-6 py-3 rounded-e-lg">
                Email
              </th>
              <th scope="col" className="px-6 py-3 rounded-e-lg">
                Role
              </th>
              <th scope="col" className="px-6 py-3 rounded-e-lg">
                Status
              </th>
              <th scope="col" className="px-6 py-3 rounded-e-lg">
                Manage Status
              </th>
              <th scope="col" className="px-6 py-3 text-center rounded-e-lg">
                Manage Role
              </th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user._id} className="bg-white">
                <th className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                  <img
                    className="size-10 rounded-lg object-cover"
                    src={user.image}
                    alt=""
                  />
                </th>
                <th className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                  {user.name}
                </th>
                <th className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                  {user.email}
                </th>
                <th className="px-6 py-4 capitalize font-medium text-gray-900 whitespace-nowrap">
                  {user.role}
                </th>
                <th className="px-6 py-4 capitalize font-medium text-gray-900 whitespace-nowrap">
                  {user.status}
                </th>
                <th className="px-6 py-4 font-medium text-center text-gray-900 whitespace-nowrap">
                  <button
                    onClick={() => handleStatus(user.status)}
                    className="btn btn-neutral capitalize btn-sm btn-error text-white"
                  >
                    {user.status === "active" ? "block" : "active"}
                  </button>
                </th>
                <th className="px-6 py-4 font-medium text-center text-gray-900 whitespace-nowrap space-x-2">
                  <div className="dropdown dropdown-end">
                    <div
                      tabIndex={0}
                      role="button"
                      className="btn btn-sm btn-success text-white m-1"
                    >
                      Change Role
                    </div>
                    <ul
                      tabIndex={0}
                      className="dropdown-content z-[1] menu p-2 shadow bg-base-100 border rounded-box w-32"
                    >
                      <li>
                        <a>Admin</a>
                      </li>
                      <li>
                        <a>Donor</a>
                      </li>
                      <li>
                        <a>Volunteer</a>
                      </li>
                    </ul>
                  </div>
                </th>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Users;
