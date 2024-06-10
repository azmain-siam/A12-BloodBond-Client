import { Navigate, useLocation } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import PropTypes from "prop-types";
import useRole from "../hooks/useRole";

const VolunteerRoute = ({ children }) => {
  const { user, loading } = useAuth();
  const [role, isLoading] = useRole();
  const location = useLocation();

  if (loading || isLoading) {
    return;
  }

  if (user && role === "volunteer") {
    return children;
  }

  return <Navigate to={"/login"} state={location?.pathname || "/"}></Navigate>;
};

export default VolunteerRoute;

VolunteerRoute.propTypes = {
  children: PropTypes.node,
};
