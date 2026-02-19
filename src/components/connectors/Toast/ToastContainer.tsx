import { useRecoilState } from "recoil";
import { toastState } from "../../../states";
import ToastItem from "./ToastItem";

export const ToastContainer = () => {
  const [toasts, setToasts] = useRecoilState(toastState);

  const removeToast = (id: number) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
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
