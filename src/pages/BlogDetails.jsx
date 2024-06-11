import { useQuery } from "@tanstack/react-query";
import { axiosCommon } from "../hooks/useAxiosCommon";
import { useParams } from "react-router-dom";
import LoadingBars from "../components/LoadingBars";

const BlogDetails = () => {
  const { id } = useParams();
  console.log(id);

  const { data: blog, isLoading } = useQuery({
    queryKey: ["blog"],
    queryFn: async () => {
      const { data } = await axiosCommon(`/blog/${id}`);
      return data;
    },
  });

  if (isLoading) {
    return <LoadingBars />;
  }

  return (
    <div className="mb-10">
      <div>
        <div className="w-[70%] h-[200px] md:h-[400px] border mx-auto rounded-lg overflow-hidden mb-6">
          <img
            className="w-full h-full object-cover"
            src={blog.thumbnail}
            alt=""
          />
        </div>
        <div className="px-5">
          <div className="flex flex-wrap gap-3 items-center mb-3">
            <h3 className="flex items-center gap-2 text-xl md:text-2xl lg:text-3xl font-bold">
              {blog.title}
            </h3>
          </div>
          <p className="font-medium text-[#2c2c2c] text-sm md:text-lg capitalize">
            {blog.content}
          </p>
        </div>
      </div>
    </div>
  );
};

export default BlogDetails;
