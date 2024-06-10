import useAxiosSecure from "../../hooks/useAxiosSecure";
import { useMutation, useQuery } from "@tanstack/react-query";
import LoadingBars from "../LoadingBars";
import useAuth from "../../hooks/useAuth";
import { useState } from "react";
import toast from "react-hot-toast";
import Swal from "sweetalert2";

const Users = () => {
  const { user: loggedInUser } = useAuth();
  const axiosSecure = useAxiosSecure();
  const { loading } = useAuth();

  const [status, setStatus] = useState("");

  const {
    data: users = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const res = await axiosSecure.get("/users");
      return res.data;
    },
  });

  const [user, setUser] = useState("");

  const { mutateAsync } = useMutation({
    mutationFn: async (role) => {
      const { data } = await axiosSecure.patch(
        `/user/update/${user.email}`,
        role
      );
      return data;
    },
    onSuccess: () => {
      refetch();
      Swal.fire({
        title: "Success!",
        text: "Updated Successfully!",
        icon: "success",
      });
    },
  });

  const handleUpdateUser = async (user, role) => {
    setUser(user);
    const updatedRole = {
      role: role,
    };
    console.log(updatedRole);
    try {
      await mutateAsync(updatedRole);
    } catch (err) {
      console.log(err);
      toast.error(err.message);
    }
  };

  // const handleStatus = async (user, updateStatus) => {
  //   setUser(user);
  //   setStatus(!status);
  //   const updatedStatus = {
  //     status: updateStatus,
  //   };
  //   console.log(updatedStatus);
  //   // try {
  //   //   await mutateAsync(updatedStatus);
  //   // } catch (err) {
  //   //   console.log(err);
  //   //   toast.error(err.message);
  //   // }
  // };

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
                    onClick={() => handleStatus(user, user.status)}
                    disabled={loggedInUser.email === user.email}
                    className="btn btn-neutral capitalize btn-sm btn-error text-white"
                  >
                    {user.status === "active" ? "block" : "active"}
                  </button>
                </th>
                <th className="px-6 py-4 font-medium text-center text-gray-900 whitespace-nowrap space-x-2">
                  <div className="dropdown dropdown-end">
                    <button
                      tabIndex={0}
                      disabled={loggedInUser.email === user.email}
                      role="button"
                      className="btn btn-sm btn-success text-white m-1"
                    >
                      Change Role
                    </button>
                    <ul
                      tabIndex={0}
                      className="dropdown-content z-[1] menu p-2 shadow bg-base-100 border rounded-box w-32"
                    >
                      <li onClick={() => handleUpdateUser(user, "admin")}>
                        <a>Admin</a>
                      </li>
                      <li onClick={() => handleUpdateUser(user, "donor")}>
                        <a>Donor</a>
                      </li>
                      <li onClick={() => handleUpdateUser(user, "vulunteer")}>
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
