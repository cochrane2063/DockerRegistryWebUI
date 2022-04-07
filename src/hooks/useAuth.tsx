import { useContext } from "react";
import AuthContext from "../context/AuthProvider";

interface loginInfo {
  loginNeeded: boolean;
  isLoggedIn: boolean;
  username: string;
  password: string;
}

const useAuth = () => {
  return useContext<loginInfo>(AuthContext);
};

export default useAuth;