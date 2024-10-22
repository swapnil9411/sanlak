// src/components/TaskList.tsx
import React from "react";
import { Row, Col } from "antd";
import TaskItem from "./TaskItem";
import { Task } from "../types/task";

interface TaskListProps {
  tasks: Task[];
  filter: string;
  onEdit: (task: Task) => void;
}

const TaskList: React.FC<TaskListProps> = ({ tasks, filter, onEdit }) => {
  const filteredTasks = tasks.filter(
    (task) => filter === "All" || task.status === filter
  );

  return (
    <Row gutter={[16, 16]}>
      {filteredTasks.map((task) => (
        <Col span={6} key={task.id}>
          <TaskItem task={task} onEdit={onEdit} />
        </Col>
      ))}
    </Row>
  );
};

export default TaskList;
