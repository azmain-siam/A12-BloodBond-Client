import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa6";
import logo from "/logo.png";
import { useState } from "react";
import useAuth from "../hooks/useAuth";
import { useEffect } from "react";
import { Helmet } from "react-helmet";
import registerLogo from "../assets/login.svg";
import toast from "react-hot-toast";
import axios from "axios";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { axiosCommon } from "../hooks/useAxiosCommon";

const Register = () => {
  const { createUser, updateUserProfile, loading, setLoading, user } =
    useAuth();
  const [error, setError] = useState("");
  const [districts, setDistricts] = useState([]);
  const [upazilas, setUpazillas] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      navigate("/");
    }
  }, [navigate, user]);

  const { register, handleSubmit } = useForm();

  const [showPass, setShowPass] = useState(false);
  const [showConfirmPass, setShowConfirmPass] = useState(false);

  const passwordRegex = /^(?=.*[A-Z])(?=.*[a-z])/;

  useEffect(() => {
    fetch("/districts.json")
      .then((res) => res.json())
      .then((data) => setDistricts(data));
  }, []);

  useEffect(() => {
    fetch("/upazilas.json")
      .then((res) => res.json())
      .then((data) => setUpazillas(data));
  }, []);

  // Handle Submit Button
  const onSubmit = async (d) => {
    const {
      name,
      email,
      image,
      blood_group,
      district,
      upazila,
      password,
      confirmPassword,
    } = d;
    // const role = "donor";
    // const status = "active";
    const formData = new FormData();
    formData.append("image", image[0]);

    // Validate Password
    if (password !== confirmPassword) {
      return setError("Password Not Matched!");
    }

    if (password.length < 6) {
      setError("Password must contain at least 6 characters");
      return;
    }

    if (!passwordRegex.test(password, confirmPassword)) {
      setError(
        "Password must contain at least one uppercase and lowercase letter"
      );
      return;
    }

    try {
      setLoading(true);

      const { data } = await axios.post(
        `https://api.imgbb.com/1/upload?key=${
          import.meta.env.VITE_IMAGE_API_URL
        }`,
        formData
      );
      const image = data.data.display_url;

      await createUser(email, password);

      await updateUserProfile(name, image);

      // User Info save to database
      const userInfo = {
        name,
        email,
        image,
        blood_group,
        district,
        upazila,
        role: "donor",
        status: "active",
      };
      const { data: userData } = await axiosCommon.post("/users", userInfo);
      console.log(userData);

      toast.success("Successfully Registered");
      navigate("/");
      console.log(image);
      setLoading(false);
    } catch (err) {
      console.log(err.message);
      // toast.error(error);
      setLoading(false);
    }

    if (password !== confirmPassword) {
      return toast.error("Password not matched");
    }
    if (password.length < 6) {
      setError("Password length must be at least 6 chacacters");
      return;
    }
  };

  return (
    <div className="flex flex-row-reverse border w-full max-w-sm mx-auto overflow-hidden bg-white lg:max-w-5xl mt-6 mb-10 rounded-2xl shadow-lg">
      <Helmet>
        <title>Register | HelpHive</title>
      </Helmet>
      <div
        className="hidden bg-contain bg-no-repeat bg-center lg:block lg:w-[60%] mr-4"
        style={{ backgroundImage: `url(${registerLogo})` }}
      ></div>

      <div className="w-full px-6 py-8 md:px-8 lg:w-1/2">
        <div className="flex justify-center mx-auto">
          <img className="w-auto h-7 sm:h-10" src={logo} alt="" />
        </div>

        <p className="mt-3 text-2xl font-semibold text-center">Hello There!</p>

        <div className="flex items-center justify-between mt-4">
          <span className="w-1/5 border-b  lg:w-1/4"></span>

          <p className="text-xs text-center text-gray-500 uppercase cursor-default">
            or register with email
          </p>

          <span className="w-1/5 border-b lg:w-1/4"></span>
        </div>

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mt-3">
            <label className="block mb-2 text-sm font-medium text-gray-600 ">
              Name
            </label>
            <input
              className="block w-full px-4 py-3 text-gray-700 bg-white border rounded-lg focus:border-primary focus:ring-opacity-20  focus:outline-none"
              type="text"
              required
              placeholder="Enter Your Name"
              {...register("name")}
            />
          </div>
          <div className="mt-3">
            <label className="block mb-2 text-sm font-medium text-gray-600 ">
              Email Address
            </label>
            <input
              id="LoggingEmailAddress"
              className="block w-full px-4 py-3 text-gray-700 bg-white border rounded-lg focus:border-primary focus:ring-opacity-20 focus:outline-none"
              type="email"
              required
              placeholder="Enter Your Email"
              {...register("email")}
            />
          </div>
          <div className="mt-3">
            <label className="block mb-2 text-sm font-medium text-gray-600">
              Photo URL
            </label>
            <input
              type="file"
              required
              {...register("image")}
              className="file-input file-input-bordered block w-full  text-gray-700 bg-white border rounded-lg  focus:border-primary "
            />
          </div>

          {/*<------------ Upozilla & District ------------->*/}

          <div className="flex gap-3">
            {/* <----------- Districts --------> */}
            <div className="mt-3">
              <label className="mb-2 inline-block text-sm font-medium text-gray-600">
                District
              </label>
              <select
                defaultValue="selected"
                {...register("district")}
                className="select select-bordered w-full max-w-xs rounded-lg  focus:border-primary focus:ring-opacity-20 focus:outline-none "
              >
                <option disabled value="selected">
                  Select District
                </option>
                {districts.map((district) => (
                  <option key={district.id} value={district.name}>
                    {district.name}
                  </option>
                ))}
              </select>
            </div>

            {/* <----------- Upazillas --------> */}
            <div className="mt-3">
              <label className="mb-2 inline-block  text-sm font-medium text-gray-600">
                Upazila
              </label>
              <select
                defaultValue="selected"
                {...register("upazila")}
                className="select select-bordered w-full max-w-xs rounded-lg  focus:border-primary focus:ring-opacity-20 focus:outline-none"
              >
                <option disabled value="selected">
                  Select Upazilla
                </option>
                {upazilas.map((upazila) => (
                  <option key={upazila.id} value={upazila.name}>
                    {upazila.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="mt-3">
            <label className="mb-2 text-sm font-medium text-gray-600">
              Blood Group
            </label>
            <select
              defaultValue="selected"
              className="select select-bordered w-full rounded-lg  focus:border-primary focus:ring-opacity-20 focus:outline-none"
              {...register("blood_group")}
            >
              <option disabled value="selected">
                Select Blood Group
              </option>
              <option value="A+">A+</option>
              <option value="A-">A-</option>
              <option value="B+">B+</option>
              <option value="B-">B-</option>
              <option value="O+">O+</option>
              <option value="O-">O-</option>
              <option value="AB+">AB+</option>
              <option value="AB-">AB-</option>
            </select>
          </div>

          {/*<------- Password -------> */}
          <div className="mt-3">
            <div className="flex justify-between">
              <label
                className="block mb-2 text-sm font-medium text-gray-600 "
                htmlFor="loggingPassword"
              >
                Password
              </label>
            </div>
            <div className="relative flex w-full items-center">
              <input
                type={showPass ? "text" : "password"}
                id="loggingPassword"
                className="block w-full px-4 py-3 text-gray-700 bg-white border rounded-lg focus:border-primary focus:ring-opacity-20 focus:outline-none"
                required
                placeholder="Password"
                {...register("password")}
              />
              <span
                onClick={() => setShowPass(!showPass)}
                className="cursor-pointer absolute right-5"
              >
                {showPass ? (
                  <FaRegEyeSlash size={22} />
                ) : (
                  <FaRegEye size={20} />
                )}
              </span>
            </div>
            {/* {error ? (
              <p className="text-xs text-red-600 font-medium mt-2">{error}</p>
            ) : (
              ""
            )} */}
          </div>

          {/*<------- Confirm Password -------> */}
          <div className="mt-3">
            <div className="flex justify-between">
              <label className="block mb-2 text-sm font-medium text-gray-600 ">
                Confirm Password
              </label>
            </div>
            <div className="relative flex w-full items-center">
              <input
                type={showConfirmPass ? "text" : "password"}
                className="block w-full px-4 py-3 text-gray-700 bg-white border rounded-lg focus:border-primary focus:ring-opacity-20 focus:outline-none"
                required
                placeholder="Confirm Password"
                {...register("confirmPassword")}
              />
              <span
                onClick={() => setShowConfirmPass(!showConfirmPass)}
                className="cursor-pointer absolute right-5"
              >
                {showConfirmPass ? (
                  <FaRegEyeSlash size={22} />
                ) : (
                  <FaRegEye size={20} />
                )}
              </span>
            </div>
            {error ? (
              <p className="text-xs text-red-600 font-medium mt-2">{error}</p>
            ) : (
              ""
            )}
          </div>

          <div className="mt-5">
            <button
              disabled={loading}
              className="btn w-full font-semibold  px-6 py-3 text-sm tracking-wide text-white border border-primary hover:border-primary duration-300 transform bg-primary rounded-lg hover:bg-transparent hover:text-black  hover:scale-105 uppercase"
            >
              {loading ? (
                <AiOutlineLoading3Quarters
                  color="#000"
                  size={22}
                  className="animate-spin"
                />
              ) : (
                "Sign Up"
              )}
            </button>
          </div>
        </form>
        <div className="flex items-center justify-between mt-4">
          <span className="w-1/5 border-b  md:w-1/4"></span>

          <Link
            to={"/login"}
            className="text-sm hover:text-primary text-gray-500 uppercase hover:underline underline-offset-[3px]"
          >
            or sign in
          </Link>

          <span className="w-1/5 border-b  md:w-1/4"></span>
        </div>
      </div>
    </div>
  );
};

export default Register;
