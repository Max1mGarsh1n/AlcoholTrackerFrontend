import { useState, useContext, useEffect } from 'react';
import { View, Text } from 'react-native';
import AuthHeader from '../../../components/auth/AuthHeader';
import Button from '../../../components/common/Button';
import TextInput from '../../../components/common/TextInput';
import { loginUser } from '../../../api/authApi';
import { validateLoginForm } from '../../../utils/validators';
import { AuthContext } from '../../../context/AuthContext';
import styles from './LoginScreen.styles';

const LoginScreen = ({ navigation }) => {
  const { login, isAuthenticated } = useContext(AuthContext);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({
    email: '',
    password: '',
    general: ''
  });

  useEffect(() => {
    if (isAuthenticated) {
      navigation.navigate('Profile');
    }
  }, [isAuthenticated]);

  const handleLogin = async () => {
    setLoading(true);
    setErrors({ email: '', password: '', general: '' });

    const result = await loginUser(email, password);
    
    if (result.success) {
      await login(result.token);
    } else {
      setErrors({ ...errors, general: result.error });
    }

    setLoading(false);
  };

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <AuthHeader 
          subtitle="Войдите в свой аккаунт"
        />

        <View style={styles.form}>
          <View style={styles.formInputs}>
            <TextInput
              label="Электронная почта"
              placeholder="beer_lover@gmail.com"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              error={errors.email}
            />
            
            <TextInput
              label="Пароль"
              placeholder="**************"
              value={password}
              onChangeText={setPassword}
              secureTextEntry={true}
              error={errors.password}
            />
          </View>
          
          {errors.general ? (
            <Text style={{ color: '#ff5252', textAlign: 'center' }}>
              {errors.general}
            </Text>
          ) : null}
          
          <Button title="Войти" onPress={handleLogin} isLoading={loading} />
        </View>
        
        <View style={styles.newUser}>
          <Text style={styles.newUserText}>Новый пользователь?</Text>
          <Button 
            title="Зарегистрироваться"
            onPress={() => navigation.navigate('Register')}
            isLoading={loading}
            backgroundColor="#1a1a1a"
            textColor="#d4af37"
            textStyle={styles.registerButtonText}
          />
        </View>
      </View>
    </View>
  );
};

export default LoginScreen;