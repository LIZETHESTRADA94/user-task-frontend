import React, { useState } from 'react';
import { Loader2 } from 'lucide-react';
import { useTasks } from '../../hooks/useTasks';
import './TaskItem.css';

const TaskForm = ({ task, onSave, onCancel }) => {
  const [title, setTitle] = useState(task?.title || '');
  const [description, setDescription] = useState(task?.description || '');

  const { saving } = useTasks();

  const onSubmit = (e) => {
    e.preventDefault();
    if (!title.trim() || saving) return;
    
    onSave({ title, description, userId: task?.userId });
    if (!task) {
      setTitle('');
      setDescription('');
    }
  };

  return (
    <form onSubmit={onSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Título
        </label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          disabled={saving}
          className={`w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 transition-colors ${
            saving ? 'bg-gray-100 cursor-not-allowed' : ''
          }`}
          placeholder="Ingresa el título de la tarea"
          required
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Descripción
        </label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          disabled={saving}
          rows={3}
          className={`w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 transition-colors ${
            saving ? 'bg-gray-100 cursor-not-allowed' : ''
          }`}
          placeholder="Describe la tarea (opcional)"
        />
      </div>
      <div className="flex gap-2">
        <button
          type="submit"
          disabled={saving || !title.trim()}
          className={`inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white transition-all duration-200 ${
            saving || !title.trim()
              ? 'bg-blue-400 cursor-not-allowed'
              : 'bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500'
          }`}
        >
          {saving ? (
            <>
              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              {task ? 'Actualizando...' : 'Creando...'}
            </>
          ) : (
            <>
              {task ? 'Actualizar' : 'Crear'} Tarea
            </>
          )}
        </button>
        {onCancel && (
          <button
            type="button"
            onClick={onCancel}
            disabled={saving}
            className={`px-4 py-2 border border-gray-300 text-sm font-medium rounded-md transition-colors ${
              saving
                ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                : 'bg-white text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-500'
            }`}
          >
            Cancelar
          </button>
        )}
      </div>
    </form>
  );
};

export default TaskForm;
