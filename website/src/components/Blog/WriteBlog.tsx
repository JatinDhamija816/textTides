import { useState, useEffect } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import useShowToasts from "../../../utils/hooks/showToasts";
import { writeBlog } from "../../../utils/api/apiCalls";
import { useNavigate } from "react-router-dom";
import { useAppContext } from "../../../utils/AppContext";

const WriteBlog = () => {
  const { showToast } = useShowToasts();
  const navigate = useNavigate();

  const { individualBlog } = useAppContext();
  const [loading, setLoading] = useState(false);
  const [content, setContent] = useState(individualBlog?.content || "");
  const [title, setTitle] = useState(individualBlog?.title || "");

  useEffect(() => {
    if (individualBlog) {
      setTitle(individualBlog.title);
      setContent(individualBlog.content);
    }
  }, [individualBlog]);

  const modules = {
    toolbar: [
      [{ header: "1" }, { header: "2" }, { font: [] }],
      [{ size: [] }],
      ["bold", "italic", "underline", "strike"],
      [{ color: [] }, { background: [] }],
      [{ list: "ordered" }, { list: "bullet" }],
      ["blockquote", "code-block"],
      ["link", "image"],
      [{ align: [] }],
      ["clean"],
    ],
  };

  const formats = [
    "header",
    "font",
    "size",
    "bold",
    "italic",
    "underline",
    "strike",
    "color",
    "background",
    "list",
    "bullet",
    "blockquote",
    "code-block",
    "link",
    "image",
    "align",
  ];

  const handleContentChange = (value: any) => {
    setContent(value);
  };

  const handleSubmit = async () => {
    setLoading(true);
    try {
      const res = await writeBlog(title, content);
      if (res.success) {
        navigate("/homePage");
      } else {
        showToast(res.message);
      }
    } catch (error) {
      showToast("An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-gray-800 min-h-screen flex justify-between">
      <div className="px-8 py-10 flex-1 flex items-center justify-center">
        <div className="px-8 py-10 md:shadow-xl bg-gray-700 rounded-lg md:max-w-screen-lg w-full">
          <p className="font-bold text-2xl text-center text-gray-100 py-5">
            {individualBlog ? "Edit Your Blog" : "Share Your Thoughts"}
          </p>
          <div className="flex-col">
            <div className="flex flex-col my-5">
              <input
                type="text"
                placeholder="Title"
                required
                className="border border-gray-500 bg-gray-600 text-gray-100 px-5 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>
            <div className="flex flex-col my-5 relative">
              <ReactQuill
                value={content}
                onChange={handleContentChange}
                modules={modules}
                formats={formats}
                className="border border-gray-500 bg-gray-600 text-gray-100 px-5 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                theme="snow"
              />
            </div>
            <div className="flex justify-center my-5">
              <button
                onClick={handleSubmit}
                type="submit"
                className="border w-3/4 bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-md transition duration-300"
                disabled={loading}
              >
                {loading
                  ? "Please wait..."
                  : individualBlog
                  ? "Update"
                  : "Submit"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WriteBlog;
