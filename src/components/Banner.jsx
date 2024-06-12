import { Link } from "react-router-dom";
import bannerImg from "../assets/banner.jpg";
import useAuth from "../hooks/useAuth";

const Banner = () => {
  const { user } = useAuth();
  return (
    <div className="relative h-[400px] md:h-[350px] lg:h-[550px] text-white overflow-hidden">
      <div className="absolute inset-0 rounded-xl overflow-hidden">
        <img
          src={bannerImg}
          alt="Background Image"
          className="object-cover object-center w-full h-full"
        />
        <div className="absolute inset-0 bg-black opacity-50"></div>
      </div>

      <div className="relative z-10 flex flex-col justify-center items-center h-full text-center">
        <h1 className="text-xl md:text-3xl lg:text-5xl font-bold leading-tight mb-4">
          Welcome to BloodBond
        </h1>
        <p className="text-sm md:text-base text-gray-300 mb-8 max-w-[85%] md:max-w-[75%]">
          Join our community of life-savers. Easily update your donation
          requests, monitor your history, and stay updated with the latest blood
          donation drives. Together, we make a difference.
        </p>
        <div className="flex gap-5 flex-col md:flex-row">
          {!user && (
            <Link to={"/register"}>
              <button className=" bg-yellow-400 text-gray-900 hover:bg-yellow-300 py-2 px-6 rounded-full md:text-lg font-semibold transition duration-300 ease-in-out transform hover:scale-105 hover:shadow-lg">
                Join as a donor
              </button>
            </Link>
          )}
          <Link to={"/search"}>
            <button className="bg-yellow-400 text-gray-900 hover:bg-yellow-300 py-2 px-6 rounded-full md:text-lg font-semibold transition duration-300 ease-in-out transform hover:scale-105 hover:shadow-lg">
              Search Donors
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Banner;
