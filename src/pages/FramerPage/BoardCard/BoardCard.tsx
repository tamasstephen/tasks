import { Key } from "@/types";
import { motion } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import styles from "./BoardCard.module.css";
import { Task } from "@/types/task";
import { Priority } from "@/types/priority";

const cardVariants = {
  active: { backgroundColor: "rgba(0, 0, 255, 0.2)" },
  inactive: { backgroundColor: "#fff" },
};

export const BoardCard = ({
  data,
  handleDragStart,
  columnId,
  setNearestCard,
  nearestCard,
}: {
  data: Task;
  columnId: Key;
  handleDragStart: (e: React.DragEvent<HTMLDivElement>, item: Task) => void;
  setNearestCard: (card: HTMLElement | null) => void;
  nearestCard: HTMLElement | null;
}) => {
  console.log(data);
  const thisCard = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState<boolean>(false);
  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setActive(true);
    setNearestCard(thisCard.current as HTMLElement);
  };

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setActive(false);
    setNearestCard(null);
  };

  const handleDragEnd = () => {
    setActive(false);
  };

  const selectPriorityStyle = (priority: Priority) => {
    switch (priority) {
      case Priority.HIGH:
        return styles["priority-high"];
      case Priority.MEDIUM:
        return styles["priority-medium"];
      case Priority.LOW:
        return styles["priority-low"];
      case Priority.URGENT:
        return styles["priority-urgent"];
    }
  };

  useEffect(() => {
    if (!nearestCard || nearestCard.dataset.cardId !== data.id.toString()) {
      setActive(false);
    }
  }, [nearestCard, data]);

  const formatDate = (date: Date | string) => {
    if (typeof date === "string") {
      const dateObj = new Date(date);
      return dateObj.toLocaleDateString().replace(/\s/g, "");
    }
    return date.toLocaleDateString().replace(/\s/g, "");
  };

  return (
    <motion.div
      draggable="true"
      className={styles.item}
      onDragEndCapture={handleDragEnd}
      onDragStart={(e) =>
        handleDragStart(e as unknown as React.DragEvent<HTMLDivElement>, data)
      }
      layout
      onDragLeave={handleDragLeave}
      animate={active ? "active" : "inactive"}
      onDragOver={handleDragOver}
      data-column-id={columnId}
      data-card-id={data.id}
      variants={cardVariants}
      ref={thisCard}
    >
      <h3 className={`${styles.title} `}>{data.name}</h3>
      <p className={styles.description}>{data.description}</p>
      <div className={styles.dateContainer}>
        <p className={styles.dateLabel}>Updated at:</p>
        <div className={styles.updatedAt}>{formatDate(data.updatedAt)}</div>
      </div>
      <div className={styles.priorityContainer}>
        <div
          className={`${styles.priority} ${selectPriorityStyle(data.priority)}`}
        >
          {data.priority}
        </div>
      </div>
    </motion.div>
  );
};
