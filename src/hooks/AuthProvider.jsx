import { createContext } from "react";

const AuthContext = createContext(null);
const AuthProvider = ({ children }) => {

  return <div>{children}</div>;
};

export default AuthProvider;
