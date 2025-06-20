import * as SecureStore from 'expo-secure-store';

 const API_URL = 'http://192.168.1.136:8080/api';
//const API_URL = 'http://83.139.159.240:8080/api'; // Гаджиев

export const saveTokens = async (accessToken, refreshToken) => {
  try {
    await SecureStore.setItemAsync('accessToken', accessToken);
    if (refreshToken) {
      await SecureStore.setItemAsync('refreshToken', refreshToken);
    }
    return true;
  } catch (error) {
    console.error('Ошибка сохранения токенов:', error);
    return false;
  }
};

// Получение токенов
export const getTokens = async () => {
  try {
    const accessToken = await SecureStore.getItemAsync('accessToken');
    const refreshToken = await SecureStore.getItemAsync('refreshToken');
    return { accessToken, refreshToken };
  } catch (error) {
    console.error('Ошибка получения токенов:', error);
    return { accessToken: null, refreshToken: null };
  }
};

// Удаление токенов (выход)
export const removeTokens = async () => {
  try {
    await SecureStore.deleteItemAsync('accessToken');
    await SecureStore.deleteItemAsync('refreshToken');
    return true;
  } catch (error) {
    console.error('Ошибка удаления токенов:', error);
    return false;
  }
};

// Проверка аутентификации
export const isAuthenticated = async () => {
  const { accessToken } = await getTokens();
  return !!accessToken;
};

// Обновление access токена
export const refreshAccessToken = async () => {
  try {
    const refreshToken = await SecureStore.getItemAsync('refreshToken');
    if (!refreshToken) return null;

    const response = await fetch(`${API_URL}/auth/refresh`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ refreshToken })
    });

    if (response.ok) {
      const data = await response.json();
      await saveTokens(data.accessToken, data.refreshToken);
      return data.accessToken;
    }
    return null;
  } catch (error) {
    console.error('Ошибка обновления токена:', error);
    return null;
  }
};