import { useQuery } from "@tanstack/react-query";
import useAxiosCommon from "../hooks/useAxiosCommon";
import { Link } from "react-router-dom";
import LoadingBars from "../components/LoadingBars";

const Blog = () => {
  const axiosCommon = useAxiosCommon();

  const { data, isLoading } = useQuery({
    queryKey: ["blogs"],
    queryFn: async () => {
      const { data } = await axiosCommon.get("/blogs");
      return data;
    },
  });

  if (isLoading) {
    return <LoadingBars />;
  }
  const publishedBlogs = data?.filter((blog) => blog?.status === "published");
  console.log(publishedBlogs);

  console.log(data);
  return (
    <div className="mb-10">
      <nav className="flex mb-4" aria-label="Breadcrumb">
        <ol className="inline-flex items-center space-x-1 md:space-x-3 rtl:space-x-reverse">
          <li className="inline-flex items-center">
            <Link
              to={"/"}
              className="inline-flex items-center text-sm font-medium text-gray-700 hover:text-blue-600 "
            >
              <svg
                className="w-3 h-3 me-2.5"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="m19.707 9.293-2-2-7-7a1 1 0 0 0-1.414 0l-7 7-2 2a1 1 0 0 0 1.414 1.414L2 10.414V18a2 2 0 0 0 2 2h3a1 1 0 0 0 1-1v-4a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v4a1 1 0 0 0 1 1h3a2 2 0 0 0 2-2v-7.586l.293.293a1 1 0 0 0 1.414-1.414Z" />
              </svg>
              Home
            </Link>
          </li>
          <li>
            <div className="flex items-center">
              <svg
                className="w-3 h-3 text-gray-400 mx-1 rtl:rotate-180"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 6 10"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="m1 9 4-4-4-4"
                />
              </svg>
              <a className="ms-1 text-sm cursor-default font-medium text-gray-700 md:ms-2">
                Published Blogs
              </a>
            </div>
          </li>
        </ol>
      </nav>
      <h2 className="mb-8 text-3xl font-extrabold leading-none tracking-tight text-gray-900 md:text-4xl ">
        Published Blogs
      </h2>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
        {publishedBlogs.map((blog, idx) => (
          <div
            key={idx}
            className=" bg-white border border-gray-200 rounded-lg shadow h-full"
          >
            <div>
              <a href="#">
                <img
                  className="rounded-t-lg h-[200px] w-full object-cover border-b"
                  src={blog.thumbnail}
                  alt=""
                />
              </a>
              <div className="p-5 flex flex-col">
                <div className="flex-1">
                  <a href="#">
                    <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900">
                      {blog.title}
                    </h5>
                  </a>
                  <p className="mb-3 font-normal text-gray-700">
                    {blog.content.slice(0, 300)}...
                  </p>
                </div>
                <div>
                  <Link
                    to={`/blog/details/${blog._id}`}
                    className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-rose-700 rounded-lg hover:bg-rose-800 focus:ring-4 focus:outline-none focus:ring-rose-300"
                  >
                    Read more
                    <svg
                      className="rtl:rotate-180 w-3.5 h-3.5 ms-2"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 14 10"
                    >
                      <path
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M1 5h12m0 0L9 1m4 4L9 9"
                      />
                    </svg>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Blog;
