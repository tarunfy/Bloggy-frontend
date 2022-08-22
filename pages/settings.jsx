import { CloseIcon } from "@chakra-ui/icons";
import {
  Avatar,
  Button,
  IconButton,
  Input,
  Textarea,
  useColorMode,
  useToast,
  Center,
  Spinner,
} from "@chakra-ui/react";

import { useState, useRef, useEffect } from "react";
import FileUpload from "../components/FileUpload";
import Layout from "../components/Layout";
import Navbar from "../components/Navbar";
import { useAuthContext } from "../hooks/Auth/useAuthContext";
import { useUpdateProfile } from "../hooks/Auth/useUpdateProfile";
import { useRouter } from "next/router";

const Settings = () => {
  const [profileImage, setProfileImage] = useState("");

  const { colorMode } = useColorMode();

  const { user } = useAuthContext();
  const { isLoading, updateProfile } = useUpdateProfile();

  const toast = useToast();

  const nameRef = useRef(null);
  const workRef = useRef(null);
  const educationRef = useRef(null);
  const bioRef = useRef(null);
  const websiteUrlRef = useRef(null);
  const twitterHandleRef = useRef(null);
  const githubHandleRef = useRef(null);

  const router = useRouter();

  useEffect(() => {
    if (!user) {
      router.push("/");
    }
  }, [user]);

  useEffect(() => {
    if (user) {
      nameRef.current.value = user?.fullname;
      workRef.current.value = user?.work ? user?.work : "";
      educationRef.current.value = user?.education ? user?.education : "";
      bioRef.current.value = user?.bio ? user?.bio : "";
      websiteUrlRef.current.value = user?.websiteUrl ? user?.websiteUrl : "";
      githubHandleRef.current.value = user?.github ? user?.github : "";
      twitterHandleRef.current.value = user?.twitter ? user?.twitter : "";
      setProfileImage(user?.profileImage ? user?.profileImage : "");
    }
  }, [user]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = {
      fullname: nameRef.current.value,
      work: workRef.current.value,
      bio: bioRef.current.value,
      work: workRef.current.value,
      education: educationRef.current.value,
      profileImage,
      twitter: twitterHandleRef.current.value,
      github: githubHandleRef.current.value,
      websiteUrl: websiteUrlRef.current.value,
    };
    const { error } = await updateProfile(data);
    if (!error) {
      toast({
        title: "Profile updated",
        description: "Your profile has been updated",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
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

  if (!user) {
    return (
      <Center w="100vw" h="100vh">
        <Spinner size="lg" />
      </Center>
    );
  }

  if (isLoading) {
    return (
      <Center h="100vh" w="100vw">
        <Spinner size="lg" />
      </Center>
    );
  }

  return (
    <div>
      <Layout
        title="Settings - Bloggy Community"
        description="Settings page of bloggy community"
      />
      <Navbar />
      <div className="mt-24 max-w-[1000px] mx-auto">
        <form onSubmit={(e) => handleSubmit(e)}>
          <div className="w-full flex items-center justify-between">
            <h1 className="text-4xl font-bold">
              Settings for{" "}
              <span
                className={`${
                  colorMode === "light" ? "text-[#313CB3]" : "text-[#7f5dde]"
                }`}
              >
                @{`${user?.username}`}
              </span>
            </h1>
            <Button
              type="submit"
              className="fixed hover:!bg-[#4A18D7] !bg-[#5d2ee0] text-white"
            >
              Save
            </Button>
          </div>

          {/* USER */}
          <div
            className={`mx-32 mt-10 border rounded-md px-5 py-10 space-y-5 mb-5 ${
              colorMode === "light"
                ? "!border-gray-300 !bg-white/50"
                : "!border-gray-50/70 !bg-[#2D3748]/50"
            }`}
          >
            <h1 className="text-3xl font-bold">User</h1>
            <div className="space-y-1">
              <label>Name</label>
              <Input
                ref={nameRef}
                type="text"
                variant="outline"
                display="block"
              />
            </div>

            <div className="space-y-1">
              <label>Profile image</label>
              <div className="flex items-center space-x-2">
                <Avatar name={user?.fullname} src={profileImage} />
                {!profileImage ? (
                  <FileUpload
                    text="Select image"
                    setCoverImage={setProfileImage}
                    name="Image upload"
                    acceptedFileTypes="image/png, image/gif, image/jpeg"
                  />
                ) : (
                  <div className="flex items-center space-x-4">
                    <FileUpload
                      text="Change image"
                      setCoverImage={setProfileImage}
                      name="Image upload"
                      acceptedFileTypes="image/png, image/gif, image/jpeg"
                    />
                    <IconButton
                      variant="ghost"
                      icon={<CloseIcon className="!text-red-500" />}
                      onClick={() => setProfileImage("")}
                    />
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* BASIC */}
          <div
            className={`mx-32 mt-10 border rounded-md px-5 py-10 space-y-5 mb-5 ${
              colorMode === "light"
                ? "!border-gray-300 !bg-white/50"
                : "!border-gray-50/70 !bg-[#2D3748]/50"
            }`}
          >
            <h1 className="text-3xl font-bold">Basic</h1>
            <div className="space-y-1">
              <label>Website Url</label>
              <Input
                ref={websiteUrlRef}
                type="text"
                variant="outline"
                display="block"
              />
            </div>
            <div className="space-y-1">
              <label>Bio</label>
              <Textarea
                ref={bioRef}
                type="text"
                variant="outline"
                display="block"
              />
            </div>
          </div>

          {/* WORK */}
          <div
            className={`mx-32 mt-10 border rounded-md px-5 py-10 space-y-5 mb-5 ${
              colorMode === "light"
                ? "!border-gray-300 !bg-white/50"
                : "!border-gray-50/70 !bg-[#2D3748]/50"
            }`}
          >
            <h1 className="text-3xl font-bold">Work</h1>
            <div className="space-y-1">
              <label>Work</label>
              <Input
                ref={workRef}
                type="text"
                variant="outline"
                display="block"
              />
            </div>
            <div className="space-y-1">
              <label>Education</label>
              <Input
                ref={educationRef}
                type="text"
                variant="outline"
                display="block"
              />
            </div>
          </div>

          {/* SOCIAL */}
          <div
            className={`mx-32 mt-10 border rounded-md px-5 py-10 space-y-5 mb-5 ${
              colorMode === "light"
                ? "!border-gray-300 !bg-white/50"
                : "!border-gray-50/70 !bg-[#2D3748]/50"
            }`}
          >
            <h1 className="text-3xl font-bold">Social</h1>
            <div className="space-y-1">
              <label>Github username</label>
              <Input
                ref={githubHandleRef}
                type="text"
                variant="outline"
                display="block"
              />
            </div>
            <div className="space-y-1">
              <label>Twitter username</label>
              <Input
                ref={twitterHandleRef}
                type="text"
                variant="outline"
                display="block"
              />
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Settings;
