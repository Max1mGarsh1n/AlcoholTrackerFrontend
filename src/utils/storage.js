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
  await Promise.all([
    SecureStore.deleteItemAsync('accessToken'),
    SecureStore.deleteItemAsync('userId'),
    SecureStore.deleteItemAsync('username')
  ]);
};

// Проверка аутентификации
export const isAuthenticated = async () => {
  const { accessToken } = await getToken();
  return !!accessToken;
};