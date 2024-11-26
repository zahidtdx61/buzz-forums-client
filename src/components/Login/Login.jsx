import PropTypes from "prop-types";
import { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { Link, useLocation, useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import useAxiosSecure from "../../hooks/useAxiosSecure";

const SignIn = ({ tabIndex }) => {
  const { register, handleSubmit } = useForm();
  const [isPasswordHidden, setPasswordHidden] = useState(true);

  const navigate = useNavigate();
  const location = useLocation();
  const prevPage = location?.state || "/";

  const { setUser, setIsLoading, signInEmail, signInGoogle, signInGithub } =
    useAuth();

  const session = useAxiosSecure();
  //  name, email, uid, image
  const addUserToDatabase = async (user) => {
    const { uid, email, displayName, photoURL } = user;
    try {
      // console.log({ uid, email, displayName, photoURL, session });
      const response = await session.post("/user/register", {
        uid,
        email,
        name: displayName,
        image: photoURL,
      });
      console.log(response);
    } catch (error) {
      console.log("Error: ", error);
    }
  };

  const handleSignIn = async (data) => {
    const { email, password } = data;
    try {
      const result = await signInEmail(email, password);
      navigate(prevPage);
      toast.success("Welcome to PharmaMart !!!");
      addUserToDatabase(result.user);
    } catch (error) {
      setIsLoading(false);
      setUser(null);
      toast.error("Wrong credentials !!!");
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      const result = await signInGoogle();
      const user = result.user;
      setUser(user);
      navigate(prevPage);
      toast.success("Welcome to PharmaMart !!!");
      addUserToDatabase(user);
    } catch (error) {
      setIsLoading(false);
      setUser(null);
      toast.error("Google sign in failed !!!");
    }
  };

  const handleGithubSignIn = async () => {
    try {
      const result = await signInGithub();
      const user = result.user;
      setUser(user);
      navigate(prevPage);
      toast.success("Welcome to PharmaMart !!!");
      addUserToDatabase(user);
    } catch (error) {
      // console.log(error.code);
      setIsLoading(false);
      setUser(null);
      if (error.code === "auth/account-exists-with-different-credential") {
        toast.error("Email already in use with other provider !!!");
        return;
      }

      toast.error("Twitter sign in failed !!!");
    }
  };

  return (
    <>
      <section className="relative w-full min-h-[calc(100vh-80px)] flex flex-col items-center justify-start mt-4 px-4">
        <div className="max-w-sm w-full text-gray-600 space-y-5">
          <div className="text-center pb-8">
            <div className="mt-5">
              <h3 className="text-primary-teal font-bold sm:text-3xl">
                Sign in to your account
              </h3>
            </div>
          </div>

          {/* SignIn form */}
          <form
            onSubmit={handleSubmit(handleSignIn)}
            className="space-y-5 mx-auto"
          >
            <div>
              <label className="font-medium">Email</label>
              <input
                {...register("email")}
                required
                type="email"
                placeholder="Enter your email"
                defaultValue={"user@user.user"}
                className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-gray-600 shadow-sm rounded-lg"
              />
            </div>

            <div>
              <label className="font-medium">Password</label>
              <div className="relative max-w-full mt-2">
                <span
                  className="text-gray-400 absolute top-4 right-3 inset-y-0 my-auto active:text-gray-600"
                  onClick={() => setPasswordHidden(!isPasswordHidden)}
                >
                  {!isPasswordHidden ? (
                    <svg
                      className="w-6 h-6"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                    </svg>
                  ) : (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="w-6 h-6"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88"
                      />
                    </svg>
                  )}
                </span>
                <input
                  name="password"
                  {...register("password")}
                  required
                  type={isPasswordHidden ? "password" : "text"}
                  placeholder="Enter your password"
                  defaultValue={"User123"}
                  className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-gray-600 shadow-sm rounded-lg"
                />
              </div>
            </div>
            <div className="flex items-center justify-between text-sm">
              <div className="flex items-center gap-x-3">
                <input
                  type="checkbox"
                  id="remember-me-checkbox"
                  className="checkbox-item peer hidden"
                />
                <label
                  htmlFor="remember-me-checkbox"
                  className="relative flex w-5 h-5 bg-zinc-200 peer-checked:bg-primary-teal rounded-md border ring-offset-2 ring-primary-teal duration-150 peer-active:ring cursor-pointer after:absolute after:inset-x-0 after:top-[3px] after:m-auto after:w-1.5 after:h-2.5 after:border-r-2 after:border-b-2 after:border-white after:rotate-45"
                ></label>
                <span>Remember me</span>
              </div>
              <Link
                // @TODO: Add forgot password page
                className="text-center text-indigo-600 hover:text-indigo-500"
              >
                Forgot password?
              </Link>
            </div>

            <input
              type="submit"
              className="w-full px-4 py-2 text-white font-medium bg-primary-teal  hover:bg-primary-green active:bg-primary-teal rounded-lg duration-150 hover:cursor-pointer"
              value="Log In"
            />
          </form>

          {/* social SignIn */}
          {/* google SignIn */}
          <button
            onClick={handleGoogleSignIn}
            className="w-full flex items-center justify-center gap-x-3 py-2.5 border rounded-lg text-sm font-medium hover:bg-gray-50 duration-150 active:bg-gray-100"
          >
            <svg
              className="w-5 h-5"
              viewBox="0 0 48 48"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g clipPath="url(#clip0_17_40)">
                <path
                  d="M47.532 24.5528C47.532 22.9214 47.3997 21.2811 47.1175 19.6761H24.48V28.9181H37.4434C36.9055 31.8988 35.177 34.5356 32.6461 36.2111V42.2078H40.3801C44.9217 38.0278 47.532 31.8547 47.532 24.5528Z"
                  fill="#4285F4"
                />
                <path
                  d="M24.48 48.0016C30.9529 48.0016 36.4116 45.8764 40.3888 42.2078L32.6549 36.2111C30.5031 37.675 27.7252 38.5039 24.4888 38.5039C18.2275 38.5039 12.9187 34.2798 11.0139 28.6006H3.03296V34.7825C7.10718 42.8868 15.4056 48.0016 24.48 48.0016Z"
                  fill="#34A853"
                />
                <path
                  d="M11.0051 28.6006C9.99973 25.6199 9.99973 22.3922 11.0051 19.4115V13.2296H3.03298C-0.371021 20.0112 -0.371021 28.0009 3.03298 34.7825L11.0051 28.6006Z"
                  fill="#FBBC04"
                />
                <path
                  d="M24.48 9.49932C27.9016 9.44641 31.2086 10.7339 33.6866 13.0973L40.5387 6.24523C36.2 2.17101 30.4414 -0.068932 24.48 0.00161733C15.4055 0.00161733 7.10718 5.11644 3.03296 13.2296L11.005 19.4115C12.901 13.7235 18.2187 9.49932 24.48 9.49932Z"
                  fill="#EA4335"
                />
              </g>
              <defs>
                <clipPath id="clip0_17_40">
                  <rect width="48" height="48" fill="white" />
                </clipPath>
              </defs>
            </svg>
            Continue with Google
          </button>

          {/* github SignIn */}
          <button
            onClick={handleGithubSignIn}
            className="w-full flex items-center justify-center gap-x-3 py-2.5 border rounded-lg text-sm font-medium hover:bg-gray-50 duration-150 active:bg-gray-100"
          >
            <svg
              className="w-5 h-5"
              viewBox="0 0 48 48"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M0 24C0 10.7452 10.7452 0 24 0C37.2548 0 48 10.7452 48 24C48 37.2548 37.2548 48 24 48C10.7452 48 0 37.2548 0 24Z"
                fill="#55ACEE"
              />
              <path
                d="M23.2812 19.5075L23.3316 20.338L22.4922 20.2363C19.4369 19.8465 16.7677 18.5245 14.5013 16.3043L13.3934 15.2027L13.108 16.0162C12.5036 17.8297 12.8897 19.7448 14.1488 21.0328C14.8203 21.7447 14.6692 21.8464 13.5109 21.4227C13.108 21.2871 12.7554 21.1854 12.7219 21.2362C12.6044 21.3549 13.0073 22.8971 13.3262 23.5073C13.7627 24.3547 14.6524 25.1851 15.6261 25.6766L16.4487 26.0664L15.475 26.0834C14.5349 26.0834 14.5013 26.1003 14.6021 26.4562C14.9378 27.5578 16.264 28.7273 17.7413 29.2357L18.7822 29.5916L17.8756 30.1339C16.5326 30.9136 14.9546 31.3542 13.3766 31.3881C12.6211 31.4051 12 31.4728 12 31.5237C12 31.6932 14.0481 32.6423 15.24 33.0151C18.8157 34.1167 23.063 33.6422 26.2526 31.761C28.5189 30.4221 30.7852 27.7612 31.8428 25.1851C32.4136 23.8123 32.9844 21.304 32.9844 20.1007C32.9844 19.3211 33.0347 19.2194 33.9748 18.2873C34.5288 17.7449 35.0492 17.1517 35.15 16.9823C35.3178 16.6603 35.3011 16.6603 34.4449 16.9484C33.018 17.4568 32.8165 17.389 33.5216 16.6264C34.042 16.084 34.6631 15.101 34.6631 14.8129C34.6631 14.7621 34.4113 14.8468 34.1259 14.9993C33.8238 15.1688 33.1523 15.423 32.6486 15.5756L31.7421 15.8637L30.9195 15.3044C30.4663 14.9993 29.8283 14.6604 29.4926 14.5587C28.6364 14.3214 27.327 14.3553 26.5548 14.6265C24.4563 15.3892 23.1301 17.3551 23.2812 19.5075Z"
                fill="white"
              />
            </svg>
            Continue with Twitter
          </button>

          <p className="text-center">
            Don&apos;t have an account?{" "}
            <button
              onClick={() => tabIndex(1)}
              className="font-medium text-indigo-600 hover:text-indigo-500"
            >
              Register
            </button>
          </p>
        </div>
        <div
          id={`sign-in-anchor`}
          className="absolute left-0 bottom-[35%]"
        ></div>
      </section>
    </>
  );
};

SignIn.propTypes = {
  tabIndex: PropTypes.func,
};

export default SignIn;
