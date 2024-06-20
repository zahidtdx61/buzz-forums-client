import { useState } from "react";
import { Link, Navigate, useNavigation } from "react-router-dom";
import Loader from "../../components/Loader/Loader";
import Login from "../../components/Login/Login";
import Register from "../../components/Register/Register";
import useAuth from "../../hooks/useAuth";

const JoinUs = () => {
  const [tab, tabIndex] = useState(0);
  const { user, isLoading } = useAuth();

  const navigation = useNavigation();

  if (navigation.state === "loading") return <Loader />;
  if (isLoading) return <Loader />;

  if (user) {
    // toast.error("You are already signed in");
    return <Navigate to="/" />;
  }

  return (
    <section className="flex flex-col items-center justify-center font-mulish">
      <div className="flex flex-col items-center justify-center w-full max-w-2xl p-10 mx-auto my-6 transition duration-500 ease-in-out transform bg-white rounded-lg md:mt-0">
        <Link
          to={"/"}
          className="text-2xl text-center font-medium font-mulish text-blue-600 text-2xl font-bold sm:text-3xl"
        >
          Join Buzz Forums today and connect with a vibrant community!
        </Link>
        <div className="text-center flex gap-2 font-mulish">
          <button
            onClick={() => tabIndex(0)}
            className={`${
              tab === 0 && "border-b-2 border-blue-500 text-blue-500"
            } px-4 py-2`}
          >
            Login
          </button>
          <button
            onClick={() => tabIndex(1)}
            className={`${
              tab === 1 && "border-b-2 border-blue-500 text-blue-500"
            } px-4 py-2`}
          >
            Register
          </button>
        </div>

        <div>{tab === 0 ? <Login tabIndex={tabIndex} /> : <Register />}</div>
      </div>
    </section>
  );
};

export default JoinUs;
