import { Priority } from "@/types/priority";
import { Task } from "@/types/task";
import styles from "./CreateTask.module.css";
import { RiCloseFill } from "@remixicon/react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

const schema = z.object({
  name: z.string().min(1, { message: "Name is required" }),
  description: z.string().min(1, { message: "Description is required" }),
  priority: z.nativeEnum(Priority, { message: "Priority is required" }),
});

export const CreateTask = ({
  addTask,
  onClose,
}: {
  addTask: (task: Omit<Task, "id" | "status">) => void;
  onClose: () => void;
}) => {
  const { register, handleSubmit, formState } = useForm<z.infer<typeof schema>>(
    {
      defaultValues: {
        name: "",
        description: "",
        priority: Priority.MEDIUM,
      },
      mode: "onSubmit",
      resolver: zodResolver(schema),
    },
  );

  const onSubmit = (data: z.infer<typeof schema>) => {
    const task = {
      ...data,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    addTask(task);
    onClose();
  };

  return (
    <div className={styles.wrapper}>
      <RiCloseFill className={styles.close} size={24} onClick={onClose} />
      <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
        <input
          type="text"
          placeholder="Task Name"
          {...register("name")}
          className={`${styles.input} ${formState.errors.name && styles.error}`}
        />
        {formState.errors.name && (
          <p className={styles["error-text"]}>
            {formState.errors.name.message}
          </p>
        )}
        <textarea
          placeholder="Task Description"
          {...register("description")}
          className={`${styles.textarea} ${formState.errors.description && styles.error}`}
        />
        {formState.errors.description && (
          <p className={styles["error-text"]}>
            {formState.errors.description.message}
          </p>
        )}
        <select {...register("priority")} className={styles.select}>
          {Object.values(Priority).map((prio) => (
            <option value={prio}>{prio.toLowerCase()}</option>
          ))}
        </select>
        {formState.errors.priority && (
          <p className={styles["error-text"]}>
            {formState.errors.priority.message}
          </p>
        )}
        <button type="submit" className={styles.button}>
          Create Task
        </button>
      </form>
    </div>
  );
};
