import React, { ChangeEvent, useEffect, useState } from "react";

import {
  Button,
  Input,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  FormControl,
  Select,
  Text,
} from "@chakra-ui/react";

type ModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
};

export const ModalDelete: React.FC<ModalProps> = ({
  isOpen = false,
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
          <Button colorScheme="red" onClick={onSuccess}>
            Eliminar
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};
