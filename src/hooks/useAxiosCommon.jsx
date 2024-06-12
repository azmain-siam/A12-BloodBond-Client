import axios from "axios";

export const axiosCommon = axios.create({
  baseURL: "https://bloodbond-nine.vercel.app",
});
const useAxiosCommon = () => {
  return axiosCommon;
};

export default useAxiosCommon;
