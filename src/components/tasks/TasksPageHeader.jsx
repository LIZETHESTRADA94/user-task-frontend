import React from 'react';
import { Plus, CheckSquare, Loader2, AlertCircle } from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';
import { useTasks } from '../../hooks/useTasks';

const TasksHeader = ({ user, setShowForm }) => {  
  const { authUser } = useAuth();
  const { saving, loading } = useTasks();

  const isCurrentUser = !user || user.id === authUser.id;

  if (!isCurrentUser && loading) {
    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex justify-between items-center mb-8">
          <div>
            <div className="w-40 h-9 bg-gray-200 rounded-md animate-pulse"></div>
            <div className="w-100 h-5 mt-1 bg-gray-200 rounded-md animate-pulse"></div>
          </div>
          <div className="w-32 h-10 bg-gray-200 rounded-md animate-pulse"></div>
        </div>        
      </div>
    );
  }

  return (
    <div className="flex justify-between items-center mb-8">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">{isCurrentUser ? 'Mis Tareas' : user.name}</h1>
        <p className="text-gray-600 mt-1">
          {isCurrentUser 
          ? 'Gestiona tus tareas pendientes'
          : 'Gestiona las tareas de '+user.email}
          

        </p>
      </div>
      <button
        onClick={() => setShowForm(true)}
        disabled={saving}
        className={`inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white transition-all duration-200 ${
          saving
            ? 'bg-blue-400 cursor-not-allowed'
            : 'bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500'
        }`}
      >
        {saving ? (
          <>
            <Loader2 className="h-4 w-4 mr-2 animate-spin" />
            Guardando...
          </>
        ) : (
          <>
            <Plus className="h-4 w-4 mr-2" />
            Nueva Tarea
          </>
        )}
      </button>
    </div>

  );
};

export default TasksHeader;
