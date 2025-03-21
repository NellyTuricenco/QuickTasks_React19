import React from "react";
import { CheckSquare } from "lucide-react";
import { Task } from "../types/task";

type Props = {
  tasks: Task[];
};

const TaskList: React.FC<Props> = ({ tasks }) => {
  if (tasks.length === 0) {
    return <p>No tasks yet</p>;
  }

  return (
    <ul>
        {tasks.map(task => (
            <li key={task.id}>
                <CheckSquare size={20}/> {task.title}
            </li>
        ))}
    </ul>
  )
};
