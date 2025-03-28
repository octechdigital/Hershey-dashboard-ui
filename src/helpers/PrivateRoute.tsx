import { Navigate } from "react-router-dom";
import { ROUTES } from "../lib/consts";
import { useSelector } from "react-redux";

const PrivateRoute = ({ children }: { children: any }) => {
  const accessToken = localStorage.getItem("token");

  // Check if there's no access token
  if (!accessToken) {
    // Redirect to the login page if there's no valid access token
    return <Navigate to={ROUTES.LOGIN} />;
  }

  // Render the protected content or child components
  return children;
};

export default PrivateRoute;
