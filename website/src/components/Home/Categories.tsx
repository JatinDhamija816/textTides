const Categories = () => {
  const categories = [
    "Coding",
    "Design",
    "Marketing",
    "Technology",
    "Science",
    "Art",
    "Health",
  ];

  return (
    <div className="">
      <h2 className="hidden md:flex text-xl font-bold mb-4 text-center md:w-full items-center justify-center ">
        Categories
      </h2>
      <div className="w-full overflow-x-auto md:overflow-x-hidden custom-scrollbar">
        <ul className="flex md:flex-col items-center py-1 whitespace-nowrap">
          {categories.map((category, index) => (
            <li
              key={index}
              className={`${
                index === 0 ? "bg-blue-500" : "bg-gray-600"
              } md:w-full md:my-1 text-center py-3 px-5 rounded-lg mx-2 text-white font-semibold hover:bg-blue-600 transition-colors`}
            >
              {category}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Categories;

