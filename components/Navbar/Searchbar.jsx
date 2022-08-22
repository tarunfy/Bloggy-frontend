import { CloseIcon, SearchIcon } from "@chakra-ui/icons";
import {
  Button,
  Input,
  InputGroup,
  InputRightElement,
  useColorMode,
} from "@chakra-ui/react";
import { useState } from "react";
import { useBlogContext } from "../../hooks/Blog/useBlogContext";
import { useRouter } from "next/router";

const Searchbar = () => {
  const [searchBarText, setSearchBarText] = useState("");
  const { colorMode } = useColorMode();

  const { blogs, dispatch } = useBlogContext();

  const router = useRouter();

  const handleSearch = () => {
    const filteredBlogs = blogs.filter(
      (blog) =>
        blog.blogTitle === searchBarText ||
        blog.blogTitle.includes(searchBarText)
    );
    dispatch({ type: "ADD", payload: filteredBlogs });
  };

  const handleClear = async () => {
    setSearchBarText("");
    const res = await fetch("/api/blogs");
    const data = await res.json();

    if (res.ok) {
      dispatch({ type: "ADD", payload: data.blogs });
    }
  };

  return (
    <div>
      {router.asPath == "/" && (
        <div className="flex items-center space-x-2">
          <InputGroup>
            <InputRightElement
              children={
                <SearchIcon
                  onClick={handleSearch}
                  color={`${colorMode === "light" ? "gray.700" : "gray.100"}`}
                />
              }
              className="!cursor-pointer !text-xl"
            />
            <Input
              value={searchBarText}
              onChange={(e) => setSearchBarText(e.target.value)}
              type="text"
              placeholder="Search..."
              className={`!border-[.5px] !text-lg !p-5  !w-[30rem]  ${
                colorMode === "light"
                  ? "!border-gray-400  text-black"
                  : "text-white/90 !border-gray-50"
              }`}
            />
          </InputGroup>
          {searchBarText && (
            <Button onClick={handleClear}>
              <CloseIcon
                color={`${colorMode === "light" ? "gray.700" : "gray.100"}`}
              />
            </Button>
          )}
        </div>
      )}
    </div>
  );
};

export default Searchbar;
