import React, { useState } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, TextInput, Alert } from 'react-native';
import { saveTokens } from '../../auth/authService';
import { navigateToMainApp } from '../../navigation/NavigationHelpers';

const API_URL = 'http://178.234.175.204:8080/api';

const RegisterScreen = ({ navigation }) => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleRegister = async () => {
    try {
      const response = await fetch(`${API_URL}/auth/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username: username.trim(), email: email.trim(), password })
      });

      const data = await response.json();

      if (response.ok) {
        // После регистрации сразу логинимся
        const loginResponse = await fetch(`${API_URL}/auth/login`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email: email.trim(), password })
        });

        const loginData = await loginResponse.json();

        if (loginResponse.ok && loginData.accessToken) {
          await saveTokens(loginData.accessToken, loginData.refreshToken);
          navigateToMainApp(navigation);
        } else {
          Alert.alert('Успешно', 'Аккаунт создан.');
          navigateToMainApp(navigation);
        }
      } else {
        Alert.alert('Ошибка регистрации', data.message || 'Проверьте введённые данные');
      }
    } catch (error) {
      console.error('Register error:', error);
      Alert.alert('Ошибка сети', 'Не удалось создать аккаунт. Попробуйте позже.');
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
          <Text style={styles.subtitle}>Создайте свой аккаунт</Text>
        </View>

        <View style={styles.form}>
          <View style={styles.form_inputs}>
            <Text style={styles.inputLabel}>Имя пользователя</Text>
            <TextInput 
              style={styles.input}
              placeholder="Buharik228"
              placeholderTextColor="#888"
              value={username}
              onChangeText={setUsername}
            />
            
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
          
          <TouchableOpacity style={styles.createAccountButton} onPress={handleRegister}>
            <Text style={styles.createAccountButtonText}>Зарегистрироваться</Text>
          </TouchableOpacity>
        </View>
        
        <View style={styles.haveAccount}>
          <Text style={styles.haveAccountText}>Уже есть аккаунт?</Text>
          <TouchableOpacity style={styles.loginButton} onPress={() => navigation.navigate('Login')}>
            <Text style={styles.loginButtonText}>Войти</Text>
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
  createAccountButton: {
    backgroundColor: '#d4af37',
    padding: 15,
    borderRadius: 25,
    alignItems: 'center',
    marginBottom: 30,
  },
  createAccountButtonText: {
    color: '#1a1a1a',
    fontWeight: 'bold',
    fontSize: 16,
  },
  haveAccount: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  haveAccountText: {
    color: '#fff',
    marginRight: 5,
  },
  loginButton: {
    paddingVertical: 5,
    paddingHorizontal: 10,
  },
  loginButtonText: {
    color: '#d4af37',
    fontWeight: 'bold',
  },
});

export default RegisterScreen;