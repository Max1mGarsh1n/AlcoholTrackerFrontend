import { useState } from 'react';
import { View, Text } from 'react-native';
import AuthHeader from '../../../components/auth/AuthHeader';
import Button from '../../../components/common/Button';
import TextInput from '../../../components/common/TextInput';
import { registerUser } from '../../../api/authApi';
import { navigateToMainApp } from '../../../navigation/NavigationHelpers';
import { validateRegisterForm } from '../../../utils/validators';
import styles from './RegisterScreen.styles';

const RegisterScreen = ({ navigation }) => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({
    username: '',
    email: '',
    password: '',
    general: ''
  });

  const handleRegister = async () => {
    const { isValid, errors: validationErrors } = validateRegisterForm(username, email, password);
    
    if (!isValid) {
      setErrors(validationErrors);
      return;
    }

    setLoading(true);
    setErrors({ ...errors, general: '' });
    
    const result = await registerUser(username, email, password);
    
    if (result.success) {
      navigateToMainApp(navigation);
    } else {
      setErrors({ ...validationErrors, general: result.error });
    }
    
    setLoading(false);
  };

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <AuthHeader 
          subtitle="Создайте свой аккаунт"
        />

        <View style={styles.form}>
          <View style={styles.formInputs}>
            <TextInput
              label="Имя пользователя"
              placeholder="Buharik228"
              value={username}
              onChangeText={setUsername}
              error={errors.username}
            />
            
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
              secureTextEntry
              error={errors.password}
            />
          </View>
          
          {errors.general ? (
            <Text style={styles.errorText}>
              {errors.general}
            </Text>
          ) : null}
          
          <Button 
            title="Зарегистрироваться"
            onPress={handleRegister}
            isLoading={loading}
          />
        </View>
        
        <View style={styles.haveAccount}>
          <Text style={styles.haveAccountText}>Уже есть аккаунт?</Text>
          <Button 
            title="Войти"
            variant="text"
            onPress={() => navigation.navigate('Login')}
            textStyle={styles.loginButtonText}
          />
        </View>
      </View>
    </View>
  );
};

export default RegisterScreen;