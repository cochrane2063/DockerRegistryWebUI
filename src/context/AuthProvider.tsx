import { createContext, useState } from "react";
import Repository from "../interfaces/Repositoriy";

interface loginInfo {
  loginNeeded: boolean;
  isLoggedIn: boolean;
  username: string;
  password: string;
  repositories: Repository[];
}

const AuthContext = createContext<loginInfo>({
  loginNeeded: true,
  isLoggedIn: false,
  username: "",
  password: "",
  repositories: []
});

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [auth] = useState<loginInfo>({ loginNeeded: true, isLoggedIn: false, username: "", password: "", repositories: [] });

  return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>;
};

export default AuthContext;
