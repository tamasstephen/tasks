import { motion } from "framer-motion";
import styles from "./TextArea.module.css";
import { ErrorMessage } from "../ErrorMessage/ErrorMessage";

interface TextAreaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  error?: string;
}

export const TextArea = ({ error, ...props }: TextAreaProps) => {
  return (
    <motion.div layout className={styles.wrapper}>
      <textarea
        {...props}
        className={`${styles.textarea} ${error && styles.error}`}
      />
      <ErrorMessage error={error} />
    </motion.div>
  );
};
