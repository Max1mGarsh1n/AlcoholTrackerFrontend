import { getUserIdFromToken } from '../utils/jwtUtils';
import * as SecureStore from 'expo-secure-store';
import { API_URL } from '../config/config';

export const fetchParties = async () => {
  try {
    const userId = await getUserIdFromToken();
    console.debug("fetchUserProfile:", userId);
    if (!userId) throw new Error('User ID not found');
    
    const response = await fetch(`${API_URL}/parties/${userId}`, {
      method: 'GET',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${await SecureStore.getItemAsync('accessToken')}`
            }
    });

    if (!response.ok) {
      throw new Error('Ошибка при загрузке застолий');
    }

    return await response.json();
  } catch (error) {
    console.error('Fetch parties error:', error);
    throw error;
  }
};

export const fetchPartyDetails = async (userId, partyId) => {
  try {
    const token = await SecureStore.getItemAsync('accessToken');
    
    const response = await fetch(`${API_URL}/parties/${userId}/${partyId}`, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    });

    if (!response.ok) {
      throw new Error('Ошибка при загрузке деталей застолья');
    }

    return await response.json();
  } catch (error) {
    console.error('Fetch party details error:', error);
    throw error;
  }
};

export const createParty = async (userId, partyData) => {
  try {
    const token = await SecureStore.getItemAsync('accessToken');
    
    const response = await fetch(`${API_URL}/parties/${userId}/create`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(partyData)
    });

    if (!response.ok) {
      throw new Error('Ошибка при создании застолья');
    }

    return await response.json();
  } catch (error) {
    console.error('Create party error:', error);
    throw error;
  }
};