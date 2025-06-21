import React, { createContext, useEffect, useState } from 'react';
import { useMsal } from "@azure/msal-react";
import { loginRequest } from '../config/authConfig';
import { userService } from '../services/userService';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const { instance, accounts, inProgress } = useMsal();
  const [authUser, setAuthUser] = useState(null);
  const [b2cUser, setB2cUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [userEmail, setUserEmail] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [stats, setStats] = useState({total: 0});
  const [statsLoading, setStatsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const checkUserAuthorization = async () => {
      setIsAuthenticated(false);

      if (accounts.length > 0) {
        const account = accounts[0];
        setUserEmail(account.username);
        setB2cUser(account);
        setIsAuthenticated(true);
      } else {
        setLoading(false);
      }  
    };

    checkUserAuthorization();
  }, [accounts, inProgress]);

  useEffect(() => {
    loadAuthuser(userEmail)
  }, [userEmail]);

  const loadAuthuser = async (userEmail) => {
    setAuthUser(null);
    setIsAuthorized(false);
    setLoading(true);
    
    if (!userEmail) {
      setLoading(false);
      return;
    }
        
    try {
      const userFromServer = await userService.getByEmail(userEmail);
      
      if (userFromServer) {
        setAuthUser(userFromServer);
        setIsAuthorized(true);          
      } else {
        setIsAuthorized(false);
      }
    } catch (error) {
      console.error('Error al obtener usuario en autenticación:', error);         
      setIsAuthorized(false);
    } finally {
      setLoading(false);
    }
  }

  const login = async () => {
    try {
      await instance.loginPopup(loginRequest);
    } catch (error) {
      console.error('Login fallido:', error);
    }
  };

  const logout = async () => {
    try {
      await instance.logoutPopup({
        postLogoutRedirectUri: "/",
      });

      setAuthUser(null);
      setIsAuthenticated(false);
      setIsAuthorized(false);
    } catch (error) {
      console.error('Logout fallido:', error);
    }
  };

  const getStats = async () => {
    setStats({});
    setError(null);
    setStatsLoading(true);
    
    if (!authUser) {
      authUser(false);
      return;
    }
        
    try {
      const stats = await userService.getStats();
      setStats(stats);
      
    } catch (error) {
      console.error('Error cargando las estadísticas:', error);         
      setError('Error cargando las estadísticas.' );
    } finally {
      setStatsLoading(false);
    }

  }


  return (
    <AuthContext.Provider value={{
      authUser,
      b2cUser,
      loading: loading || inProgress === "login" || inProgress === "logout",
      loginLoading: inProgress === "login",
      statsLoading,
      isAuthenticated,
      isAuthorized,
      login,
      logout,
      isAdmin: authUser?.role === 'admin',
      stats,
      getStats,
      error
    }}>
      {children}
    </AuthContext.Provider>
  );
};
