import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa6";
import logo from "/logo.png";
import { useState } from "react";
import useAuth from "../hooks/useAuth";
import toast from "react-hot-toast";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import auth from "../firebase/firebase.config";
import { useEffect } from "react";
import axios from "axios";
import { Helmet } from "react-helmet";
import registerLogo from "../assets/login.svg";

const Register = () => {
  const { user } = useAuth();
  const { createUser, updateUser, setLoading } = useAuth();
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      navigate("/");
    }
  }, [navigate, user]);

  const { register, handleSubmit } = useForm();
  const [showPass, setShowPass] = useState(false);
  const passwordRegex = /^(?=.*[A-Z])(?=.*[a-z])/;

  const handleRegister = async (data) => {
    const { email, password, image, fullName } = data;
    if (password.length < 6) {
      setError("Password must have at least 6 charecters");
      return;
    }
    if (!passwordRegex.test(password)) {
      setError(
        "Password must contain at least one uppercase and lowercase letter"
      );
      return;
    }
    // createUser(email, password)
    //   .then(() => {
    //     updateUser(fullName, image).then(() => {
    //       navigate(location?.state || "/");
    //       notifySuccess();
    //     });
    //   })
    //   .catch((error) => {
    //     setError(error);
    //     notifyError();
    //   });
    try {
      // 1. google sign in from firebase
      const result = await createUser(email, password);
      console.log(result.user);
      await updateUser(fullName, image);

      //2. get token from server using email
      const { data } = await axios.post(
        `https://helphive.vercel.app/jwt`,
        {
          email: result?.user?.email,
        },
        { withCredentials: true }
      );
      console.log(data);
      toast.success("Successfully Registered");
      navigate(location?.state || "/", { replace: true });
      setLoading(false);
    } catch (err) {
      console.log(err);
      toast.error(err?.message);
    }
  };
  const googleProvider = new GoogleAuthProvider();

  const googleSignin = async () => {
    setLoading(true);
    try {
      // 1. google sign in from firebase
      const result = await signInWithPopup(auth, googleProvider);
      console.log(result.user);

      //2. get token from server using email
      const { data } = await axios.post(
        `https://helphive.vercel.app/jwt`,
        {
          email: result?.user?.email,
        },
        { withCredentials: true }
      );
      console.log(data);
      toast.success("Signin Successful");
      navigate(location?.state || "/", { replace: true });
    } catch (err) {
      console.log(err);
      toast.error(err?.message);
    }
  };

  return (
    <div className="flex flex-row-reverse w-full max-w-sm mx-auto overflow-hidden bg-white rounded-lg shadow-lg dark:bg-transparent lg:max-w-5xl mt-6 mb-10 border dark:border-none">
      <Helmet>
        <title>Register | HelpHive</title>
      </Helmet>
      <div
        className="hidden bg-contain bg-no-repeat bg-center lg:block lg:w-1/2 mr-4"
        style={{ backgroundImage: `url(${registerLogo})` }}
      ></div>

      <div className="w-full px-6 py-8 md:px-8 lg:w-1/2">
        <div className="flex justify-center mx-auto">
          <img className="w-auto h-7 sm:h-10" src={logo} alt="" />
        </div>

        <p className="mt-3 text-2xl font-semibold text-center dark:text-gray-200">
          Hello There!
        </p>

        <button
          onClick={googleSignin}
          className="flex w-full items-center justify-center mt-4  transition-colors duration-300 transform border rounded-lg dark:border-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-600 hover:border-primary"
        >
          <div className="px-4 py-2">
            <svg className="w-6 h-6" viewBox="0 0 40 40">
              <path
                d="M36.3425 16.7358H35V16.6667H20V23.3333H29.4192C28.045 27.2142 24.3525 30 20 30C14.4775 30 10 25.5225 10 20C10 14.4775 14.4775 9.99999 20 9.99999C22.5492 9.99999 24.8683 10.9617 26.6342 12.5325L31.3483 7.81833C28.3717 5.04416 24.39 3.33333 20 3.33333C10.7958 3.33333 3.33335 10.7958 3.33335 20C3.33335 29.2042 10.7958 36.6667 20 36.6667C29.2042 36.6667 36.6667 29.2042 36.6667 20C36.6667 18.8825 36.5517 17.7917 36.3425 16.7358Z"
                fill="#FFC107"
              />
              <path
                d="M5.25497 12.2425L10.7308 16.2583C12.2125 12.59 15.8008 9.99999 20 9.99999C22.5491 9.99999 24.8683 10.9617 26.6341 12.5325L31.3483 7.81833C28.3716 5.04416 24.39 3.33333 20 3.33333C13.5983 3.33333 8.04663 6.94749 5.25497 12.2425Z"
                fill="#FF3D00"
              />
              <path
                d="M20 36.6667C24.305 36.6667 28.2167 35.0192 31.1742 32.34L26.0159 27.975C24.3425 29.2425 22.2625 30 20 30C15.665 30 11.9842 27.2359 10.5975 23.3784L5.16254 27.5659C7.92087 32.9634 13.5225 36.6667 20 36.6667Z"
                fill="#4CAF50"
              />
              <path
                d="M36.3425 16.7358H35V16.6667H20V23.3333H29.4192C28.7592 25.1975 27.56 26.805 26.0133 27.9758C26.0142 27.975 26.015 27.975 26.0158 27.9742L31.1742 32.3392C30.8092 32.6708 36.6667 28.3333 36.6667 20C36.6667 18.8825 36.5517 17.7917 36.3425 16.7358Z"
                fill="#1976D2"
              />
            </svg>
          </div>

          <span className="w-5/6 px-4 py-3 font-semibold text-center">
            Sign Up with Google
          </span>
        </button>

        <div className="flex items-center justify-between mt-4">
          <span className="w-1/5 border-b dark:border-gray-600 lg:w-1/4"></span>

          <p className="text-xs text-center text-gray-500 uppercase dark:text-gray-400 cursor-default">
            or register with email
          </p>

          <span className="w-1/5 border-b dark:border-gray-400 lg:w-1/4"></span>
        </div>

        <form onSubmit={handleSubmit(handleRegister)}>
          <div className="mt-3">
            <label
              className="block mb-2 text-sm font-medium text-gray-600 dark:text-gray-200"
              htmlFor="LoggingEmailAddress"
            >
              Name
            </label>
            <input
              className="block w-full px-4 py-3 text-gray-700 bg-white border rounded-lg dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-primary focus:ring-opacity-20 dark:focus:border-primary focus:outline-none"
              type="text"
              required
              placeholder="Enter Your Name"
              {...register("fullName")}
            />
          </div>
          <div className="mt-3">
            <label
              className="block mb-2 text-sm font-medium text-gray-600 dark:text-gray-200"
              htmlFor="LoggingEmailAddress"
            >
              Email Address
            </label>
            <input
              id="LoggingEmailAddress"
              className="block w-full px-4 py-3 text-gray-700 bg-white border rounded-lg dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-primary focus:ring-opacity-20 dark:focus:border-primary focus:outline-none"
              type="email"
              required
              placeholder="Enter Your Email"
              {...register("email")}
            />
          </div>
          <div className="mt-3">
            <label
              className="block mb-2 text-sm font-medium text-gray-600 dark:text-gray-200"
              htmlFor="LoggingEmailAddress"
            >
              Photo URL
            </label>
            <input
              className="block w-full px-4 py-3 text-gray-700 bg-white border rounded-lg dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-primary focus:ring-opacity-20 dark:focus:border-primary focus:outline-none"
              type="text"
              placeholder="Photo URL"
              {...register("image")}
            />
          </div>

          <div className="mt-3">
            <div className="flex justify-between">
              <label
                className="block mb-2 text-sm font-medium text-gray-600 dark:text-gray-200"
                htmlFor="loggingPassword"
              >
                Password
              </label>
            </div>
            <div className="relative flex w-full items-center">
              <input
                type={showPass ? "text" : "password"}
                id="loggingPassword"
                className="block w-full px-4 py-3 text-gray-700 bg-white border rounded-lg dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-primary focus:ring-opacity-20 dark:focus:border-primary focus:outline-none"
                required
                placeholder="Enter Your Password"
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
            {error ? (
              <p className="text-xs text-red-600 font-medium mt-2">{error}</p>
            ) : (
              ""
            )}
          </div>

          <div className="mt-5">
            <button className="btn w-full font-semibold px-6 py-3 text-sm tracking-wide text-white border border-primary hover:border-primary duration-300 transform bg-primary rounded-lg hover:bg-transparent hover:text-black dark:hover:text-white hover:scale-105 uppercase">
              Sign Up
            </button>
          </div>
        </form>
        <div className="flex items-center justify-between mt-4">
          <span className="w-1/5 border-b dark:border-gray-600 md:w-1/4"></span>

          <Link
            to={"/login"}
            className="text-sm hover:text-primary text-gray-500 uppercase dark:text-gray-400 hover:underline underline-offset-[3px]"
          >
            or sign in
          </Link>

          <span className="w-1/5 border-b dark:border-gray-600 md:w-1/4"></span>
        </div>
      </div>
    </div>
  );
};

export default Register;
