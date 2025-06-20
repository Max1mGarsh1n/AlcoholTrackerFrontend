import { removeTokens } from '../auth/authService';

 const API_URL = 'http://192.168.1.136:8080/api';
//const API_URL = 'http://83.139.159.240:8080/api'; // Гаджиев

// Профиль пользователя
export const logoutUser = async (refreshToken) => {
  try {
    const response = await fetch(`${API_URL}/auth/logout`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ refreshToken })
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Ошибка при выходе');
    }

    // Удаляем токены из хранилища после успешного логаута
    removeTokens();
    
    return await response.json(); // или просто return, если сервер не возвращает данных
  } catch (error) {
    console.error('Logout API error:', error);
    throw error;
  }
};

export const fetchUserProfile = async (userId) => {
  try {
    const response = await fetch(`${API_URL}/users/${userId}/profile`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${await SecureStore.getItemAsync('accessToken')}`
      }
    });
    
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Ошибка загрузки профиля');
    }
    
    return await response.json();
  } catch (error) {
    console.error('Fetch profile error:', error);
    throw error;
  }
};