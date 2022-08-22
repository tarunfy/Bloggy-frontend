import { useState } from "react";
import { useBlogContext } from "./useBlogContext";

export const useDeleteBlog = () => {
  const [isLoading, setIsLoading] = useState(false);

  const { dispatch } = useBlogContext();

  const deleteBlog = async (blogId) => {
    let error;
    setIsLoading(true);

    const res = await fetch(`/api/blogs/${blogId}`, { method: "DELETE" });

    const data = await res.json();

    if (!res.ok) {
      error = data.error;
      setIsLoading(false);
      return error;
    }

    if (res.ok) {
      dispatch({ type: "DELETE", payload: data.blog });

      setIsLoading(false);
    }
  };

  return { isLoading, deleteBlog };
};
