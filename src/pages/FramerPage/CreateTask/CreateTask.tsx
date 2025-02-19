import { Priority } from "@/types/priority";
import { Task } from "@/types/task";
import styles from "./CreateTask.module.css";

export const CreateTask = ({
  addTask,
  onClose,
}: {
  addTask: (task: Omit<Task, "id" | "status">) => void;
  onClose: () => void;
}) => {
  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const task = {
      name: formData.get("title") as string,
      description: formData.get("description") as string,
      priority: formData.get("priority") as Priority,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    addTask(task);
    onClose();
  };

  return (
    <div className={styles.wrapper}>
      <form onSubmit={onSubmit} className={styles.form}>
        <input
          type="text"
          placeholder="Task Name"
          name="title"
          className={styles.input}
        />
        <textarea
          placeholder="Task Description"
          name="description"
          className={styles.textarea}
        />
        <select name="priority" id="priority" className={styles.select}>
          {Object.values(Priority).map((prio) => (
            <option value={prio}>{prio.toLowerCase()}</option>
          ))}
        </select>
        <button type="submit" className={styles.button}>
          Create Task
        </button>
      </form>
    </div>
  );
};
