/* eslint-disable @typescript-eslint/no-explicit-any */
"user client";

import { ReactNode } from "react";
import { Button } from "@/components/ui/button";
import { SubmitButton } from "@/components/ui/submit-button";
import styles from "./styles/modal.module.css";

export type ModalProps = {
  isOpen: boolean;
  title: string;
  message: ReactNode;
  onOk: () => Promise<any> | any;
  onCancel?: () => void;
  pending?: boolean;
};

export const Modal = ({ isOpen, title, message, onOk, onCancel, pending }: ModalProps) => {
  if (!isOpen) return null;
  return (
    isOpen && (
      <div className={styles.modalOverlay}>
        <div className={styles.modalContent}>
          <div className={styles.modalHeader}>
            <h4 className={styles.modalTitle}>{title}</h4>
            <div className={styles.modalMessage}>{message}</div>
          </div>
          <div className={styles.modalFooter}>
            {onCancel && (
              <Button onClick={onCancel} variant="secondary">
                Cancel
              </Button>
            )}
            <form action={onOk}>
              <SubmitButton pending={pending}>OK</SubmitButton>
            </form>
          </div>
        </div>
      </div>
    )
  );
};
