/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { ReactNode, useCallback, useState } from "react";
import { ModalProps } from "@/components/ui/modal";

export const useModal = () => {
  const [modalState, setModalState] = useState<ModalProps>({
    isOpen: false,
    title: "",
    message: "",
    onOk: () => {}
  });

  const showModal = useCallback(
    ({
      title,
      message,
      onOk,
      onCancel
    }: {
      title: string;
      message: ReactNode;
      onOk: (args?: any) => Promise<void> | void;
      onCancel?: () => void;
    }) => {
      setModalState({
        isOpen: true,
        title,
        message,
        onOk,
        onCancel
      });
    },
    []
  );

  const closeModal = useCallback(() => {
    setModalState((prev) => ({ ...prev, isOpen: false }));
  }, []);

  return { modalState, showModal, closeModal };
};
