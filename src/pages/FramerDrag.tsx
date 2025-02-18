import { Dispatch, SetStateAction, useEffect, useRef, useState } from "react";
import { Board, Item, initialState, Key } from "../data/data";
import styles from "./FramerDrag.module.css";
import { motion } from "framer-motion";

export const FramerDrag = () => {
  return (
    <div>
      <DnDBoard />
    </div>
  );
};

const DnDBoard = () => {
  const [data, setData] = useState<Board>(initialState);
  return (
    <div className={styles.board}>
      <div className={styles["board-inner"]}>
        {Object.keys(data).map((key) => (
          <BoardColumn
            key={key}
            boardData={data}
            data={data[key as Key]}
            columnId={key as Key}
            setData={setData}
          />
        ))}
      </div>
    </div>
  );
};

const variants = {
  inactive: { opacity: 1, backgroundColor: "#f2f2f2" },
  active: { opacity: 0.2 },
};

const BoardColumn = ({
  boardData,
  data,
  columnId,
  setData,
}: {
  boardData: Board;
  data: Array<Item>;
  columnId: Key;
  setData: Dispatch<SetStateAction<Board>>;
}) => {
  const [active, setActive] = useState<boolean>(false);
  const [nearestCard, setNearestCard] = useState<HTMLElement | null>(null);
  const handleDragStart = (e: React.DragEvent<HTMLDivElement>, item: Item) => {
    e.dataTransfer.setData("item", JSON.stringify(item));
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
    console.log("COLUMN ID", columnId);
    e.preventDefault();
    setActive(false);
    const item = JSON.parse(e.dataTransfer.getData("item"));
    const cardId = item.id;
    const cards = getColumnCards(columnId);
    const isCardInColumn = cards.some(
      (card) => cardId.toString() === (card as HTMLElement).dataset.cardId,
    );
    if (isCardInColumn) {
      console.log("CARD IS IN COLUMN");
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
      const prevColumnId = columnId === "does" ? "wants" : "does";
      const newColumnFirst = boardData[prevColumnId].filter(
        (card) => card.id.toString() !== cardId.toString(),
      );
      setData((prevState) => ({
        ...prevState,
        [prevColumnId]: newColumnFirst,
        [columnId]: [
          ...prevState[columnId].slice(0, sliceIndex),
          item,
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
    <motion.div
      variants={variants}
      initial="inactive"
      animate={active ? "active" : "inactive"}
      layout
      className={styles.column}
      onDragOver={handleDragOver}
      onDrop={handleDrop}
      onDragLeave={handleDragLeave}
    >
      {data.map((item) => (
        <BoardItem
          key={item.id}
          data={item}
          columnId={columnId}
          handleDragStart={handleDragStart}
          setNearestCard={setNearestCard}
          nearestCard={nearestCard}
        />
      ))}
    </motion.div>
  );
};

const cardVariants = {
  active: { backgroundColor: "rgba(0, 0, 255, 0.2)" },
  inactive: { backgroundColor: "#fff" },
};

const BoardItem = ({
  data,
  handleDragStart,
  columnId,
  setNearestCard,
  nearestCard,
}: {
  data: Item;
  columnId: Key;
  handleDragStart: (e: React.DragEvent<HTMLDivElement>, item: Item) => void;
  setNearestCard: (card: HTMLElement | null) => void;
  nearestCard: HTMLElement | null;
}) => {
  const thisCard = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState<boolean>(false);
  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    console.log("CALLED over");
    setActive(true);
    setNearestCard(thisCard.current as HTMLElement);
  };

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    console.log("CALLED end");
    setActive(false);
    setNearestCard(null);
  };

  const handleDragEnd = () => {
    console.log("CALLED end");
    setActive(false);
  };

  useEffect(() => {
    if (!nearestCard || nearestCard.dataset.cardId !== data.id.toString()) {
      setActive(false);
    }
  }, [nearestCard, data]);

  return (
    <motion.div
      draggable="true"
      className={styles.item}
      onDragEndCapture={handleDragEnd}
      onDragStart={(e) =>
        handleDragStart(e as unknown as React.DragEvent<HTMLDivElement>, data)
      }
      onDragLeave={handleDragLeave}
      animate={active ? "active" : "inactive"}
      onDragOver={handleDragOver}
      data-column-id={columnId}
      data-card-id={data.id}
      variants={cardVariants}
      ref={thisCard}
    >
      <div>{data.name}</div>
      <div>{data.email}</div>
      <div>{data.phone}</div>
      <div>{data.address}</div>
    </motion.div>
  );
};
