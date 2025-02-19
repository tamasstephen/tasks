import { Key } from "./key";
import { Priority } from "./priority";

export interface Task {
  id: number;
  name: string;
  description: string;
  priority: Priority;
  status: Key;
  createdAt: Date;
  updatedAt: Date;
}
