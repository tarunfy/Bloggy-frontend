import { CloseIcon } from "@chakra-ui/icons";
import { IconButton, useColorMode } from "@chakra-ui/react";
import FileUpload from "../FileUpload";
import Image from "next/image";

const Edit = ({
  markdown,
  setMarkdown,
  title,
  setTitle,
  coverImage,
  setCoverImage,
}) => {
  const { colorMode } = useColorMode();

  const handleTextareaSize = (e) => {
    e.target.style.height = "auto";
    e.target.style.height = `${e.target.scrollHeight}px`;
  };

  return (
    <div
      className={`max-h-screen border-[.6px] p-12 pt-14 overflow-y-scroll ${
        colorMode === "light"
          ? "!border-gray-300 !bg-white/50"
          : "!border-gray-50/70 !bg-[#2D3748]/50"
      }`}
    >
      <div className="w-full space-y-4">
        {coverImage ? (
          <div className="w-full flex items-center space-x-5">
            <div className="h-[100px] w-full relative">
              <Image
                src={coverImage}
                alt="cover image"
                layout="fill"
                className="object-cover"
              />
            </div>
            <FileUpload
              text="Change image"
              setCoverImage={setCoverImage}
              name="Image upload"
              acceptedFileTypes="image/png, image/gif, image/jpeg"
            />
            <IconButton
              variant="ghost"
              icon={<CloseIcon className="!text-red-500" />}
              onClick={() => setCoverImage("")}
            />
          </div>
        ) : (
          <FileUpload
            text="Add your cover image"
            setCoverImage={setCoverImage}
            name="Image upload"
            acceptedFileTypes="image/png, image/gif, image/jpeg"
          />
        )}
        <textarea
          placeholder="New post title here..."
          className="resize-none w-full  border-none focus:border-none bg-transparent text-5xl focus:outline-none"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          onKeyUp={(e) => handleTextareaSize(e)}
        />
        <textarea
          value={markdown}
          onChange={(e) => {
            setMarkdown(e.target.value);
            handleTextareaSize(e);
          }}
          placeholder="Write your post content here...."
          className="resize-none w-full border-none focus:border-none bg-transparent text-md focus:outline-none"
          onKeyUp={(e) => handleTextareaSize(e)}
        />
      </div>
    </div>
  );
};

export default Edit;
