import { useEffect, useMemo, useRef, useState } from "react";
import { createSwapy, Swapy, utils } from "swapy";
import { initialState } from "../../data/data";
import { toSlottedItems } from "../../utils/toSlottedItems";

export const SwappyDrag = () => {
  const [data] = useState([...initialState.does, ...initialState.wants]);
  const [slotItemMap, setSlotItemMap] = useState(
    utils.initSlotItemMap(data, "id"),
  );
  const slottedItems = useMemo(
    () => toSlottedItems(data, "id", slotItemMap),
    [data, slotItemMap],
  );
  const swapyRef = useRef<Swapy>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    utils.dynamicSwapy(
      swapyRef.current,
      data,
      "id",
      slotItemMap,
      setSlotItemMap,
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  useEffect(() => {
    if (containerRef.current) {
      swapyRef.current = createSwapy(containerRef.current, {
        manualSwap: true,
      });
      swapyRef.current.onSwap((event) => {
        console.log("swapy event", event);
        setSlotItemMap(event.newSlotItemMap.asArray);
      });
      swapyRef.current.onSwapEnd((event) => {
        console.log("swapy event", event);
        swapyRef.current?.update();
      });
    }
    return () => {
      if (swapyRef.current) {
        swapyRef.current.destroy();
      }
    };
  }, [data.length, setSlotItemMap]);

  return (
    <div className="container" ref={containerRef}>
      <div className="items">
        {slottedItems
          ?.filter(({ item }) => item?.wrapper === "does")
          .map(({ slotId, itemId, item }) => (
            <div className="slot" key={slotId} data-swapy-slot={slotId}>
              {item && (
                <div className="item" key={itemId} data-swapy-item={itemId}>
                  <h2>{item.name}</h2>
                  <p>{item.email}</p>
                  <p>{item.phone}</p>
                  <p>{item.address}</p>
                </div>
              )}
            </div>
          ))}
      </div>
      <div className="items">
        {slottedItems
          ?.filter(({ item }) => item?.wrapper === "wants")
          .map(({ slotId, itemId, item }) => (
            <div className="slot" key={slotId} data-swapy-slot={slotId}>
              {item && (
                <div className="item" key={itemId} data-swapy-item={itemId}>
                  <h2>{item.name}</h2>
                  <p>{item.email}</p>
                  <p>{item.phone}</p>
                  <p>{item.address}</p>
                </div>
              )}
            </div>
          ))}
      </div>
    </div>
  );
};
