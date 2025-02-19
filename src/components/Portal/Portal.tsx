import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import styles from "./Portal.module.css";

export const Portal = ({ children }: { children: React.ReactNode }) => {
  const [mounted, setMounted] = useState(false);
  const portal = document.getElementById("portal");

  useEffect(() => {
    if (portal) {
      setMounted(true);
    }
    return () => setMounted(false);
  }, [setMounted]);

  const wrapper = (
    <div role="dialog" aria-modal="true" className={styles.modal}>
      {" "}
      {children}
    </div>
  );

  return mounted ? createPortal(wrapper, portal as HTMLElement) : null;
};
