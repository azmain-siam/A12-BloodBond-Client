import axios from "axios";
import { useForm } from "react-hook-form";
import { axiosSecure } from "../../hooks/useAxiosSecure";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const AddBlog = () => {
  const { register, handleSubmit } = useForm();
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    const { content, title, thumbnailImg } = data;
    console.log(data);

    const formData = new FormData();
    formData.append("image", thumbnailImg[0]);

    try {
      const { data } = await axios.post(
        `https://api.imgbb.com/1/upload?key=${
          import.meta.env.VITE_IMAGE_API_URL
        }`,
        formData
      );
      const thumbnail = data.data.display_url;
      const blog = {
        title,
        content,
        thumbnail,
        status: "draft",
      };
      const { data: blogData } = await axiosSecure.post("/blogs", blog);
      console.log(blogData);
      if (blogData.insertedId) {
        toast.success("Successfully Made a Request!");
        navigate("/dashboard/content-management/");
      }
    } catch (err) {
      console.log(err.message);
    }
  };

  return (
    <div>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="p-4 md:p-5 w-full md:w-[80%] mx-auto border rounded-lg"
      >
        <div>
          <h2 className="mb-6 text-3xl font-extrabold leading-none tracking-tight text-gray-900 md:text-3xl ">
            Add Blog
          </h2>
        </div>

        <div className="grid gap-4 mb-4 grid-cols-2">
          <div className="col-span-2">
            <label
              htmlFor="category"
              className="block mb-2 text-sm font-medium text-gray-900"
            >
              Title
            </label>
            <input
              type="text"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
              placeholder={"user.displayName"}
              {...register("title")}
            />
          </div>
          <div className="col-span-2">
            <label className="block mb-2 text-sm font-medium text-gray-600">
              Thumbnail
            </label>
            <input
              type="file"
              required
              {...register("thumbnailImg")}
              className="file-input file-input-bordered block w-full text-gray-700 bg-white border rounded-lg  focus:border-primary "
            />
          </div>

          <div className="col-span-2">
            <label
              htmlFor="description"
              className="block mb-2 text-sm capitalize font-medium text-gray-900"
            >
              Blog Content
            </label>
            <textarea
              rows="10"
              className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-red-500 focus:border-red-500"
              placeholder="Write the blog content here..."
              required
              {...register("content")}
            ></textarea>
          </div>
        </div>
        <div className="flex justify-center">
          <button
            type="submit"
            className="btn mt-3 px-12 bg-primary border-primary hover:border-[#28282B] hover:text-[#28282B] text-white uppercase transition-all hover:bg-white duration-300 hover:scale-105"
          >
            Add post
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddBlog;
