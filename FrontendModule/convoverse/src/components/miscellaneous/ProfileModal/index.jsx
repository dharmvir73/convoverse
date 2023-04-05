import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  IconButton,
  Button,
  Image,
  Text,
} from "@chakra-ui/react";
import { useDisclosure } from "@chakra-ui/hooks";
import { ViewIcon } from "@chakra-ui/icons";

const ProfileModal = ({ user, children }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <>
      {children ? (
        <span onClick={onOpen}>{children}</span>
      ) : (
        <IconButton
          display={{ base: "flex" }}
          icon={<ViewIcon />}
          onClick={onOpen}
        />
      )}
      <Modal isOpen={isOpen} onClose={onClose} motionPreset="scale">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader
            display={"flex"}
            justifyContent={"center"}
            fontSize={40}
            fontFamily="work sans"
          >
            {user.name}
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody display={"flex"} justifyContent={"center"}>
            <Image
              borderRadius={"full"}
              boxSize={"150px"}
              src={user.pic}
              alt={user.name}
            />
          </ModalBody>
          <ModalBody display={"flex"} justifyContent={"center"}>
            <Text fontSize={{ base: "28px", md: "30px" }} color={"gray.500"}>
              Email: {user.email}
            </Text>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={onClose}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default ProfileModal;
