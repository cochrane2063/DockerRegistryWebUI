import { useLocation, Outlet, Navigate } from "react-router-dom";
import useAuth from "./hooks/useAuth";

const ProtectedRoute = () => {
  const auth = useAuth();
  const location = useLocation();

  return ((auth.loginNeeded !== undefined && !auth.loginNeeded) || auth?.isLoggedIn) ? (
    <>
      <Outlet />
    </>
  ) : (
    <Navigate to="/login" state={{ from: location }} replace />
  );
};

export default ProtectedRoute;
