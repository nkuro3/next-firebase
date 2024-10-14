"use client";

import { cva } from "class-variance-authority";
import { ButtonHTMLAttributes, ReactNode } from "react";
import { Button, ButtonProps } from "@/components/ui/button";
import { cn } from "@/lib/utils/cn";
import styles from "./styles/submit-button.module.css";

type Props = ButtonHTMLAttributes<HTMLButtonElement> &
  ButtonProps & {
    children: ReactNode;
    pending?: boolean;
  };

const variants = cva(styles.spinner, {
  variants: {
    size: {
      sm: styles.sizeSm,
      md: styles.sizeMd,
      lg: styles.sizeLg,
      icon: styles.sizeIcon
    }
  },
  defaultVariants: {
    size: "md"
  }
});

export const SubmitButton = ({ children, pending, className, size, disabled, ...props }: Props): JSX.Element => {
  return (
    <>
      <Button type="submit" disabled={pending || disabled} className={className} {...props}>
        {!pending ? (
          children
        ) : (
          <>
            <div className={styles.hiddenChildren}>{children}</div>
            <div className={cn(styles.spinnerBase, variants({ size }))}></div>
          </>
        )}
      </Button>
    </>
  );
};
