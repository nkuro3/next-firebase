import { VariantProps, cva } from "class-variance-authority";
import Link from "next/link";
import { AnchorHTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/utils/cn";
import styles from "./styles/link-button.module.css";

export type LinkButtonProps = AnchorHTMLAttributes<HTMLAnchorElement> &
  VariantProps<typeof linkButtonVariants> & {
    children: ReactNode;
    href: string;
  };

const linkButtonVariants = cva(styles.buttonBase, {
  variants: {
    variant: {
      primary: styles.primary,
      error: styles.error,
      success: styles.success,
      default: styles.default,
      secondary: styles.secondary,
      outline: styles.outline,
      transparent: styles.transparent
    },
    size: {
      sm: styles.sizeSm,
      md: styles.sizeMd,
      lg: styles.sizeLg
    }
  },
  defaultVariants: {
    variant: "default",
    size: "md"
  }
});

export const LinkButton = ({ href, children, size, variant, className, ...props }: LinkButtonProps) => {
  return (
    <Link {...props} href={href} className={cn(linkButtonVariants({ size, variant }), className)}>
      {children}
    </Link>
  );
};
