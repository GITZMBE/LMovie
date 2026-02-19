import { useEffect, useRef, useState } from "react";
import { Toast } from "../../../models";

interface Props {
  toast: Toast;
  onClose: () => void;
}

export const ToastItem = ({ toast, onClose }: Props) => {
  const [progress, setProgress] = useState(100);
  const [paused, setPaused] = useState(false);
  const startTime = useRef(Date.now());
  const elapsed = useRef(0);

  useEffect(() => {
    const interval = setInterval(() => {
      if (paused) return;

      const now = Date.now();
      const delta = now - startTime.current + elapsed.current;
      const percentage = Math.max(
        0,
        100 - (delta / toast.duration) * 100
      );

      setProgress(percentage);

      if (percentage <= 0) {
        onClose();
      }
    }, 16);

    return () => clearInterval(interval);
  }, [onClose, paused, toast.duration]);

  const handleMouseEnter = () => {
    elapsed.current += Date.now() - startTime.current;
    setPaused(true);
  };

  const handleMouseLeave = () => {
    startTime.current = Date.now();
    setPaused(false);
  };

  return (
    <div
      className={`toast toast-${toast.type}`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div className="toast-message">{toast.message}</div>
      <div className="toast-progress">
        <div
          className="toast-progress-bar"
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  );
};

export default ToastItem;
