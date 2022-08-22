import { Avatar, useColorMode } from "@chakra-ui/react";
import { BsSuitHeart } from "react-icons/bs";
import { AiOutlineComment } from "react-icons/ai";
import Link from "next/link";
import moment from "moment";
import { useEffect, useState } from "react";
import Image from "next/image";
//import Image from "next/image";

const Blog = ({ blog, index }) => {
  const [createdBy, setCreatedBy] = useState(null);
  const { colorMode } = useColorMode();

  useEffect(() => {
    async function getUser() {
      const res = await fetch(`api/user/${blog.userId}`);

      const data = await res.json();

      if (res.ok) {
        setCreatedBy(data.user);
      } else {
        return;
      }
    }
    if (blog) {
      getUser();
    }
  }, []);

  return (
    <>
      <Link href={`/blogs/${blog._id}`}>
        <div
          className={`w-full rounded-lg border-[1px] cursor-pointer ${
            colorMode === "light"
              ? "!border-gray-300 !bg-white/50"
              : "!border-gray-50/70 !bg-[#2D3748]/50"
          }`}
        >
          {index === 0 && blog.coverImage && (
            <div className=" bg-[#DDDDDD] rounded-tr-lg rounded-tl-lg  h-60 !w-full relative">
              <Image
                layout="fill"
                className="!object-cover rounded-tr-lg rounded-tl-lg "
                src={blog.coverImage}
                alt="Blog banner"
              />
            </div>
          )}

          <div className="flex items-start justify-start space-x-2 p-4">
            <Avatar
              size="md"
              name={createdBy?.fullname}
              src={createdBy?.profileImage}
            />

            <div>
              <h5>{createdBy?.fullname}</h5>
              <p className="text-xs">
                {moment(blog?.createdAt).startOf("ss").fromNow()}
              </p>
              <a
                className={`text-[1.7rem] max-w-xl font-bold mt-3 ${
                  colorMode === "light"
                    ? "hover:!text-[#313CB3]"
                    : "hover:!text-[#7f5dde]"
                }`}
              >
                {blog.blogTitle}
              </a>
              <div className="flex items-center space-x-2 mt-3">
                <div
                  className={`flex  p-2 rounded-lg items-center space-x-2  text-lg ${
                    colorMode === "light"
                      ? "hover:bg-gray-200/70"
                      : " hover:bg-gray-200/5"
                  }`}
                  variant="ghost"
                >
                  <BsSuitHeart />
                  <p>
                    {blog.likes} {blog.likes > 1 ? "likes" : "like"}
                  </p>
                </div>
                <div
                  className={`flex  p-2 rounded-lg items-center space-x-2  text-lg ${
                    colorMode === "light"
                      ? "hover:bg-gray-200/70"
                      : "hover:bg-gray-200/5"
                  }`}
                  variant="ghost"
                >
                  <AiOutlineComment />
                  <p>
                    {blog.comments} {blog.comments > 1 ? "comments" : "comment"}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Link>
    </>
  );
};

export default Blog;
