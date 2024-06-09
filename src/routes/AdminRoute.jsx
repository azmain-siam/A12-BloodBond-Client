import { Navigate, useLocation } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import PropTypes from "prop-types";
import useAdmin from "../hooks/useAdmin";

const AdminRoute = ({ children }) => {
  const { user, loading } = useAuth();
  const [isAdmin, isAdminLoading] = useAdmin();
  const location = useLocation();

  if (loading || isAdminLoading) {
    return;
  }

  if (user && isAdmin) {
    return children;
  }

  return <Navigate to={"/login"} state={location?.pathname || "/"}></Navigate>;
};

export default AdminRoute;

AdminRoute.propTypes = {
  children: PropTypes.node,
};
