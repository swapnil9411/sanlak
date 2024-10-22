// src/hooks/useTasks.ts
import { useState, useEffect } from "react";
import { Task } from "../types/task";

const useTasks = () => {
  const [tasks, setTasks] = useState<Task[]>([]);

  useEffect(() => {
    // Fetch tasks (mocked API call for this example)
    const fetchTasks = async () => {
      const savedData = localStorage.getItem('data')
  if (savedData) {
    setTasks(JSON.parse(savedData))
  }
     
    };

    fetchTasks();
  }, []);
  


  return { tasks, setTasks };
};


export default useTasks;
