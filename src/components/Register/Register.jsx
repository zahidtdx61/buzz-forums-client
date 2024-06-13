import { Divider } from "@mui/material";
import { useState } from "react";
import { Helmet } from "react-helmet-async";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { Link, Navigate, useLocation, useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import useAxiosSecure from "../../hooks/useAxiosSecure";

const Register = () => {
  const { register, handleSubmit } = useForm();
  const {
    signUpEmail,
    setUser,
    setIsLoading,
    updateUser,
    signInGoogle,
    signInGithub,
    user,
  } = useAuth();

  const [isPasswordHidden, setPasswordHidden] = useState(true);

  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [nameError, setNameError] = useState(false);
  const [photoUrlError, setPhotoUrlError] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();
  const prevPage = location?.state || "/";

  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  const isValidEmail = (email) => emailRegex.test(email);
  const containsUppercase = (str) => {
    return /[A-Z]/.test(str);
  };
  const containsLowercase = (str) => {
    return /[a-z]/.test(str);
  };
  const containsNumber = (str) => {
    return /\d/.test(str);
  };

  const session = useAxiosSecure();
  const addUserToDatabase = async (user) => {
    const { uid, email, displayName, photoURL } = user;
    try {
      // console.log({ uid, email, displayName, photoURL, session });
      await session.post("/add-user", {
        uid: uid,
        email,
        name: displayName,
        image: photoURL,
      });
      // console.log(response);
    } catch (error) {
      console.log("Error: ", error);
    }
  };

  const handleSignUp = async (data) => {
    const { name, email, image, password } = data;

    setEmailError(false);
    setPasswordError(false);

    // name validation
    if (name.length === 0) {
      setNameError("This field is required");
      return;
    }

    // photo url validation
    if (image.length === 0) {
      setPhotoUrlError("This field is required");
      return;
    }

    // validate email
    if (email.length === 0) {
      setEmailError("This field is required");
      return;
    }
    if (!isValidEmail(email)) {
      setEmailError("Invalid email address domain");
      return;
    }

    // validate password
    if (password.length < 6) {
      setPasswordError("Password must be at least 6 characters long");
      return;
    }
    if (!containsUppercase(password)) {
      setPasswordError("Password must contain at least one uppercase letter");
      return;
    }
    if (!containsLowercase(password)) {
      setPasswordError("Password must contain at least one lowercase letter");
      return;
    }
    if (!containsNumber(password)) {
      setPasswordError("Password must contain at least one number");
      return;
    }

    console.log(data);
    return;

    try {
      const result = await signUpEmail(email, password);
      const { user } = result;
      console.log("Before Update", user);

      await updateUser(name, photoUrl);
      setUser({ ...user, displayName: name, photoURL: photoUrl });
      setIsLoading(false);
      console.log("after update", user);

      navigate(prevPage);
      toast.success("Welcome to Serenity Seekers !!!");
      addUserToDatabase(user);
    } catch (error) {
      // console.error('get error: ', error.code, error.message);
      if (error.code === "auth/email-already-in-use")
        toast.error("Email already in use");
      setIsLoading(false);
      setUser(null);
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      const result = await signInGoogle();
      const user = result.user;
      setUser(user);
      navigate(prevPage);
      toast.success("Welcome to Serenity Seekers !!!");
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
      toast.success("Welcome to Serenity Seekers !!!");
      addUserToDatabase(user);
    } catch (error) {
      setIsLoading(false);
      setUser(null);
      toast.error("Github sign in failed !!!");
    }
  };

  if (user) {
    toast.error("You are already signed in");
    return <Navigate to="/" />;
  }

  return (
    <>
      <Helmet>
        <title>Share and Savor | Register</title>
      </Helmet>

      <div className="w-full flex mb-4 relative min-h-[calc(100vh-116px)]">
        <div className="flex-1 flex items-center justify-center h-full">
          <div className="w-full max-w-md px-4  text-gray-600 sm:px-0">
            <div className="">
              <div className="mt-5 space-y-1">
                <h3 className="text-blue-600 text-2xl font-bold sm:text-3xl">
                  Register
                </h3>
                <p className="">
                  Already have an account?{" "}
                  <Link
                    to={"/login"}
                    className="font-medium text-indigo-600 hover:text-indigo-500"
                  >
                    Log in
                  </Link>
                </p>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-x-3 my-4">
              <button
                onClick={handleGoogleSignIn}
                data-aos="zoom-in"
                className="flex items-center justify-center py-2 border rounded-lg hover:bg-gray-50 duration-150 active:bg-gray-100"
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
              </button>
              <button
                onClick={handleGithubSignIn}
                className="flex items-center justify-center py-2 border rounded-lg hover:bg-gray-50 duration-150 active:bg-gray-100"
              >
                <svg
                  className="w-5 h-5"
                  viewBox="0 0 48 48"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <g clipPath="url(#clip0_910_21)">
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M24.0005 1C18.303 1.00296 12.7923 3.02092 8.45374 6.69305C4.11521 10.3652 1.23181 15.452 0.319089 21.044C-0.593628 26.636 0.523853 32.3684 3.47174 37.2164C6.41963 42.0643 11.0057 45.7115 16.4099 47.5059C17.6021 47.7272 18.0512 46.9883 18.0512 46.36C18.0512 45.7317 18.0273 43.91 18.0194 41.9184C11.3428 43.3608 9.93197 39.101 9.93197 39.101C8.84305 36.3349 7.26927 35.6078 7.26927 35.6078C5.09143 34.1299 7.43223 34.1576 7.43223 34.1576C9.84455 34.3275 11.1123 36.6194 11.1123 36.6194C13.2504 40.2667 16.7278 39.2116 18.0949 38.5952C18.3095 37.0501 18.9335 35.999 19.621 35.4023C14.2877 34.8017 8.68408 32.7548 8.68408 23.6108C8.65102 21.2394 9.53605 18.9461 11.156 17.2054C10.9096 16.6047 10.087 14.1785 11.3905 10.8829C11.3905 10.8829 13.4054 10.2427 17.9916 13.3289C21.9253 12.2592 26.0757 12.2592 30.0095 13.3289C34.5917 10.2427 36.6026 10.8829 36.6026 10.8829C37.9101 14.1706 37.0875 16.5968 36.8411 17.2054C38.4662 18.9464 39.353 21.2437 39.317 23.6187C39.317 32.7824 33.7015 34.8017 28.3602 35.3905C29.2186 36.1334 29.9856 37.5836 29.9856 39.8122C29.9856 43.0051 29.9578 45.5736 29.9578 46.36C29.9578 46.9962 30.391 47.7391 31.6071 47.5059C37.0119 45.7113 41.5984 42.0634 44.5462 37.2147C47.4941 32.3659 48.611 26.6326 47.6972 21.0401C46.7835 15.4476 43.8986 10.3607 39.5587 6.68921C35.2187 3.01771 29.7067 1.00108 24.0085 1H24.0005Z"
                      fill="#191717"
                    />
                    <path
                      d="M9.08887 35.264C9.03721 35.3826 8.84645 35.4181 8.69146 35.3351C8.53646 35.2522 8.42122 35.098 8.47686 34.9755C8.5325 34.853 8.71928 34.8214 8.87428 34.9044C9.02927 34.9874 9.14848 35.1455 9.08887 35.264Z"
                      fill="#191717"
                    />
                    <path
                      d="M10.0626 36.3428C9.98028 36.384 9.88612 36.3955 9.79622 36.3753C9.70632 36.3551 9.62629 36.3045 9.56979 36.2321C9.41479 36.0662 9.38298 35.837 9.50221 35.7342C9.62143 35.6315 9.83606 35.6789 9.99105 35.8449C10.146 36.0108 10.1818 36.24 10.0626 36.3428Z"
                      fill="#191717"
                    />
                    <path
                      d="M11.0085 37.714C10.8614 37.8167 10.6111 37.714 10.472 37.5085C10.4335 37.4716 10.4029 37.4274 10.382 37.3785C10.3611 37.3297 10.3503 37.2771 10.3503 37.224C10.3503 37.1709 10.3611 37.1183 10.382 37.0694C10.4029 37.0205 10.4335 36.9763 10.472 36.9395C10.619 36.8407 10.8694 36.9395 11.0085 37.141C11.1476 37.3425 11.1516 37.6112 11.0085 37.714Z"
                      fill="#191717"
                    />
                    <path
                      d="M12.2921 39.0417C12.161 39.1879 11.8947 39.1484 11.6761 38.9508C11.4575 38.7532 11.4059 38.4845 11.537 38.3423C11.6682 38.2 11.9344 38.2395 12.161 38.4331C12.3875 38.6268 12.4312 38.8994 12.2921 39.0417Z"
                      fill="#191717"
                    />
                    <path
                      d="M14.0923 39.8162C14.0327 40.0019 13.7625 40.0849 13.4922 40.0059C13.222 39.9268 13.0432 39.7055 13.0948 39.5159C13.1465 39.3262 13.4207 39.2393 13.6949 39.3262C13.9691 39.4131 14.144 39.6226 14.0923 39.8162Z"
                      fill="#191717"
                    />
                    <path
                      d="M16.0557 39.9505C16.0557 40.1442 15.8331 40.3101 15.547 40.3141C15.2608 40.318 15.0264 40.16 15.0264 39.9663C15.0264 39.7727 15.2489 39.6067 15.535 39.6028C15.8212 39.5988 16.0557 39.753 16.0557 39.9505Z"
                      fill="#191717"
                    />
                    <path
                      d="M17.8838 39.6463C17.9196 39.8399 17.7208 40.0414 17.4347 40.0888C17.1486 40.1363 16.8982 40.0217 16.8624 39.832C16.8267 39.6423 17.0333 39.4368 17.3115 39.3855C17.5897 39.3341 17.848 39.4526 17.8838 39.6463Z"
                      fill="#191717"
                    />
                  </g>
                  <defs>
                    <clipPath id="clip0_910_21">
                      <rect width="48" height="48" fill="white" />
                    </clipPath>
                  </defs>
                </svg>
              </button>
            </div>

            <Divider className="text-sm ">Or continue with</Divider>

            {/* sign up form */}
            <form onSubmit={handleSubmit(handleSignUp)} className="space-y-5">
              <div>
                <label className="font-medium">Name</label>
                <input
                  type="text"
                  {...register("name")}
                  required
                  className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-gray-600 shadow-sm rounded-lg"
                  placeholder="Enter Your Name"
                />
                {nameError && (
                  <p className="text-xs text-red-700 my-0">{nameError}</p>
                )}
              </div>

              <div>
                <label className="font-medium">Email</label>
                <input
                  {...register("email")}
                  required
                  type="email"
                  placeholder="Enter your email"
                  className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-gray-600 shadow-sm rounded-lg"
                />
                {emailError && (
                  <p className="text-xs text-red-700 my-0">{emailError}</p>
                )}
              </div>

              <div>
                <label htmlFor="image" className="font-medium">
                  Select Image:
                </label>
                <input
                  required
                  type="file"
                  {...register("image")}
                  accept="image/*"
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
                    required
                    {...register("password")}
                    type={isPasswordHidden ? "password" : "text"}
                    placeholder="Enter your password"
                    className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-gray-600 shadow-sm rounded-lg"
                  />
                  {passwordError && (
                    <p className="text-xs text-red-700 my-0">{passwordError}</p>
                  )}
                </div>
              </div>

              <button className="w-full px-4 py-2 text-white font-medium bg-blue-600 hover:bg-blue-500 active:bg-blue-600 rounded-lg duration-150">
                Create account
              </button>
            </form>
          </div>
        </div>

        <div className="absolute left-0 bottom-[25%]"></div>
      </div>
    </>
  );
};

export default Register;
