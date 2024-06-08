import { useEffect, useState } from "react";
import useAuth from "../../hooks/useAuth";
import useAxiosCommon from "../../hooks/useAxiosCommon";
import { useNavigate, useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import LoadingBars from "../../components/LoadingBars";
import ReactDatePicker from "react-datepicker";
import TimePicker from "react-time-picker";
import { useQuery } from "@tanstack/react-query";

const UpdatePage = () => {
  const { user } = useAuth();
  const { id } = useParams();

  const axiosCommon = useAxiosCommon();

  const [districts, setDistricts] = useState([]);
  const [upazilas, setUpazillas] = useState([]);
  const navigate = useNavigate();

  const { register, handleSubmit } = useForm();

  const { data, isLoading } = useQuery({
    queryKey: ["update", id],
    queryFn: async () => {
      const { data } = await axiosCommon.get(`/requests/${id}`);
      return data;
    },
  });

  console.log(data);

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

  const [startDate, setStartDate] = useState(new Date());
  const [value, onChange] = useState(`10:00`);

  // Set date to the startDate state
  useEffect(() => {
    if (data) {
      setStartDate(data.donation_date);
    }
  }, [data]);

  // Set time to the time state
  useEffect(() => {
    if (data) {
      onChange(data.donation_time);
    }
  }, [data]);

  const onSubmit = async (data) => {
    const updatedData = {
      ...data,
      donation_date: startDate,
      donation_time: value,
      donation_status: "pending",
      requester_name: user.displayName,
      requester_email: user.email,
      requester_img: user.photoURL,
    };

    console.log(updatedData);

    try {
      const { data } = await axiosCommon.put(`/request/${id}`, updatedData);
      console.log(data);
      if (data.modifiedCount > 0) {
        toast.success("Updated Successfully!");
        navigate("/dashboard/my-donation-requests");
      }
    } catch (err) {
      console.log(err);
      toast.error("Try Again");
    }
  };

  if (isLoading || !user) {
    return (
      <div className="h-[80vh]">
        <LoadingBars />
      </div>
    );
  }

  return (
    <div>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="p-4 md:p-5 w-full md:w-[80%] mx-auto border rounded-lg"
      >
        <div>
          <h2 className="mb-6 text-3xl font-extrabold leading-none tracking-tight text-gray-900 md:text-3xl ">
            Update Donation Request
          </h2>
        </div>

        <div className="grid gap-4 mb-4 grid-cols-2">
          <div className="col-span-2 sm:col-span-1">
            <label
              htmlFor="category"
              className="block mb-2 text-sm font-medium text-gray-900"
            >
              Requester Name
            </label>
            <input
              type="text"
              disabled
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 cursor-not-allowed"
              placeholder={user.displayName}
            />
          </div>
          <div className="col-span-2 sm:col-span-1">
            <label
              htmlFor="category"
              className="block mb-2 text-sm font-medium text-gray-900"
            >
              Requester Email
            </label>
            <input
              type="email"
              disabled
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 cursor-not-allowed"
              placeholder={user.email}
            />
          </div>
          <div className="md:col-span-1">
            <label className="block mb-2 text-sm font-medium text-gray-900">
              Recipient Name
            </label>
            <input
              type="text"
              defaultValue={data.recipient_name}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
              placeholder="Recipient Name"
              required
              {...register("recipient_name")}
            />
          </div>

          <div className="md:col-span-1">
            <label
              htmlFor="category"
              className="block mb-2 text-sm font-medium text-gray-900"
            >
              Blood Group
            </label>
            <select
              required
              {...register("blood_group")}
              defaultValue={data.blood_group}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 *:font-medium "
            >
              <option value={"selected"} disabled>
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

          <div className="md:col-span-1">
            <label
              htmlFor="category"
              className="block mb-2 text-sm font-medium text-gray-900 "
            >
              Recipient District
            </label>
            <select
              required
              defaultValue={data.recipient_district}
              {...register("recipient_district")}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 *:font-medium "
            >
              <option disabled>Select District</option>
              {districts.map((district) => (
                <option key={district.name} value={district.name}>
                  {district.name}
                </option>
              ))}
            </select>
          </div>

          <div className="md:col-span-1">
            <label
              htmlFor="category"
              className="block mb-2 text-sm font-medium text-gray-900 "
            >
              Recipient Upazila
            </label>
            <select
              required
              {...register("recipient_upazila")}
              defaultValue={data.recipient_upazila}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 *:font-medium "
            >
              <option disabled>Select Upazila</option>
              {upazilas.map((upazila) => (
                <option key={upazila.id} value={upazila.name}>
                  {upazila.name}
                </option>
              ))}
            </select>
          </div>

          <div className="col-span-1 ">
            <label className="block mb-2 text-sm font-medium text-gray-900">
              Hospital Name
            </label>
            <input
              type="text"
              defaultValue={data.hospital_name}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
              placeholder="Ex. Dhaka Medical College Hospital"
              {...register("hospital_name")}
            />
          </div>

          <div className="col-span-1 ">
            <label className="block mb-2 capitalize text-sm font-medium text-gray-900">
              full address line
            </label>
            <input
              type="text"
              defaultValue={data.full_address_line}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
              placeholder="Ex. Zahir Raihan Rd, Dhaka"
              {...register("full_address_line")}
            />
          </div>

          <div className="col-span-2 sm:col-span-1">
            <label
              htmlFor="category"
              className="block mb-2 text-sm font-medium text-gray-900"
            >
              Donation Date
            </label>
            <div>
              <ReactDatePicker
                wrapperClassName="w-full "
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block py-2.5 w-full font-medium *:font-medium "
                selected={startDate}
                {...register("donation_time")}
                onChange={(date) => setStartDate(date)}
                required
              />
            </div>
          </div>

          <div className="col-span-2 sm:col-span-1">
            <label
              htmlFor="category"
              className="block mb-2 text-sm font-medium text-gray-900"
            >
              Donation Time
            </label>
            <div>
              <TimePicker
                wrapperClassName="w-full"
                className="bg-gray-50 border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block py-2.5 w-full font-medium *:font-medium "
                onChange={onChange}
                value={value}
              />
            </div>
          </div>
          <div className="col-span-2">
            <label
              htmlFor="description"
              className="block mb-2 text-sm capitalize font-medium text-gray-900"
            >
              request message
            </label>
            <textarea
              rows="3"
              defaultValue={data.request_message}
              className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Why blood is needed?"
              required
              {...register("request_message")}
            ></textarea>
          </div>
        </div>
        <div className="flex justify-center">
          <button
            type="submit"
            className="btn mt-3 px-12 bg-primary border-primary hover:border-[#28282B] hover:text-[#28282B] text-white uppercase transition-all hover:bg-white duration-300 hover:scale-105"
          >
            update post
          </button>
        </div>
      </form>
    </div>
  );
};

export default UpdatePage;
