import { motion } from "framer-motion";
import styles from "./AddCard.module.css";
import { Task } from "@/types/task";
import { Priority } from "@/types/priority";

interface AddCardProps {
  handleAddCard: (item: Omit<Task, "id" | "wrapper">) => void;
}

const dummyItem: Omit<Task, "id" | "wrapper"> = {
  name: "New Card",
  description: "New Card Description",
  priority: Priority.LOW,
  status: "todo",
  createdAt: new Date(),
  updatedAt: new Date(),
};

export const AddCard = ({ handleAddCard }: AddCardProps) => {
  return (
    <div className={styles["add-wrapper"]}>
      <motion.button
        className={styles.add}
        whileHover={{ scale: 1.05 }}
        onClick={() => handleAddCard(dummyItem)}
      >
        Add Task
      </motion.button>
    </div>
  );
};
