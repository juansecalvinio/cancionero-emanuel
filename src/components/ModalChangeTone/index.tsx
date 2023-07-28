import React from "react";
import {
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Text,
} from "@chakra-ui/react";

type ModalProps = {
  isOpen: boolean;
  isLoading: boolean;
  tone: string;
  onClose: () => void;
  onSuccess: () => void;
};

export const ModalChangeTone: React.FC<ModalProps> = ({
  isOpen = false,
  isLoading,
  tone,
  onClose,
  onSuccess,
}) => {
  return (
    <Modal
      isCentered
      motionPreset="slideInBottom"
      isOpen={isOpen}
      onClose={onClose}
    >
      <ModalOverlay />
      <ModalContent m={"16px"}>
        <ModalHeader>{`Se cambió la tonalidad a: ${tone}`}</ModalHeader>
        <ModalCloseButton />

        <ModalBody>
          <Text>¿Querés guardar la canción con este tono?</Text>
        </ModalBody>

        <ModalFooter>
          <Button variant="ghost" mr={3} onClick={onClose}>
            Cancelar
          </Button>
          <Button colorScheme="teal" onClick={onSuccess} isLoading={isLoading}>
            Guardar
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};
