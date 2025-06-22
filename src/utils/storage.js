import * as SecureStore from 'expo-secure-store';
import jwtDecode from 'jwt-decode';


export const saveToken = async (accessToken) => {
  await SecureStore.setItemAsync('accessToken', accessToken);
};

export const getTokenData = async () => {
  const token = await SecureStore.getItemAsync('accessToken');
  if (!token) return null;
  return jwtDecode(token);
};

// Получение userID
export const getUserId = async () => {
  const tokenData = await getTokenData();
  return tokenData?.userId || null;
};

// Получение username
export const getUsername = async () => {
  const tokenData = await getTokenData();
  return tokenData?.username || null;
};



// Получение токенов
export const getToken = async () => {
  try {
    const accessToken = await SecureStore.getItemAsync('accessToken');
    return { accessToken };
  } catch (error) {
    console.error('Ошибка получения токенов:', error);
    return { accessToken: null };
  }
};


export const clearAuthData = async () => {
  try {
    await Promise.all([
      SecureStore.deleteItemAsync('accessToken'),
      SecureStore.deleteItemAsync('userId'),
      SecureStore.deleteItemAsync('username')
    ]);
    return true;
  } catch (error) {
    console.error('Failed to clear auth data:', error);
    return false;
  }
};

// Проверка аутентификации
export const isAuthenticated = async () => {
  const { accessToken } = await getToken();
  return !!accessToken;
};








export const clearSecureStore = async () => {
  try {
    // Важно: перечисли все ключи, которые ты мог использовать
    const keysToDelete = ['accessToken', 'refreshToken', 'userId', 'userData'];

    for (const key of keysToDelete) {
      await SecureStore.deleteItemAsync(key);
    }

    console.log('SecureStore cleared successfully.');
    return true;
  } catch (error) {
    console.error('Error clearing SecureStore:', error);
    return false;
  }
};