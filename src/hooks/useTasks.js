import { useContext } from "react";
import { TaskContext } from "../contexts/TaskContext";

export const useTasks = () => {
  const context = useContext(TaskContext);
  if (!context) {
    throw new Error('useTasks  debe ser usado con un TaskProvider');
  }
  return context;
};