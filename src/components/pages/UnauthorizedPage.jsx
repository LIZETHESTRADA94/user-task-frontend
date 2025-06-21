import React from 'react';
import { Shield, AlertCircle, Mail, User, Clock, LogOut } from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';

const UnauthorizedPage = () => {
  const { b2cUser, logout } = useAuth();
  
  const handleLogout = async () => {
    await logout();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 to-orange-50 flex items-center justify-center px-4">
      <div className="max-w-md w-full">
        
        <div className="bg-white rounded-2xl shadow-xl p-8 text-center">
          <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <Shield className="w-10 h-10 text-red-600" />
          </div>

          <h1 className="text-2xl font-bold text-gray-900 mb-2">
            Acceso No Autorizado
          </h1>
          
          <p className="text-gray-600 mb-6">
            Tu cuenta ha sido autenticada exitosamente, pero no tienes permisos para acceder a esta aplicación.
          </p>

          {/* Información del usuario */}
          <div className="bg-gray-50 rounded-lg p-4 mb-6 text-left">
            <h3 className="text-sm font-semibold text-gray-700 mb-3 flex items-center">
              <User className="w-4 h-4 mr-2" />
              Información de tu cuenta:
            </h3>
            <div className="space-y-2 text-sm">
              <div className="flex items-center text-gray-600">
                <Mail className="w-4 h-4 mr-2 text-gray-400" />
                <span>{b2cUser?.username}</span>
              </div>
              <div className="flex items-center text-gray-600">
                <User className="w-4 h-4 mr-2 text-gray-400" />
                <span>{b2cUser?.name || 'Nombre no disponible'}</span>
              </div>
            </div>
          </div>

          {/* Mensaje de ayuda */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
            <div className="flex items-start">
              <AlertCircle className="w-5 h-5 text-blue-600 mt-0.5 mr-3 flex-shrink-0" />
              <div className="text-left">
                <h4 className="text-sm font-semibold text-blue-900 mb-1">
                  ¿Necesitas acceso?
                </h4>
                <p className="text-sm text-blue-700">
                  Si crees que deberías tener acceso a esta aplicación, contacta a un administrador.
                </p>
              </div>
            </div>
          </div>

          {/* Botones */}
          <div className="space-y-3">
          
            <button
              onClick={handleLogout}
              className="w-full bg-gray-100 text-gray-700 py-3 px-4 rounded-lg font-medium hover:bg-gray-200 transition-colors duration-200 flex items-center justify-center"
            >
              <LogOut className="w-4 h-4 mr-2" />
              Cerrar Sesión
            </button>
          </div>
          
        </div>
        
      </div>
    </div>
  );
};

export default UnauthorizedPage;