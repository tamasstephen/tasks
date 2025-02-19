import { motion } from "framer-motion";
import styles from "./ErrorMessage.module.css";

export const ErrorMessage = ({ error }: { error: string | undefined }) => {
  return (
    <motion.p layout className={styles["error-text"]}>
      {error}
    </motion.p>
  );
};
