import { NavLink } from "react-router-dom";

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
      path: "/dashboard/posts",
    },
  ];

  const navStyle = (isActive) => {
    return [
      isActive ? "text-blue-300" : "text-blue-700",
      isActive
        ? "border-[2px] border-blue-300 rounded  px-2 font-semibold"
        : "font-medium px-2 hover:opacity-75",
      "py-1 hover:bg-gray-200 cursor-pointer",
    ].join(" ");
  };

  return (
    <div className="w-full min-h-screen bg-gray-100">
      <div className="p-4 text-center">
        <h1 className="text-2xl font-bold">Buzz Forums</h1>
      </div>
      <div className="font-mulish font-medium flex flex-col mt-12">
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
    </div>
  );
};

export default Sidebar;
