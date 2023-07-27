import React, { ChangeEvent, useEffect, useState } from "react";

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
  onClose: () => void;
  onSuccess: () => void;
};

export const ModalDelete: React.FC<ModalProps> = ({
  isOpen = false,
  isLoading,
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
        <ModalHeader>Eliminar canción</ModalHeader>
        <ModalCloseButton />

        <ModalBody>
          <Text>¿Estás seguro que querés eliminar esta canción?</Text>
        </ModalBody>

        <ModalFooter>
          <Button variant="ghost" mr={3} onClick={onClose}>
            Cancelar
          </Button>
          <Button colorScheme="red" onClick={onSuccess} isLoading={isLoading}>
            Eliminar
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};
