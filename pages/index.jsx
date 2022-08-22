import { useToast } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import Option from "../components/Blog/Option";
import Sidebar from "../components/Blog/Sidebar/index";
import Blog from "../components/Blog/Blog";
import Layout from "../components/Layout";
import Navbar from "../components/Navbar";
import BlogCardSkeleton from "../skeletons/BlogCardSkeleton";
import { useBlogContext } from "../hooks/Blog/useBlogContext";

export default function Home() {
  const [filterBy, setFilterBy] = useState("Relevant");

  const toast = useToast();

  const { dispatch, blogs } = useBlogContext();

  useEffect(() => {
    async function getBlogs(filterBy) {
      const res = await fetch(`/api/blogs?filterBy=${filterBy}`);

      const data = await res.json();

      if (res.ok) {
        dispatch({ type: "ADD", payload: data.blogs });
      } else {
        toast({
          title: "Error",
          description: data.error,
          status: "error",
          duration: 3000,
          isClosable: true,
        });
      }
    }
    getBlogs(filterBy);
  }, [filterBy]);

  return (
    <div>
      <Layout
        title="Bloggy Community ✍️ ✍️"
        description="Blogging platform for creative coding community."
      />
      <Navbar />
      {/* Main */}
      <div className="max-w-[1100px] mb-4 mx-auto mt-28 grid gap-x-20 grid-cols-3">
        <div className="col-span-2 w-full flex items-start flex-col space-y-10">
          <div className="flex items-center justify-start space-x-10 text-2xl">
            <Option
              filterBy={filterBy}
              setFilterBy={setFilterBy}
              name="Relevant"
            />
            <Option
              filterBy={filterBy}
              setFilterBy={setFilterBy}
              name="Latest"
            />
            <Option filterBy={filterBy} setFilterBy={setFilterBy} name="Top" />
          </div>
          {blogs == null ? (
            <div className="w-full space-y-2">
              <BlogCardSkeleton banner={true} />
              <BlogCardSkeleton />
              <BlogCardSkeleton />
              <BlogCardSkeleton />
              <BlogCardSkeleton />
            </div>
          ) : (
            <div className="w-full space-y-2">
              {blogs.length > 0 ? (
                <>
                  {blogs.map((blog, index) => (
                    <Blog blog={blog} key={blog._id} index={index} />
                  ))}
                </>
              ) : (
                <>
                  <p className="text-2xl text-center">No blogs found</p>
                </>
              )}
            </div>
          )}
        </div>
        <div className="overflow-x-hidden w-full">
          <Sidebar />
        </div>
      </div>
    </div>
  );
}
