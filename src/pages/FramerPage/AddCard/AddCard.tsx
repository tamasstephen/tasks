import { motion } from "framer-motion";
import styles from "./AddCard.module.css";
import { Item } from "@/types";

interface AddCardProps {
  handleAddCard: (item: Omit<Item, "id" | "wrapper">) => void;
}

const dummyItem: Omit<Item, "id" | "wrapper"> = {
  name: "New Card",
  email: "newcard@example.com",
  phone: "1234567890",
  address: "123 Main St, Anytown, USA",
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
