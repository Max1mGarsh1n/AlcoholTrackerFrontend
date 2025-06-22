import React, { createContext, useState, useEffect } from 'react';
import * as SecureStore from 'expo-secure-store';
import jwtDecode from 'jwt-decode';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(true); 
  const [userToken, setUserToken] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userId, setUserId] = useState(null);

  const login = async (token) => {
    if (typeof token !== 'string') {
      console.error('Token must be a string');
      return false;
    }
    
    setIsLoading(true);
    try {
      const decoded = jwtDecode(token);
      await SecureStore.setItemAsync('accessToken', token);
      await SecureStore.setItemAsync('userId', decoded.userId.toString());
      
      setUserToken(token);
      setUserId(decoded.userId);
      setIsAuthenticated(true); 
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async () => {
    console.log('Start logout process'); // <-- Добавьте это
    setIsLoading(true);
    try {
      console.log('Clearing storage...');
      await Promise.all([
        SecureStore.deleteItemAsync('accessToken'),
        SecureStore.deleteItemAsync('userId'),
        SecureStore.deleteItemAsync('username')
      ]);
      console.log('Storage cleared');
      
      setUserToken(null);
      setIsAuthenticated(false);
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      setIsLoading(false);
      console.log('Logout complete');
    }
  };

  const isLoggedIn = async () => {
    try {
      setIsLoading(true);
      const token = await SecureStore.getItemAsync('accessToken');
      if (token) {
        setUserToken(token);
        setIsAuthenticated(true);
      } else {
        setUserToken(null);
        setIsAuthenticated(false);
      }
    } catch (e) {
      console.error(`isLoggedIn error: ${e}`);
      setUserToken(null);
      setIsAuthenticated(false);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    isLoggedIn();
  }, []);

  return (
    <AuthContext.Provider value={{
      userToken,
      isLoading,
      isAuthenticated,
      login,
      logout,
      setUserToken
    }}>
      {children}
    </AuthContext.Provider>
  );
};