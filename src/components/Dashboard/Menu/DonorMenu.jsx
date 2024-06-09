import { BiSolidDonateBlood } from "react-icons/bi";
import { IoIosCreate } from "react-icons/io";
import { NavLink } from "react-router-dom";

const DonorMenu = () => {
  return (
    <div className="space-y-2">
      <li>
        <NavLink
          to={"/dashboard/create-donation-request"}
          end
          className={({ isActive }) =>
            `flex items-center p-2 text-gray-900 rounded-lg group hover:bg-gray-200 ${
              isActive ? "bg-gray-200" : ""
            }`
          }
        >
          <IoIosCreate
            size={22}
            className="text-gray-500 transition duration-75 group-hover:text-gray-900"
          />
          <span className="ms-3">Create Request</span>
        </NavLink>
      </li>
      <li>
        <NavLink
          to={"/dashboard/my-donation-requests"}
          end
          className={({ isActive }) =>
            `flex items-center p-2 text-gray-900 rounded-lg group hover:bg-gray-200 ${
              isActive ? "bg-gray-200" : ""
            }`
          }
        >
          <BiSolidDonateBlood
            size={22}
            className="text-gray-500 transition duration-75 group-hover:text-gray-900"
          />
          <span className="ms-3">My Donation Requests</span>
        </NavLink>
      </li>
    </div>
  );
};

export default DonorMenu;
