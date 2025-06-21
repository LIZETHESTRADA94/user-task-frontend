import React from 'react';
import { PublicClientApplication } from "@azure/msal-browser";
import { MsalProvider } from "@azure/msal-react";
import { BrowserRouter as Router } from 'react-router-dom';
import { msalConfig } from './config/authConfig';
import { AuthProvider } from './contexts/AuthContext';
import { TaskProvider } from './contexts/TaskContext';
import { UserProvider } from './contexts/UserContext';
import AuthenticatedLayout from './components/AuthenticatedLayout'


// Crear instancia MSAL
const msalInstance = new PublicClientApplication(msalConfig);

const App = () => {
  return (
    <MsalProvider instance={msalInstance}>      
      <AuthProvider>        
        <UserProvider>
          <TaskProvider>        
              <Router>
                <div className="min-h-screen bg-gray-50">
                  <AuthenticatedLayout />
                </div>
              </Router>
          </TaskProvider>
        </UserProvider>
      </AuthProvider>
    </MsalProvider>
  );
};

export default App;