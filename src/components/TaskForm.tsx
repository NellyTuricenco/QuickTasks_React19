/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useOptimistic, useActionState } from "react";
import { Task } from "../types/task";
import { v4 as uuid } from "uuid";

type Props = {
  onAdd: (task: Task) => void;
};

type ActionState = {
    isPending: boolean;
  };

const TaskForm: React.FC<Props> = ({ onAdd }) => {
  const [optimisticTask, addOptimisticTask] = useOptimistic<Task[], Task>(
    [],
    (state, newTask) => [...state, newTask]
  );

  
  const createTask = async (
    _prevState: ActionState,
    formData: FormData
  ): Promise<ActionState> => {
    const title = formData.get("title") as string;

    await new Promise(resolve => setTimeout(resolve, 2000)); // Simulate network delay

    const newTask: Task = {
      id: uuid(),
      title,
      completed: false,
    };
console.log('[State]', actionState.isPending)
    addOptimisticTask(newTask);
    onAdd(newTask);
    
    return { isPending: false };
  };
  
  // useActionState returns the current state and the form action handler
  const [actionState, submitAction] = useActionState<ActionState, FormData>(
    createTask,
    { isPending: true } // initial state
  );

console.log('[SubmitAction]', submitAction);
  return (
    <form action={submitAction} className='task-form'>
      <input type="text" name="title" placeholder="Enter a task" required className="form-input"/>
      <button type="submit" disabled={actionState.isPending} className="form-button">
        {actionState.isPending ? "Adding..." : "Add Task"}
      </button>
    </form>
  );
};

export default TaskForm;