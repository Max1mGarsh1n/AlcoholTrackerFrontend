// src/screens/main/AddDrinkScreen.js
import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function AddDrinkScreen({ navigation }) {
  const [name, setName] = useState('');
  const [type, setType] = useState('');
  const [degree, setDegree] = useState('');
  const [description, setDescription] = useState('');

  const handleSave = () => {
    // Логика сохранения напитка
    console.log('Сохранение напитка:', { name, type, degree, description });
    navigation.goBack();
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.formGroup}>
        <Text style={styles.label}>Название напитка</Text>
        <TextInput
          style={styles.input}
          value={name}
          onChangeText={setName}
          placeholder="Введите название"
          placeholderTextColor="#555"
        />
      </View>

      <View style={styles.formGroup}>
        <Text style={styles.label}>Тип напитка</Text>
        <TextInput
          style={styles.input}
          value={type}
          onChangeText={setType}
          placeholder="Например: Крепкий, Слабоалкогольный"
          placeholderTextColor="#555"
        />
      </View>

      <View style={styles.formGroup}>
        <Text style={styles.label}>Крепость (%)</Text>
        <TextInput
          style={styles.input}
          value={degree}
          onChangeText={setDegree}
          placeholder="Введите крепость"
          placeholderTextColor="#555"
          keyboardType="numeric"
        />
      </View>

      <View style={styles.formGroup}>
        <Text style={styles.label}>Описание (необязательно)</Text>
        <TextInput
          style={[styles.input, styles.textArea]}
          value={description}
          onChangeText={setDescription}
          placeholder="Дополнительная информация о напитке"
          placeholderTextColor="#555"
          multiline
          numberOfLines={4}
        />
      </View>

      <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
        <Text style={styles.saveButtonText}>Сохранить напиток</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212',
    padding: 20,
  },
  formGroup: {
    marginBottom: 20,
  },
  label: {
    color: 'white',
    fontSize: 16,
    marginBottom: 8,
  },
  input: {
    backgroundColor: '#1e1e1e',
    color: 'white',
    borderRadius: 8,
    padding: 15,
    fontSize: 16,
  },
  textArea: {
    height: 120,
    textAlignVertical: 'top',
  },
  saveButton: {
    backgroundColor: 'orange',
    borderRadius: 8,
    padding: 15,
    alignItems: 'center',
    marginTop: 20,
  },
  saveButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
});