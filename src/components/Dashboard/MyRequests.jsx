import useAuth from "../../hooks/useAuth";
import useAxiosCommon from "../../hooks/useAxiosCommon";
import { useQuery } from "@tanstack/react-query";
import { FaRegTrashAlt } from "react-icons/fa";
import LoadingBars from "../LoadingBars";
import { AiOutlineEdit } from "react-icons/ai";
import { LuEye } from "react-icons/lu";
import { Link } from "react-router-dom";

const MyRequests = () => {
  const { user } = useAuth();
  const axiosCommon = useAxiosCommon();

  const { data, isLoading } = useQuery({
    queryKey: ["request"],
    queryFn: async () => {
      const { data } = await axiosCommon.get(`/my-requests/${user.email}`);
      return data;
    },
  });

  if (isLoading) {
    return (
      <div className="h-[80vh]">
        <LoadingBars />
      </div>
    );
  }

  console.log(data);

  return (
    <div>
      <h2 className="mb-6 mt-1 text-2xl font-extrabold leading-none tracking-tight text-gray-900 md:text-3xl ">
        My Donation Requests
      </h2>

      <div className="relative overflow-x-auto">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500">
          <thead className="text-xs text-gray-700 uppercase bg-gray-100">
            <tr>
              <th scope="col" className="px-6 py-3 rounded-s-lg">
                Recipient Name
              </th>
              <th scope="col" className="px-6 py-3">
                Recipient Location
              </th>
              <th scope="col" className="px-6 py-3 rounded-e-lg">
                Donation Date
              </th>
              <th scope="col" className="px-6 py-3 rounded-e-lg">
                Donation Time
              </th>
              <th scope="col" className="px-6 py-3 rounded-e-lg">
                Donation Status
              </th>
              <th scope="col" className="px-6 py-3 rounded-e-lg">
                Donor Information
              </th>
              <th scope="col" className="px-6 py-3 text-center rounded-e-lg">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {data.map((d) => (
              <tr key={d._id} className="bg-white">
                <th className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                  {d.recipient_name}
                </th>
                <th className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                  {d.recipient_upazila}, {d.recipient_district}
                </th>
                <th className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                  {new Date(d.donation_date).toLocaleDateString()}
                </th>
                <th className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                  {d.donation_time}
                </th>
                <th className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                  {d.donation_status}
                </th>
                <th className="px-6 py-4 font-medium text-center text-gray-900 whitespace-nowrap">
                  -
                </th>
                <th className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                  <div>
                    <button
                      type="button"
                      title="Delete"
                      className="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-2.5 py-2.5 me-2 mb-2"
                    >
                      <FaRegTrashAlt />
                    </button>
                    <Link to={`/dashboard/update/${d._id}`}>
                      <button
                        title="Edit"
                        type="button"
                        className="focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-2.5 py-2.5 me-2 mb-2"
                      >
                        <AiOutlineEdit />
                      </button>
                    </Link>
                    <Link to={`/details/${d._id}`}>
                      <button
                        title="View Details"
                        type="button"
                        className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-2.5 py-2.5 me-2 mb-2"
                      >
                        <LuEye />
                      </button>
                    </Link>
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

export default MyRequests;
