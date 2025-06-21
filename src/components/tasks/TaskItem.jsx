import React from 'react';
import { CheckCircle, Circle, Edit3, Trash2, Loader2 } from 'lucide-react';
import './TaskItem.css';

const TaskItem = ({ task, onToggle, onEdit, onDelete, isUpdating, isDeleting }) => {
  const isLoading = isUpdating || isDeleting;

  return (
    <div className={`bg-white border border-gray-200 rounded-lg p-4 transition-all duration-200 task-hover-slide ${
        task.completed ? 'task-completed-fade' : ''
      } ${isLoading ? 'task-loading-pulse' : ''}`}>
      <div className="flex items-start justify-between">
        <div className="flex items-start space-x-3 flex-1">
          <button
            onClick={() => onToggle(task.id)}
            disabled={isLoading}
            className={`mt-1 task-checkbox-bounce ${
              isLoading
                ? 'cursor-not-allowed opacity-50'
                : task.completed
                  ? 'text-green-600' 
                  : 'text-gray-400 hover:text-green-600'
            }`}
          >
            {isUpdating ? (
              <Loader2 className="h-5 w-5 animate-spin text-blue-500" />
            ) : task.completed ? (
              <CheckCircle className="h-5 w-5" />
            ) : (
              <Circle className="h-5 w-5" />
            )}
          </button>
          <div className="flex-1">
            <h3 className={`font-medium transition-colors ${
              task.completed 
                ? 'line-through text-gray-500' 
                : 'text-gray-900'
            }`}>
              {task.title}
            </h3>
            {task.description && (
              <p className="text-sm text-gray-600 mt-1">{task.description}</p>
            )}
            {isLoading && (
              <div className="flex items-center mt-2">
                <Loader2 className="h-3 w-3 animate-spin text-blue-500 mr-1" />
                <span className="text-xs text-blue-600">
                  {isUpdating ? 'Actualizando...' : isDeleting ? 'Eliminando...' : 'Procesando...'}
                </span>
              </div>
            )}
          </div>
        </div>
        <div className="flex space-x-2 ml-4">
          <button
            onClick={() => onEdit(task)}
            disabled={isLoading}
            className={`p-1 transition-colors ${
              isLoading 
                ? 'text-gray-300 cursor-not-allowed' 
                : 'text-gray-400 hover:text-blue-600 '
            }`}
          >
            <Edit3 className="h-4 w-4" />
          </button>
          <button
            onClick={() => onDelete(task.id)}
            disabled={isLoading}
            className={`p-1 transition-colors ${
              isLoading 
                ? 'text-gray-300 cursor-not-allowed' 
                : 'text-gray-400 hover:text-red-600'
            }`}
          >
            {isDeleting ? (
              <Loader2 className="h-4 w-4 animate-spin text-red-500" />
            ) : (
              <Trash2 className="h-4 w-4" />
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default TaskItem;
