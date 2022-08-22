import "../styles/globals.css";
import { ChakraProvider } from "@chakra-ui/react";
import { AuthProvider } from "../context/AuthContext";
import { BlogProvider } from "../context/BlogContext";

function MyApp({ Component, pageProps }) {
  return (
    <ChakraProvider>
      <AuthProvider>
        <BlogProvider>
          <Component {...pageProps} />
        </BlogProvider>
      </AuthProvider>
    </ChakraProvider>
  );
}

export default MyApp;
