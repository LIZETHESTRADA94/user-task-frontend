import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  CheckSquare, 
  CheckCircle, 
  Users, 
  Shield, 
  ArrowRight,
  Loader2
} from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';

const LandingPage = () => {
  const { login, isAuthenticated, isAuthorized, loginLoading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated && isAuthorized) {
      navigate('/dashboard');
    }
  }, [isAuthenticated, isAuthorized, navigate]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col justify-center items-center min-h-screen text-center">
          <div className="mb-8">
            <CheckSquare className="h-20 w-20 text-blue-600 mx-auto mb-4" />
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              Gestiona tus tareas de manera eficiente
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-2xl">
              Organiza tu trabajo, colabora con tu equipo y mantén el control de todos tus proyectos
              en una sola plataforma intuitiva y poderosa.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12 max-w-4xl">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <CheckCircle className="h-12 w-12 text-green-500 mb-4 mx-auto" />
              <h3 className="text-lg font-semibold mb-2">Fácil de usar</h3>
              <p className="text-gray-600">Interfaz intuitiva que te permite enfocarte en lo importante</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <Users className="h-12 w-12 text-blue-500 mb-4 mx-auto" />
              <h3 className="text-lg font-semibold mb-2">Colaboración</h3>
              <p className="text-gray-600">Trabaja en equipo y mantén a todos sincronizados</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <Shield className="h-12 w-12 text-purple-500 mb-4 mx-auto" />
              <h3 className="text-lg font-semibold mb-2">Seguro</h3>
              <p className="text-gray-600">Autenticación segura con Azure AD B2C</p>
            </div>
          </div>

          <button
            onClick={login}
            disabled={loginLoading}
            className={`inline-flex items-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white transition-all duration-200 ${
              loginLoading 
                ? 'bg-blue-400 cursor-not-allowed' 
                : 'bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500'
            }`}
          >
            {loginLoading ? (
              <>
                <Loader2 className="animate-spin mr-2 h-5 w-5" />
                Conectando con Azure...
              </>
            ) : (
              <>
                Iniciar Sesión con Azure AD B2C
                <ArrowRight className="ml-2 h-5 w-5" />
              </>
            )}
          </button>

          {loginLoading && (
            <div className="mt-4 text-sm text-gray-600 animate-pulse">
              Verificando credenciales...
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
