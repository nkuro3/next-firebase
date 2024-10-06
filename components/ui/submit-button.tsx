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
        <div>
          <div className="h-0 opacity-0">{children}</div>
          <div className="animate-spin rounded-full border-t-transparent h-4 w-4 border-2 border-white mx-auto"></div>
        </div>
      )}
    </Button>
  );
};
