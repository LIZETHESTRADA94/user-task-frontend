import React, { useEffect, useState } from 'react';
import { CheckSquare } from 'lucide-react';
import { useTasks } from '../../hooks/useTasks';
import TaskItem from './TaskItem';

const LoadingSkeleton = () => (
  <div className="space-y-2">
    {[1, 2, 3].map((i) => (
      <div key={i} className="bg-white border border-gray-200 rounded-lg p-4 animate-pulse">
        <div className="flex items-start space-x-3">
          <div className="h-5 w-5 bg-gray-300 rounded-full mt-1"></div>
          <div className="flex-1">
            <div className="h-5 bg-gray-300 rounded w-3/4 mb-2"></div>
            <div className="h-4 bg-gray-300 rounded w-1/2 mb-2"></div>
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

const TasksPage = ({ onEdit }) => {
 
  const { 
    tasks,
    deleteTask, 
    toggleTaskStatus,
    loading,
    updating,
    deleting
  } = useTasks();
  const [filter, setFilter] = useState('all');
  const [filteredTasks, setFilteredTasks] = useState([]);

 
  useEffect(() => {
    setFilteredTasks((tasks || []).filter(task => {
      if (filter === 'completed') return task.completed;
      if (filter === 'pending') return !task.completed;
      return true;
    }));
  }, [filter, tasks])
  

  const onDeleteTask = async (id) => {
    if (window.confirm('¿Estás seguro de que quieres eliminar esta tarea?')) {
      try {
        await deleteTask(id);
      } catch (error) {
        console.error('Error deleting task:', error);
      }
    }
  };

  if (loading) {
    return (
      <>        
        <div className="mb-6">
          <div className="flex space-x-1 bg-gray-100 p-1 rounded-lg w-fit">
            {[1, 2, 3].map((i) => (
              <div key={i} className="w-20 h-8 bg-gray-200 rounded-md animate-pulse"></div>
            ))}
          </div>
        </div>

        <LoadingSkeleton />
      </>
    );
  }

  return (
    <>
      
      {/* Filters */}
      <div className="mb-6">
        <div className="flex space-x-1 bg-gray-100 p-1 rounded-lg w-fit">
          {[
            { key: 'all', label: 'Todas' },
            { key: 'pending', label: 'Pendientes' },
            { key: 'completed', label: 'Completadas' }
          ].map(({ key, label }) => (
            <button
              key={key}
              onClick={() => setFilter(key)}
              className={`px-4 py-2 text-sm font-medium rounded-md transition-colors ${
                filter === key
                  ? 'bg-white text-gray-900 shadow-sm'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              {label}
            </button>
          ))}
        </div>
      </div>

      {/* Tasks List */}
      <div className="space-y-2">
        {filteredTasks.length === 0 ? (
          <div className="text-center py-12">
            <CheckSquare className="h-12 w-12 text-gray-300 mx-auto mb-4" />
            <p className="text-gray-500">
              {filter === 'all' 
                ? 'No tienes tareas aún. ¡Crea tu primera tarea!'
                : filter === 'pending'
                ? 'No tienes tareas pendientes'
                : 'No tienes tareas completadas'
              }
            </p>
          </div>
        ) : (
          filteredTasks.map(task => (
            <TaskItem
              key={task.id}
              task={task}
              onToggle={toggleTaskStatus}
              onEdit={onEdit}
              onDelete={onDeleteTask}
              isUpdating={updating[task.id]}
              isDeleting={deleting[task.id]}
            />
          ))
        )}
      </div>
      
    </>
  );
};

export default TasksPage;
