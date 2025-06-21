import React, { createContext, useReducer } from 'react';
import { taskService } from '../services/taskService';
import { TASK_STATUS } from '../constants'

export const TaskContext = createContext();

const taskReducer = (state, action) => {
  switch (action.type) {
    case TASK_STATUS.SET_TASKS:
      return { ...state, tasks:  action.payload, loading: false }; 
    case TASK_STATUS.ADD_TASK:
      return { ...state, tasks: [...state.tasks, action.payload] };
    case TASK_STATUS.UPDATE_TASK:
      return {
        ...state,
        tasks: state.tasks.map(task =>
          task.id === action.payload.id ? action.payload : task
        )
      };
    case TASK_STATUS.DELETE_TASK:
      return {
        ...state,
        tasks: state.tasks.filter(task => task.id !== action.payload)
      };
    case TASK_STATUS.SET_LOADING:
      return { ...state, loading: action.payload };
    case TASK_STATUS.SET_ERROR:
      return { ...state, error: action.payload };
    case TASK_STATUS.SET_SAVING:
      return { ...state, saving: action.payload };
    case TASK_STATUS.SET_DELETING:
      return { ...state, deleting: { ...state.deleting, [action.payload.id]: action.payload.status } };
    case TASK_STATUS.SET_UPDATING:
      return { ...state, updating: { ...state.updating, [action.payload.id]: action.payload.status } };
    default:
      return state;
  }
};

export const TaskProvider = ({ children }) => {

  const [state, dispatch] = useReducer(taskReducer, {
    tasks: [],
    loading: true,
    saving: false,
    deleting: {},
    updating: {},
    error: null
  });

  const loadTasksByUserId = async (userId) => {
    dispatch({ type: TASK_STATUS.SET_LOADING, payload: true });
    dispatch({ type: TASK_STATUS.SET_ERROR, payload: null });
    
    try {
      const response = await taskService.getByUserId(userId);
      const tasks = response.data || response;
      dispatch({ type: TASK_STATUS.SET_TASKS, payload: tasks });
    } catch (error) {
      console.error('Error cargando tareas de usuario:', error);
      dispatch({ type: 'SET_ERROR', payload: 'Error al cargar las tareas del usuario' });
      dispatch({ type: 'SET_LOADING', payload: false });
    }
  };

  const addTask = async (task) => {
    dispatch({ type: TASK_STATUS.SET_SAVING, payload: true });
    dispatch({ type: TASK_STATUS.SET_ERROR, payload: null });
    
    try {
      const response = await taskService.create(task);
      const newTask = response.data || response;
      
      dispatch({ type: TASK_STATUS.ADD_TASK, payload: newTask });
    } catch (error) {
      console.error('Error al crear la tarea:', error);
      dispatch({ type: TASK_STATUS.SET_ERROR, payload: 'Error al crear la tarea' });
    } finally {
      dispatch({ type: TASK_STATUS.SET_SAVING, payload: false });
    }
  };

  const updateTask = async (id, updates) => {
    dispatch({ type: TASK_STATUS.SET_UPDATING, payload: { id, status: true } });
    dispatch({ type: TASK_STATUS.SET_ERROR, payload: null });
    
    try {
      const response = await taskService.update(id, updates);
      const updatedTask = response.data || response;
      
      dispatch({ type: TASK_STATUS.UPDATE_TASK, payload: updatedTask });
    } catch (error) {
      console.error('Error al actualizar la tare:', error, error.response);
      dispatch({ type: TASK_STATUS.SET_ERROR, payload: 'Error al actualizar la tarea.' });
    } finally {
      dispatch({ type: TASK_STATUS.SET_UPDATING, payload: { id, status: false } });
    }
  };

  const deleteTask = async (id) => {
    dispatch({ type: TASK_STATUS.SET_DELETING, payload: { id, status: true } });
    dispatch({ type: TASK_STATUS.SET_ERROR, payload: null });
    
    try {
      await taskService.delete(id);
      dispatch({ type: TASK_STATUS.DELETE_TASK, payload: id });
    } catch (error) {
      console.error('Error al eliminar la tarea:', error);
      dispatch({ type: TASK_STATUS.SET_ERROR, payload: 'Error al eliminar la tarea' });
    } finally {
      dispatch({ type: TASK_STATUS.SET_DELETING, payload: { id, status: false } });
    }
  };

  const toggleTaskStatus = async (id) => {
    const task = state.tasks.find(t => t.id === id);
    if (task) {      
      await updateTask(id, { ...task, completed: !task.completed });
    }
  };

  return (
    <TaskContext.Provider value={{
      ...state,
      addTask,
      updateTask,
      deleteTask,
      toggleTaskStatus,
      loadTasksByUserId
    }}>
      {children}
    </TaskContext.Provider>
  );
};
