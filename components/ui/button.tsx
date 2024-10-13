"use client";

import { VariantProps, cva } from "class-variance-authority";
import { ButtonHTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/utils/cn";

export type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> &
  VariantProps<typeof buttonVariants> & {
    children: ReactNode;
    link?: boolean;
  };

const buttonVariants = cva("text-white rounded-lg", {
  variants: {
    variant: {
      primary: "bg-blue-600 hover:bg-blue-500",
      error: "bg-red-600 hover:bg-red-500",
      success: "bg-green-600 hover:bg-green-500",
      default: "bg-gray-950 hover:bg-gray-600",
      secondary: "bg-gray-500 hover:bg-gray-400",
      outline: "bg-transparent border border-gray-400 hover:bg-gray-300 text-black",
      transparent: "bg-transparent hover:bg-gray-100 text-black",
      none: "text-black"
    },
    size: {
      sm: "py-1 px-2 text-sm",
      md: "py-2 px-3",
      lg: "py-3 px-5 text-lg",
      icon: ""
    }
  },
  defaultVariants: {
    variant: "default",
    size: "md"
  }
});

export const Button = ({ children, className, variant, size, disabled, link, ...props }: ButtonProps) => {
  return (
    <button
      {...props}
      className={cn(
        buttonVariants({ size, variant }),
        {
          "bg-gray-500 hover:bg-gray-500 cursor-default": !link && disabled
        },
        {
          "p-0 bg-transparent hover:bg-transparent hover:underline text-black cursor-pointer": link && !disabled
        },
        {
          "p-0 bg-transparent hover:bg-transparent text-gray-400 cursor-default": link && disabled
        },
        className
      )}
    >
      {children}
    </button>
  );
};
