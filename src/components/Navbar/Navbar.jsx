import { NavLink } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import UserInfo from "../UserInfo/UserInfo";
import NavbarSmDevice from "./NavbarSmDevice";

const Navbar = () => {
  const { user } = useAuth();

  const routes = [
    { name: "Home", path: "/", type: "public" },
    { name: "Available Foods", path: "/available-foods", type: "public" },
    { name: "Add Food", path: "/add-food", type: "private" },
    { name: "My Foods", path: "/my-foods", type: "private-conditional" },
    { name: "My Requests", path: "/my-requests", type: "private-conditional" },
  ];

  const navStyle = (isActive) => {
    return [
      isActive ? "text-green-300" : "text-green-700",
      isActive
        ? "border-[2px] border-green-300 rounded  px-2 font-semibold"
        : "font-medium px-2 hover:opacity-75",
      "py-1",
    ].join(" ");
  };

  return (
    <div
      className={`w-full z-50 p-2 lg:py-4 lg:px-8  flex items-center justify-between shadow-lg fixed`}
    >
      <div className="flex-1 lg:flex-none">
        <h1 className="text-xl md:text-[2rem] font-bold  select-none font-lexend">
          <NavLink to={"/"}>
            <span className="text-4xl">Share and Savor</span>
          </NavLink>
        </h1>
      </div>

      <div
        className={`gap-4 flex-1 font-bold lg:flex hidden lg:static justify-center`}
      >
        {routes.map((route, index) => {
          if (
            route.type === "public" ||
            route.type === "private" ||
            (user && route.type === "private-conditional")
          ) {
            return (
              <ul key={index}>
                <NavLink
                  to={route.path}
                  className={({ isActive }) => navStyle(isActive)}
                >
                  {route.name}
                </NavLink>
              </ul>
            );
          }
        })}
      </div>

      {user ? (
        <div className="lg:flex gap-2 hidden lg:static">
          <UserInfo />
        </div>
      ) : (
        <div className={`lg:flex gap-2 hidden lg:static`}>
          <div className="px-5 py-2 bg-green-600 text-white rounded hover:bg-opacity-70 hover:scale-105">
            <NavLink to={"/login"}>Log In</NavLink>
          </div>
          <div className="px-5 py-2 bg-[#306844] text-white rounded hover:bg-opacity-70 hover:scale-105">
            <NavLink to={"/register"}>Register</NavLink>
          </div>
        </div>
      )}

      {/* mobile and tab */}
      <NavbarSmDevice routes={routes} navStyle={navStyle} />
    </div>
  );
};

export default Navbar;
