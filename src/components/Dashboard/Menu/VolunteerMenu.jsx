import { BiSolidDonateBlood } from "react-icons/bi";
import { RiEditBoxFill } from "react-icons/ri";
import { NavLink } from "react-router-dom";

const VolunteerMenu = () => {
  return (
    <div className="space-y-2">
      <li>
        <NavLink
          to={"/dashboard/all-blood-donation-request"}
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
          <span className="ms-3">All Donation Requests</span>
        </NavLink>
      </li>
      <li>
        <NavLink
          to={"/dashboard/content-management"}
          className={({ isActive }) =>
            `flex items-center p-2 text-gray-900 rounded-lg group hover:bg-gray-200 ${
              isActive ? "bg-gray-200" : ""
            }`
          }
        >
          <RiEditBoxFill
            size={22}
            className="text-gray-500 transition duration-75 group-hover:text-gray-900"
          />
          <span className="ms-3">Content Management</span>
        </NavLink>
      </li>
    </div>
  );
};

export default VolunteerMenu;
