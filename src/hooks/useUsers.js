import { useContext } from "react";
import { UserContext } from "../contexts/UserContext";

export const useUsers = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUsers debe ser usado con un UserProvider');
  }
  return context;
};