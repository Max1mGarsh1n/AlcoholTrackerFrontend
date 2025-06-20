import { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, ScrollView, Switch, ActivityIndicator } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { logoutUser, fetchUserProfile } from '../../../api/userApi';
import * as SecureStore from 'expo-secure-store';
import { navigateToAuth } from '../../../navigation/NavigationHelpers';
import styles from './ProfileScreen.styles';

const ProfileScreen = ({ navigation }) => {
  const [isDarkTheme, setIsDarkTheme] = useState(false);
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const loadUserProfile = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const userId = await SecureStore.getItemAsync('userId');
      if (!userId) throw new Error('User ID not found');
      
      const data = await fetchUserProfile(userId);
      setUserData(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadUserProfile();
  }, []);

  const handleLogout = async () => {
  try {
    const refreshToken = await SecureStore.getItemAsync('refreshToken');
    if (refreshToken) await logoutUser(refreshToken);
    
    // Очищаем все данные
    await SecureStore.deleteItemAsync('accessToken');
    await SecureStore.deleteItemAsync('refreshToken');
    await SecureStore.deleteItemAsync('userId');
    
    navigateToAuth(navigation);
  } catch (error) {
    console.error('Logout error:', error);
    // Принудительная очистка
    await SecureStore.deleteItemAsync('accessToken');
    await SecureStore.deleteItemAsync('refreshToken');
    await SecureStore.deleteItemAsync('userId');
    navigateToAuth(navigation);
  }
};

  if (loading) {
    return (
      <View style={[styles.container, styles.center]}>
        <ActivityIndicator size="large" color="#6200ee" />
      </View>
    );
  }

  if (error) {
    return (
      <View style={[styles.container, styles.center]}>
        <Text style={styles.errorText}>Ошибка: {error}</Text>
        <TouchableOpacity 
          style={styles.retryButton} 
          onPress={loadUserProfile}
        >
          <Text style={styles.retryButtonText}>Повторить</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.header}>
          <Text style={styles.name}>
            {userData?.name || 'Пользователь'}
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Аккаунт</Text>
          <ProfileItem 
            icon="person" 
            title="Данные аккаунта" 
            onPress={() => navigation.navigate('AccountDataScreen', { userData })}
          />
          <ProfileItem 
            icon="settings" 
            title="Параметры" 
            onPress={() => navigation.navigate('ParametersScreen')} 
          />
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Настройки</Text>
          <View style={styles.profileItem}>
            <View style={styles.itemLeft}>
              <Ionicons name="moon" size={24} color="#666" style={styles.icon} />
              <Text style={styles.itemText}>Смена темы</Text>
            </View>
            <Switch
              value={isDarkTheme}
              onValueChange={() => setIsDarkTheme(!isDarkTheme)}
            />
          </View>
        </View>

        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
          <Text style={styles.logoutText}>Выйти из аккаунта</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

// Компонент элемента профиля (без изменений)
const ProfileItem = ({ icon, title, onPress }) => (
  <TouchableOpacity style={styles.profileItem} onPress={onPress}>
    <View style={styles.itemLeft}>
      <Ionicons name={icon} size={24} color="#666" style={styles.icon} />
      <Text style={styles.itemText}>{title}</Text>
    </View>
    <Ionicons name="chevron-forward" size={20} color="#999" />
  </TouchableOpacity>
);

export default ProfileScreen;