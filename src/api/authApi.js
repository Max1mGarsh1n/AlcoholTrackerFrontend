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

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Неверные учетные данные');
    }

    const { accessToken } = await response.json();
    console.log('accessToken:', accessToken);
    await SecureStore.setItemAsync('accessToken', accessToken);
    await saveUserData(accessToken); // Сохраняем данные из токена
    
    return { success: true };
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

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Ошибка регистрации');
    }

    const { accessToken } = await response.json();
    console.log('accessToken:', accessToken);
    await SecureStore.setItemAsync('accessToken', accessToken);
    await saveUserData(accessToken);

    return { success: true };
  } catch (error) {
    console.error('Register API error:', error);
    return { 
      success: false, 
      error: error.message || 'Ошибка сети. Попробуйте позже.' 
    };
  }
};