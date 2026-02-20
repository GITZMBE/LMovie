import { useStore } from "@nanostores/react";
import { toastState } from "../../../states";
import ToastItem from "./ToastItem";

export const ToastContainer = () => {
  const toasts = useStore(toastState);

  const removeToast = (id: number) => {
    toastState.set(toasts.filter((t) => t.id !== id));
  };

  return (
    <div className="toast-container">
      {toasts.map((toast) => (
        <ToastItem
          key={toast.id}
          toast={toast}
          onClose={() => removeToast(toast.id)}
        />
      ))}
    </div>
  );
};

export default ToastContainer;
