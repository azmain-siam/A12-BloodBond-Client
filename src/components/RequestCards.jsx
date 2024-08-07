import { FaLocationDot } from "react-icons/fa6";
import { FaClock } from "react-icons/fa";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

const RequestCards = ({ data }) => {
  const {
    recipient_name,
    recipient_district,
    hospital_name,
    donation_date,
    donation_time,
    request_message,
    _id,
    blood_group,
  } = data;

  return (
    <div className="max-w-md flex flex-col p-6 bg-white border border-gray-200 rounded-lg shadow ">
      <div className="flex-1">
        <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 flex gap-2 items-center">
          {recipient_name}
          <span className="bg-red-100 text-red-700 text-xs font-medium me-2 px-2.5 py-0.5 rounded-full">
            {blood_group}
          </span>
        </h5>
        <div className="text-sm mb-1 font-medium text-gray-800">
          <div className="flex items-center gap-2">
            <FaClock size={19} />
            <div>
              <span>
                {new Date(donation_date).toLocaleDateString()} At{" "}
                {donation_time}
              </span>
            </div>
          </div>
        </div>

        <div className="text-sm mb-3 font-medium text-gray-800">
          <div className="flex items-center gap-1">
            <FaLocationDot size={21} />
            <div>
              <p>{hospital_name},</p>
              <p>{recipient_district}</p>
            </div>
          </div>
        </div>

        <p className="mb-3 font-medium text-gray-800">{request_message}</p>
      </div>
      <div>
        <Link
          to={`/details/${_id}`}
          className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-red-700 rounded-lg hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300"
        >
          View Details
          <svg
            className="rtl:rotate-180 w-3.5 h-3.5 ms-2"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 14 10"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M1 5h12m0 0L9 1m4 4L9 9"
            />
          </svg>
        </Link>
      </div>
    </div>
  );
};

export default RequestCards;

RequestCards.propTypes = {
  data: PropTypes.object,
};
