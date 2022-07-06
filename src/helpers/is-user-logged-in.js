import { Navigate } from "react-router-dom";
import PropTypes from "prop-types";
import * as ROUTES from "../constants/routes";

const IsUserLoggedIn = ({ user, children }) => {
  if (user) {
    return <Navigate to={ROUTES.DASHBOARD} replace />;
  }
  return children;
};

IsUserLoggedIn.propTypes = {
  user: PropTypes.object,
  children: PropTypes.object.isRequired,
};
export default IsUserLoggedIn;
