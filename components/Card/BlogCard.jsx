import { Button, useColorMode } from "@chakra-ui/react";
import { BsSuitHeart } from "react-icons/bs";
import { AiOutlineComment } from "react-icons/ai";
import Link from "next/link";
import DeleteBlogModal from "../Modals/DeleteBlogModal";
import { useAuthContext } from "../../hooks/Auth/useAuthContext";
import moment from "moment";

const BlogCard = ({ blog }) => {
  const { colorMode } = useColorMode();

  const { user } = useAuthContext();

  return (
    <div
      className={`w-full p-5 border flex items-center justify-between rounded-lg relative mx-auto bg-red-50 ${
        colorMode === "light"
          ? "!border-gray-300 !bg-white/50"
          : "!border-gray-50/70 !bg-[#2D3748]/50"
      }`}
    >
      <div>
        <div className="w-[27rem]">
          <Link href={`/blogs/${blog._id}`} className="w-full">
            <a
              className={`text-lg  font-bold ${
                colorMode === "light" ? "text-[#313CB3]" : "text-[#7f5dde]"
              }`}
            >
              {blog.blogTitle}
            </a>
          </Link>
        </div>
        <div className="flex items-center space-x-3 text-sm">
          <p>
            Published: {moment(blog?.createdAt).date()}{" "}
            {moment(blog?.createdAt).format("MMMM")}
          </p>
          <p>
            Edited: {moment(blog?.updatedAt).date()}{" "}
            {moment(blog?.updatedAt).format("MMMM")}
          </p>
        </div>
      </div>

      <div className="flex items-center space-x-4">
        <div className="flex items-center space-x-2 text-base">
          <BsSuitHeart />
          <p>
            {blog.likes == null || blog.likes.length === 0
              ? 0
              : blog.likes.length}{" "}
            likes
          </p>
        </div>
        <div className="flex items-center space-x-2 text-base">
          <AiOutlineComment />
          <p>
            {blog.comments == null || blog.comments.length === 0
              ? 0
              : blog.comments.length}{" "}
            comments
          </p>
        </div>
      </div>

      <div className="flex items-center space-x-2">
        <Link href={`/${user?.username}/${blog._id}/edit`}>
          <Button className="hover:!bg-[#4A18D7] !bg-[#5d2ee0] text-white">
            Edit
          </Button>
        </Link>
        <DeleteBlogModal blogId={blog._id} />
      </div>
    </div>
  );
};

export default BlogCard;
