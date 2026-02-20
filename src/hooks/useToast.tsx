import { useStore } from "@nanostores/react";
import type { ToastType } from "../models";
import { toastState } from "../states";

let idCounter = 0;

export const useToast = () => {
  const toast = useStore(toastState);

  const showToast = (
    message: string,
    type: ToastType = "info",
    duration: number = 4000
  ) => {
    toastState.set([
      ...toast,
      {
        id: ++idCounter,
        message,
        type,
        duration,
      },
    ]);
  };

  return { showToast };
};

export default useToast;