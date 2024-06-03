import { useContext } from "react";
import { AuthContext } from "../providers/AuthProvider";

const useAuth = () => {
  const authInfos = useContext(AuthContext);
  return authInfos;
};

export default useAuth;
