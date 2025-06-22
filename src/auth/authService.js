// Проверка аутентификации
export const isAuthenticated = async () => {
  const { accessToken } = await getToken();
  return !!accessToken;
};