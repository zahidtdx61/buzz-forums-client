import { Menu, MenuItem, Typography } from "@mui/material";
import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import { AiOutlineClose } from "react-icons/ai";
import { LuMenu } from "react-icons/lu";
import { NavLink, useLocation } from "react-router-dom";
import useAuth from "../../hooks/useAuth";

const NavbarSmDevice = ({ routes, navStyle }) => {
  const [anchorElUser, setAnchorElUser] = useState(null);

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const location = useLocation();
  const pathname = location.pathname;
  const { user } = useAuth();
  useEffect(() => {
    setAnchorElUser(null);
  }, [pathname]);

  return (
    <div>
      <div onClick={handleOpenUserMenu} className="lg:hidden p-1">
        {anchorElUser ? <AiOutlineClose size={40} /> : <LuMenu size={40} />}
      </div>

      <Menu
        sx={{ mt: "45px" }}
        id="menu-appbar"
        anchorEl={anchorElUser}
        anchorOrigin={{
          vertical: "top",
          horizontal: "left",
        }}
        keepMounted
        transformOrigin={{
          vertical: "top",
          horizontal: "left",
        }}
        open={Boolean(anchorElUser)}
        onClose={handleCloseUserMenu}
      >
        {routes.map((route, index) => {
          if (
            route.type === "public" ||
            route.type === "private" ||
            (user && route.type === "private-conditional")
          ) {
            return (
              <MenuItem key={index} onClick={handleCloseUserMenu}>
                <NavLink
                  to={route.path}
                  className={({ isActive }) => navStyle(isActive)}
                >
                  <Typography textAlign="center">{route.name}</Typography>
                </NavLink>
              </MenuItem>
            );
          }
        })}
      </Menu>
    </div>
  );
};

NavbarSmDevice.propTypes = {
  routes: PropTypes.array,
  navStyle: PropTypes.func,
};

export default NavbarSmDevice;
