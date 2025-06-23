import React, { createContext, useState, useEffect } from 'react';
import * as SecureStore from 'expo-secure-store';
import { loginUser } from '../api/authApi';
import getTokenData from '../utils/storage';
import { jwtDecode } from 'jwt-decode';
import {API_URL} from '../config/config';
import axios from 'axios'

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(false); 
  const [userToken, setUserToken] = useState(null);
  const [userInfo, setUserInfo] = useState(null);


  const decodeToken = (token) => {
    try {
      const decoded = jwtDecode(token);
      console.log("Decoded token:", decoded);
      return decoded;
    } catch (error) {
      console.error('Token decoding error:', error);
      return null;
    }
  };

  // Сохранение данных пользователя
  const saveUserData = async (token) => {
    
    console.log('Raw token:', token);
    const decoded = jwtDecode(token);
    console.log('Decoded token:', decoded);

    if (!decoded) return;

    const userData = {
      userId: decoded.userId,
      username: decoded.sub, // sub = email/username
    };

    try {
      await Promise.all([
        SecureStore.setItemAsync('accessToken', token),
        SecureStore.setItemAsync('userId', decoded.userId.toString()),
        SecureStore.setItemAsync('username', decoded.sub),
        SecureStore.setItemAsync('userInfo', JSON.stringify(userData))
      ]);
      return userData;
    } catch (error) {
      console.error("Error saving user data:", error);
      return null;
    }
  };

  const login = async (email, password) => {
    setIsLoading(true);
    try {
      const response = await axios.post(`${API_URL}/auth/login`, {
        email: email.trim(),
        password
      }, {
        headers: {
          'Content-Type': 'application/json'
        }
      });

      const { accessToken } = response.data;
      
      if (!accessToken) {
        throw new Error('Токен не получен от сервера');
      }

      const userData = await saveUserData(accessToken);
      
      setUserToken(accessToken);
      setUserInfo(userData);

      console.log("SUCCESSFUL LOGIN!", { 
        token: accessToken, 
        userData 
      });

      return true;
    } catch (error) {
      console.error('Login error:', error);
      await logout();
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (username, email, password) => {
  setIsLoading(true);
  try {
    const response = await axios.post(`${API_URL}/auth/register`, {
      username: username.trim(),
      email: email.trim(),
      password
    }, {
      headers: {
        'Content-Type': 'application/json'
      }
    });

    const { accessToken } = response.data;

    if (!accessToken) {
      throw new Error('Токен не получен от сервера');
    }

    const userData = await saveUserData(accessToken);

    setUserToken(accessToken);
    setUserInfo(userData);

    console.log("SUCCESSFUL REGISTER + LOGIN!", {
      token: accessToken,
      userData
    });

    return true;
  } catch (error) {
    console.error('Register error:', error);
    await logout();
    return false;
  } finally {
    setIsLoading(false);
  }
};


  const logout = async () => {
    setIsLoading(true);
    try {
      await Promise.all([
        SecureStore.deleteItemAsync('accessToken'),
        SecureStore.deleteItemAsync('userId'),
        SecureStore.deleteItemAsync('username'),
        SecureStore.deleteItemAsync('userInfo')
      ]);
      
      setUserToken(null);
      setUserInfo(null);
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const isLoggedIn = async () => {
    try {
      setIsLoading(true);
      const token = await SecureStore.getItemAsync('accessToken');
      const userInfoStr = await SecureStore.getItemAsync('userInfo');
      
      if (token && userInfoStr) {
        const decoded = decodeToken(token);
        if (decoded) {
          setUserToken(token);
          setUserInfo(JSON.parse(userInfoStr));
          return true;
        }
      }
      
      await logout();
      return false;
    } catch (e) {
      console.error('isLoggedIn error:', e);
      await logout();
      return false;
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
      login,
      logout,
      register
    }}>
      {children}
    </AuthContext.Provider>
  );
};