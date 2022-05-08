import { Outlet } from "react-router-dom";
import ErrorENV from "./components/UtilityComponents/ErrorENV"
import React from "react";

const CheckENVRoute: React.FC = () => {

  return process.env.REACT_APP_REGISTRY_URL ? (
    <>
        <Outlet />
    </>
  ) : (
    <ErrorENV />
  );
};

export default CheckENVRoute;