import { Box, Skeleton, SkeletonText } from "@chakra-ui/react";

const NewsCardSkeleton = () => {
  return (
    <Box padding="2">
      <Skeleton height="160px" borderRadius="10px" />
      <SkeletonText mt="2" borderRadius={5} noOfLines={2} spacing="1" />
    </Box>
  );
};

export default NewsCardSkeleton;
