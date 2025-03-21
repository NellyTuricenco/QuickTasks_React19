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
      <div className='app-wrapper'>
        <div className='title-wrapper'>
        <ListTodo size={30}/> 
        <h1 className="title">Quick Tasks</h1>
        </div>
        <TaskForm onAdd={handleAddTask} />
        <TaskList tasks={tasks} />
      </div>
  )
}

export default App
