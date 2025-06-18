import React, { useState, useRef } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const customDrinks = [
  { id: '1', name: 'Моя настойка', type: 'Домашние', degree: '30%', image: null },
  { id: '2', name: 'Летний коктейль', type: 'Коктейли', degree: '15%', image: null },
];

export default function CustomDrinksScreen({ navigation }) {
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [drinks, setDrinks] = useState(customDrinks);
  const scrollRef = useRef(null);

  const handleScroll = (event) => {
    const offsetY = event.nativeEvent.contentOffset.y;
    setShowScrollTop(offsetY > 300);
  };

  const scrollToTop = () => {
    scrollRef.current?.scrollToOffset({ offset: 0, animated: true });
  };

  const addNewDrink = () => {
    navigation.navigate('AddDrink');
  };

  const renderDrinkItem = ({ item }) => (
    <TouchableOpacity 
      style={styles.drinkCard}
      onPress={() => navigation.navigate('DrinkDetail', { drink: item })}
    >
      <View style={styles.drinkImagePlaceholder}>
        <Ionicons name="wine" size={40} color="gray" />
      </View>
      <Text style={styles.drinkName}>{item.name}</Text>
      <Text style={styles.drinkInfo}>{item.type} • {item.degree}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <FlatList
        ref={scrollRef}
        data={drinks}
        renderItem={renderDrinkItem}
        keyExtractor={item => item.id}
        numColumns={2}
        contentContainerStyle={styles.listContent}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Ionicons name="sad-outline" size={50} color="gray" />
            <Text style={styles.emptyText}>У вас пока нет своих напитков</Text>
            <Text style={styles.emptySubText}>Нажмите "+" чтобы добавить</Text>
          </View>
        }
        onScroll={handleScroll}
        scrollEventThrottle={16}
      />
      
      <TouchableOpacity style={styles.addButton} onPress={addNewDrink}>
        <Ionicons name="add" size={30} color="white" />
      </TouchableOpacity>
      
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
  addButton: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: 'orange',
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 5,
  },
  scrollTopButton: {
    position: 'absolute',
    bottom: 90,
    right: 25,
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#333',
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 5,
  },
  emptyContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 100,
  },
  emptyText: {
    color: 'gray',
    fontSize: 18,
    marginTop: 10,
  },
  emptySubText: {
    color: '#555',
    fontSize: 14,
    marginTop: 5,
  },
});