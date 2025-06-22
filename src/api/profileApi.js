import { getUserIdFromToken } from '../utils/jwtUtils';
import * as SecureStore from 'expo-secure-store';
import { API_URL } from '../config/config';

export const logoutUser = async () => {
  try {
    const accessToken = await SecureStore.getItemAsync('accessToken');
    if (!accessToken) throw new Error('No access token found');

    const response = await fetch(`${API_URL}/auth/logout`, {
      method: 'POST',
      headers: { 
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${accessToken}`
      }
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Logout failed');
    }

    return { success: true };
  } catch (error) {
    console.error('Logout API error:', error);
    return {
      success: false,
      error: error.message || 'Logout failed. Please try again.'
    };
  }
};

export const fetchUserProfile = async () => {
  try {
    const userId = await getUserIdFromToken();
    if (!userId) throw new Error('User ID not found');

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

export const updateUserProfile = async (profileData) => {
  try {
    const userId = await SecureStore.getItemAsync('userId');
    if (!userId) throw new Error('User ID not found');

    const response = await fetch(`${API_URL}/users/${userId}/profile/edit`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${await SecureStore.getItemAsync('accessToken')}`
      },
      body: JSON.stringify(profileData)
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Ошибка обновления профиля');
    }

    return await response.json();
  } catch (error) {
    console.error('Update profile error:', error);
    throw error;
  }
};