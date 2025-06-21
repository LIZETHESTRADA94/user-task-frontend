import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  CheckSquare, 
  Circle, 
  CheckCircle, 
  Users,
  AlertCircle
} from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';

const LoadingCard = () => (
  <div className="bg-white overflow-hidden shadow rounded-lg animate-pulse">
    <div className="p-5">
      <div className="flex items-center">
        <div className="flex-shrink-0">
          <div className="h-6 w-6 bg-gray-300 rounded"></div>
        </div>
        <div className="ml-5 w-0 flex-1">
          <div className="h-4 bg-gray-300 rounded w-3/4 mb-2"></div>
          <div className="h-6 bg-gray-300 rounded w-1/2"></div>
        </div>
      </div>
    </div>
  </div>
);

const ErrorMessage = ({ message, onRetry }) => (
  <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
    <div className="flex items-center">
      <AlertCircle className="h-5 w-5 text-red-600 mr-2" />
      <span className="text-red-800 text-sm">{message}</span>
      {onRetry && (
        <button
          onClick={onRetry}
          className="ml-auto text-red-600 hover:text-red-800 text-sm font-medium"
        >
          Reintentar
        </button>
      )}
    </div>
  </div>
);

const Dashboard = () => {
  const { 
    authUser,
    isAdmin,
    stats: userStats,
    statsLoading: userStatsLoading,
    getStats: getUsersStats,
    error: usersError
  } = useAuth();

  const userTasks = authUser.tasks;
  const completedTasks = userTasks.filter(task => task.completed);
  const pendingTasks = userTasks.filter(task => !task.completed);
  const recentTasks = authUser.tasks.sort((t1, t2) => t2.id - t1.id).slice(0, 3);

  useEffect(() => {
    if (authUser) {
      getUsersStats();
    }
  }, [authUser]);
  
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-gray-600 mt-1">Bienvenido de vuelta, {authUser?.name}</p>
      </div>

      {/* Mensajes de error */}
      {usersError && isAdmin && (
        <ErrorMessage message={usersError} />
      )}
     
      {/* Cards de Estadística*/}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">        
          <div className="bg-white overflow-hidden shadow rounded-lg">
            <div className="p-5">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <CheckSquare className="h-6 w-6 text-gray-400" />
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 truncate">Total Tareas</dt>
                    <dd className="text-lg font-medium text-gray-900">{userTasks.length}</dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white overflow-hidden shadow rounded-lg">
            <div className="p-5">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <Circle className="h-6 w-6 text-orange-400" />
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 truncate">Pendientes</dt>
                    <dd className="text-lg font-medium text-gray-900">{pendingTasks.length}</dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white overflow-hidden shadow rounded-lg">
            <div className="p-5">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <CheckCircle className="h-6 w-6 text-green-400" />
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 truncate">Completadas</dt>
                    <dd className="text-lg font-medium text-gray-900">{completedTasks.length}</dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>

        {isAdmin && (
          userStatsLoading ? (
            <LoadingCard />
          ) : (
            <div className="bg-white overflow-hidden shadow rounded-lg">
              <div className="p-5">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <Users className="h-6 w-6 text-blue-400" />
                  </div>
                  <div className="ml-5 w-0 flex-1">
                    <dl>
                      <dt className="text-sm font-medium text-gray-500 truncate">Usuarios</dt>
                      <dd className="text-lg font-medium text-gray-900">{userStats?.total}</dd>
                    </dl>
                  </div>
                </div>
              </div>
            </div>
          )
        )}
      </div>

      {/* Acciones rápidas */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white shadow rounded-lg p-6">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Acciones Rápidas</h3>
          <div className="space-y-3">
            <Link
              to="/tasks"
              className="flex items-center p-3 rounded-md hover:bg-gray-50 border border-gray-200 transition-colors"
            >
              <CheckSquare className="h-5 w-5 text-blue-600 mr-3" />
              <span className="text-sm font-medium">Ver mis tareas</span>
            </Link>
            {isAdmin && (
              <Link
                to="/admin/users"
                className="flex items-center p-3 rounded-md hover:bg-gray-50 border border-gray-200 transition-colors"
              >
                <Users className="h-5 w-5 text-green-600 mr-3" />
                <span className="text-sm font-medium">Gestionar usuarios</span>
              </Link>
            )}
          </div>
        </div>

        <div className="bg-white shadow rounded-lg p-6">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Tareas Recientes</h3>
          <div className="space-y-3">
            {userTasks.length === 0 ? (
              <p className="text-sm text-gray-500">No tienes tareas aún</p>
            ) : (
              recentTasks.map(task => (
                <div key={task.id} className="flex items-center p-3 rounded-md border border-gray-200">
                  <div className={`h-3 w-3 rounded-full mr-3 ${
                    task.completed ? 'bg-green-400' : 'bg-orange-400'
                  }`} />
                  <span className="text-sm truncate">{task.title}</span>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
