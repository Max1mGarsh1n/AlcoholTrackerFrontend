import { useState, useEffect, React } from 'react';
import { useIsFocused } from '@react-navigation/native';
import { View, Text, TouchableOpacity, ScrollView, Switch, ActivityIndicator } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { logoutUser, fetchUserProfile } from '../../../api/profileApi';
import { clearAuthData } from '../../../utils/storage';
import { navigateToAuth } from '../../../navigation/NavigationHelpers';
import styles from './ProfileScreen.styles';

const ProfileScreen = ({ navigation }) => {
  const isFocused = useIsFocused();
  const [isDarkTheme, setIsDarkTheme] = useState(false);
  const [userData, setUserData] = useState(null);
  const [username, setUsername] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [logoutLoading, setLogoutLoading] = useState(false);

  const loadUserProfile = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const data = await fetchUserProfile();
      console.log('Received user data:', data);
      setUserData(data);
      setUsername(data.username);

    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    try {
      setLogoutLoading(true);
      setError(null);
      
      // 1. Пытаемся выполнить логаут на бэкенде
      const result = await logoutUser();
      
      // 2. В любом случае очищаем локальные данные
      await clearAuthData();
      
      // 3. Если логаут на бэкенде не удался, показываем ошибку
      if (!result.success) {
        setError(result.error);
        return;
      }
      
      // 4. Перенаправляем на экран авторизации
      navigateToAuth(navigation);
      
    } catch (error) {
      console.error('Logout error:', error);
      setError('An unexpected error occurred');
    } finally {
      setLogoutLoading(false);
    }
  };

  useEffect(() => {
    if (isFocused) {
      loadUserProfile();
    }
  }, [isFocused]);

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
            {userData?.name || username || 'Пользователь'}
          </Text>
          {username && <Text style={styles.username}></Text>}
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
            onPress={() => navigation.navigate('ParametersScreen', { userData })}
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

        <TouchableOpacity 
        style={styles.logoutButton} 
        onPress={handleLogout}
        disabled={logoutLoading}
      >
        {logoutLoading ? (
          <ActivityIndicator color="white" />
        ) : (
          <Text style={styles.logoutText}>Выйти из аккаунта</Text>
        )}
      </TouchableOpacity>

      {error && <Text style={styles.errorText}>{error}</Text>}
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