import { View, Text, ScrollView, ActivityIndicator, TextInput, TouchableOpacity  } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useEffect, useState } from 'react';
import { getDrinkDetails, updateDrinkDetails } from '../../../api/drinksApi';
import { DRINK_STRENGTH_RU } from '../../../constants/DRINK_STRENGTH_RU';
import styles from './DrinkDetailScreen.styles'; 

export default function DrinkDetailScreen({ route }) {
  const { drinkId, isCustom } = route.params;

  const [drink, setDrink] = useState(null);
  const [loading, setLoading] = useState(true);

  const [name, setName] = useState('');
  const [degree, setDegree] = useState('');
  const [info, setInfo] = useState('');

  useEffect(() => {
    const loadDrink = async () => {
      try {
        setLoading(true);
        const data = await getDrinkDetails(drinkId);
        setDrink(data);
        setName(data.name);
        setDegree(data.degree.toString());
        setInfo(data.info || '');
      } catch (error) {
        console.error('Ошибка загрузки напитка:', error);
      } finally {
        setLoading(false);
      }
    };

    loadDrink();
  }, [drinkId]);

  if (loading || !drink) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color="#d3ae35" />
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <View style={styles.imagePlaceholder}>
          <Ionicons name="beer" size={80} color="gray" />
        </View>
        <Text style={styles.title}>{drink.name}</Text>
        <Text style={styles.subtitle}>
          {DRINK_STRENGTH_RU[drink.type] || drink.type} • {drink.degree}%
        </Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Информация</Text>

        <Text style={styles.infoLabel}>Название</Text>
        <TextInput
          style={styles.input}
          value={name}
          onChangeText={setName}
          editable={isCustom}
        />

        <Text style={styles.infoLabel}>Крепость (%)</Text>
        <TextInput
          style={styles.input}
          value={degree}
          onChangeText={setDegree}
          keyboardType="numeric"
          editable={isCustom}
        />

        <Text style={styles.infoLabel}>Описание</Text>
        <TextInput
          style={[styles.input, { height: 100 }]}
          value={info}
          onChangeText={setInfo}
          multiline
          editable={isCustom}
        />

        {isCustom && (
          <TouchableOpacity
            style={styles.saveButton}
            onPress={() => {
              // TODO: Добавьте функцию обновления напитка
            }}
          >
            <Text style={styles.saveButtonText}>Сохранить</Text>
          </TouchableOpacity>
        )}
      </View>
    </ScrollView>
  );
};