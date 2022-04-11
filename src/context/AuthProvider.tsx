import { createContext, useState } from "react";

export interface loginInfo {
  loginNeeded: boolean;
  isLoggedIn: boolean;
  username: string;
  password: string;
}

interface MyAuthState {
  auth: loginInfo;
  setAuth: React.Dispatch<React.SetStateAction<loginInfo>>
}


const AuthContext = createContext<MyAuthState>({
  auth: {
    loginNeeded: true,
    isLoggedIn: false,
    username: "",
    password: ""
  },
  setAuth: () => {}
});

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [auth, setAuth] = useState<loginInfo>({ loginNeeded: true, isLoggedIn: false, username: "", password: "" });

  return <AuthContext.Provider value={{auth, setAuth}}>{children}</AuthContext.Provider>;
};

export default AuthContext;
