import { Avatar, Menu, MenuItem, Typography } from "@mui/material";
import { useState } from "react";
import { Link } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import useAxiosSecure from "../../hooks/useAxiosSecure";

const UserInfo = () => {
  const { user, logOut } = useAuth();
  const { photoURL } = user || {};
  const axiosSecure = useAxiosSecure();
  const [anchorElUser, setAnchorElUser] = useState(null);

  const handleSignOut = async () => {
    try {
      await logOut();
      await axiosSecure.get("sign-out");
      console.log("Sign out successful");
    } catch (error) {
      console.log(error.message);
    }
  };

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const settings = ["Profile", "Dashboard"];

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
