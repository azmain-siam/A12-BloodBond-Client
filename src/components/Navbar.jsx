import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { HiMenuAlt2 } from "react-icons/hi";
import useAuth from "../hooks/useAuth";

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const { user, logout } = useAuth();
  console.log(user);
  const handleShowSideNav = () => {
    setOpen(!open);
  };

  // NavBar Class
  const navClass = ({ isActive }) =>
    isActive
      ? "flex items-center border-b-[2px] px-1 border-red-400"
      : "flex items-center px-1 border-b-[2px] border-transparent";

  // Navbar Links
  const navlinks = (
    <>
      <li className="block antialiased leading-normal ">
        <NavLink to={"/"} className={navClass}>
          Home
        </NavLink>
      </li>
      <li className="block antialiased leading-normal">
        <NavLink to={"/donation-requests"} className={navClass}>
          Donation Requests
        </NavLink>
      </li>
      <li className="block antialiased leading-normal">
        <NavLink to={"/blog"} className={navClass}>
          Blog
        </NavLink>
      </li>
    </>
  );

  const sideNavClass = ({ isActive }) =>
    isActive
      ? "block p-4 text-sm font-semibold bg-blue-50 text-blue-600 rounded"
      : "block p-4 text-sm font-semibold text-gray-400 hover:bg-blue-50 hover:text-blue-600 rounded";

  return (
    <div className="grid w-full place-items-center rounded-lg p-6 lg:overflow-visible">
      <div className="-m-6 max-h-[768px] w-[calc(100%+48px)]">
        <nav className="sticky top-0 z-10 block w-full max-w-full px-4 py-2 bg-white border rounded-none shadow-md h-max border-white/80 bg-opacity-80 backdrop-blur-2xl backdrop-saturate-200 lg:px-8 lg:py-4">
          <div className="flex max-w-[1440px] mx-auto items-center justify-between text-blue-gray-900">
            {/* <----- Hamburger Icon ------> */}
            <div className="flex gap-5 items-center">
              <div className="lg:hidden">
                <button
                  onClick={handleShowSideNav}
                  className="navbar-burger flex items-center "
                >
                  <HiMenuAlt2 size={21} />
                </button>
              </div>
              <Link
                to={"/"}
                className="mr-4 block cursor-pointer  text-2xl font-bold leading-relaxed text-inherit antialiased"
              >
                BloodBond
              </Link>
            </div>
            <div className="flex items-center gap-4">
              <div className="hidden mr-4 lg:block">
                <ul className="flex flex-col font-medium gap-2 mt-2 mb-4 lg:mb-0 lg:mt-0 lg:flex-row lg:items-center lg:gap-6">
                  {navlinks}
                </ul>
              </div>
              {user ? (
                <div className="dropdown dropdown-end">
                  <div
                    tabIndex={0}
                    role="button"
                    className="btn btn-ghost btn-circle avatar"
                  >
                    <div className="w-14 rounded-full">
                      <img
                        alt="Tailwind CSS Navbar component"
                        src={user.photoURL}
                      />
                    </div>
                  </div>
                  <div
                    tabIndex={0}
                    className="menu menu-sm dropdown-content mt-3 z-[1] p-2 border shadow-lg bg-base-100 rounded-box "
                  >
                    <div className="px-4 py-3 text-sm text-gray-900 space-y-1">
                      <div>{user.displayName}</div>
                      <div className="font-semibold truncate">{user.email}</div>
                    </div>
                    <hr className="w-[88%] mx-auto" />
                    <ul className="py-2 font-medium text-sm text-gray-700">
                      <li>
                        <Link
                          href="#"
                          className="block px-4 py-3 hover:bg-gray-200 "
                        >
                          Dashboard
                        </Link>
                      </li>
                      <li>
                        <button
                          onClick={logout}
                          className="block px-4 py-3 hover:bg-gray-200 "
                        >
                          Sign Out
                        </button>
                      </li>
                    </ul>
                  </div>
                </div>
              ) : (
                <Link to={"/login"}>
                  <button
                    className="select-none rounded-lg bg-gradient-to-tr from-gray-900 to-gray-800 py-2 px-4 text-center align-middle font-semibold uppercase text-white shadow-md shadow-gray-900/10 transition-all hover:shadow-lg hover:shadow-gray-900/20 active:opacity-[0.85] disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none lg:inline-block"
                    type="button"
                  >
                    <span>Sign in</span>
                  </button>
                </Link>
              )}
            </div>
          </div>
        </nav>
      </div>
      {/* Sidenavbar */}
      <div className={`navbar-menu relative z-50 ${!open && "hidden"}`}>
        <div className="navbar-backdrop fixed inset-0 bg-gray-800 opacity-25"></div>
        <nav className="fixed top-0 left-0 bottom-0 flex flex-col w-5/6 max-w-sm py-6 px-6 bg-white border-r overflow-y-auto">
          <div className="flex justify-between items-center mb-8">
            <Link to={"/"} className="text-2xl font-bold ">
              BloodBond
            </Link>
            <button onClick={handleShowSideNav} className="navbar-close">
              <svg
                className="h-6 w-6 text-gray-400 cursor-pointer hover:text-gray-500"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                ></path>
              </svg>
            </button>
          </div>
          {/* <------ SideNav ------> */}
          <div>
            <ul>
              <li className="mb-1" onClick={handleShowSideNav}>
                <NavLink to={"/"} className={sideNavClass}>
                  Home
                </NavLink>
              </li>
              <li className="mb-1" onClick={handleShowSideNav}>
                <NavLink to={"/donation-requests"} className={sideNavClass}>
                  Donation Requests
                </NavLink>
              </li>
              <li className="mb-1" onClick={handleShowSideNav}>
                <NavLink to={"/blog"} className={sideNavClass}>
                  Blog
                </NavLink>
              </li>
            </ul>
          </div>
          <div className="mt-auto">
            <div className="pt-6">
              <a
                className="block px-4 py-3 mb-3 leading-loose text-xs text-center font-semibold bg-gray-50 hover:bg-gray-100 rounded-xl"
                href="#"
              >
                Sign in
              </a>
              <a
                className="block px-4 py-3 mb-2 leading-loose text-xs text-center text-white font-semibold bg-blue-600 hover:bg-blue-700  rounded-xl"
                href="#"
              >
                Sign Up
              </a>
            </div>
          </div>
        </nav>
      </div>
    </div>
  );
};

export default Navbar;
