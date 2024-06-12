import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { axiosCommon } from "../hooks/useAxiosCommon";
import LoadingBars from "../components/LoadingBars";
import emptyImg from "../assets/empty.svg";

const Search = () => {
  const { register, handleSubmit } = useForm();
  const [donors, setDonors] = useState([]);
  const [search, setSearch] = useState("");
  const [searchedDonors, setSearchedDonors] = useState([]);

  const { data: users, isLoading } = useQuery({
    queryKey: ["donors"],
    queryFn: async () => {
      const { data } = await axiosCommon.get(`/users`);
      return data;
    },
  });

  console.log(users);

  const handleSearch = async (data) => {
    setSearch(data.blood_group);
    await setDonors(users.filter((user) => user.role === "donor"));
    const donor = donors.filter((d) => d.blood_group === data.blood_group);
    await setSearchedDonors(donor);
  };

  if (isLoading) {
    return <LoadingBars />;
  }

  // const donors = users?.filter((user) => user.role === "donor");
  console.log(donors);
  console.log(users);
  console.log(searchedDonors);

  return (
    <div className="mb-7 ">
      <form
        onSubmit={handleSubmit(handleSearch)}
        className="flex justify-center items-end w-full gap-4 mb-9"
      >
        <div className="w-[30%]">
          <div>
            <label
              htmlFor="countries"
              className="block mb-2 text-sm md:text-base font-medium text-gray-900"
            >
              Blood Group
            </label>
            <select
              {...register("blood_group")}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-rose-500 focus:border-rose-300 block w-full p-2.5"
            >
              <option selected>Select Blood Group</option>
              <option value="A+">A+</option>
              <option value="A-">A-</option>
              <option value="B+">B+</option>
              <option value="B-">B-</option>
              <option value="O+">O+</option>
              <option value="O-">O-</option>
              <option value="AB+">AB+</option>
              <option value="AB-">AB-</option>
            </select>
          </div>
        </div>
        <div>
          <button
            type="submit"
            className="text-white bg-rose-600 hover:bg-rose-700 focus:outline-none focus:ring-4 focus:ring-rose-300 font-medium rounded-lg px-6 py-2.5 text-center me-2"
          >
            Search
          </button>
        </div>
      </form>
      {users === undefined ? (
        <h3 className="text-center font-semibold text-xl mb-5">
          Try search to show donors
        </h3>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3">
          {searchedDonors.map((donor, idx) => (
            <div
              key={idx}
              className="w-full max-w-sm bg-white border border-gray-200 rounded-lg shadow"
            >
              <div className="flex justify-end px-4 pt-4"></div>
              <div className="flex flex-col items-center pb-10">
                <img
                  className="w-24 h-24 mb-3 rounded-full object-cover shadow-lg"
                  src={donor.image}
                  alt="Bonnie image"
                />
                <h5 className="mb-1 text-xl font-medium text-gray-900">
                  {donor.name}
                </h5>
                <span className="text-sm text-gray-500">
                  District: {donor.district}
                </span>
                <span className="text-sm text-gray-500">
                  Upazila: {donor.upazila}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
      {searchedDonors?.length < 1 && (
        <div className="w-52 mx-auto">
          <img src={emptyImg} alt="" />
        </div>
      )}
    </div>
  );
};

export default Search;
