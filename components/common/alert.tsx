import { VariantProps, cva } from "class-variance-authority";
import { cn } from "@/lib/utils/cn";

export type AlertProps = VariantProps<typeof alertVariants> & {
  message?: string;
  className?: string;
  show?: boolean;
  close?: () => void;
};

const alertVariants = cva("flex items-center p-4 mb-4 rounded-lg", {
  variants: {
    variant: {
      info: "text-blue-800 bg-blue-100",
      error: "text-red-800 bg-red-100",
      success: "text-green-800 bg-green-100",
      warning: "text-yellow-800 bg-yellow-100",
      default: "text-gray-800 bg-gray-100"
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
        <div className={cn(alertVariants({ variant, className }))} role="alert-1">
          <svg
            className="flex-shrink-0 w-4 h-4"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z" />
          </svg>
          <span className="sr-only">Info</span>
          <div className="ms-3 text-sm font-medium">{message}</div>
          <button
            type="button"
            className={"ms-auto -mx-1.5 -my-1.5 rounded-lg p-1.5 inline-flex items-center justify-center h-8 w-8 "}
            data-dismiss="alert-1"
            aria-label="Close"
            onClick={close}
          >
            <span className="sr-only">Close</span>
            <svg
              className="w-3 h-3"
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
