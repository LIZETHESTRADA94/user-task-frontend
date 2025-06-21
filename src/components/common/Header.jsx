import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  CheckSquare, 
  Menu, 
  Shield, 
  Home, 
  Users, 
  LogOut,
  Loader2
} from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';
import './Header.css';
import './Button.css';

const Header = () => {
  const { authUser, logout, isAdmin, loginLoading } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleLogout = async () => {
    setIsMenuOpen(false);
    await logout();
  };

  return (
    <header className="bg-white shadow-sm border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <Link to="/dashboard" className='flex home-link'>
              <CheckSquare className="h-8 w-8 text-blue-600 header-logo" />
              <span className="ml-2 text-xl font-semibold text-gray-900">TODO App</span>
            </Link>
          </div>
          
          <div className="flex items-center space-x-4">
            <span className="text-sm text-gray-700">Hola, {authUser?.name}</span>
            {isAdmin && (
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                <Shield className="w-3 h-3 mr-1" />
                Admin
              </span>
            )}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              disabled={loginLoading}
              className={`p-2 rounded-md transition-colors ${
                loginLoading 
                  ? 'text-gray-300 cursor-not-allowed' 
                  : 'text-gray-400 hover:text-gray-500 hover:bg-gray-100'
              }`}
            >
              {loginLoading ? (
                <Loader2 className="h-5 w-5 animate-spin" />
              ) : (
                <Menu className="h-5 w-5" />
              )}
            </button>
          </div>
        </div>
      </div>
      
      {/* Menú */}
      {isMenuOpen && !loginLoading && (
        <div className="absolute top-16 right-4 bg-white rounded-md shadow-lg py-1 z-50 min-w-48 header-dropdown-enter">
          <Link 
            to="/dashboard" 
            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 header-menu-item"
            onClick={() => setIsMenuOpen(false)}
          >
            <Home className="w-4 h-4 inline mr-2" />
            Dashboard
          </Link>
          <Link 
            to="/tasks" 
            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 header-menu-item"
            onClick={() => setIsMenuOpen(false)}
          >
            <CheckSquare className="w-4 h-4 inline mr-2" />
            Mis Tareas
          </Link>
          {isAdmin && (
            <Link 
              to="/admin/users" 
              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 header-menu-item"
              onClick={() => setIsMenuOpen(false)}
            >
              <Users className="w-4 h-4 inline mr-2" />
              Usuarios
            </Link>
          )}
          <hr className="my-1" />
          <button
            onClick={handleLogout}
            disabled={loginLoading}
            className={`block w-full text-left px-4 py-2 text-sm transition-colors ${
              loginLoading 
                ? 'text-gray-400 cursor-not-allowed' 
                : 'text-gray-700 hover:bg-gray-100'
            }`}
          >
            {loginLoading ? (
              <>
                <Loader2 className="w-4 h-4 inline mr-2 animate-spin" />
                Cerrando...
              </>
            ) : (
              <>
                <LogOut className="w-4 h-4 inline mr-2" />
                Cerrar Sesión
              </>
            )}
          </button>
        </div>
      )}
    </header>
  );
};

export default Header;
