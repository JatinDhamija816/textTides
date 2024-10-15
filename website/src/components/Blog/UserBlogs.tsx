import { useNavigate } from "react-router-dom";
import { useAppContext } from "../../../utils/AppContext";
import Navbar from "../Home/Navbar";
import { useEffect, useState } from "react";
import useShowToasts from "../../../utils/hooks/showToasts";
import { deleteBlog, homePage } from "../../../utils/api/apiCalls";

const UserBlogs = () => {
  const { user, setIndividualBlog, setUser } = useAppContext();
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const { showToast } = useShowToasts();

  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        const res = await homePage();
        if (res.success) {
          setUser(res.data);
        }
      } catch (error) {
        showToast("An error occurred. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    if (!user?.blogDetails) {
      fetchProfileData();
    } else {
      setLoading(false);
    }
  }, [user, setUser, showToast]);

  const handleDelete = async (blogId: string) => {
    try {
      const res = await deleteBlog(blogId);
      if (res.success) {
        navigate("/homePage");
      } else {
        showToast(res.message);
      }
    } catch (error) {
      showToast("An error occurred. Please try again.");
    }
  };

  return (
    <div className="bg-gray-900 min-h-screen">
      <Navbar />
      <div className="py-5 px-5">
        {loading ? (
          <p className="text-gray-200 text-xl text-center">Loading...</p>
        ) : user?.blogDetails && user.blogDetails.length > 0 ? (
          user.blogDetails.map((blog) => (
            <div
              key={blog.blogId}
              className="md:shadow-xl bg-gray-700 rounded-lg my-5 px-5 py-5 md:max-w-screen-lg w-full md:mx-auto"
            >
              <div>
                <p className="text-xl font-semibold text-gray-50">
                  {blog.title}
                </p>
                <div className="border-b border-gray-500 my-4"></div>
              </div>
              <div>
                <p
                  dangerouslySetInnerHTML={{
                    __html: ` ${blog.content.slice(0, 300)}...`,
                  }}
                  className="text-gray-400"
                ></p>

                <p
                  className="text-blue-500 text-right mt-2 hover:underline cursor-pointer"
                  onClick={() => {
                    setIndividualBlog(blog);
                    navigate("/readBlog");
                  }}
                >
                  read more
                </p>
              </div>
              <div className="items-center justify-center flex md:justify-end mt-5">
                <button
                  onClick={() => {
                    setIndividualBlog(blog);
                    navigate("/writeBlog");
                  }}
                  className="bg-green-400 rounded-md px-5 text-xl text-white py-1 hover:bg-green-700 mx-1"
                >
                  Edit{" "}
                </button>
                <button
                  onClick={() => handleDelete(blog.blogId)}
                  className="bg-red-400 rounded-md px-5 text-xl text-white py-1 hover:bg-red-700  mx-5"
                >
                  Delete
                </button>
              </div>
            </div>
          ))
        ) : (
          <p className="text-gray-200 text-xl text-center">
            Sorry, you have not written any blogs yet.
          </p>
        )}
      </div>
    </div>
  );
};

export default UserBlogs;
