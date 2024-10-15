import { useEffect } from "react";
import Navbar from "./Navbar";
import { useAppContext } from "../../../utils/AppContext";
import { homePage } from "../../../utils/api/apiCalls";
import Categories from "./Categories";
import ShowBlogs from "./ShowBlogs";

const HomePage = () => {
  const { setUser, setIndividualBlog } = useAppContext();

  useEffect(() => {
    setIndividualBlog(undefined);
    const fetchProfileData = async () => {
      try {
        const res = await homePage();
        if (res.success) {
          setUser(res.data);
        }
      } catch (error) {
        console.error("Error fetching profile data:", error);
      }
    };
    fetchProfileData();
  }, []);

  return (
    <div className="bg-gray-900 min-h-screen text-gray-100 max-w-full">
      <Navbar />
      <div className="md:flex md:space-x-5 px-4 md:px-10 py-5">
        <div className="md:w-1/4 w-full bg-gray-700 rounded-lg md:p-5 p-2 mb-5 md:mb-0 h-fit">
          <Categories />
        </div>

        <div className="md:w-3/4">
          <ShowBlogs />
        </div>
      </div>
    </div>
  );
};

export default HomePage;
