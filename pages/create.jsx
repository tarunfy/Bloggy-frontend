import { Button, useTimeout, useToast } from "@chakra-ui/react";
import Edit from "../components/Edit";
import Preview from "../components/Preview";
import Layout from "../components/Layout";
import { useState } from "react";
import CancelModal from "../components/Modals/CancelModal";
import { useCreateBlog } from "../hooks/Blog/useCreateBlog";
import { useAuthContext } from "../hooks/Auth/useAuthContext";
import { useRouter } from "next/router";

const Create = () => {
  const [markdown, setMarkdown] = useState(``);
  const [title, setTitle] = useState("");
  const [coverImage, setCoverImage] = useState(null);

  const toast = useToast();
  const router = useRouter();

  const { createBlog, isLoading } = useCreateBlog();
  const { user } = useAuthContext();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { error } = await createBlog({
      blogTitle: title,
      markdown,
      coverImage: coverImage ? coverImage : null,
      comments: [],
      likes: [],
      userId: user._id,
    });
    if (!error) {
      toast({
        title: "Blog created.",
        description: "We've created your blog for you.",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
      router.push("/");
    } else {
      toast({
        title: "Error",
        description: error,
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  return (
    <div>
      <Layout
        title="New Post - Bloggy community"
        description="Create a new blog"
      />
      <form onSubmit={handleSubmit}>
        <div className="w-full absolute top-0 flex items-center justify-end space-x-2 py-[5px] pr-2">
          <Button
            disabled={isLoading}
            type="submit"
            className="hover:!bg-[#4A18D7] !bg-[#5d2ee0] text-white"
          >
            Publish
          </Button>
          <CancelModal />
        </div>
        <div className="flex items-start justify-start">
          <div className="w-2/4 h-screen overflow-y-scroll">
            <Edit
              title={title}
              setTitle={setTitle}
              markdown={markdown}
              setMarkdown={setMarkdown}
              coverImage={coverImage}
              setCoverImage={setCoverImage}
            />
          </div>
          <div className="w-2/4 overflow-y-scroll h-screen">
            <Preview
              markdown={markdown}
              title={title}
              coverImage={coverImage}
            />
          </div>
        </div>
      </form>
    </div>
  );
};

export default Create;
