import { useEffect } from "react";

export const useClickOutside = (
  ref: React.RefObject<HTMLElement | null>,
  onClose: () => void,
) => {
  useEffect(() => {
    const controller = new AbortController();
    const handleClickOutside = (event: MouseEvent) => {
      if (ref?.current && !ref.current.contains(event.target as Node)) {
        onClose();
      }
    };
    document.addEventListener("mousedown", handleClickOutside, {
      signal: controller.signal,
    });
    return () => {
      controller.abort();
    };
  }, [onClose, ref]);
};
