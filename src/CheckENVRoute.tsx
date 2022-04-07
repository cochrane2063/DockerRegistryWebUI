import { Outlet } from "react-router-dom";
import ErrorENV from "./components/ErrorENV"
import React from "react";

const CheckENVRoute: React.FC = () => {

  return process.env.REGISTRY_URL ? (
    <>
        <Outlet />
    </>
  ) : (
    <ErrorENV />
  );
};

export default CheckENVRoute;