import { useState } from "react";
import { initialState } from "../../data/data";
import styles from "./FramerDrag.module.css";
import { LayoutGroup } from "framer-motion";
import { Board, Key } from "../../types";
import { Column } from "./Column/Column";
import { Wrapper } from "@/components/common/Wrapper/Wrapper";

export const FramerDrag = () => {
  const [data, setData] = useState<Board>(initialState);
  return (
    <Wrapper>
      <div className={styles.board}>
        <div className={styles["board-inner"]}>
          <LayoutGroup>
            {Object.keys(data).map((key) => (
              <Column
                key={key}
                boardData={data}
                data={data[key as Key]}
                columnId={key as Key}
                setData={setData}
              />
            ))}
          </LayoutGroup>
        </div>
      </div>
    </Wrapper>
  );
};
