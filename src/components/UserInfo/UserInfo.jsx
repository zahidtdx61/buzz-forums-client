import { Avatar } from "@mui/material";
import { NavLink } from "react-router-dom";
import { Tooltip } from "react-tooltip";
import useAuth from "../../hooks/useAuth";
import useAxiosSecure from "../../hooks/useAxiosSecure";

const UserInfo = () => {
  const { user, logOut } = useAuth();
  const { displayName, photoURL } = user;
  const axiosSecure = useAxiosSecure();

  const handleSignOut = async () => {
    try {
      await logOut();
      await axiosSecure.get("sign-out");
      console.log("Sign out successful");
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <>
      <div className="flex items-center justify-end gap-3">
        <button
          data-tooltip-id="my-tooltip"
          data-tooltip-content={displayName || "Not available"}
        >
          <Avatar src={photoURL} />
        </button>
        <Tooltip id="my-tooltip" />
        <button
          onClick={handleSignOut}
          className="px-5 py-2 bg-primary-maroon text-slate-50 rounded hover:bg-opacity-70 hover:scale-105 hidden lg:block"
        >
          <NavLink to={"/"}>Log Out</NavLink>
        </button>
      </div>
    </>
  );
};

export default UserInfo;
