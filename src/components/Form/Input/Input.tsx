import { ErrorMessage } from "../ErrorMessage/ErrorMessage";
import styles from "./Input.module.css";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  error?: string;
}

export const Input = ({ error, ...props }: InputProps) => {
  return (
    <div className={styles.wrapper}>
      <input
        {...props}
        className={`${styles.input} ${error && styles.error}`}
      />
      <ErrorMessage error={error} />
    </div>
  );
};
