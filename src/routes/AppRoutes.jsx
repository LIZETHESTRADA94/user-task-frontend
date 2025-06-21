 
import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import PrivateRoute from '../components/common/PrivateRoute';
import LandingPage from '../components/pages/LandingPage';
import Dashboard from '../components/pages/Dashboard';
import TasksPage from '../components/tasks/TasksPage';
import AdminUsersPage from '../components/admin/AdminUsersPage';

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route
        path="/dashboard"
        element={
          <PrivateRoute>
            <Dashboard />
          </PrivateRoute>
        }
      />
      <Route
        path="/tasks"
        element={
          <PrivateRoute>
            <TasksPage />
          </PrivateRoute>
        }
      />
      <Route
        path="/admin/users"
        element={
          <PrivateRoute adminOnly>
            <AdminUsersPage />
          </PrivateRoute>
        }
      />
      <Route
        path="/admin/users/:userId"
        element={
          <PrivateRoute adminOnly>
            <TasksPage />
          </PrivateRoute>
        }
      />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};

export default AppRoutes;
