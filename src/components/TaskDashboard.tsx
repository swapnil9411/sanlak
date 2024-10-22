import React, { useState } from "react";
import { Button, Layout, Typography, Pagination } from "antd";
import TaskList from "./TaskList";
import Filters from "./Filters";
import TaskModal from "./TaskModal";
import useTasks from "../hooks/useTasks";
import { Task } from "../types/task";

const { Header, Content } = Layout;
const { Title } = Typography;

const TaskDashboard: React.FC = () => {
  const { tasks, setTasks } = useTasks();
  const [filter, setFilter] = useState<string>("All");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTask, setEditingTask] = useState<Task | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 8;

  const users = [
    { id: "Alice", name: "Alice" },
    { id: "Bob", name: "Bob" },
    { id: "Charlie", name: "Charlie" },
  ];

  const handleTaskUpdate = (updatedTask: Task) => {
    setTasks((prevTasks) => {
      const filteredTasks = prevTasks.filter(
        (task) => task.id !== updatedTask.id
      );
      localStorage.setItem('data',JSON.stringify([...filteredTasks, updatedTask]))
      return [...filteredTasks, updatedTask];
    });

    setEditingTask(null);
    setIsModalOpen(false);
  };

  const openEditModal = (task: Task) => {
    setEditingTask(task);
    setIsModalOpen(true);
  };

  const filteredTasks = tasks.filter((task) => {
    if (filter === "All") return true;
    return task.status === filter;
  });

  const totalTasks = filteredTasks.length;
  const paginatedTasks = filteredTasks.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Header style={{ height: "97px" }}>
        <Title style={{ color: "white" }}>Project Tasks</Title>
      </Header>
      <Content style={{ padding: "20px" }}>
        <Button
          type="primary"
          onClick={() => {
            setIsModalOpen(true);
            setEditingTask(null);
          }}
        >
          Add Task
        </Button>
        &nbsp; &nbsp;
        <Filters setFilter={setFilter} />
        <br />
        <br />
        <TaskList
          tasks={paginatedTasks}
          filter={filter}
          onEdit={openEditModal}
        />
        <Pagination
          current={currentPage}
          pageSize={pageSize}
          total={totalTasks}
          onChange={(page) => setCurrentPage(page)}
          style={{ marginTop: "20px", textAlign: "right" }}
        />
        <TaskModal
          isOpen={isModalOpen}
          onClose={() => {
            setIsModalOpen(false);
            setEditingTask(null);
          }}
          onSubmit={handleTaskUpdate}
          existingTask={editingTask}
          users={users}
        />
      </Content>
    </Layout>
  );
};

export default TaskDashboard;
