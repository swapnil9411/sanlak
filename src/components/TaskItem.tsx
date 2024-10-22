// src/components/TaskItem.tsx
import React from "react";
import { Card, Button } from "antd";
import { Task } from "../types/task";

interface TaskItemProps {
  task: Task;
  onEdit: (task: Task) => void;
}

const TaskItem: React.FC<TaskItemProps> = ({ task, onEdit }) => {
  {console.log("task", task)}
  return (
    <Card title={task.title}>
      <p>Status: {task.status}</p>
      <p>Assignee: {task.assignee}</p>
      <p>Priority: {task.priority}</p>
      <p>
        Due Date:{" "}
        {task.dueDate
          ? new Date(task.dueDate).toLocaleDateString()
          : "No due date set"}
      </p>
      <Button onClick={() => onEdit(task)} type="link">
        Edit
      </Button>
    </Card>
  );
};

export default TaskItem;
