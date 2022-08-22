import { Avatar, Button, useColorMode } from "@chakra-ui/react";
import { useAuthContext } from "../../hooks/Auth/useAuthContext";
import Link from "next/link";
import moment from "moment";

const ProfileCard = ({ userData }) => {
  const { user } = useAuthContext();
  const { colorMode } = useColorMode();

  return (
    <>
      <div className="flex  items-end space-x-2 mb-2 w-full">
        <Avatar
          name={userData.fullname}
          src={userData.profileImage}
          alt="user profile img"
        />
        <h3 className="text-xl font-bold">{userData.fullname}</h3>
      </div>
      <Link
        href={
          userData._id == user?._id ? `/settings` : `/users/${userData._id}`
        }
      >
        <a>
          <Button className="hover:!bg-[#4A18D7] w-full !bg-[#5d2ee0] text-white">
            {userData._id == user?._id ? "Edit Profile" : "View Profile"}
          </Button>
        </a>
      </Link>
      <p
        className={`${
          colorMode === "light" ? "text-gray-900" : "text-gray-400"
        }`}
      >
        {userData.bio}
      </p>

      {userData.work && (
        <div>
          <h4
            className={`uppercase text-base font-semibold ${
              colorMode === "light" ? "text-gray-900" : "text-gray-400"
            }`}
          >
            Work
          </h4>
          <p className="text-sm">{userData.work}</p>
        </div>
      )}
      {userData.education && (
        <div>
          <h4
            className={`uppercase text-base font-semibold ${
              colorMode === "light" ? "text-gray-900" : "text-gray-400"
            }`}
          >
            Education
          </h4>
          <p className="text-sm">{userData.education}</p>
        </div>
      )}
      <div>
        <h4
          className={`uppercase text-base font-semibold ${
            colorMode === "light" ? "text-gray-900" : "text-gray-400"
          }`}
        >
          Joined
        </h4>
        <p className="text-sm">{`${moment(userData.createdAt).date()} ${moment(
          userData.createdAt
        ).format("MMMM")} ${moment(userData.createdAt).format("YYYY")}`}</p>
      </div>
    </>
  );
};

export default ProfileCard;
