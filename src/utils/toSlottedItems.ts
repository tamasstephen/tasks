import { SlotItemMapArray } from "swapy";

export type SlottedItems<Item> = Array<{
  slotId: string;
  itemId: string;
  item: Item | null;
}>;

export function toSlottedItems<Item>(
  items: Array<Item>,
  idField: keyof Item,
  slotItemMap: SlotItemMapArray
): SlottedItems<Item> {
  const slottedItems = slotItemMap.map((slotItem) => ({
    slotId: slotItem.slot,
    itemId: slotItem.item,
    item:
      slotItem.item === ""
        ? null
        : items.find((item) => parseInt(slotItem.item) === item[idField])!,
  }));
  return slottedItems;
}
