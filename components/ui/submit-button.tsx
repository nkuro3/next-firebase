"use client";

import { ButtonHTMLAttributes, ReactNode } from "react";
import { Button } from "@/components/ui/button";

type Props = ButtonHTMLAttributes<HTMLButtonElement> & {
  children: ReactNode;
  pending: boolean;
};

export const SubmitButton = ({ children, pending, ...props }: Props): JSX.Element => {
  return (
    <Button type="submit" disabled={pending} {...props}>
      {!pending ? (
        children
      ) : (
        <>
          <div className="h-0 opacity-0">{children}</div>
          <div className="animate-spin rounded-full border-t-transparent h-6 w-6 border-2 border-gray-50 mx-auto"></div>
        </>
      )}
    </Button>
  );
};
