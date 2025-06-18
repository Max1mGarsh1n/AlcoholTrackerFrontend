import { useState } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, TextInput, Alert } from 'react-native';
import { saveTokens } from '../../auth/authService';
import * as SecureStore from 'expo-secure-store'; 
import { navigateToMainApp } from '../../../navigation/navigationHelpers';


const API_URL = 'http://178.234.175.204:8080/api';

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin1 = async () => {
    navigateToMainApp(navigation);
  }

  const handleLogin = async () => {
    try {
      console.log('[Login] Attempting login with:', { 
        email: email.trim(), 
        password: '••••••' // Не логируем реальный пароль!
      });
      
      const response = await fetch(`${API_URL}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: email.trim(), password })
      });

      console.log('[Login] Response status:', response.status);
      
      const data = await response.json();
      console.log('[Login] Response data:', data);

      if (response.ok) {
        console.log('[Login] Saving tokens:', {
          accessToken: data.accessToken ? '••••••' : 'MISSING', // Маскируем токен
          refreshToken: data.refreshToken ? '••••••' : 'MISSING'
        });
        
        await saveTokens(data.accessToken, data.refreshToken);
        
        // Проверяем сохранение токенов
        const savedAccessToken = await SecureStore.getItemAsync('accessToken');
        const savedRefreshToken = await SecureStore.getItemAsync('refreshToken');
        
        console.log('[Login] Tokens saved successfully:', {
          accessTokenSaved: !!savedAccessToken,
          refreshTokenSaved: !!savedRefreshToken
        });
        
        navigateToMainApp(navigation);
      } else {
        console.error('[Login] Error response:', data);
        Alert.alert('Ошибка входа', data.message || 'Неверные данные');
      }
    } catch (error) {
      console.error('[Login] Network error:', error);
      Alert.alert('Ошибка сети', 'Не удалось выполнить вход. Попробуйте позже.');
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <View style={styles.logo_title}>
          <Image 
            style={styles.logo}
            source={require('../../../assets/logo.png')}
            resizeMode='contain'
          />
          <Text style={styles.title}>Добро пожаловать в MAGAMED!</Text>
          <Text style={styles.subtitle}>Войдите в свой аккаунт</Text>
        </View>

        <View style={styles.form}>
          <View style={styles.form_inputs}>
            <Text style={styles.inputLabel}>Электронная почта</Text>
            <TextInput 
              style={styles.input}
              placeholder="beer_lover@gmail.com"
              placeholderTextColor="#888"
              keyboardType="email-address"
              value={email}
              onChangeText={setEmail}
            />
            
            <Text style={styles.inputLabel}>Пароль</Text>
            <TextInput 
              style={styles.input}
              placeholder="**************"
              placeholderTextColor="#888"
              secureTextEntry={true}
              value={password}
              onChangeText={setPassword}
            />
          </View>
          
          <TouchableOpacity style={styles.loginButtonMain} onPress={handleLogin}>
            <Text style={styles.loginButtonMainText}>Войти</Text>
          </TouchableOpacity>
        </View>
        
        <View style={styles.newUser}>
          <Text style={styles.newUserText}>Новый пользователь?</Text>
          <TouchableOpacity style={styles.registerButton} onPress={() => navigation.navigate('Register')}>
            <Text style={styles.registerButtonText}>Зарегистрироваться</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1a1a1a',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  content: {
    width: '100%',
    maxWidth: 400,
  },
  logo_title: {
    alignItems: 'center',
    marginBottom: 40,
  },
  logo: {
    width: 120,
    height: 120,
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#d4af37',
    textAlign: 'center',
    marginBottom: 5,
  },
  subtitle: {
    fontSize: 16,
    color: '#fff',
    textAlign: 'center',
  },
  form: {
    width: '100%',
  },
  form_inputs: {
    marginBottom: 25,
  },
  inputLabel: {
    color: '#d4af37',
    marginBottom: 8,
    fontSize: 14,
    fontWeight: '500',
  },
  input: {
    backgroundColor: '#2a2a2a',
    color: '#fff',
    padding: 15,
    borderRadius: 8,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#444',
  },
  loginButtonMain: {
    backgroundColor: '#d4af37',
    padding: 15,
    borderRadius: 25,
    alignItems: 'center',
    marginBottom: 30,
  },
  loginButtonMainText: {
    color: '#1a1a1a',
    fontWeight: 'bold',
    fontSize: 16,
  },
  newUser: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  newUserText: {
    color: '#fff',
    marginRight: 5,
  },
  registerButton: {
    paddingVertical: 5,
    paddingHorizontal: 10,
  },
  registerButtonText: {
    color: '#d4af37',
    fontWeight: 'bold',
  },
});

export default LoginScreen;