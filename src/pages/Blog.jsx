import { useQuery } from "@tanstack/react-query";
import useAxiosCommon from "../hooks/useAxiosCommon";

const Blog = () => {
  const axiosCommon = useAxiosCommon();

  const { data } = useQuery({
    queryKey: ["requests"],
    queryFn: async () => {
      const { data } = await axiosCommon.get("/requests");
      return data;
    },
  });
  console.log(data);
  return (
    <div>
      <h2 className="text-5xl">Blog</h2>
    </div>
  );
};

export default Blog;
