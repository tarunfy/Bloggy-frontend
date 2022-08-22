import Link from "next/link";
import { ChevronDownIcon } from "@chakra-ui/icons";
import {
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Avatar,
  MenuDivider,
} from "@chakra-ui/react";
import { useLogout } from "../../hooks/Auth/useLogout";
import { useAuthContext } from "../../hooks/Auth/useAuthContext";

const Profile = () => {
  const logout = useLogout();
  const { user } = useAuthContext();
  return (
    <Menu>
      <MenuButton as={"button"} righticon={<ChevronDownIcon />}>
        <Avatar size="md" name={user.fullname} src={user?.profileImage} />
      </MenuButton>
      <MenuList>
        <Link href={`/users/${user._id}`}>
          <a>
            <MenuItem>@{user.username}</MenuItem>
          </a>
        </Link>
        <MenuDivider />
        <Link href="/dashboard">
          <a>
            <MenuItem>Dashboard</MenuItem>
          </a>
        </Link>
        <Link href="/settings">
          <a>
            <MenuItem>Settings</MenuItem>
          </a>
        </Link>
        <MenuDivider />
        <MenuItem onClick={logout}>Sign Out</MenuItem>
      </MenuList>
    </Menu>
  );
};

export default Profile;
