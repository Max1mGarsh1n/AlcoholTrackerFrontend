import { useState } from 'react';
import { View, ScrollView, Text, TextInput, TouchableOpacity, Switch } from 'react-native';
import styles from './NewPartyScreen.styles';

export default function NewPartyScreen({ navigation }) {
  const [request, setRequest] = useState({
    weight: '',
    age: '',
    gender: true, // true = male, false = female
    height: '',
    personalConst: '0.7', // Default for male
    desiredPromille: '0.5' // Default desired level
  });

  const handleInputChange = (field, value) => {
    setRequest(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleGenderChange = (value) => {
    const newGender = !request.gender;
    handleInputChange('gender', newGender);
    // Update personalConst based on gender
    handleInputChange('personalConst', newGender ? '0.7' : '0.6');
  };

  const calculate = () => {
    // Validate inputs
    if (!request.weight || !request.age || !request.height) {
      alert('Пожалуйста, заполните все обязательные поля');
      return;
    }

    navigation.navigate('CalculationResult', {
      request: {
        ...request,
        weight: parseFloat(request.weight),
        age: parseInt(request.age),
        height: parseFloat(request.height),
        personalConst: parseFloat(request.personalConst),
        desiredPromille: parseFloat(request.desiredPromille)
      }
    });
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.header}>Расчёт алкоголя</Text>

      <Text style={styles.sectionTitle}>Основные параметры</Text>
      
      <View style={styles.inputGroup}>
        <Text style={styles.label}>Вес (кг)*</Text>
        <TextInput
          style={styles.input}
          keyboardType="numeric"
          value={request.weight}
          onChangeText={(text) => handleInputChange('weight', text)}
          placeholder="Например: 70"
        />
      </View>

      <View style={styles.inputGroup}>
        <Text style={styles.label}>Рост (см)*</Text>
        <TextInput
          style={styles.input}
          keyboardType="numeric"
          value={request.height}
          onChangeText={(text) => handleInputChange('height', text)}
          placeholder="Например: 175"
        />
      </View>

      <View style={styles.inputGroup}>
        <Text style={styles.label}>Возраст*</Text>
        <TextInput
          style={styles.input}
          keyboardType="numeric"
          value={request.age}
          onChangeText={(text) => handleInputChange('age', text)}
          placeholder="Например: 30"
        />
      </View>

      <View style={styles.inputGroup}>
        <Text style={styles.label}>Пол</Text>
        <View style={styles.switchContainer}>
          <Text style={styles.switchLabel}>{request.gender ? 'Мужской' : 'Женский'}</Text>
          <Switch
            value={request.gender}
            onValueChange={handleGenderChange}
            thumbColor="#4a90e2"
            trackColor={{ false: '#767577', true: '#81b0ff' }}
          />
        </View>
      </View>

      <View style={styles.inputGroup}>
        <Text style={styles.label}>Персональная константа</Text>
        <TextInput
          style={styles.input}
          keyboardType="numeric"
          value={request.personalConst}
          onChangeText={(text) => handleInputChange('personalConst', text)}
          editable={false}
        />
        <Text style={styles.hintText}>
          {request.gender 
            ? '0.7 - стандарт для мужчин' 
            : '0.6 - стандарт для женщин'}
        </Text>
      </View>

      <View style={styles.inputGroup}>
        <Text style={styles.label}>Желаемый уровень промилле</Text>
        <TextInput
          style={styles.input}
          keyboardType="numeric"
          value={request.desiredPromille}
          onChangeText={(text) => handleInputChange('desiredPromille', text)}
        />
        <Text style={styles.hintText}>
          Рекомендуется не более 0.5 промилле
        </Text>
      </View>

      <TouchableOpacity style={styles.calculateButton} onPress={calculate}>
        <Text style={styles.calculateButtonText}>Рассчитать</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}