import { useForm } from "react-hook-form";
import useAuth from "../../hooks/useAuth";
import useRole from "../../hooks/useRole";
import { MdEditSquare } from "react-icons/md";
import { useEffect, useState } from "react";
import axios from "axios";
import { axiosSecure } from "../../hooks/useAxiosSecure";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import LoadingBars from "../LoadingBars";

const Profile = () => {
  const { user, setLoading, updateUserProfile, loading } = useAuth();
  const { register, handleSubmit } = useForm();
  const [districts, setDistricts] = useState([]);
  const [upazilas, setUpazillas] = useState([]);
  const navigate = useNavigate();
  const [edit, setEdit] = useState(true);
  console.log(edit);

  const { data: loggedInUser, isLoading } = useQuery({
    queryKey: ["user"],
    queryFn: async () => {
      const { data } = await axiosSecure.get(`/user/${user.email}`);
      return data;
    },
  });

  useEffect(() => {
    fetch("/districts.json")
      .then((res) => res.json())
      .then((data) => setDistricts(data));
  }, []);

  useEffect(() => {
    fetch("/upazilas.json")
      .then((res) => res.json())
      .then((data) => setUpazillas(data));
  }, []);

  const [role] = useRole();

  const onSubmit = async (data) => {
    const { name, image, blood_group, district, upazila } = data;
    console.log(data);

    const formData = new FormData();
    formData.append("image", image[0]);

    try {
      setLoading(true);

      const { data } = await axios.post(
        `https://api.imgbb.com/1/upload?key=${
          import.meta.env.VITE_IMAGE_API_URL
        }`,
        formData
      );
      const image = data.data.display_url;

      await updateUserProfile(name, image);

      // User Info save to database
      const userInfo = {
        name,
        image,
        blood_group,
        district,
        upazila,
      };
      const { data: userData } = await axiosSecure.put(
        `/user/${loggedInUser.email}`,
        userInfo
      );
      console.log(userData);

      toast.success("Updated Profile");
      navigate("/dashboard/profile");
      setLoading(false);
    } catch (err) {
      console.log(err.message);
      toast.error(err.message);
      setLoading(false);
    }
  };

  if (loading || isLoading) {
    return <LoadingBars />;
  }

  return (
    <div className="flex justify-center lg:w-[70%] mx-auto">
      <div className="p-2 md:p-4 border rounded-xl shadow-lg">
        <div className="w-full px-6 pb-8 mt-8 sm:max-w-xl sm:rounded-lg">
          <div className="grid max-w-2xl mx-auto mt-8">
            <div className="flex flex-col justify-center items-center sm:flex-col ">
              <img
                className="object-cover w-40 h-40 p-1 rounded-full ring-2 ring-indigo-300"
                src={user.photoURL}
                alt="Bordered avatar"
              />
              <div className="bg-[#00B3FB] cursor-default py-1 px-4 text-sm font-semibold rounded-full -mt-4 mb-3 capitalize">
                {role}
              </div>
              <h3 className="text-2xl font-semibold flex gap-2 items-center">
                {user.displayName}
                {loggedInUser.status === "blocked" ? (
                  <span className="bg-red-100 text-red-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded-full">
                    Blocked
                  </span>
                ) : (
                  <span className="bg-green-200 text-green-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded-full">
                    Active
                  </span>
                )}
              </h3>
              <p className="text-lg text-gray-500 mt-1">{user.email}</p>
            </div>

            <div className="items-center mt-8 sm:mt-8 text-[#202142]">
              <div className="flex justify-end">
                <button
                  onClick={() => setEdit(!edit)}
                  className="btn btn-neutral btn-sm size-10 p-0 text-white"
                >
                  <MdEditSquare size={20} />
                </button>
              </div>
              <form onSubmit={handleSubmit(onSubmit)}>
                <div className="mt-3">
                  <label className="block mb-2 text-sm font-medium text-gray-600 ">
                    Name
                  </label>
                  <input
                    disabled={edit}
                    className="block w-full px-4 py-3 text-gray-700 bg-white border rounded-lg focus:border-primary focus:ring-opacity-20  focus:outline-none disabled:text-gray-400"
                    type="text"
                    defaultValue={loggedInUser.name}
                    {...register("name")}
                  />
                </div>
                {edit || (
                  <div className="mt-3">
                    <label className="block mb-2 text-sm font-medium text-gray-600">
                      Photo URL
                    </label>
                    <input
                      type="file"
                      disabled={edit}
                      {...register("image")}
                      className="file-input file-input-bordered block w-full  text-gray-700 bg-white border rounded-lg  focus:border-primary "
                    />
                  </div>
                )}

                {/*<------------ Upozilla & District ------------->*/}

                <div className="flex gap-3">
                  {/* <----------- Districts --------> */}
                  <div className="mt-3">
                    <label className="mb-2 inline-block text-sm font-medium text-gray-600">
                      District
                    </label>
                    {edit ? (
                      <input
                        disabled={edit}
                        className="block w-full px-4 py-3 text-gray-700 bg-white border rounded-lg focus:border-primary focus:ring-opacity-20  focus:outline-none disabled:text-gray-400"
                        type="text"
                        defaultValue={loggedInUser.district}
                      />
                    ) : (
                      <select
                        defaultValue={loggedInUser.district}
                        disabled={edit}
                        {...register("district")}
                        className="select select-bordered w-full max-w-xs rounded-lg  focus:border-primary focus:ring-opacity-20 focus:outline-none "
                      >
                        <option disabled>Select District</option>
                        {districts.map((district) => (
                          <option key={district.id} value={district.name}>
                            {district.name}
                          </option>
                        ))}
                      </select>
                    )}
                  </div>

                  {/* <----------- Upazillas --------> */}
                  <div className="mt-3">
                    <label className="mb-2 inline-block  text-sm font-medium text-gray-600">
                      Upazila
                    </label>
                    {edit ? (
                      <input
                        disabled={edit}
                        className="block w-full px-4 py-3 text-gray-700 bg-white border rounded-lg focus:border-primary focus:ring-opacity-20  focus:outline-none disabled:text-gray-400"
                        type="text"
                        defaultValue={loggedInUser.upazila}
                      />
                    ) : (
                      <select
                        disabled={edit}
                        defaultValue={loggedInUser.upazila}
                        {...register("upazila")}
                        className="select select-bordered w-full max-w-xs rounded-lg  focus:border-primary focus:ring-opacity-20 focus:outline-none"
                      >
                        <option disabled>Select Upazilla</option>

                        {upazilas.map((upazila) => (
                          <option key={upazila.id} value={upazila.name}>
                            {upazila.name}
                          </option>
                        ))}
                      </select>
                    )}
                  </div>
                </div>

                <div className="mt-3">
                  <label className="mb-2 inline-block text-sm font-medium text-gray-600">
                    Blood Group
                  </label>
                  {edit ? (
                    <input
                      disabled={edit}
                      className="block w-full px-4 py-3 text-gray-700 bg-white border rounded-lg focus:border-primary focus:ring-opacity-20  focus:outline-none disabled:text-gray-400"
                      type="text"
                      defaultValue={loggedInUser.blood_group}
                      {...register("name")}
                    />
                  ) : (
                    <select
                      defaultValue={loggedInUser.blood_group}
                      disabled={edit}
                      className="select select-bordered w-full rounded-lg focus:border-primary focus:ring-opacity-20 focus:outline-none"
                      {...register("blood_group")}
                    >
                      <option disabled value="selected">
                        Select Blood Group
                      </option>
                      <option value="A+">A+</option>
                      <option value="A-">A-</option>
                      <option value="B+">B+</option>
                      <option value="B-">B-</option>
                      <option value="O+">O+</option>
                      <option value="O-">O-</option>
                      <option value="AB+">AB+</option>
                      <option value="AB-">AB-</option>
                    </select>
                  )}
                </div>
                {edit || (
                  <div className="flex justify-center mt-5">
                    <button
                      type="submit"
                      className="text-white bg-indigo-700  hover:bg-indigo-800 focus:ring-4 focus:outline-none focus:ring-indigo-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center "
                    >
                      Update Profile
                    </button>
                  </div>
                )}
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
