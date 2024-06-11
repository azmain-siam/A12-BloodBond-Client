import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { axiosSecure } from "../../hooks/useAxiosSecure";
import LoadingBars from "../LoadingBars";
import Swal from "sweetalert2";
import toast from "react-hot-toast";

const ContentManagement = () => {
  const {
    data: blogs,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["blogs"],
    queryFn: async () => {
      const { data } = await axiosSecure.get("/blogs");
      return data;
    },
  });

  const handleUpdateStatus = async (blog, status) => {
    console.log(blog, status);
    const updatedBlog = {
      ...blog,
      status: status,
    };

    delete updatedBlog._id;
    try {
      const { data } = await axiosSecure.patch(
        `/blog/${blog._id}`,
        updatedBlog
      );
      console.log(data);
      if (data.modifiedCount > 0) {
        refetch();
        Swal.fire({
          title: "Success!",
          text: "Updated Successfully!",
          icon: "success",
        });
      }
    } catch (err) {
      console.log(err);
      toast.error("Can not update at this moment");
    }
  };

  if (isLoading) {
    return <LoadingBars />;
  }

  return (
    <div className="font-poppins">
      <div className="mb-4 text-3xl font-extrabold leading-none text-gray-900 md:text-4xl flex justify-between items-center">
        Content Management
        <Link to={"/dashboard/content-management/add-blog"}>
          <button className="btn btn-sm btn-neutral text-base tracking-normal	font-medium text-white py-2 px-4 h-full">
            Add Blog
          </button>
        </Link>
      </div>

      <div className="relative overflow-auto h-screen ">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500">
          <thead className="text-xs text-gray-700 uppercase bg-gray-100">
            <tr>
              <th scope="col" className="px-6 py-3 rounded-s-lg">
                Thumbnail
              </th>
              <th scope="col" className="px-6 py-3">
                Title
              </th>
              <th scope="col" className="px-6 py-3 rounded-e-lg">
                Status
              </th>
              <th scope="col" className="px-6 py-3 rounded-e-lg">
                Manage blog
              </th>
            </tr>
          </thead>
          <tbody>
            {blogs.map((blog, idx) => (
              <tr key={idx} className="bg-white">
                <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                  <img
                    className="size-12 rounded-lg object-cover"
                    src={
                      blog?.thumbnail ||
                      "https://pic.onlinewebfonts.com/thumbnails/icons_148071.svg"
                    }
                    alt=""
                  />
                </td>
                <th className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                  {blog.title}
                </th>
                <th className="px-6 py-4 capitalize font-medium text-gray-900 whitespace-nowrap">
                  {blog.status}
                </th>
                <th className="px-6 py-4 capitalize font-medium text-gray-900 whitespace-nowrap">
                  {blog.status === "draft" ? (
                    <button
                      onClick={() => handleUpdateStatus(blog, "published")}
                      className="btn btn-sm btn-success text-white"
                    >
                      Publish
                    </button>
                  ) : (
                    <button
                      onClick={() => handleUpdateStatus(blog, "draft")}
                      className="btn btn-sm btn-error text-white"
                    >
                      Unpublish
                    </button>
                  )}
                </th>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ContentManagement;
