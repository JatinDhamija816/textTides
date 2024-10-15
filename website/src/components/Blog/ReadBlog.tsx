import { useAppContext } from "../../../utils/AppContext";

const ReadBlog = () => {
  const { individualBlog, user } = useAppContext();

  const convertToDate = (seconds: number, nanoseconds: number) => {
    const millisecondsFromSeconds = seconds * 1000;
    const millisecondsFromNanoseconds = nanoseconds / 1000000;
    return new Date(millisecondsFromSeconds + millisecondsFromNanoseconds);
  };

  const blogDate = individualBlog
    ? convertToDate(
        individualBlog.createdAt._seconds,
        individualBlog.createdAt._nanoseconds
      )
    : null;

  return (
    <div className="min-h-screen bg-gray-900">
      <div className="px-5 py-5 md:px-10 md:flex md:justify-center">
        <div className="md:w-full md:bg-gray-700 md:px-10 md:py-5 rounded-xl">
          <p className="text-2xl font-semibold text-white">
            {individualBlog?.title}
          </p>

          <div className="border-b border-gray-500 my-4"></div>

          <p
            dangerouslySetInnerHTML={{
              __html: ` ${individualBlog?.content}`,
            }}
            className="text-gray-300 break-words max-w-full overflow-hidden"
          ></p>

          <div className="border-b border-gray-500 my-4"></div>

          <div className="flex items-center">
            <img
              src={
                individualBlog?.user?.avatar ||
                user?.avatar ||
                "/assets/default_User.jpg"
              }
              className="w-10 h-10 rounded-full mr-5"
            />
            <p className="text-xl text-gray-50">
              {individualBlog?.user?.name || user?.name}
            </p>
          </div>

          {blogDate && (
            <p className="text-gray-400 my-5">
              Published on: {blogDate.toLocaleDateString()} at{" "}
              {blogDate.toLocaleTimeString()}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ReadBlog;
