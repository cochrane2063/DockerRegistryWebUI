import { useLocation, Outlet, Navigate } from "react-router-dom";
import useAuth from "./hooks/useAuth";
import { Box } from "@mui/material";
import React from "react";

const ProtectedRoute = () => {
  const auth = useAuth();
  const location = useLocation();

  return auth?.isLoggedIn ? (
    <>
      <Box id="drawer-container" sx={{ display: "flex", height: "100%" }}>
        <Box sx={{ flexGrow: 1 }}>
          <Outlet />
        </Box>
      </Box>
    </>
  ) : (
    <Navigate to="/login" state={{ from: location }} replace />
  );
};

export default ProtectedRoute;
