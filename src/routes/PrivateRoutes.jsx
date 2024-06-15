import PropTypes from "prop-types";
import { Navigate, useLocation, useNavigation } from "react-router-dom";
import Loader from "../components/Loader/Loader";
import useAuth from "../hooks/useAuth";

const PrivateRoutes = ({ children }) => {
  const { user, isLoading } = useAuth();
  const location = useLocation();
  const navigation = useNavigation();

  if (navigation.state === "loading") return <Loader />;

  if (isLoading) {
    return <Loader />;
  }

  if (!user) {
    console.log(isLoading);
    return (
      <Navigate to="/join-us" state={location.pathname || "/"} replace={true} />
    );
  }

  return <>{children}</>;
};

PrivateRoutes.propTypes = {
  children: PropTypes.node,
};

export default PrivateRoutes;
