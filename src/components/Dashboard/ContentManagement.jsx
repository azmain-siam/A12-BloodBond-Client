import { MdPayment } from "react-icons/md";
import { Link } from "react-router-dom";

const ContentManagement = () => {
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
                Image
              </th>
              <th scope="col" className="px-6 py-3">
                Name
              </th>
              <th scope="col" className="px-6 py-3 rounded-e-lg">
                Email
              </th>
              <th scope="col" className="px-6 py-3 rounded-e-lg">
                Role
              </th>
            </tr>
          </thead>
          <tbody>
            <tr className="bg-white">
              <th className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                user.name
              </th>
              <th className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                user.email
              </th>
              <th className="px-6 py-4 capitalize font-medium text-gray-900 whitespace-nowrap">
                user.role
              </th>
              <th className="px-6 py-4 capitalize font-medium text-gray-900 whitespace-nowrap">
                user.status
              </th>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ContentManagement;
