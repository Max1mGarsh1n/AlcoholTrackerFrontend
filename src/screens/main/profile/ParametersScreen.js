import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, ScrollView, Alert } from 'react-native';
import { updateUserProfile } from '../../../api/profileApi';

const ParametersScreen = ({ navigation, route }) => {
  // Получаем данные профиля из параметров навигации
  const { userData } = route.params || {};
  
  // Инициализируем состояния
  const [gender, setGender] = useState(null);
  const [age, setAge] = useState('');
  const [height, setHeight] = useState('');
  const [weight, setWeight] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // Заполняем данные при получении userData
  useEffect(() => {
    if (userData) {
      setGender(userData.gender === 'MALE' ? 'male' : 'female');
      setAge(userData.age ? String(userData.age) : '');
      setHeight(userData.height ? String(userData.height) : '');
      setWeight(userData.weight ? String(userData.weight) : '');
    }
  }, [userData]);

  const handleSave = async () => {
    try {
      setIsLoading(true);
      
      const body = {
        gender: gender === 'male' ? 'MALE' : 'FEMALE',
        age: age ? parseInt(age) : null,
        height: height ? parseFloat(height) : null,
        weight: weight ? parseFloat(weight) : null,
        // Добавляем email и username, если они требуются на бэкенде
        email: userData?.email,
        username: userData?.username
      };

      const updatedProfile = await updateUserProfile(body);
      
      Alert.alert(
        'Успех', 
        'Данные успешно обновлены',
        [{ text: 'OK', onPress: () => navigation.goBack() }]
      );
      
    } catch (error) {
      console.error('Save error:', error);
      Alert.alert('Ошибка', error.message || 'Не удалось сохранить изменения');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Параметры</Text>

          {/* Пол */}
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Пол</Text>
            <View style={styles.genderToggleContainer}>
              <TouchableOpacity
                style={[
                  styles.genderOption,
                  gender === 'female' && styles.genderSelected
                ]}
                onPress={() => setGender('female')}
              >
                <Text style={[
                  styles.genderText,
                  gender === 'female' && styles.genderTextSelected
                ]}>
                  Ж
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[
                  styles.genderOption,
                  gender === 'male' && styles.genderSelected
                ]}
                onPress={() => setGender('male')}
              >
                <Text style={[
                  styles.genderText,
                  gender === 'male' && styles.genderTextSelected
                ]}>
                  М
                </Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* Возраст */}
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Возраст</Text>
            <TextInput
              style={styles.input}
              placeholder="Возраст"
              keyboardType="numeric"
              value={age}
              onChangeText={setAge}
            />
          </View>

          {/* Рост */}
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Рост (см)</Text>
            <TextInput
              style={styles.input}
              placeholder="Рост"
              keyboardType="numeric"
              value={height}
              onChangeText={setHeight}
            />
          </View>

          {/* Вес */}
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Вес (кг)</Text>
            <TextInput
              style={styles.input}
              placeholder="Вес"
              keyboardType="numeric"
              value={weight}
              onChangeText={setWeight}
            />
          </View>
        </View>

        <TouchableOpacity 
          style={styles.saveButton} 
          onPress={handleSave}
          disabled={isLoading}
        >
          <Text style={styles.saveButtonText}>
            {isLoading ? 'Сохранение...' : 'Сохранить'}
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f5f5f5' },
  scrollContainer: { padding: 20, paddingBottom: 40 },
  section: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 15,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#333',
  },
  inputGroup: {
    marginBottom: 15,
  },
  label: {
    fontSize: 14,
    color: '#666',
    marginBottom: 5,
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
    backgroundColor: '#fff',
    fontSize: 16,
  },
  genderToggleContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#eee',
    borderRadius: 10,
    overflow: 'hidden',
  },
  genderOption: {
    flex: 1,
    paddingVertical: 10,
    alignItems: 'center',
  },
  genderSelected: {
    backgroundColor: 'orange',
  },
  genderText: {
    fontSize: 16,
    color: '#333',
    fontWeight: '500',
  },
  genderTextSelected: {
    color: 'white',
    fontWeight: 'bold',
  },
  saveButton: {
    backgroundColor: 'orange',
    borderRadius: 10,
    padding: 15,
    alignItems: 'center',
  },
  saveButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '500',
  },
});

export default ParametersScreen;