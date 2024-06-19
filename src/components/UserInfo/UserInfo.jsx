import { Avatar, Menu, MenuItem, Typography } from "@mui/material";
import { useState } from "react";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import useAxiosSecure from "../../hooks/useAxiosSecure";

const UserInfo = () => {
  const { user, logOut, setIsLoading } = useAuth();
  const { photoURL, displayName } = user || {};
  const axiosSecure = useAxiosSecure();
  const [anchorElUser, setAnchorElUser] = useState(null);
  const navigate = useNavigate();

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

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const settings = ["Dashboard"];

  return (
    <>
      <div className="flex items-center justify-end gap-3">
        <button onClick={handleOpenUserMenu}>
          <Avatar src={photoURL} />
        </button>

        <Menu
          sx={{ mt: "45px" }}
          id="menu-appbar"
          anchorEl={anchorElUser}
          anchorOrigin={{
            vertical: "top",
            horizontal: "right",
          }}
          keepMounted
          transformOrigin={{
            vertical: "top",
            horizontal: "right",
          }}
          open={Boolean(anchorElUser)}
          onClose={handleCloseUserMenu}
        >
          <MenuItem key={"profile"}>
            <Typography textAlign="center">{displayName}</Typography>
          </MenuItem>

          {settings.map((setting) => (
            <MenuItem key={setting} onClick={handleCloseUserMenu}>
              <Link to={`/${setting.toLowerCase()}`}>
                <Typography textAlign="center">{setting}</Typography>
              </Link>
            </MenuItem>
          ))}

          <MenuItem onClick={handleSignOut}>
            <Typography textAlign="center">Logout</Typography>
          </MenuItem>
        </Menu>
      </div>
    </>
  );
};

export default UserInfo;
