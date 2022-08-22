import { useState } from "react";
import { useBlogContext } from "./useBlogContext";

export const useCreateBlog = () => {
  const [isLoading, setIsLoading] = useState(false);

  const { dispatch } = useBlogContext();

  const createBlog = async (blogData) => {
    let error;
    setIsLoading(true);

    const res = await fetch("/api/blogs/create", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(blogData),
    });

    const data = await res.json();

    if (!res.ok) {
      setIsLoading(false);
      error = data.error;
    }

    if (res.ok) {
      setIsLoading(false);
    }

    return { error: error ? error : null };
  };

  return { isLoading, createBlog };
};
