import React, { useState } from 'react';
import { View } from 'react-native';
import LoginScreen from '../src/screens/auth/LoginScreen';
import RegisterScreen from '../src/screens/auth/RegisterScreen';

export default function AuthSwitcher({ navigation }) {
  const [screen, setScreen] = useState('signin');
  
  const handleLogin = () => {
    navigation.navigate('Main');
  };

  return (
    <View style={{ flex: 1 }}>
      {screen === 'login' ? (
        <LoginScreen 
          onLogin={handleLogin}
          onSwitch={() => setScreen('register')}
        />
      ) : (
        <RegisterScreen 
          onSwitch={() => setScreen('login')}
        />
      )}
    </View>
  );
}