import toast from "react-hot-toast";
import { IoLogOutOutline } from "react-icons/io5";
import { Link, NavLink, useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import useAxiosSecure from "../../hooks/useAxiosSecure";

const Sidebar = () => {
  const routes = [
    {
      name: "My Profile",
      path: "/dashboard",
    },
    {
      name: "Add Post",
      path: "/dashboard/add-post",
    },
    {
      name: "My Posts",
      path: "/dashboard/my-posts",
    },
  ];

  const axiosSecure = useAxiosSecure();
  const { logOut, setIsLoading } = useAuth();
  const navigate = useNavigate();

  const navStyle = (isActive) => {
    return [
      isActive ? "text-blue-500" : "text-blue-700",
      isActive
        ? "border-blue-300 rounded  px-2 font-semibold bg-gray-200"
        : "font-medium px-2 hover:opacity-75",
      "py-1 px-8 hover:bg-gray-200 cursor-pointer",
    ].join(" ");
  };

  const handleSignOut = async () => {
    try {
      setIsLoading(true);
      await axiosSecure.get("/user/logout");
      await logOut();
      console.log("Sign out successful");
      navigate("/");
      toast.success("Sign out successful");
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      console.log(error.message);
    }
  };

  return (
    <div className="w-full min-h-svh h-full bg-gray-100 flex flex-col">
      <Link to={"/"} className="p-4 text-center text-4xl font-bold">
        Buzz Forums
      </Link>

      <div className="font-mulish font-medium flex flex-col mt-12 flex-1">
        {routes.map((route) => (
          <NavLink
            key={route.path}
            to={route.path}
            end
            className={({ isActive }) => navStyle(isActive)}
          >
            {route.name}
          </NavLink>
        ))}
      </div>

      <div className="mb-4">
        <button
          className="text-lg font-bold text-center text-zinc-500 flex gap-1 items-center w-full py-2 px-3 hover:bg-zinc-300 cursor-pointer"
          onClick={handleSignOut}
        >
          <IoLogOutOutline size={20} />
          <p>Logout</p>
        </button>
        <h1 className="text-lg font-bold px-3 text-gray-500 mt-4">
          Contact us.
        </h1>
        <p className="text-center text-gray-400 px-2">
          &copy; 2024 Buzz Forums. All rights reserved.
        </p>
      </div>
    </div>
  );
};

export default Sidebar;
