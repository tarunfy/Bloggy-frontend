import { Box, Skeleton, SkeletonCircle, useColorMode } from "@chakra-ui/react";

const BlogCardSkeleton = ({ banner }) => {
  const { colorMode } = useColorMode();
  return (
    <>
      <Box
        width="100%"
        className={` ${
          colorMode === "light" ? " !bg-white/50" : " !bg-[#2D3748]/50"
        }`}
        borderRadius="10px"
      >
        {banner && (
          <Skeleton
            height="240px"
            borderTopRightRadius="10px"
            borderTopLeftRadius="10px"
          />
        )}
        <Box padding="16px">
          <Box className="!flex !items-start">
            <SkeletonCircle size="12" />
            <Box className="w-full" mt={3}>
              <Skeleton
                height="20px"
                borderRadius={5}
                width="20%"
                marginLeft="10px"
              />
              <Skeleton
                height="40px"
                borderRadius={5}
                mt={5}
                width="90%"
                marginLeft="10px"
              />
            </Box>
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default BlogCardSkeleton;
