import {
  Button,
  Center,
  Input,
  Spinner,
  useColorMode,
  useToast,
} from "@chakra-ui/react";
import Layout from "../components/Layout";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/router";
import { useAuthContext } from "../hooks/Auth/useAuthContext";
import { useLogin } from "../hooks/Auth/useLogin";
import { useRef, useEffect } from "react";

const Login = () => {
  const usernameRef = useRef();
  const passwordRef = useRef();

  const router = useRouter();
  const { colorMode } = useColorMode();

  const toast = useToast();

  const { isLoading, login } = useLogin();

  const { user } = useAuthContext();

  useEffect(() => {
    if (user) {
      router.push("/");
    }
  }, [user]);

  if (user) {
    return (
      <Center w="100vw" h="100vh">
        <Spinner size="lg" />
      </Center>
    );
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    const error = await login(
      usernameRef.current.value.trim(),
      passwordRef.current.value.trim()
    );
    if (error) {
      toast({
        title: "Error",
        description: error,
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    } else {
      router.push("/");
    }
  };

  return (
    <div>
      <Layout title="Bloggy || Login" description="Bloggy login page" />
      <div className="flex justify-center items-center h-screen">
        <form
          onSubmit={(e) => handleSubmit(e)}
          className={`${
            colorMode === "light"
              ? "!border-gray-300 !bg-white/50"
              : "!border-gray-50/70 !bg-[#2D3748]/50"
          } border-[1px] py-10 px-16 rounded-lg space-y-3`}
        >
          <div className="flex items-center mb-5 justify-center">
            <Link href="/">
              <a>
                <Image src="/images/BloggyText.svg" height={100} width={400} />
              </a>
            </Link>
          </div>

          <Input
            type="text"
            width="md"
            variant="outline"
            placeholder="Username"
            display="block"
            ref={usernameRef}
          />

          <Input
            type="password"
            width="md"
            variant="outline"
            placeholder="Password"
            display="block"
            ref={passwordRef}
          />

          <Button
            disabled={isLoading}
            type="submit"
            className="hover:!bg-[#4A18D7] !bg-[#5d2ee0] !w-full text-white"
          >
            Log in
          </Button>
          <p className="text-center">
            Don't have an account?{" "}
            <span className="font-medium text-[#5d2ee0]">
              <Link href="/signup">Sign up</Link>
            </span>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
