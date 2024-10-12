"user client";

import { ReactNode } from "react";
import { Button } from "@/components/ui/button";

export type ModalProps = {
  isOpen: boolean;
  title: string;
  message: ReactNode;
  onOk: () => void;
  onCancel?: () => void;
};

const Modal = ({ isOpen, title, message, onOk, onCancel }: ModalProps) => {
  if (!isOpen) return null;
  return (
    isOpen && (
      <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-black bg-opacity-50 w-full h-full z-10">
        <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-gray-100 w-120 min-h-48 p-5 rounded flex flex-col items-start z-20">
          <div className="w-full text-gray-700 mb-5">
            <h4 className="mb-5 border-b border-gray-300">{title}</h4>
            <div className="text-sm">{message}</div>
          </div>
          <div className="w-full mt-auto flex gap-4 justify-center">
            <Button onClick={onOk}>OK</Button>
            {onCancel && (
              <Button onClick={onCancel} variant="secondary">
                Cancel
              </Button>
            )}
          </div>
        </div>
      </div>
    )
  );
};
export default Modal;
