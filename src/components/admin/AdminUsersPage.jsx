import React, { useEffect, useState } from 'react';
import { 
  UserPlus,
  Loader2,
  AlertCircle  
} from 'lucide-react';
import { useUsers } from '../../hooks/useUsers';
import UserForm from './UserForm';
import UserList from './UserList';

const UserSkeleton = () => (
  <li className="hover:bg-gray-50 animate-pulse">
    <div className="px-4 py-4 flex items-center justify-between">
      <div className="flex items-center">
        <div className="flex-shrink-0 h-10 w-10">
          <div className="h-10 w-10 rounded-full bg-gray-300"></div>
        </div>
        <div className="ml-4">
          <div className="h-4 bg-gray-300 rounded w-32 mb-2"></div>
          <div className="h-3 bg-gray-300 rounded w-24"></div>
        </div>
        <div className="ml-4">
          <div className="h-6 bg-gray-300 rounded w-16"></div>
        </div>
      </div>
      <div className="flex space-x-2">
        <div className="h-4 bg-gray-300 rounded w-20"></div>
        <div className="h-4 bg-gray-300 rounded w-16"></div>
      </div>
    </div>
  </li>
);

const AdminUsersPage = () => {
  const { addUser, updateUser, loading, saving, error, loadUsers } = useUsers();
  const [showForm, setShowForm] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

  useEffect(() => {
    loadUsers();
  },[]);
  
  const onSaveUser = async (userData) => {
    try {
      
      if (userData.id) {
        await updateUser(userData.id, userData);
      } else {
        await addUser(userData);
      }
      
      setShowForm(false);
    } catch (error) {
      console.error('Error creating user:', error);
    }
  };

  const onCreateUser = () => {
    setSelectedUser(null);
    setShowForm(true);
  }

  const onEditUser = (user) => {
    setSelectedUser(user);
    setShowForm(true);
  }
 

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Gestión de Usuarios</h1>
            <p className="text-gray-600 mt-1">Administra los usuarios del sistema</p>
          </div>
          <div className="w-32 h-10 bg-gray-200 rounded-md animate-pulse"></div>
        </div>

        <div className="mb-6">
          <div className="w-full h-10 bg-gray-200 rounded-md animate-pulse"></div>
        </div>

        <div className="bg-white shadow overflow-hidden sm:rounded-md">
          <ul className="divide-y divide-gray-200">
            {[1, 2, 3, 4].map((i) => (
              <UserSkeleton key={i} />
            ))}
          </ul>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Gestión de Usuarios</h1>
          <p className="text-gray-600 mt-1">Administra los usuarios del sistema</p>
        </div>
        <button
          onClick={() => onCreateUser()}
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
              Creando...
            </>
          ) : (
            <>
              <UserPlus className="h-4 w-4 mr-2" />
              Nuevo Usuario
            </>
          )}
        </button>
      </div>

      {/* Mensaje de error */}
      {error && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
          <div className="flex items-center">
            <AlertCircle className="h-5 w-5 text-red-600 mr-2" />
            <span className="text-red-800 text-sm">{error}</span>
          </div>
        </div>
      )}

      {/* Lista de usuarios */}
      <UserList onEditUser={onEditUser} />
      
      {/* Modal de formulario de usuarios */}
      {showForm && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md mx-4">
            <h2 className="text-lg font-medium text-gray-900 mb-4">Nuevo Usuario</h2>
            <UserForm
              user={selectedUser}
              onSave={onSaveUser}
              onCancel={() => setShowForm(false)}
              saving={saving}
            />
          </div>
        </div>
      )}

      {/* Loading global */}
      {saving && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-30 flex items-center justify-center z-40">
          <div className="bg-white rounded-lg p-6 shadow-lg">
            <div className="flex items-center">
              <Loader2 className="h-6 w-6 animate-spin text-blue-600 mr-3" />
              <span className="text-gray-900">Creando usuario...</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminUsersPage;