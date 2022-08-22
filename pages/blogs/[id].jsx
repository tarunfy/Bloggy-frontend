import Navbar from "../../components/Navbar";
import Layout from "../../components/Layout";
import Comment from "../../components/Comment";
import DOMPurify from "isomorphic-dompurify";
import { Avatar, Button, useColorMode } from "@chakra-ui/react";
import styles from "../../components/Preview/Preview.module.css";
import * as Showdown from "showdown";
import AddComment from "../../components/Modals/AddComment";
import { BsSuitHeartFill, BsSuitHeart } from "react-icons/bs";
import { useEffect, useState } from "react";
import Image from "next/image";
import moment from "moment";
import { useRouter } from "next/router";
import ProfileCard from "../../components/Card/ProfileCard";
import { useAuthContext } from "../../hooks/Auth/useAuthContext";

const converter = new Showdown.Converter({
  tables: true,
  simplifiedAutoLink: true,
  strikethrough: true,
  tasklists: true,
});

const Details = ({ blog, userData }) => {
  const { user } = useAuthContext();
  const [blogData, setBlogData] = useState(blog);
  const [liked, setLiked] = useState(blog?.likes.includes(user?._id));
  const [likes, setLikes] = useState(blog.likes.length);
  const [comments, setComments] = useState(null);

  const { colorMode } = useColorMode();

  const router = useRouter();

  const markdown = converter.makeHtml(blogData.markdown);

  const handleLike = async () => {
    setLiked(!liked);
    setLikes(liked ? likes - 1 : likes + 1);
    await fetch(`/api/blogs/${router.query.id}/likes`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userId: user._id,
      }),
    });
  };

  useEffect(() => {
    async function updateLikes() {}
  });

  useEffect(() => {
    async function getComments() {
      const res = await fetch(`/api/blogs/comments/${router.query.id}`);
      const { comments } = await res.json();

      setComments(comments);
    }
    getComments();
  }, []);

  return (
    <div className="grid grid-cols-3 gap-x-4 max-w-[1200px] mx-auto mt-20 mb-3">
      <div className="col-span-2 w-full">
        <Layout
          title="How to connect your flask application to AWS RDS with a CI/CD pipeline"
          description="Blog details page of bloggy community"
        />
        <Navbar />

        <div
          className={`border w-full rounded-lg ${
            colorMode === "light"
              ? "!border-gray-300 !bg-white/50"
              : "!border-gray-50/70 !bg-[#2D3748]/50"
          }`}
        >
          {blogData.coverImage && (
            <div className=" bg-[#DDDDDD] !h-[20rem] !w-full rounded-tr-lg rounded-tl-lg relative">
              <Image
                layout="fill"
                src={blogData.coverImage}
                alt="Banner img"
                className="object-cover rounded-tr-lg rounded-tl-lg"
              />
            </div>
          )}
          <div className="py-4 px-14">
            <div className="flex space-x-2">
              <Avatar
                size="md"
                name={userData.fullname}
                src={userData.profileImage}
              />
              <div>
                <h4 className="font-semibold">{userData.fullname}</h4>
                <p className="text-xs">
                  Posted on {moment(blogData.createdAt).date()}{" "}
                  {moment(blogData?.createdAt).format("MMMM")}
                </p>
              </div>
            </div>

            <div className="mt-5 space-y-4">
              <h1 className="text-5xl font-bold leading-[60px]">
                {blogData.blogTitle}
              </h1>
              <div
                className={`${styles.custommdLight}`}
                dangerouslySetInnerHTML={{
                  __html: DOMPurify.sanitize(markdown),
                }}
              />
            </div>
          </div>
        </div>
        <div className="max-w-[800px] mt-2 mx-auto flex items-center justify-end space-x-2">
          <Button
            variant="outline"
            onClick={handleLike}
            disabled={!user}
            className="!flex !items-center !space-x-1"
          >
            {liked ? <BsSuitHeartFill fill="red" /> : <BsSuitHeart />}{" "}
            <p> {likes}</p>
          </Button>

          <AddComment blogId={router.query.id} />
        </div>
        <div className="max-w-[800px] mx-auto mt-5 mb-3 flex items-center justify-between">
          <h1 className="text-2xl font-medium">All comments</h1>
        </div>
        <div
          className={`max-w-[800px] border mx-auto mb-3 py-4 px-14 rounded-lg ${
            colorMode === "light"
              ? "!border-gray-300 !bg-white/50"
              : "!border-gray-50/70 !bg-[#2D3748]/50"
          }`}
        >
          {comments?.length > 0 ? (
            <ul className="space-y-3 divide-y">
              {comments.map((comment, index) => (
                <Comment comment={comment} key={index} />
              ))}
            </ul>
          ) : (
            <p className="text-center">No comments yet...</p>
          )}
        </div>
      </div>
      <div
        className={`${
          colorMode === "light"
            ? "!border-gray-300 !bg-white/50"
            : "!border-gray-50/70 !bg-[#2D3748]/50"
        } w-full border h-fit p-4  rounded-md space-y-3`}
      >
        <ProfileCard userData={userData} />
      </div>
    </div>
  );
};

export default Details;

export const getServerSideProps = async (context) => {
  const { id } = context.params;

  const res = await fetch(`http://localhost:4000/api/blogs/${id}`);

  const data = await res.json();

  const res2 = await fetch(
    `http://localhost:4000/api/user/${data.blog.userId}`
  );

  const { user } = await res2.json();

  return {
    props: {
      blog: data.blog,
      userData: user,
    },
  };
};
