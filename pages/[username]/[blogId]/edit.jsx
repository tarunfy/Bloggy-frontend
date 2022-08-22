import { Button, IconButton, useToast } from "@chakra-ui/react";
import Editor from "../../../components/Edit";
import Preview from "../../../components/Preview";
import Layout from "../../../components/Layout";
import { useEffect, useState } from "react";
import { CloseIcon } from "@chakra-ui/icons";
import Link from "next/link";
import { useRouter } from "next/router";
import { useUpdateBlog } from "../../../hooks/Blog/useUpdateBlog";
import { useAuthContext } from "../../../hooks/Auth/useAuthContext";

const Edit = () => {
  const [markdown, setMarkdown] = useState(``);
  const [title, setTitle] = useState("");
  const [coverImage, setCoverImage] = useState(null);

  const router = useRouter();

  const { user } = useAuthContext();

  const { isLoading, updateBlog } = useUpdateBlog();

  const toast = useToast();

  useEffect(() => {
    async function getBlogData() {
      const res = await fetch(`/api/blogs/${router.query.blogId}`);

      const data = await res.json();

      if (res.ok) {
        setCoverImage(data.blog.coverImage);
        setMarkdown(data.blog.markdown);
        setTitle(data.blog.blogTitle);
      } else {
        return;
      }
    }
    if (router.query.blogId) {
      getBlogData();
    }
  }, [router.query.blogId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = {
      coverImage,
      markdown,
      blogTitle: title,
      userId: user._id,
    };
    const error = await updateBlog(router.query.blogId, data);
    if (!error) {
      toast({
        title: "Blog updated.",
        description: "We've updated your blog for you.",
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
            Save Changes
          </Button>
          <Link href="/">
            <IconButton variant="outline" icon={<CloseIcon />} />
          </Link>
        </div>
        <div className="flex items-start justify-start">
          <div className="w-2/4 h-screen overflow-y-scroll">
            <Editor
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

export default Edit;
