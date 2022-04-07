import { createContext, useState } from "react";

interface loginInfo {
  uuid: string;
  isLoggedIn: boolean;
}

const AuthContext = createContext<loginInfo>({
  uuid: "",
  isLoggedIn: false,
});

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [auth] = useState<loginInfo>({ uuid: "", isLoggedIn: false });

  return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>;
};

export default AuthContext;
