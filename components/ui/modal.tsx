/* eslint-disable @typescript-eslint/no-explicit-any */
"user client";

import { ReactNode } from "react";
import { Button } from "@/components/ui/button";
import { SubmitButton } from "@/components/ui/submit-button";

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
      <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-black bg-opacity-50 w-full h-full z-20">
        <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-gray-100 w-120 min-h-48 p-5 rounded flex flex-col items-start z-20">
          <div className="w-full text-gray-700 mb-5">
            <h4 className="mb-5 border-b border-gray-300">{title}</h4>
            <div className="text-sm">{message}</div>
          </div>
          <div className="w-full mt-auto flex gap-6 justify-end">
            <form action={onOk}>
              <SubmitButton pending={pending} className="rounded">
                OK
              </SubmitButton>
            </form>
            {onCancel && <Button onClick={onCancel}>Cancel</Button>}
          </div>
        </div>
      </div>
    )
  );
};
