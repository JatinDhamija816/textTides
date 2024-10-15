import { useEffect, useState } from "react";
import { showBlogs } from "../../../utils/api/apiCalls";
import { useNavigate } from "react-router-dom";
import { useAppContext } from "../../../utils/AppContext";

interface Blog {
  blogId: string;
  title: string;
  content: string;
  createdAt: {
    _seconds: number;
    _nanoseconds: number;
  };
  user: {
    name: string;
    avatar?: string;
  };
}

const ShowBlogs = () => {
  const navigate = useNavigate();
  const [blogDetails, setBlogDetails] = useState<Blog[]>([]);
  const { setIndividualBlog } = useAppContext();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        setLoading(true);
        const res = await showBlogs();
        if (res.success && Array.isArray(res.data)) {
          setBlogDetails(res.data);
        } else {
          setBlogDetails([]);
        }
      } catch (error) {
        console.error("Error fetching blog data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchBlogs();
  }, []);

  return (
    <div className="container mx-auto px-4 w-full">
      {loading ? (
        <p className="text-gray-200 text-xl text-center">Loading...</p>
      ) : blogDetails.length > 0 ? (
        blogDetails.map((blog) => (
          <div
            key={blog.blogId}
            className="md:shadow-xl bg-gray-700 rounded-lg my-5 px-5 py-5 w-full md:w-full  mx-auto"
          >
            <div>
              <p className="text-xl font-semibold text-white">{blog.title}</p>
              <div className="border-b border-gray-500 my-4"></div>
            </div>
            <div>
              <p
                dangerouslySetInnerHTML={{
                  __html: ` ${blog.content.slice(0, 300)}...`,
                }}
                className="text-gray-300 break-words max-w-full overflow-hidden"
              ></p>

              <p
                className="text-blue-500 text-right mt-2 hover:underline cursor-pointer"
                onClick={() => {
                  console.log(blog);
                  setIndividualBlog(blog);
                  navigate("/readBlog");
                }}
              >
                read more
              </p>
            </div>

            <div className="flex items-center my-5">
              <img
                src={blog.user?.avatar || "/assets/default_User.jpg"}
                className="w-7 rounded-full h-7 mr-2"
              />
              <p className="text-white">{blog.user.name}</p>{" "}
            </div>
          </div>
        ))
      ) : (
        <p className="text-gray-200 text-xl text-center">
          Sorry, there are no blogs yet. Be the first to start writing!
        </p>
      )}
    </div>
  );
};

export default ShowBlogs;
