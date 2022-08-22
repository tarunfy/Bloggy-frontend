import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Button,
  useToast,
} from "@chakra-ui/react";
import { useDeleteBlog } from "../../hooks/Blog/useDeleteBlog";
import { useRouter } from "next/router";

const DeleteBlogModal = ({ blogId }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const { isLoading, deleteBlog } = useDeleteBlog();

  const toast = useToast();

  const router = useRouter();

  const handleDelete = async () => {
    const error = await deleteBlog(blogId);
    if (!error) {
      toast({
        title: "Blog deleted.",
        description: "We've deleted your blog for you.",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
      router.push("/");
    } else {
      toast({
        title: "Error",
        description: error,
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  return (
    <>
      <Button onClick={onOpen} colorScheme="red">
        Delete
      </Button>
      <Modal isOpen={isOpen} onClose={onClose} isCentered>
        <ModalOverlay bg="none" backdropFilter="auto" backdropBlur="2px" />
        <ModalContent>
          <ModalHeader>Are you absolutely sure?</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            This action cannot be undone. This will permanently delete the blog.
          </ModalBody>
          <ModalFooter>
            <Button
              disabled={isLoading}
              onClick={handleDelete}
              colorScheme="red"
              mr={3}
            >
              Delete
            </Button>

            <Button
              variant="outline"
              onClick={() => {
                onClose();
              }}
            >
              Cancel
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default DeleteBlogModal;
