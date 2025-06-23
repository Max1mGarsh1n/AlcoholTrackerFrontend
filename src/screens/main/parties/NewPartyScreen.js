import { useState } from 'react';
import { View, ScrollView, Text, TouchableOpacity } from 'react-native';
import styles from './NewPartyScreen.styles';

export default function NewPartyScreen({ navigation }) {
  // Данные с бэка (заглушка)
  const [userData, setUserData] = useState({
    weight: 75,
    age: 30,
    gender: 'male',
    height: 180
  });

  const [request, setRequest] = useState({
    hungerLevel: 'normal', // hungry, normal, full
    isDriver: false,
    isMother: false,
    desiredPromille: '0.5'
  });

  const handleInputChange = (field, value) => {
    setRequest(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const calculate = () => {
    navigation.replace('CalculationResult', {
      request: {
        ...userData,
        ...request,
        desiredPromille: parseFloat(request.desiredPromille)
      }
    });
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
      <Text style={styles.header}>Расчёт алкоголя</Text>

      <View style={styles.userDataContainer}>
        <Text style={styles.sectionTitle}>Ваши данные</Text>
        <View style={styles.userDataRow}>
          <Text style={styles.userDataLabel}>Вес:</Text>
          <Text style={styles.userDataValue}>{userData.weight} кг</Text>
        </View>
        <View style={styles.userDataRow}>
          <Text style={styles.userDataLabel}>Рост:</Text>
          <Text style={styles.userDataValue}>{userData.height} см</Text>
        </View>
        <View style={styles.userDataRow}>
          <Text style={styles.userDataLabel}>Возраст:</Text>
          <Text style={styles.userDataValue}>{userData.age} лет</Text>
        </View>
        <View style={styles.userDataRow}>
          <Text style={styles.userDataLabel}>Пол:</Text>
          <Text style={styles.userDataValue}>
            {userData.gender === 'male' ? 'Мужской' : 'Женский'}
          </Text>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Уровень сытости</Text>
        <View style={styles.hungerLevelContainer}>
          {['hungry', 'normal', 'full'].map(level => (
            <TouchableOpacity
              key={level}
              style={[
                styles.hungerLevelButton,
                request.hungerLevel === level && styles.hungerLevelButtonSelected
              ]}
              onPress={() => handleInputChange('hungerLevel', level)}
            >
              <Text style={[
                styles.hungerLevelText,
                request.hungerLevel === level && styles.hungerLevelTextSelected
              ]}>
                {level === 'hungry' ? 'Голоден' : 
                 level === 'normal' ? 'Поел бы' : 'Сыт'}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Особые условия</Text>
        <View style={styles.specialConditionsContainer}>
          <TouchableOpacity
            style={[
              styles.specialConditionButton,
              request.isDriver && styles.specialConditionButtonSelected
            ]}
            onPress={() => handleInputChange('isDriver', !request.isDriver)}
          >
            <Text style={[
              styles.specialConditionText,
              request.isDriver && styles.specialConditionTextSelected
            ]}>
              Я водитель
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.specialConditionButton,
              request.isMother && styles.specialConditionButtonSelected
            ]}
            onPress={() => handleInputChange('isMother', !request.isMother)}
          >
            <Text style={[
              styles.specialConditionText,
              request.isMother && styles.specialConditionButtonSelected
            ]}>
              Я мать
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Желаемый уровень промилле</Text>
        <View style={styles.promilleContainer}>
          {['0.3', '0.5', '0.7'].map(promille => (
            <TouchableOpacity
              key={promille}
              style={[
                styles.promilleButton,
                request.desiredPromille === promille && styles.promilleButtonSelected
              ]}
              onPress={() => handleInputChange('desiredPromille', promille)}
            >
              <Text style={[
                styles.promilleText,
                request.desiredPromille === promille && styles.promilleTextSelected
              ]}>
                {promille}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
        <Text style={styles.hintText}>Рекомендуется не более 0.5 промилле</Text>
      </View>

      <TouchableOpacity style={styles.calculateButton} onPress={calculate}>
        <Text style={styles.calculateButtonText}>Рассчитать</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}