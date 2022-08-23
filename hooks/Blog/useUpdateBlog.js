import { useState } from "react";

export const useUpdateBlog = () => {
  const [isLoading, setIsLoading] = useState(false);

  const updateBlog = async (blogId, blogData) => {
    let error;
    setIsLoading(true);

    const res = await fetch(`/api/blogs/${blogId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(blogData),
    });

    const data = await res.json();

    if (!res.ok) {
      error = data.error;
      setIsLoading(false);
      return error;
    }

    if (res.ok) {
      setIsLoading(false);
    }
  };
  return { isLoading, updateBlog };
};
