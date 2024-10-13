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
      sm: "py-1 px-2 text-sm",
      md: "py-2 px-3",
      lg: "py-3 px-5 text-lg",
      icon: "h-8 w-8"
    }
  },
  defaultVariants: {
    size: "md"
  }
});

export const SubmitButton = ({ children, pending, size, className, ...props }: Props): JSX.Element => {
  return (
    <Button type="submit" disabled={pending} className={className} {...props}>
      {!pending ? (
        children
      ) : (
        <div className={cn(variants({ size }))}>
          <div className="h-0 opacity-0">{children}</div>
          <div className="animate-spin rounded-full border-t-transparent h-4 w-4 border-2 border-white mx-auto"></div>
        </div>
      )}
    </Button>
  );
};
