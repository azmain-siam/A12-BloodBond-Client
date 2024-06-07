import { Link, useParams } from "react-router-dom";
import useAxiosCommon from "../hooks/useAxiosCommon";
import { useQuery } from "@tanstack/react-query";
import LoadingBars from "../components/LoadingBars";
import { Helmet } from "react-helmet";
import { FaLocationDot } from "react-icons/fa6";
import { FaClock } from "react-icons/fa6";
import useAuth from "../hooks/useAuth";

const Details = () => {
  const { user } = useAuth();
  const { id } = useParams();
  const axiosCommon = useAxiosCommon();
  const { data: request = {}, isLoading } = useQuery({
    queryKey: ["request", id],
    queryFn: async () => {
      const { data } = await axiosCommon.get(`/request/${id}`);
      return data;
    },
  });

  if (isLoading || !user) {
    return <LoadingBars />;
  }

  console.log(request);

  return (
    <div className="mt-5 mb-14">
      <Helmet>
        <title>Request Details - BloodBond</title>
      </Helmet>
      <nav className="flex mb-4" aria-label="Breadcrumb">
        <ol className="inline-flex items-center space-x-1 md:space-x-3 rtl:space-x-reverse">
          <li className="inline-flex items-center">
            <Link
              to={"/"}
              className="inline-flex items-center text-sm font-medium text-gray-700 hover:text-blue-600 "
            >
              <svg
                className="w-3 h-3 me-2.5"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="m19.707 9.293-2-2-7-7a1 1 0 0 0-1.414 0l-7 7-2 2a1 1 0 0 0 1.414 1.414L2 10.414V18a2 2 0 0 0 2 2h3a1 1 0 0 0 1-1v-4a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v4a1 1 0 0 0 1 1h3a2 2 0 0 0 2-2v-7.586l.293.293a1 1 0 0 0 1.414-1.414Z" />
              </svg>
              Home
            </Link>
          </li>
          <li>
            <div className="flex items-center">
              <svg
                className="w-3 h-3 text-gray-400 mx-1 rtl:rotate-180"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 6 10"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="m1 9 4-4-4-4"
                />
              </svg>
              <Link
                to={"/donation-requests"}
                className="ms-1 text-sm font-medium text-gray-700  hover:text-blue-600 md:ms-2"
              >
                Donation Requests
              </Link>
            </div>
          </li>
          <li>
            <div className="flex items-center">
              <svg
                className="w-3 h-3 text-gray-400 mx-1 rtl:rotate-180"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 6 10"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="m1 9 4-4-4-4"
                />
              </svg>
              <Link className="ms-1 text-sm cursor-default font-medium text-gray-700 md:ms-2">
                Request Details
              </Link>
            </div>
          </li>
        </ol>
      </nav>

      {/* Details */}
      <div className="bg-white border rounded-lg">
        {/* <----- Requester Info -----> */}
        <div className="flex items-center px-4 py-3 border-b ">
          <img
            className="size-10 rounded-full content-center object-cover border"
            src={
              request.requester_img ||
              "https://static.vecteezy.com/system/resources/thumbnails/005/544/718/small_2x/profile-icon-design-free-vector.jpg"
            }
          />
          <div className="ml-3 ">
            <span className=" font-semibold antialiased block leading-tight">
              {request.requester_name}
            </span>
            <span className="text-gray-600 text-sm block">
              {request.requester_email}
            </span>
          </div>
        </div>

        {/* <---- Recipient Info ----> */}
        <div className="flex p-4 flex-col lg:flex-row justify-between gap-6 lg:items-center mb-6 md:mb-7">
          <div className="space-y-2">
            <div className="flex flex-wrap gap-3 items-center">
              <h3 className="flex items-center gap-2 text-xl md:text-2xl lg:text-3xl font-bold">
                Recipient Name: {request.recipient_name}
                <span className="bg-red-100 text-red-800 text-sm border border-red-300 font-medium me-2 px-2.5 py-0.5 rounded-full">
                  {request.blood_group}
                </span>
              </h3>
            </div>
            <p className="font-medium text-[#2c2c2c] text-sm md:text-lg capitalize">
              Donation Status: {request.donation_status}
            </p>
            <p className="font-medium text-[#585858] text-sm md:text-lg capitalize">
              {request.request_message}
            </p>
          </div>
        </div>

        {/* Details */}
        <div className="px-2 pb-4">
          <div className="w-full border rounded-lg">
            <h3 className="bg-[#F5F6F7] px-5 py-3 text-lg font-semibold border-b">
              Informations:
            </h3>
            <div className="px-5 py-4 border-b">
              <h3 className="md:text-lg font-semibold mb-2 flex items-center gap-1">
                <FaClock size={16} />
                Time and Date:
              </h3>
              <div className="ml-3 grid md:grid-cols-3 gap-2 text-sm md:text-base">
                <div className="space-y-2">
                  <p className="font-medium ">Time: {request.donation_time}</p>
                  <p className="font-medium ">
                    Date: {new Date(request.donation_date).toLocaleDateString()}
                  </p>
                </div>
              </div>
            </div>
            <div className="px-5 py-4 border-b">
              <h3 className="md:text-lg font-semibold mb-2 flex items-center gap-1">
                <FaLocationDot size={18} />
                Location:
              </h3>
              <div className="ml-3 grid md:grid-cols-3 gap-2 text-sm md:text-base">
                <div className="space-y-2">
                  <p className="font-medium ">
                    Hospital: {request.hospital_name}
                  </p>
                  <p className="font-medium ">
                    Address: {request.full_address_line}
                  </p>
                </div>
              </div>
            </div>
          </div>
          {/*<--------- Details ends here ---------> */}
          <div className="flex justify-center">
            {/* Open the modal using document.getElementById('ID').showModal() method */}
            <button
              className="items-center mt-5 justify-center px-10 py-3 text-base font-medium leading-6 text-white whitespace-no-wrap bg-blue-600 border border-blue-700 rounded-md shadow-sm hover:bg-blue-700 focus:outline-none "
              onClick={() => document.getElementById("my_modal_2").showModal()}
            >
              Donate
            </button>
            <dialog id="my_modal_2" className="modal">
              <div className="modal-box">
                <h3 className="font-medium text-lg">
                  Donor Name: {user.displayName}
                </h3>
                <h3 className="font-medium text-lg mt-2">
                  Donor Email: {user.email}
                </h3>
                <div className="mt-6 modal-action flex justify-center">
                  <form method="dialog">
                    <button className="items-center mx-auto block justify-center px-10 py-3 text-base font-medium leading-6 text-white whitespace-no-wrap bg-blue-600 border border-blue-700 rounded-md shadow-sm hover:bg-blue-700 focus:outline-none ">
                      Confirm
                    </button>
                  </form>
                </div>
              </div>
              <form method="dialog" className="modal-backdrop">
                <button>close</button>
              </form>
            </dialog>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Details;
