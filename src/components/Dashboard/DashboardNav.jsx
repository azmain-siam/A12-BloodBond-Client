import { Link, NavLink } from "react-router-dom";
import { GoHomeFill } from "react-icons/go";
import { FaUser } from "react-icons/fa";
import { RiMenu2Line } from "react-icons/ri";
import { BiSolidDonateBlood } from "react-icons/bi";
import { IoIosCreate } from "react-icons/io";

const DashboardNav = () => {
  return (
    <div>
      <button
        data-drawer-target="separator-sidebar"
        data-drawer-toggle="separator-sidebar"
        aria-controls="separator-sidebar"
        type="button"
        className="inline-flex items-center p-2 pl-0 mt-2 ms-3 text-sm text-gray-500 rounded-lg sm:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200"
      >
        <span className="sr-only">Open sidebar</span>
        <RiMenu2Line size={20} />
      </button>

      {/* <------- Sidebar ------> */}
      <aside
        id="separator-sidebar"
        className="fixed top-0 shadow-[rgba(0,_0,_0,_0.24)_0px_3px_8px] border-r left-0 z-40 w-64 h-screen transition-transform -translate-x-full sm:translate-x-0"
        aria-label="Sidebar"
      >
        <div className="flex flex-col justify-between h-full px-3 py-4 overflow-y-auto bg-gray-50">
          <ul className="space-y-2 font-medium">
            <li>
              <NavLink
                to={"/dashboard"}
                end
                className={({ isActive }) =>
                  `flex items-center p-2 text-gray-900 rounded-lg group hover:bg-gray-200 ${
                    isActive ? "bg-gray-200" : ""
                  }`
                }
              >
                <svg
                  className="w-5 h-5 text-gray-500 transition duration-75 group-hover:text-gray-900 "
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 22 21"
                >
                  <path d="M16.975 11H10V4.025a1 1 0 0 0-1.066-.998 8.5 8.5 0 1 0 9.039 9.039.999.999 0 0 0-1-1.066h.002Z" />
                  <path d="M12.5 0c-.157 0-.311.01-.565.027A1 1 0 0 0 11 1.02V10h8.975a1 1 0 0 0 1-.935c.013-.188.028-.374.028-.565A8.51 8.51 0 0 0 12.5 0Z" />
                </svg>
                <span className="ms-3">Dashboard</span>
              </NavLink>
            </li>
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

            <li>
              <NavLink
                to={"/dashboard/users"}
                className={({ isActive }) =>
                  `flex items-center p-2 text-gray-900 rounded-lg group hover:bg-gray-200 ${
                    isActive ? "bg-gray-200" : ""
                  }`
                }
              >
                <svg
                  className="flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 group-hover:text-gray-900 "
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 20 18"
                >
                  <path d="M14 2a3.963 3.963 0 0 0-1.4.267 6.439 6.439 0 0 1-1.331 6.638A4 4 0 1 0 14 2Zm1 9h-1.264A6.957 6.957 0 0 1 15 15v2a2.97 2.97 0 0 1-.184 1H19a1 1 0 0 0 1-1v-1a5.006 5.006 0 0 0-5-5ZM6.5 9a4.5 4.5 0 1 0 0-9 4.5 4.5 0 0 0 0 9ZM8 10H5a5.006 5.006 0 0 0-5 5v2a1 1 0 0 0 1 1h11a1 1 0 0 0 1-1v-2a5.006 5.006 0 0 0-5-5Z" />
                </svg>
                <span className="flex-1 ms-3 whitespace-nowrap">All Users</span>
              </NavLink>
            </li>
          </ul>

          {/* Bottom Nav */}
          <ul className="pt-4 mt-4 space-y-2 font-medium border-t border-gray-200 ">
            <li>
              <Link
                to={"/"}
                className="flex items-center p-2 text-gray-900 rounded-lg  hover:bg-gray-100  group"
              >
                <GoHomeFill
                  size={21}
                  className="text-gray-500 transition duration-75 group-hover:text-gray-900"
                />
                <span className="ms-3">Home</span>
              </Link>
            </li>
            <li>
              <NavLink
                to={"/dashboard/profile"}
                className={({ isActive }) =>
                  `flex items-center p-2 text-gray-900 rounded-lg group hover:bg-gray-200 ${
                    isActive ? "bg-gray-200" : ""
                  }`
                }
              >
                <FaUser
                  size={20}
                  className="text-gray-500 transition duration-75 group-hover:text-gray-900"
                />
                <span className="ms-3">Profile</span>
              </NavLink>
            </li>
          </ul>
        </div>
      </aside>
    </div>
  );
};

export default DashboardNav;
