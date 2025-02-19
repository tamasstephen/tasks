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
import { useRef } from "react";
import { useClickOutside } from "@/hooks/useClickOutside";

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
  const wrapperRef = useRef<HTMLDivElement>(null);
  useClickOutside(wrapperRef, onClose);

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
    <motion.div
      animate={{ opacity: [0, 0.5, 1] }}
      transition={{ duration: 0.3 }}
      layout
      className={styles.wrapper}
      ref={wrapperRef}
    >
      <RiCloseFill className={styles.close} size={24} onClick={onClose} />
      <motion.h2
        animate={{ opacity: [0, 0.5, 1] }}
        transition={{ duration: 0.5 }}
        layout
        className={styles.title}
      >
        Create Task
      </motion.h2>
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
          Create
        </button>
      </form>
    </motion.div>
  );
};
