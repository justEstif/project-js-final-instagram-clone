import { Navigate } from "react-router-dom";
import PropTypes from "prop-types";
import * as ROUTES from "../constants/routes";

const ProtectedRoute = ({ user, children }) => {
  if (!user) {
    return <Navigate to={ROUTES.LOGIN} replace />;
  }

  return children;
};

ProtectedRoute.propTypes = {
  user: PropTypes.object,
  children: PropTypes.object.isRequired,
};
export default ProtectedRoute;
