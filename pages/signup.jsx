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
import { useSignup } from "../hooks/Auth/useSignup";
import { useRef, useEffect } from "react";
import { useRouter } from "next/router";
import { useAuthContext } from "../hooks/Auth/useAuthContext";

const Signup = () => {
  const usernameRef = useRef(null);
  const fullnameRef = useRef(null);
  const emailRef = useRef(null);
  const passwordRef = useRef(null);

  const { colorMode } = useColorMode();

  const router = useRouter();

  const toast = useToast();

  const { isLoading, signup } = useSignup();

  const { user } = useAuthContext();

  useEffect(() => {
    if (user) {
      router.push("/");
    }
  }, [user]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const error = await signup(
      emailRef.current.value,
      passwordRef.current.value,
      usernameRef.current.value,
      fullnameRef.current.value
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

  if (user) {
    return (
      <Center w="100vw" h="100vh">
        <Spinner size="lg" />
      </Center>
    );
  }

  return (
    <div>
      <Layout title="Bloggy || Signup" description="Bloggy signup page" />
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
            type="email"
            width="md"
            variant="outline"
            placeholder="Email"
            display="block"
            ref={emailRef}
          />

          <Input
            type="text"
            width="md"
            variant="outline"
            placeholder="Fullname"
            display="block"
            required
            ref={fullnameRef}
          />

          <Input
            type="text"
            width="md"
            variant="outline"
            placeholder="Username"
            display="block"
            required
            ref={usernameRef}
          />

          <Input
            type="password"
            width="md"
            variant="outline"
            placeholder="Password"
            display="block"
            required
            ref={passwordRef}
          />

          <Button
            type="submit"
            disabled={isLoading}
            className="hover:!bg-[#4A18D7] !bg-[#5d2ee0] !w-full text-white"
          >
            Sign up
          </Button>
          <p className="text-center">
            Already have an account?{" "}
            <span className="font-medium text-[#5d2ee0]">
              <Link href="/login">Log in</Link>
            </span>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Signup;
