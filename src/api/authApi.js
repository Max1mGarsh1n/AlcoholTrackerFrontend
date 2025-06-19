import { saveTokens } from '../auth/authService';

const API_URL = 'http://178.234.175.204:8080/api';

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