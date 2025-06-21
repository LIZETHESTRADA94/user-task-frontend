import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { AlertCircle } from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';
import { useTasks } from '../../hooks/useTasks';
import { useUsers } from '../../hooks/useUsers';
import TaskForm from './TaskForm';
import TaskItem from './TaskItem';
import TasksHeader from './TasksPageHeader';
import TasksList from './TasksList';

const LoadingSkeleton = () => (
  <div className="space-y-4">
    {[1, 2, 3].map((i) => (
      <div key={i} className="bg-white border border-gray-200 rounded-lg p-4 animate-pulse">
        <div className="flex items-start space-x-3">
          <div className="h-5 w-5 bg-gray-300 rounded-full mt-1"></div>
          <div className="flex-1">
            <div className="h-5 bg-gray-300 rounded w-3/4 mb-2"></div>
            <div className="h-4 bg-gray-300 rounded w-1/2 mb-2"></div>
            <div className="h-3 bg-gray-300 rounded w-1/4"></div>
          </div>
          <div className="flex space-x-2">
            <div className="h-4 w-4 bg-gray-300 rounded"></div>
            <div className="h-4 w-4 bg-gray-300 rounded"></div>
          </div>
        </div>
      </div>
    ))}
  </div>
);

const TasksPage = () => {
  const { userId } = useParams();
  const { authUser } = useAuth();
  const { getUserById } = useUsers();
  
  const {
    tasks,
    loadTasksByUserId,
    addTask,
    updateTask,
    saving,
    error
  } = useTasks();
  
  const [editingTask, setEditingTask] = useState(null);
  const [showForm, setShowForm] = useState(false);
  let user = authUser;

  if (userId) {
    user = getUserById(userId);
  }

  useEffect(() => { 
    loadTasksByUserId(user.id)
  }, []);

  useEffect(() => { 
    if (user.id === authUser.id) {
      authUser.tasks = tasks;
    }
  }, [tasks]);

  const onSaveTask = async (taskData) => {
    try {
      setShowForm(false);

      if (editingTask) {
        await updateTask(editingTask.id, taskData);
        setEditingTask(null);
      } else {
        await addTask({ ...taskData, userId: user.id });
      }
      
    } catch (error) {
      console.error('Error saving task:', error);
    }
  };

  const onEditTask = (task) => {
    setEditingTask(task);
    setShowForm(true);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <TasksHeader
        user={user}
        setShowForm={setShowForm}
      />
      
      {/* Mensajes de error */}
      {error && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
          <div className="flex items-center">
            <AlertCircle className="h-5 w-5 text-red-600 mr-2" />
            <span className="text-red-800 text-sm">{error}</span>
          </div>
        </div>
      )}

      {/* Lista de tareas */}
      <TasksList
        onEdit={onEditTask}
      />

      {/* Madal de formulario */}
      {showForm && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md mx-4">
            <h2 className="text-lg font-medium text-gray-900 mb-4">
              {editingTask ? 'Editar Tarea' : 'Nueva Tarea'}
            </h2>
            <TaskForm
              task={editingTask}
              onSave={onSaveTask}
              onCancel={() => {
                setShowForm(false);
                setEditingTask(null);
              }}
              saving={saving}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default TasksPage;
