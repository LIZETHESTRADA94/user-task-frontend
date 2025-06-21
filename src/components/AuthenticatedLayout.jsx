import React from 'react';
import { useLocation } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import Header from './common/Header';
import AppRoutes from '../routes/AppRoutes';
import UnauthorizedPage from './pages/UnauthorizedPage';

const AuthenticatedLayout = () => {
  const { isAuthenticated, isAuthorized, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (isAuthenticated && !isAuthorized) {
    return <UnauthorizedPage />;
  }

  if (!isAuthenticated || location.pathname === '/') {
    return <AppRoutes />;
  }


  return (
    <>
      <Header />
      <main>
        <AppRoutes />
      </main>
    </>
  );
};

export default AuthenticatedLayout;
