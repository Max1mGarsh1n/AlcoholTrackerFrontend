import { saveTokens } from '../auth/authService';

 const API_URL = 'http://192.168.1.136:8080/api';
// const API_URL = 'http://83.139.159.240:8080/api'; // Гаджиев

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

    const data = await response.json();
    await saveTokens(data.accessToken, data.refreshToken);
    
    // Сохраняем userId
    if (data.userId) {
      await SecureStore.setItemAsync('userId', data.userId.toString());
    }
    
    return { success: true, userId: data.userId };
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

    const data = await response.json();
    return { success: true, data };
  } catch (error) {
    console.error('Register API error:', error);
    return { 
      success: false, 
      error: error.message || 'Ошибка сети. Попробуйте позже.' 
    };
  }
};