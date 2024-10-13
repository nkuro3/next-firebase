"use client";

import { useCallback, useState } from "react";
import { AlertProps } from "@/components/ui/alert";

type AlertOptions = {
  message: string;
  variant?: AlertProps["variant"];
  duration?: number;
};

type UseAlertReturn = {
  alertState: AlertProps;
  showAlert: (options: AlertOptions) => void;
  hideAlert: () => void;
};

export function useAlert(): UseAlertReturn {
  const [alertState, setAlertState] = useState<AlertProps>({
    show: false,
    variant: "default",
    message: ""
  });

  const hideAlert = useCallback(() => {
    setAlertState((prev) => ({ ...prev, show: false }));
  }, []);

  const showAlert = useCallback(
    ({ message, variant = "default", duration = 5000 }: AlertOptions) => {
      setAlertState({
        show: true,
        variant,
        message,
        close: hideAlert
      });

      if (duration && duration > 0) {
        setTimeout(hideAlert, duration);
      }
    },
    [hideAlert]
  );

  return {
    alertState,
    showAlert,
    hideAlert
  };
}
