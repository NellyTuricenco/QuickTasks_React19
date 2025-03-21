import React, { useState } from 'react'
import { ListTodo } from 'lucide-react';
import TaskForm from './components/TaskForm'
import TaskList from './components/TaskList'
import { Task } from './types/task'
import './App.css'

function App() {
  const [tasks, setTasks] = useState<Task[]>([]);

  const handleAddTask = (task: Task) => {
    setTasks(prev => [...prev, task]);
  }

  return (
      <div style={{ padding: '2em', fontFamily: 'sans-serif'}}>
        <ListTodo size={20}/> <h1>Quick Tasks</h1>
        <TaskForm onAdd={handleAddTask} />
        <TaskList tasks={tasks} />
      </div>
  )
}

export default App
