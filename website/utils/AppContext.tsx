import React, { createContext, useState, useContext } from "react";

interface Blog {
  blogId: string;
  title: string;
  content: string;
  createdAt: {
    _seconds: number;
    _nanoseconds: number;
  };
  user?: {
    name: string;
    avatar?: string;
  };
}

interface User {
  name: string;
  email: string;
  username: string;
  avatar: string;
  bio: string;
  id: string;
  blogDetails: Blog[];
}

interface AppContextType {
  user: User | undefined;
  setUser: (user: User) => void;
  blogs: Blog | undefined;
  setBlogs: (blog: Blog) => void;
  individualBlog: Blog | undefined;
  setIndividualBlog: (blog: Blog | undefined) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<User | undefined>(undefined);
  const [blogs, setBlogs] = useState<Blog | undefined>(undefined);
  const [individualBlog, setIndividualBlog] = useState<Blog | undefined>(
    undefined
  );

  return (
    <AppContext.Provider
      value={{
        user,
        setUser,
        blogs,
        setBlogs,
        individualBlog,
        setIndividualBlog,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useAppContext must be used within an AppProvider");
  }
  return context;
};
