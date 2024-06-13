import { IoIosNotificationsOutline } from "react-icons/io";
import { NavLink } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import UserInfo from "../UserInfo/UserInfo";
import NavbarSmDevice from "./NavbarSmDevice";

const Navbar = () => {
  const { user } = useAuth();

  const routes = [
    { name: "Home", path: "/", type: "public" },
    { name: "Membership Page", path: "/membership", type: "public" },
    { name: "Notifications", path: "/notification", type: "private" },
    { name: "My Foods", path: "/my-foods", type: "private-conditional" },
    { name: "My Requests", path: "/my-requests", type: "private-conditional" },
  ];

  const navStyle = (isActive) => {
    return [
      isActive ? "text-blue-300" : "text-blue-700",
      isActive
        ? "border-[2px] border-blue-300 rounded  px-2 font-semibold"
        : "font-medium px-2 hover:opacity-75",
      "py-1",
    ].join(" ");
  };

  return (
    <div
      className={`w-full z-50 p-2 lg:py-4 lg:px-8  flex items-center justify-between shadow-lg fixed`}
    >
      <div className="flex flex-row-reverse items-center lg:flex-none">
        <div>
          <h1 className="text-xl md:text-[2rem] font-bold  select-none font-lexend">
            <NavLink to={"/"}>
              <span className="text-4xl">Buzz Forum</span>
            </NavLink>
          </h1>
        </div>
        {/* mobile and tab */}
        <NavbarSmDevice routes={routes} navStyle={navStyle} />
      </div>

      <div
        className={`gap-4 font-bold lg:flex hidden lg:static justify-center items-center`}
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
                  {route.name === "Notifications" ? (
                    <button>
                      <IoIosNotificationsOutline className="text-2xl" />
                    </button>
                  ) : (
                    route.name
                  )}
                </NavLink>
              </ul>
            );
          }
        })}
      </div>

      {user ? (
        <UserInfo />
      ) : (
        <div className="px-5 py-2 bg-blue-600 text-white rounded hover:bg-opacity-70 hover:scale-105">
          <NavLink to={"/join-us"}>Join us</NavLink>
        </div>
      )}
    </div>
  );
};

export default Navbar;
