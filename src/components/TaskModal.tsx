import React, { useEffect } from "react";
import { Modal, Form, Input, Select, DatePicker, Button } from "antd";
import { useForm, Controller } from "react-hook-form";
import { Task } from "../types/task";
import dayjs from "dayjs";

const { Option } = Select;

interface TaskModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (task: Task) => void;
  existingTask: Task | null;
  users: { id: string; name: string }[];
}

const TaskModal: React.FC<TaskModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
  existingTask,
  users,
}) => {
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors, isSubmitted },
  } = useForm<Task>();

  useEffect(() => {
    if (isOpen) {
      const initialValues: Task = {
        id: existingTask?.id || Date.now().toString(),
        title: existingTask?.title || "",
        description: existingTask?.description || "",
        assignee: existingTask?.assignee || "",
        dueDate: existingTask?.dueDate
          ? new Date(existingTask.dueDate).toISOString()
          : null,
        priority: existingTask?.priority || "Medium",
        status: existingTask?.status || "To Do",
      };
      reset(initialValues);
    }
  }, [isOpen, existingTask, reset]);

  const handleClose = () => {
    reset();
    onClose();
  };

  const submit = (data: Task) => {
    const { id, ...rest } = data;

    const taskData: Task = {
      id: existingTask ? existingTask.id : Date.now().toString(),
      ...rest,
      dueDate: rest.dueDate ? new Date(rest.dueDate).toISOString() : null,
    };

    onSubmit(taskData);
    handleClose();
  };

  return (
    <Modal
      destroyOnClose={true}
      title={existingTask ? "Edit Task" : "Add Task"}
      visible={isOpen}
      onCancel={handleClose}
      footer={null}
    >
      <Form onFinish={handleSubmit(submit)}>
        <Form.Item
          label="Title"
          validateStatus={errors.title ? "error" : undefined}
          help={isSubmitted && errors.title ? errors.title.message : ""}
        >
          <Controller
            name="title"
            control={control}
            rules={{ required: "Title is required" }}
            render={({ field }) => <Input {...field} />}
          />
        </Form.Item>

        <Form.Item label="Description">
          <Controller
            name="description"
            control={control}
            render={({ field }) => <Input.TextArea {...field} />}
          />
        </Form.Item>

        <Form.Item
          label="Assignee"
          validateStatus={errors.assignee ? "error" : undefined}
          help={isSubmitted && errors.assignee ? errors.assignee.message : ""}
        >
          <Controller
            name="assignee"
            control={control}
            rules={{ required: "Assignee is required" }}
            render={({ field }) => (
              <Select {...field} placeholder="Select an assignee">
                {users.map((user) => (
                  <Option key={user.id} value={user.id}>
                    {user.name}
                  </Option>
                ))}
              </Select>
            )}
          />
        </Form.Item>

        <Form.Item
          label="Due Date"
          validateStatus={errors.dueDate ? "error" : undefined}
          help={isSubmitted && errors.dueDate ? errors.dueDate.message : ""}
        >
          <Controller
            name="dueDate"
            control={control}
            rules={{ required: "Due date is required" }}
            render={({ field: { onChange, value, ...rest } }) => (
              <DatePicker
                {...rest}
                value={value ? dayjs(value) : null}
                onChange={(date) => onChange(date ? date.toISOString() : null)}
                style={{ width: "100%" }}
              />
            )}
          />
        </Form.Item>

        <Form.Item label="Priority">
          <Controller
            name="priority"
            control={control}
            render={({ field }) => (
              <Select {...field} placeholder="Select priority">
                <Option value="Low">Low</Option>
                <Option value="Medium">Medium</Option>
                <Option value="High">High</Option>
              </Select>
            )}
          />
        </Form.Item>

        <Form.Item label="Status">
          <Controller
            name="status"
            control={control}
            render={({ field }) => (
              <Select {...field} placeholder="Select status">
                <Option value="To Do">To Do</Option>
                <Option value="In Progress">In Progress</Option>
                <Option value="Completed">Completed</Option>
              </Select>
            )}
          />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
          <Button onClick={handleClose} style={{ marginLeft: 8 }}>
            Cancel
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default TaskModal;
