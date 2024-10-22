// src/components/Filters.tsx
import { Select } from "antd";
import React from "react";

const { Option } = Select;

interface FiltersProps {
  setFilter: (filter: string) => void;
}

const Filters: React.FC<FiltersProps> = ({ setFilter }) => {
  return (
    <Select defaultValue="All" style={{ width: 120 }} onChange={setFilter}>
      <Option value="All">All</Option>
      <Option value="To Do">To Do</Option>
      <Option value="In Progress">In Progress</Option>
      <Option value="Completed">Completed</Option>
    </Select>
  );
};

export default Filters;
