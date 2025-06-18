import React, { useState, useRef } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Image, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const basicDrinks = [
  { id: '1', name: 'Пиво', type: 'Слабоалкогольные', degree: '4-6%', image: null },
  { id: '2', name: 'Вино', type: 'Среднеалкогольные', degree: '12-14%', image: null },
  { id: '3', name: 'Водка', type: 'Крепкие', degree: '40%', image: null },
  { id: '4', name: 'Виски', type: 'Крепкие', degree: '40-50%', image: null },
  { id: '5', name: 'Текила', type: 'Крепкие', degree: '38-40%', image: null },
  { id: '6', name: 'Ром', type: 'Крепкие', degree: '40-75%', image: null },
  { id: '7', name: 'Шампанское', type: 'Игристое', degree: '11-13%', image: null },
  { id: '8', name: 'Ликёр', type: 'Сладкие', degree: '15-30%', image: null },
  { id: '11', name: 'Пиво', type: 'Слабоалкогольные', degree: '4-6%', image: null },
  { id: '12', name: 'Вино', type: 'Среднеалкогольные', degree: '12-14%', image: null },
  { id: '13', name: 'Водка', type: 'Крепкие', degree: '40%', image: null },
  { id: '14', name: 'Виски', type: 'Крепкие', degree: '40-50%', image: null },
  { id: '15', name: 'Текила', type: 'Крепкие', degree: '38-40%', image: null },
  { id: '16', name: 'Ром', type: 'Крепкие', degree: '40-75%', image: null },
  { id: '17', name: 'Шампанское', type: 'Игристое', degree: '11-13%', image: null },
  { id: '18', name: 'Ликёр', type: 'Сладкие', degree: '15-30%', image: null },
];

export default function BasicDrinksScreen({ navigation }) {
  const [showScrollTop, setShowScrollTop] = useState(false);
  const scrollRef = useRef(null);

  const handleScroll = (event) => {
    const offsetY = event.nativeEvent.contentOffset.y;
    setShowScrollTop(offsetY > 300);
  };

  const scrollToTop = () => {
    scrollRef.current?.scrollToOffset({ offset: 0, animated: true });
  };

  const renderDrinkItem = ({ item }) => (
    <TouchableOpacity 
      style={styles.drinkCard}
      onPress={() => navigation.navigate('DrinkDetail', { drink: item })}
    >
      <View style={styles.drinkImagePlaceholder}>
        <Ionicons name="beer" size={40} color="gray" />
      </View>
      <Text style={styles.drinkName}>{item.name}</Text>
      <Text style={styles.drinkInfo}>{item.type} • {item.degree}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <FlatList
        ref={scrollRef}
        data={basicDrinks}
        renderItem={renderDrinkItem}
        keyExtractor={item => item.id}
        numColumns={2}
        contentContainerStyle={styles.listContent}
        onScroll={handleScroll}
        scrollEventThrottle={16}
      />
      
      {showScrollTop && (
        <TouchableOpacity style={styles.scrollTopButton} onPress={scrollToTop}>
          <Ionicons name="arrow-up" size={24} color="white" />
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212',
    padding: 10,
  },
  listContent: {
    paddingBottom: 20,
  },
  drinkCard: {
    flex: 1,
    margin: 8,
    backgroundColor: '#1e1e1e',
    borderRadius: 10,
    padding: 15,
    alignItems: 'center',
    justifyContent: 'center',
    aspectRatio: 1,
    maxWidth: '48%',
  },
  drinkImagePlaceholder: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#2a2a2a',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
  },
  drinkName: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 5,
  },
  drinkInfo: {
    color: 'gray',
    fontSize: 12,
    textAlign: 'center',
  },
  scrollTopButton: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: 'orange',
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 5,
  },
});