import { Board, Key } from "@/types";
import { motion } from "framer-motion";
import { Dispatch, SetStateAction, useState } from "react";
import styles from "./Column.module.css";
import { BoardCard } from "../BoardCard/BoardCard";
import { AddCard } from "../AddCard/AddCard";
import { Task } from "@/types/task";
import { Portal } from "@/components/Portal/Portal";
import { CreateTask } from "../CreateTask/CreateTask";

const variants = {
  inactive: { opacity: 1, backgroundColor: "#f2f2f2" },
  active: { opacity: 0.5 },
};

export const Column = ({
  boardData,
  data,
  columnId,
  setData,
}: {
  boardData: Board;
  data: Array<Task>;
  columnId: Key;
  setData: Dispatch<SetStateAction<Board>>;
}) => {
  const [active, setActive] = useState<boolean>(false);
  const [nearestCard, setNearestCard] = useState<HTMLElement | null>(null);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const handleDragStart = (e: React.DragEvent<HTMLDivElement>, item: Task) => {
    e.dataTransfer.setData("item", JSON.stringify(item));
  };

  const checkIfIdExists = (id: number) => {
    let exists = false;
    Object.values(boardData).forEach((column) => {
      if (column.some((item) => item.id === id)) {
        exists = true;
      }
    });
    return exists;
  };

  const generateUniqueId = () => {
    let id = Math.floor(Math.random() * 1000000);
    while (checkIfIdExists(id)) {
      id = Math.floor(Math.random() * 1000000);
    }
    return id;
  };

  const addItem = (item: Omit<Task, "id" | "status">) => {
    setData((prevState) => ({
      ...prevState,
      [columnId]: [
        ...prevState[columnId],
        { ...item, id: generateUniqueId(), status: columnId },
      ],
    }));
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setActive(true);
  };

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setActive(false);
    setNearestCard(null);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setActive(false);
    const item = JSON.parse(e.dataTransfer.getData("item"));
    const cardId = item.id;
    const cards = getColumnCards(columnId);
    const isCardInColumn = cards.some(
      (card) => cardId.toString() === (card as HTMLElement).dataset.cardId,
    );
    if (isCardInColumn) {
      const card = boardData[columnId].find(
        (card) => cardId.toString() === card.id.toString(),
      );
      const newData = {
        ...boardData,
        [columnId]: [
          ...boardData[columnId].filter((card) => card.id !== cardId),
        ],
      };
      const cardIndex = nearestCard
        ? boardData[columnId].findIndex(
            (card) => card.id.toString() === nearestCard.dataset.cardId,
          )
        : -1;
      const sliceIndex = cardIndex === -1 ? 0 : cardIndex;
      const newColumnFirst = newData[columnId].slice(0, sliceIndex);
      const newColumnSecond = newData[columnId].slice(sliceIndex);
      setData((prevState) => ({
        ...prevState,
        [columnId]: [...newColumnFirst, card, ...newColumnSecond],
      }));
    } else {
      const nearestCardIndex = nearestCard
        ? boardData[columnId].findIndex(
            (card) => card.id.toString() === nearestCard.dataset.cardId,
          )
        : -1;
      const sliceIndex = nearestCardIndex === -1 ? 0 : nearestCardIndex;
      const prevColumnId = item.status as Key;
      const newItemStatus = columnId;
      const newUpdatedDate = new Date();
      const newColumnFirst = boardData[prevColumnId].filter(
        (card) => card.id.toString() !== cardId.toString(),
      );
      setData((prevState) => ({
        ...prevState,
        [prevColumnId]: newColumnFirst,
        [columnId]: [
          ...prevState[columnId].slice(0, sliceIndex),
          { ...item, status: newItemStatus, updatedAt: newUpdatedDate },
          ...prevState[columnId].slice(sliceIndex),
        ],
      }));
    }
    setNearestCard(null);
  };

  const getColumnCards = (columnId: Key) => {
    return Array.from(
      document.querySelectorAll(`[data-column-id="${columnId}"]`),
    );
  };

  return (
    <>
      {isOpen && (
        <Portal>
          <CreateTask addTask={addItem} onClose={() => setIsOpen(false)} />
        </Portal>
      )}
      <motion.div
        variants={variants}
        layout
        animate={active ? "active" : "inactive"}
        transition={{ duration: 0.2, opacity: { ease: "easeInOut" } }}
        className={styles.column}
        onDragOver={handleDragOver}
        onDrop={handleDrop}
        onDragLeave={handleDragLeave}
      >
        <div className={styles.columnTitle}>
          {columnId.charAt(0).toUpperCase() + columnId.slice(1)}
        </div>
        <AddCard handleAddCard={() => setIsOpen(true)} />
        {data.map((item) => (
          <BoardCard
            key={item.id}
            data={item}
            columnId={columnId}
            handleDragStart={handleDragStart}
            setNearestCard={setNearestCard}
            nearestCard={nearestCard}
          />
        ))}
      </motion.div>
    </>
  );
};
