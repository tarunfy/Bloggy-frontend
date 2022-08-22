import { CloseIcon } from "@chakra-ui/icons";
import Link from "next/link";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  IconButton,
  Button,
} from "@chakra-ui/react";

const CancelModal = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <IconButton onClick={onOpen} variant="outline" icon={<CloseIcon />} />
      <Modal isOpen={isOpen} onClose={onClose} isCentered>
        <ModalOverlay bg="none" backdropFilter="auto" backdropBlur="2px" />
        <ModalContent>
          <ModalHeader>You have unsaved changes</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            You've made changes to your post. Do you want to navigate to leave
            this page?
          </ModalBody>
          <ModalFooter>
            <Link href="/">
              <a>
                <Button colorScheme="red" mr={3}>
                  Yes, leave the page
                </Button>
              </a>
            </Link>
            <Button
              variant="outline"
              onClick={() => {
                onClose();
              }}
            >
              No, keep editing
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default CancelModal;
