import { useContext } from "react";
import AuthContext from "../context/AuthProvider";

interface loginInfo {
  uuid: string;
  isLoggedIn: boolean;
}

const useAuth = () => {
  return useContext<loginInfo>(AuthContext);
};

export default useAuth;