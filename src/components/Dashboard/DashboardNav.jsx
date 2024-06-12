import { Link, NavLink } from "react-router-dom";
import { GoHomeFill } from "react-icons/go";
import { FaUser } from "react-icons/fa";
import useRole from "../../hooks/useRole";
import DonorMenu from "./Menu/DonorMenu";
import AdminMenu from "./Menu/AdminMenu";
import VolunteerMenu from "./Menu/VolunteerMenu";
import logo from "/logo.png";

const DashboardNav = () => {
  // const [isAdmin] = useAdmin();
  // // console.log(isAdmin);

  const [role] = useRole();

  return (
    <div>
      <div className="dropdown">
        <div tabIndex={0} role="button" className="btn btn-ghost btn-circle">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4 6h16M4 12h16M4 18h7"
            />
          </svg>
        </div>
        <ul
          tabIndex={0}
          className="menu menu-sm dropdown-content mt-3 z-[5] p-2 shadow-lg bg-base-100 rounded-box w-56"
        >
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

          {role === "donor" && <DonorMenu />}
          {role === "admin" && <AdminMenu />}
          {role === "volunteer" && <VolunteerMenu />}
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
        </ul>
      </div>
      {/* <------- Sidebar ------> */}
      <aside
        id="separator-sidebar"
        className="fixed top-0 shadow-[rgba(0,_0,_0,_0.24)_0px_3px_8px] border-r left-0 z-40 w-64 h-screen transition-transform -translate-x-full sm:translate-x-0"
        aria-label="Sidebar"
      >
        <div className="flex flex-col justify-between h-full px-3 py-4 overflow-y-auto bg-gray-50">
          <ul className="space-y-2 font-medium">
            <Link
              to={"/"}
              className="mr-4 flex items-center gap-1 cursor-pointer text-xl md:text-2xl font-bold leading-relaxed text-inherit antialiased mb-5"
            >
              <img className="w-9" src={logo} alt="" />
              BloodBond
            </Link>
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

            {role === "donor" && <DonorMenu />}
            {role === "admin" && <AdminMenu />}
            {role === "volunteer" && <VolunteerMenu />}
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
