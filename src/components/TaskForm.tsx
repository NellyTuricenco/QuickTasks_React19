import React, { useOptimistic, useActionState } from "react";
import { useFormStatus } from "react-dom";
import { Task } from "../types/task";
import { v4 as uuid } from "uuid";

type Props = {
  onAdd: (task: Task) => void;
};

const TaskForm: React.FC<Props> = ({ onAdd }) => {
  const [optimisticTask, addOptimisticTask] = useOptimistic<Task>(
    [],
    (state, newTask) => [...state, newTask]
  );

  const createTask = async (
    _prevState: null,
    formData: FormData
  ): Promise<null> => {
    const title = formData.get("title") as string;
    const newTask: Task = {
      id: uuid(),
      title,
      completed: false,
    };

    addOptimisticTask(newTask);
    onAdd(newTask);
    return null;
  };

  const [state, submitAction] = useActionState(createTask, null);
  const { pending } = useFormStatus();

  return (
    <form action={submitAction}>
      <input type="text" name="title" placeholder="Enter a task" required />
      <button type="submit" disabled={pending}>
        {pending ? "Adding..." : "Add Task"}
      </button>
    </form>
  );
};

export default TaskForm;