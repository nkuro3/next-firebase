import { VariantProps, cva } from "class-variance-authority";
import Link from "next/link";
import { AnchorHTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/utils/cn";

type LinkButtonProps = AnchorHTMLAttributes<HTMLAnchorElement> &
  VariantProps<typeof variants> & {
    children: ReactNode;
    href: string;
  };

const variants = cva("text-white rounded-lg", {
  variants: {
    variant: {
      primary: "bg-blue-600 hover:bg-blue-500",
      error: "bg-red-600 hover:bg-red-500",
      success: "bg-green-600 hover:bg-green-500",
      default: "bg-gray-950 hover:bg-gray-600",
      secondary: "bg-gray-500 hover:bg-gray-400",
      outline: "bg-transparent border border-gray-400 hover:bg-gray-200 text-black",
      transparent: "bg-transparent hover:bg-gray-100 text-black"
    },
    size: {
      sm: "py-1 px-2 text-sm",
      md: "py-2 px-3",
      lg: "py-3 px-5 text-lg"
    }
  },
  defaultVariants: {
    variant: "default",
    size: "md"
  }
});

export const LinkButton = ({ href, children, size, variant, className, ...props }: LinkButtonProps) => {
  return (
    <Link {...props} href={href} className={cn(variants({ size, variant }), className)}>
      {children}
    </Link>
  );
};
