"use client";

import { cva } from "class-variance-authority";
import { ButtonHTMLAttributes, ReactNode } from "react";
import { Button, ButtonProps } from "@/components/ui/button";
import { cn } from "@/lib/utils/cn";

type Props = ButtonHTMLAttributes<HTMLButtonElement> &
  ButtonProps & {
    children: ReactNode;
    pending?: boolean;
  };

const variants = cva("text-white rounded-lg", {
  variants: {
    size: {
      sm: "h-5 w-5",
      md: "h-6 w-6",
      lg: "h-7 w-7",
      icon: "h-8 w-8"
    }
  },
  defaultVariants: {
    size: "md"
  }
});

export const SubmitButton = ({ children, pending, className, size, ...props }: Props): JSX.Element => {
  return (
    <Button type="submit" disabled={pending} className={className} {...props}>
      {!pending ? (
        children
      ) : (
        <>
          <div className="h-0 opacity-0">{children}</div>
          <div
            className={cn(
              "animate-spin !rounded-full !border-t-transparent border-2 border-white mx-auto",
              variants({ size })
            )}
          ></div>
        </>
      )}
    </Button>
  );
};
