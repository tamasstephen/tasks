import { Priority } from "@/types/priority";
import { Task } from "@/types/task";
import styles from "./CreateTask.module.css";
import { RiCloseFill } from "@remixicon/react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Input } from "@/components/Form/Input/Input";
import { TextArea } from "@/components/Form/TextArea/TextArea";
import { motion } from "framer-motion";

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
    <motion.div layout className={styles.wrapper}>
      <RiCloseFill className={styles.close} size={24} onClick={onClose} />
      <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
        <Input
          type="text"
          placeholder="Task Name"
          {...register("name")}
          error={formState.errors.name?.message}
        />
        <TextArea
          placeholder="Task Description"
          {...register("description")}
          error={formState.errors.description?.message}
        />
        <select {...register("priority")} className={styles.select}>
          {Object.values(Priority).map((prio) => (
            <option value={prio}>{prio.toLowerCase()}</option>
          ))}
        </select>
        <button type="submit" className={styles.button}>
          Create Task
        </button>
      </form>
    </motion.div>
  );
};
