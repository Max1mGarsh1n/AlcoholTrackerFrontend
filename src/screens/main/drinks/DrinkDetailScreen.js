import { View, Text, StyleSheet, ScrollView, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function DrinkDetailScreen({ route }) {
  const { drink } = route.params;

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <View style={styles.imagePlaceholder}>
          <Ionicons name="beer" size={80} color="gray" />
        </View>
        <Text style={styles.title}>{drink.name}</Text>
        <Text style={styles.subtitle}>{drink.type} • {drink.degree}</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Информация</Text>
        <View style={styles.infoRow}>
          <Text style={styles.infoLabel}>Тип:</Text>
          <Text style={styles.infoValue}>{drink.type}</Text>
        </View>
        <View style={styles.infoRow}>
          <Text style={styles.infoLabel}>Крепость:</Text>
          <Text style={styles.infoValue}>{drink.degree}</Text>
        </View>
        <View style={styles.infoRow}>
          <Text style={styles.infoLabel}>Описание:</Text>
          <Text style={styles.infoValue}>
            {drink.description || 'Описание напитка отсутствует'}
          </Text>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>История потребления</Text>
        <Text style={styles.emptyHistory}>История потребления отсутствует</Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212',
    padding: 20,
  },
  header: {
    alignItems: 'center',
    marginBottom: 30,
  },
  imagePlaceholder: {
    width: 150,
    height: 150,
    borderRadius: 75,
    backgroundColor: '#1e1e1e',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 15,
  },
  title: {
    color: 'white',
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  subtitle: {
    color: 'orange',
    fontSize: 16,
  },
  section: {
    marginBottom: 25,
  },
  sectionTitle: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#333',
    paddingBottom: 5,
  },
  infoRow: {
    flexDirection: 'row',
    marginBottom: 10,
  },
  infoLabel: {
    color: 'gray',
    width: 100,
    fontSize: 16,
  },
  infoValue: {
    color: 'white',
    flex: 1,
    fontSize: 16,
  },
  emptyHistory: {
    color: 'gray',
    textAlign: 'center',
    marginTop: 10,
    fontStyle: 'italic',
  },
});