import { createContext, useReducer } from "react";

export const BlogContext = createContext(null);

export const blogReducer = (state, action) => {
  switch (action.type) {
    case "ADD":
      return {
        blogs: [...action.payload],
      };
    case "UPDATE": {
      return {
        blogs: [...state.blogs, action.payload],
      };
    }
    case "DELETE": {
      return {
        blogs: state.blogs.filter((blog) => blog._id !== action.payload._id),
      };
    }
    default:
      return state;
  }
};

export const BlogProvider = ({ children }) => {
  const [state, dispatch] = useReducer(blogReducer, {
    blogs: null,
  });

  return (
    <BlogContext.Provider value={{ ...state, dispatch }}>
      {children}
    </BlogContext.Provider>
  );
};
