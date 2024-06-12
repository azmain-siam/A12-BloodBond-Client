import { Link } from "react-router-dom";
import { MdPayment } from "react-icons/md";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "../components/CheckoutForm";
import useAxiosSecure from "../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import useAuth from "../hooks/useAuth";
import LoadingBars from "../components/LoadingBars";

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY);

const FundingPage = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
  const { data: funds, isLoading } = useQuery({
    queryKey: ["funds"],
    queryFn: async () => {
      const { data } = await axiosSecure.get(`/fund/${user.email}`);
      return data;
    },
  });

  if (isLoading) {
    return <LoadingBars />;
  }

  return (
    <div className="font-poppins">
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
              <Link className="ms-1 text-sm cursor-default font-medium text-gray-700 md:ms-2">
                Fundings
              </Link>
            </div>
          </li>
        </ol>
      </nav>
      <div className="mb-4 text-3xl font-extrabold leading-none text-gray-900 md:text-4xl flex justify-between items-center">
        My Fundings
        <div>
          <Link to={"/donate-fund"}>
            <button
              // onClick={() => document.getElementById("my_modal_2").showModal()}
              className="btn btn-sm btn-neutral text-base tracking-normal	font-medium text-white py-2 px-4 h-full"
            >
              <MdPayment size={20} />
              Add Fund
            </button>
          </Link>
          <div className="flex justify-center">
            <dialog id="my_modal_2" className="modal">
              <div className="modal-box">
                <h3 className="font-medium text-lg">Donor Name:</h3>
                <h3 className="font-medium text-lg mt-2">Donor Email:</h3>
                <Elements stripe={stripePromise}>
                  <CheckoutForm />
                </Elements>
                <div className="mt-6 modal-action flex justify-center">
                  <form method="dialog">
                    <button className="items-center mx-auto block justify-center px-10 py-3 text-base font-medium leading-6 text-white font-poppins whitespace-no-wrap bg-red-600 border border-red-700 rounded-md shadow-sm hover:bg-red-700 focus:outline-none ">
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

      <div className="relative overflow-auto h-screen ">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500">
          <thead className="text-xs text-gray-700 uppercase bg-gray-100">
            <tr>
              <th scope="col" className="px-6 py-3 rounded-s-lg">
                Name
              </th>
              <th scope="col" className="px-6 py-3">
                Fund Amount
              </th>
              <th scope="col" className="px-6 py-3 rounded-e-lg">
                Date & Time
              </th>
              <th scope="col" className="px-6 py-3 rounded-e-lg">
                Transaction ID
              </th>
            </tr>
          </thead>
          <tbody>
            {funds.map((fund) => (
              <tr key={fund._id} className="bg-white">
                <th className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                  {fund.name}
                </th>
                <th className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                  {fund.email}
                </th>
                <th className="px-6 py-4 capitalize font-medium text-gray-900 whitespace-nowrap">
                  {new Date(fund.data).toLocaleString()}
                </th>
                <th className="px-6 py-4 text-green-600 capitalize font-medium  whitespace-nowrap">
                  {fund.transactionId}
                </th>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default FundingPage;
