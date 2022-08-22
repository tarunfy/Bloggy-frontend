import Image from "next/image";
import Link from "next/link";
import Searchbar from "./Searchbar";
import { Button, IconButton, useColorMode } from "@chakra-ui/react";
import { MoonIcon, SunIcon } from "@chakra-ui/icons";
import { useEffect, useState } from "react";
import Profile from "./Profile";
import { useAuthContext } from "../../hooks/Auth/useAuthContext";

const Navbar = () => {
  const [audio, setAudio] = useState(null);

  const { user } = useAuthContext();

  useEffect(() => {
    setAudio(new Audio("/audios/switch.mp3"));
  }, []);

  const { colorMode, toggleColorMode } = useColorMode();

  const handleTheme = async () => {
    toggleColorMode();
    await audio.play();
  };

  return (
    <div
      className={`
      z-50
      backdrop-blur-sm
      fixed top-0 left-0
    py-2 px-20 w-screen ${
      colorMode === "light"
        ? "!border-gray-300 !bg-white/50"
        : " !border-gray-50/50 !bg-[#2D3748]/50"
    }  flex items-center justify-between border-b`}
    >
      <div className="flex items-center space-x-5">
        <Link href="/">
          <a className="text-3xl font-extrabold flex items-center justify-center">
            <Image src="/images/Bloggy.svg" height={50} width={60} />
          </a>
        </Link>
        <Searchbar />
      </div>

      <div className="space-x-4 flex items-center">
        <IconButton
          onClick={handleTheme}
          aria-label="Theme"
          variant="none"
          fontSize="20px"
          icon={colorMode === "light" ? <MoonIcon /> : <SunIcon />}
        />

        {user ? (
          <>
            <Link href="/create">
              <a>
                <Button
                  variant="outline"
                  className={` font-Jost !text-lg !font-normal border !border-[#4A18D7]  ${
                    colorMode === "light"
                      ? "!text-[#4A18D7] hover:!text-white hover:!bg-[#4A18D7]"
                      : "!text-white/90 !border-white hover:!bg-white/95 hover:!text-[#4A18D7] "
                  }`}
                >
                  Create Post
                </Button>
              </a>
            </Link>
            <Profile />
          </>
        ) : (
          <>
            <Link href="/login">
              <a>
                <Button
                  variant="ghost"
                  className={`font-Jost !text-lg !font-normal ${
                    colorMode === "light"
                      ? "!text-[#4A18D7] hover:!bg-[#4A18D7]/10"
                      : "!text-white/90 hover:!bg-[#4A18D7]/40"
                  }`}
                >
                  Log in
                </Button>
              </a>
            </Link>
            <Link href="/signup">
              <a>
                <Button
                  variant="outline"
                  className={` font-Jost !text-lg !font-normal border !border-[#4A18D7]  ${
                    colorMode === "light"
                      ? "!text-[#4A18D7] hover:!text-white hover:!bg-[#4A18D7]"
                      : "!text-white/90 !border-white hover:!bg-white/95 hover:!text-[#4A18D7] "
                  }`}
                >
                  Create account
                </Button>
              </a>
            </Link>
          </>
        )}
      </div>
    </div>
  );
};

export default Navbar;
