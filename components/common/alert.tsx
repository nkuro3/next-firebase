import { VariantProps, cva } from "class-variance-authority";
import { cn } from "@/lib/utils/cn";
import styles from "./styles/alert.module.css";

export type AlertProps = VariantProps<typeof alertVariants> & {
  message?: string;
  className?: string;
  show?: boolean;
  close?: () => void;
};

const alertVariants = cva(styles.alertBase, {
  variants: {
    variant: {
      info: styles.info,
      error: styles.error,
      success: styles.success,
      warning: styles.warning,
      default: styles.default
    }
  },
  defaultVariants: {
    variant: "default"
  }
});

export const Alert = ({ message, className, variant, show, close }: AlertProps) => {
  if (!show) return null;
  return (
    <>
      {show && (
        <div className={cn(alertVariants({ variant }), className)} role="alert">
          <svg
            className={styles.icon}
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z" />
          </svg>
          <span className="sr-only">Info</span>
          <div className={styles.message}>{message}</div>
          <button type="button" className={styles.closeButton} data-dismiss="alert" aria-label="Close" onClick={close}>
            <span className="sr-only">Close</span>
            <svg
              className={styles.closeIcon}
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 14 14"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
              />
            </svg>
          </button>
        </div>
      )}
    </>
  );
};
