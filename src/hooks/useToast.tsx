import type { ToastType } from "../models";
import { toastState } from "../states";
import { useSetRecoilState } from "recoil";

let idCounter = 0;

export const useToast = () => {
  const setToasts = useSetRecoilState(toastState);

  const showToast = (
    message: string,
    type: ToastType = "info",
    duration: number = 4000
  ) => {
    setToasts((prev) => [
      ...prev,
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