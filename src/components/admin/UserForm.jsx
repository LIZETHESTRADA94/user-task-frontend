import React, { useState } from 'react';
import { Loader2 } from 'lucide-react';
import { ROLES } from '../../constants';

const UserList = ({ user, onSave, onCancel, saving = false }) => {
  const [name, setName] = useState(user?.name || '');
  const [email, setEmail] = useState(user?.email || '');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState(user?.role || ROLES.REGULAR);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name.trim() || !email.trim() || saving) return;
    
    onSave({id: user?.id, name, email, role, password });
  };

  const isFormValid = name.trim() && email.trim();

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Nombre completo
        </label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          disabled={saving}
          className={`w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 transition-colors ${
            saving ? 'bg-gray-100 cursor-not-allowed' : ''
          }`}
          placeholder="Ingresa el nombre completo"
          required
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Email
        </label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          disabled={saving || user}
          className={`w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 transition-colors ${
            (saving || user) ? 'bg-gray-100 cursor-not-allowed' : ''
          }`}
          placeholder="correo@ejemplo.com"
          required
        />
      </div>
      {!user && (<div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Contraseña
        </label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          disabled={saving}
          className={`w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 transition-colors ${
            saving ? 'bg-gray-100 cursor-not-allowed' : ''
          }`}
          placeholder="******"
          required
        />
      </div>)}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Tipo de usuario
        </label>
        <select
          value={role}
          onChange={(e) => setRole(e.target.value)}
          disabled={saving}
          className={`w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 transition-colors ${
            saving ? 'bg-gray-100 cursor-not-allowed' : ''
          }`}
          required
        >
          <option value={ROLES.REGULAR}>Usuario Regular</option>
          <option value={ROLES.ADMIN}>Administrador</option>
        </select>
      </div>
      
      {saving && (
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
          <div className="flex items-center">
            <Loader2 className="h-4 w-4 animate-spin text-blue-600 mr-2" />
            <span className="text-blue-800 text-sm">
              {user ? 'Actualizando usuario...' : 'Creando usuario...'}
            </span>
          </div>
        </div>
      )}

      <div className="flex gap-2">
        <button
          type="submit"
          disabled={saving || !isFormValid}
          className={`inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white transition-all duration-200 ${
            saving || !isFormValid
              ? 'bg-blue-400 cursor-not-allowed'
              : 'bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500'
          }`}
        >
          {saving ? (
            <>
              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              {user ? 'Actualizando...' : 'Creando...'}
            </>
          ) : (
            <>
              {user ? 'Actualizar' : 'Crear'} Usuario
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

export default UserList;