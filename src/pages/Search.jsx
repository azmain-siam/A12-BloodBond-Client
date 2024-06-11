import { useEffect, useState } from "react";
const Search = () => {
  const [districts, setDistricts] = useState([]);
  const [upazilas, setUpazillas] = useState([]);

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

  return (
    <div className="mb-7 ">
      <form className="flex justify-center items-end w-full gap-4">
        <div className="grid lg:grid-cols-3 gap-4 w-[80%]">
          <div>
            <label
              htmlFor="countries"
              className="block mb-2 text-sm md:text-base font-medium text-gray-900"
            >
              Blood Group
            </label>
            <select
              id="countries"
              defaultValue={"selected"}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-rose-500 focus:border-rose-300 block w-full p-2.5"
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
          </div>
          <div>
            <label
              htmlFor="countries"
              className="block mb-2 text-sm md:text-base font-medium text-gray-900"
            >
              District
            </label>
            <select
              id="countries"
              defaultValue={"selected"}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-rose-500 focus:border-rose-300 block w-full p-2.5"
            >
              <option disabled value={"selected"}>
                Select District
              </option>
              {districts.map((district, idx) => (
                <option key={idx}>{district.name}</option>
              ))}
            </select>
          </div>
          <div>
            <label
              htmlFor="countries"
              className="block mb-2 text-sm md:text-base font-medium text-gray-900"
            >
              Upazilla
            </label>
            <select
              id="countries"
              defaultValue={"selected"}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-rose-500 focus:border-rose-300 block w-full p-2.5"
            >
              <option disabled value={"selected"}>
                Select Upazilla
              </option>
              {upazilas.map((upazila, idx) => (
                <option key={idx}>{upazila.name}</option>
              ))}
            </select>
          </div>
        </div>
        <div>
          <button className="text-white bg-rose-600 hover:bg-rose-700 focus:outline-none focus:ring-4 focus:ring-rose-300 font-medium rounded-lg px-6 py-2.5 text-center me-2">
            Search
          </button>
        </div>
      </form>
      
    </div>
  );
};

export default Search;
