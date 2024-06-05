import { useQuery } from "@tanstack/react-query";
import useAxiosCommon from "../hooks/useAxiosCommon";
import { Link } from "react-router-dom";
import RequestCards from "../components/RequestCards";
import LoadingBars from "../components/LoadingBars";

const DonationRequests = () => {
  const axiosCommon = useAxiosCommon();

  const { data, isLoading } = useQuery({
    queryKey: ["requests"],
    queryFn: async () => {
      const { data } = await axiosCommon.get("/requests");
      return data;
    },
  });

  if (isLoading) {
    return <LoadingBars />;
  }

  return (
    <div className="mt-5 mb-10">
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
              <a className="ms-1 text-sm cursor-default font-medium text-gray-700 md:ms-2">
                Donation Requests
              </a>
            </div>
          </li>
        </ol>
      </nav>
      <h2 className="mb-4 text-3xl font-extrabold leading-none tracking-tight text-gray-900 md:text-4xl ">
        Donation Requests
      </h2>

      {/* <---- Cards ----> */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mt-8">
        {data.map((data) => (
          <RequestCards data={data} key={data._id} />
        ))}
      </div>
    </div>
  );
};

export default DonationRequests;
