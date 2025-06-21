import React, { useState } from 'react';
import { 
  Search, 
  User, 
  Mail, 
  Shield, 
  Users,
  Loader2,
  Trash2,
  Edit3
} from 'lucide-react';
import { ROLES } from '../../constants';
import { useNavigate } from 'react-router-dom';
import { useUsers } from '../../hooks/useUsers';

const UserList = ({ onEditUser }) => {
  const { users, deleteUser, deleting, updating } = useUsers();
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  const filteredUsers = users.filter(user =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const onDeleteUser = async (id) => {
    if (window.confirm('¿Estás seguro de que quieres eliminar este usuario?')) {
      try {
        await deleteUser(id);
      } catch (error) {
        console.error('Error deleting user:', error);
      }
    }
  };
  
  return (
    <>
    {/* Busqueda */}
    <div className="mb-6">
      <div className="relative">
        <Search className="h-5 w-5 absolute left-3 top-3 text-gray-400" />
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Buscar usuarios por nombre o email..."
          className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
        />
      </div>
    </div>

    {/* Lista de usuarios */}
    <div className="bg-white shadow overflow-hidden sm:rounded-md">
        <ul className="divide-y divide-gray-200">
          {filteredUsers.map((user) => (
            <li key={user.id} className="hover:bg-gray-50">
              <div className="px-4 py-4 flex items-center justify-between">
                <div className="flex items-center">
                  <div className="flex-shrink-0 h-10 w-10">
                    <div className="h-10 w-10 rounded-full bg-gray-300 flex items-center justify-center">
                      <User className="h-5 w-5 text-gray-600" />
                    </div>
                  </div>
                  <div className="ml-4">
                    <div className="text-sm font-medium text-gray-900">{user.name}</div>
                    <div className="text-sm text-gray-500 flex items-center">
                      <Mail className="h-3 w-3 mr-1" />
                      {user.email}
                    </div>
                  </div>
                  <div className="ml-4">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      user.role === ROLES.ADMIN 
                        ? 'bg-blue-100 text-blue-800' 
                        : 'bg-gray-100 text-gray-800'
                    }`}>
                      {user.role === ROLES.ADMIN ? (
                        <><Shield className="w-3 h-3 mr-1" />Admin</>
                      ) : (
                        <><User className="w-3 h-3 mr-1" />Regular</>
                      )}
                    </span>
                  </div>
                </div>
                <div className="flex space-x-2">
                  <button
                    onClick={() => navigate(`/admin/users/${user.id}`)}
                    disabled={deleting[user.id]}
                    className={`text-sm font-medium transition-colors ${
                      deleting[user.id] 
                        ? 'text-gray-400 cursor-not-allowed' 
                        : 'text-gray-400 hover:text-blue-900'
                    }`}
                  >
                    Ver Tareas
                  </button>
                  <button
                    onClick={() => onEditUser(user)}
                    disabled={updating[user.id] || deleting[user.id]}
                    className={`p-1 transition-colors ${
                      updating[user.id]
                        ? 'text-gray-300 cursor-not-allowed' 
                        : 'text-gray-400 hover:text-blue-600 '
                    }`}
                  >
                    <Edit3 className="h-4 w-4" />
                  </button>

                  <button
                    onClick={() => onDeleteUser(user.id)}
                    disabled={updating[user.id] || deleting[user.id]}
                    className={`p-1 transition-colors ${
                      deleting[user.id]
                        ? 'text-gray-300 cursor-not-allowed' 
                        : 'text-gray-400 hover:text-red-600'
                    }`}
                  >
                    {deleting[user.id] ? (
                      <Loader2 className="h-4 w-4 animate-spin text-red-500" />
                    ) : (
                      <Trash2 className="h-4 w-4" />
                    )}
                  </button>
                </div>
              </div>
            </li>
          ))}
        </ul>
        {filteredUsers.length === 0 && (
          <div className="text-center py-12">
            <Users className="h-12 w-12 text-gray-300 mx-auto mb-4" />
            <p className="text-gray-500">No se encontraron usuarios</p>
          </div>
        )}
      </div>
      </>
  );
};

export default UserList;