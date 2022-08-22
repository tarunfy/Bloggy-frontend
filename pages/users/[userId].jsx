import { Avatar, Button, useColorMode } from "@chakra-ui/react";
import Navbar from "../../components/Navbar";
import Layout from "../../components/Layout";
import Link from "next/link";
import { RiCake2Line } from "react-icons/ri";
import { FiMail } from "react-icons/fi";
import { BsGlobe } from "react-icons/bs";
import { FaGithub, FaTwitter } from "react-icons/fa";
import moment from "moment";
import { useAuthContext } from "../../hooks/Auth/useAuthContext";

const Profile = ({ userData }) => {
  const { colorMode } = useColorMode();

  const { user } = useAuthContext();

  return (
    <div>
      <Layout
        title={`${userData.fullname} - Bloggy Community`}
        description={`${userData.fullname}'s profile page`}
      />
      <Navbar />

      <div
        className={`max-w-[1000px] border p-10 rounded-lg relative mx-auto bg-red-50 mt-52 ${
          colorMode === "light"
            ? "!border-gray-300 !bg-white/50"
            : "!border-gray-50/70 !bg-[#2D3748]/50"
        }`}
      >
        <div
          className={`rounded-full p-1 absolute -top-12 left-2/4 -translate-x-[50%] ${
            colorMode === "light" ? " !bg-[#d8dadb80] " : " !bg-[#1A202C]"
          }`}
        >
          <Avatar
            size="xl"
            name={userData.fullname}
            src={userData.profileImage}
          />
        </div>
        {userData._id == user?._id && (
          <div className="w-full flex justify-end">
            <Link href="/settings">
              <a>
                <Button className="hover:!bg-[#4A18D7] !bg-[#5d2ee0] text-white">
                  Edit profile
                </Button>
              </a>
            </Link>
          </div>
        )}
        <div className="text-center mt-5 space-y-6 px-10">
          <div className="space-y-2">
            <h1 className="font-bold text-3xl">{userData.fullname}</h1>
            <p className="text-lg">{userData.bio}</p>
          </div>
          <div className="flex items-center justify-between w-full space-x-3">
            <div className="flex items-center space-x-2">
              <RiCake2Line />
              <p>{`Joined on ${moment(userData.createdAt).date()} ${moment(
                userData.createdAt
              ).format("MMMM")} ${moment(userData.createdAt).format(
                "YYYY"
              )}`}</p>
            </div>
            <div className="flex items-center space-x-2">
              <FiMail />
              <a href={`mailto:${userData.email}`}>{`${userData.email}`}</a>
            </div>
            {userData.websiteUrl && (
              <div className="flex items-center space-x-2">
                <BsGlobe />
                <a href={`${userData.websiteUrl}`} target="_blank">
                  {userData.websiteUrl}
                </a>
              </div>
            )}

            {userData.github && (
              <div className="flex items-center text-xl">
                <a
                  href={`https://github.com/${userData.github}`}
                  target="_blank"
                >
                  <FaGithub />
                </a>
              </div>
            )}
            {userData.twitter && (
              <div className="flex items-center text-xl">
                <a
                  href={`https://github.com/${userData.twitter}`}
                  target="_blank"
                >
                  <FaTwitter />
                </a>
              </div>
            )}
          </div>
          <div className="flex items-center justify-evenly">
            {userData.education && (
              <div>
                <h4
                  className={`text-sm ${
                    colorMode === "dark" ? "text-white/50" : "text-black/50"
                  }`}
                >
                  Education
                </h4>
                <p>{userData.education}</p>
              </div>
            )}
            {userData.work && (
              <div>
                <h4
                  className={`text-sm ${
                    colorMode === "dark" ? "text-white/50" : "text-black/50"
                  }`}
                >
                  Work
                </h4>
                <p>{userData.work}</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;

export const getServerSideProps = async (context) => {
  const userId = context.params.userId;

  const res = await fetch(`http://localhost:4000/api/user/${userId}`);

  const data = await res.json();

  return {
    props: {
      userData: data.user,
    },
  };
};
