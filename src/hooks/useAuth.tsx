import { useContext } from "react";
import AuthContext from "../context/AuthProvider";
import Repository from "../interfaces/Repositoriy";

interface loginInfo {
  loginNeeded: boolean;
  isLoggedIn: boolean;
  username: string;
  password: string;
  repositories: Repository[];
}

const useAuth = () => {
  return useContext<loginInfo>(AuthContext);
};

export default useAuth;