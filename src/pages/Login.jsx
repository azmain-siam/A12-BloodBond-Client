import logo from "/logo.png";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa6";
import { Helmet } from "react-helmet";
import { useForm } from "react-hook-form";
import registerLogo from "../assets/register.svg";
import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import toast from "react-hot-toast";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

const Login = () => {
  const { loading, setLoading, signIn, user } = useAuth();
  const { register, handleSubmit } = useForm();
  const [showPass, setShowPass] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  useEffect(() => {
    if (user) {
      navigate("/");
    }
  }, [navigate, user]);

  const onSubmit = async (data) => {
    const { email, password } = data;
    try {
      setLoading(true);
      await signIn(email, password);
      toast.success("Successfully Logged In");
      navigate(location?.state || "/", { replace: true });
      setLoading(false);
    } catch (err) {
      console.log(err.message);
      setError(err.message);
      if (err.message == "Firebase: Error (auth/invalid-credential).") {
        setError(
          "The email or password you entered is incorrect. Please try again!"
        );
      }
      setLoading(false);
    }
  };

  return (
    <div className="flex w-full gap-10 max-w-sm mx-auto border overflow-hidden bg-white rounded-2xl shadow-lg lg:max-w-5xl mt-6 mb-10 pl-10">
      <Helmet>
        <title>Login | HelpHive</title>
      </Helmet>
      <div
        className="hidden bg-contain bg-no-repeat lg:block lg:w-1/2 bg-center"
        style={{ backgroundImage: `url(${registerLogo})` }}
      ></div>

      <div className="w-full px-6 py-8 md:px-8 lg:w-1/2">
        <div className="flex justify-center mx-auto">
          <img className="w-auto h-7 sm:h-10" src={logo} alt="" />
        </div>

        <p className="mt-3 text-2xl font-semibold text-center ">
          Welcome back!
        </p>

        <div className="flex items-center justify-between mt-4">
          <span className="w-1/5 border-b lg:w-1/4"></span>

          <p className="text-xs text-center text-gray-500 uppercase cursor-default">
            login with email
          </p>

          <span className="w-1/5 border-b  lg:w-1/4"></span>
        </div>

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mt-4">
            <label
              className="block mb-2 text-sm font-medium text-gray-600"
              htmlFor="LoggingEmailAddress"
            >
              Email Address
            </label>
            <input
              id="LoggingEmailAddress"
              className="block w-full px-4 py-3 text-gray-700 bg-white border rounded-lg  focus:border-primary focus:ring-opacity-20  focus:outline-none"
              type="email"
              required
              placeholder="Enter Your Email"
              {...register("email")}
            />
          </div>

          <div className="mt-4">
            <div className="flex justify-between">
              <label
                className="block mb-2 text-sm font-medium text-gray-600"
                htmlFor="loggingPassword"
              >
                Password
              </label>
            </div>
            <div className="relative flex w-full items-center">
              <input
                id="loggingPassword"
                className="block w-full px-4 py-3 text-gray-700 bg-white border rounded-lg focus:border-primary focus:ring-opacity-20  focus:outline-none"
                type={showPass ? "text" : "password"}
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

          <div className="mt-6">
            <button
              disabled={loading}
              className="btn w-full font-semibold px-6 py-3 text-sm tracking-wide text-white uppercase border border-primary hover:border-primary duration-300 transform bg-primary rounded-lg hover:bg-transparent hover:text-black hover:scale-105"
            >
              {loading ? (
                <AiOutlineLoading3Quarters
                  color="#000"
                  size={22}
                  className="animate-spin"
                />
              ) : (
                "Sign In"
              )}
            </button>
          </div>
        </form>

        <div className="flex items-center justify-between mt-4">
          <span className="w-1/5 border-b md:w-1/4"></span>

          <Link
            to={"/register"}
            className="text-sm hover:text-primary text-gray-500 uppercase hover:underline underline-offset-[3px]"
          >
            or sign up
          </Link>

          <span className="w-1/5 border-b md:w-1/4"></span>
        </div>
      </div>
    </div>
  );
};

export default Login;
