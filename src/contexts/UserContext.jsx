import React, { createContext, useState } from 'react';
import { userService } from '../services/userService';

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState({});
  const [updating, setUpdating] = useState({});
  const [error, setError] = useState(null);

  const loadUsers = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await userService.getAll();
      setUsers(response); 
    } catch (error) {
      console.error('Error al cargar los usuarios:', error);
      setError('Error al cargar los usuarios');
    } finally {
      setLoading(false);
    }
  };

  const addUser = async (userData) => {
    setSaving(true);
    setError(null);
    try {
      const response = await userService.create(userData);
      const newUser = response.data || response;
      
      setUsers(prev => [...prev, newUser]);
      return newUser;
    } catch (error) {
      console.error('Error al crear el usuario:', error);
      setError('Error al crear el usuario');
      throw error;
    } finally {
      setSaving(false);
    }
  };

  const updateUser = async (id, updates) => {
    setUpdating(prev => ({ ...prev, [id]: true }));
    setError(null);
    try {
      const response = await userService.update(id, updates);
      const updatedUser = response.data || response;
      
      setUsers(prev => prev.map(user => 
        user.id === id ? updatedUser : user
      ));
      return updatedUser;
    } catch (error) {
      console.error('Error al actualizar el usuario:', error);
      setError('Error al actualizar el usuario');
    } finally {
      setUpdating(prev => ({ ...prev, [id]: false }));
    }
  };

  const deleteUser = async (id) => {
    setDeleting(prev => ({ ...prev, [id]: true }));
    setError(null);
    try {
      await userService.delete(id);
      setUsers(prev => prev.filter(user => user.id !== id));
    } catch (error) {
      console.error('Error al eliminar el usuario:', error);
      setError('Error al eliminar el usuario');
    } finally {
      setDeleting(prev => ({ ...prev, [id]: false }));
    }
  };

  const getUserById = (id) => {
    return users.find(user => user.id == id);
  };


  return (
    <UserContext.Provider value={{
      users,
      loading,
      saving,
      deleting,
      updating,
      error,
      addUser,
      updateUser,
      deleteUser,
      getUserById,
      loadUsers
    }}>
      {children}
    </UserContext.Provider>
  );
};
