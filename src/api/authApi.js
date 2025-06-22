import { saveToken } from '../utils/storage';
import {API_URL} from '../config/config';
import { saveUserData } from '../utils/jwtUtils';
import * as SecureStore from 'expo-secure-store';

export const loginUser = async (email, password) => {
  try {
    const response = await fetch(`${API_URL}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: email.trim(), password })
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || 'Неверные учетные данные');
    }

    if (!data.accessToken) {
      throw new Error('Токен не получен от сервера');
    }

    await SecureStore.setItemAsync('accessToken', data.accessToken);
    await saveUserData(data.accessToken);

    return { 
      success: true, 
      token: data.accessToken // Убедимся что это строка
    };
  } catch (error) {
    console.error('Login API error:', error);
    return { 
      success: false, 
      error: error.message || 'Ошибка сети. Попробуйте позже.' 
    };
  }
};

export const registerUser = async (username, email, password) => {
  try {
    const response = await fetch(`${API_URL}/auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ 
        username: username.trim(), 
        email: email.trim(), 
        password 
      })
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || 'Ошибка регистрации');
    }

    if (!data.accessToken) {
      throw new Error('Токен не получен от сервера');
    }

    await SecureStore.setItemAsync('accessToken', data.accessToken);
    await saveUserData(data.accessToken);

    return { 
      success: true,
      token: data.accessToken // Возвращаем токен для автоматического входа
    };
  } catch (error) {
    console.error('Register API error:', error);
    return { 
      success: false, 
      error: error.message || 'Ошибка сети. Попробуйте позже.' 
    };
  }
};