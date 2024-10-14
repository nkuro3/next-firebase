import { VariantProps, cva } from "class-variance-authority";
import { ButtonHTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/utils/cn";
import styles from "./styles/button.module.css";

export type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> &
  VariantProps<typeof buttonVariants> & {
    children: ReactNode;
    link?: boolean;
  };

const buttonVariants = cva(styles.buttonBase, {
  variants: {
    variant: {
      primary: styles.primary,
      error: styles.error,
      success: styles.success,
      default: styles.default,
      secondary: styles.secondary,
      outline: styles.outline,
      transparent: styles.transparent,
      none: styles.none
    },
    size: {
      sm: styles.sizeSm,
      md: styles.sizeMd,
      lg: styles.sizeLg,
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
          [styles.disabledButton]: !link && disabled
        },
        {
          [styles.linkButton]: link && !disabled
        },
        {
          [styles.linkButtonDisabled]: link && disabled
        },
        className
      )}
    >
      {children}
    </button>
  );
};
