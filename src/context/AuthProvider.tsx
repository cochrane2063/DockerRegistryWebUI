import { createContext, useState } from "react";

interface loginInfo {
  loginNeeded: boolean;
  isLoggedIn: boolean;
  username: string;
  password: string;
}

const AuthContext = createContext<loginInfo>({
  loginNeeded: true,
  isLoggedIn: false,
  username: "",
  password: ""
});

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [auth] = useState<loginInfo>({ loginNeeded: true, isLoggedIn: false, username: "", password: "" });

  return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>;
};

export default AuthContext;
