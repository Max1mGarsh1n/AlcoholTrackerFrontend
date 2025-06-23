import { View, Text, ScrollView } from 'react-native';
import styles from './NewPartyScreen.styles'; // Можно использовать те же стили

export default function CalculationResultScreen({ route }) {
  const { request, result } = route.params;

  // Функция для расчёта (простой пример)
  const calculateAlcohol = (params) => {
    const { weight, personalConst, desiredPromille } = params;
    // Простая формула для примера (замените на вашу реальную логику)
    return (weight * desiredPromille * personalConst).toFixed(2);
  };

  const alcoholAmount = calculateAlcohol(request);

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.header}>Результаты расчёта</Text>

      <View style={styles.resultSection}>
        <Text style={styles.resultLabel}>Рекомендуемое количество алкоголя:</Text>
        <Text style={styles.resultValue}>{alcoholAmount} мл чистого спирта</Text>
      </View>

      <View style={styles.resultSection}>
        <Text style={styles.resultLabel}>Эквивалентно:</Text>
        <Text style={styles.resultValue}>
          ~{(alcoholAmount / 40).toFixed(1)} рюмок водки (40%)
        </Text>
        <Text style={styles.resultValue}>
          ~{(alcoholAmount / 12).toFixed(1)} бокалов вина (12%)
        </Text>
        <Text style={styles.resultValue}>
          ~{(alcoholAmount / 5).toFixed(1)} банок пива (5%)
        </Text>
      </View>

      <View style={styles.resultSection}>
        <Text style={styles.resultLabel}>Ваши параметры:</Text>
        <Text style={styles.resultText}>Вес: {request.weight} кг</Text>
        <Text style={styles.resultText}>Рост: {request.height} см</Text>
        <Text style={styles.resultText}>Возраст: {request.age} лет</Text>
        <Text style={styles.resultText}>
          Пол: {request.gender ? 'Мужской' : 'Женский'}
        </Text>
        <Text style={styles.resultText}>
          Желаемый уровень: {request.desiredPromille} ‰
        </Text>
      </View>
    </ScrollView>
  );
}