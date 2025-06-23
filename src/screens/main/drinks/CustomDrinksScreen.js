import React, { useState, useRef, useEffect, useCallback } from 'react';
import { View, Text, FlatList, TouchableOpacity, ActivityIndicator, RefreshControl } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { fetchUserDrinks } from '../../../api/drinksApi';
import { DRINK_STRENGTH_RU } from '../../../constants/DRINK_STRENGTH_RU';
import styles from './CustomDrinksScreen.styles';

export default function CustomDrinksScreen({ navigation }) {
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [drinks, setDrinks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [refreshing, setRefreshing] = useState(false);
  const scrollRef = useRef(null);

  const loadDrinks = useCallback(async (isRefresh = false) => {
    try {
      if (!isRefresh) setLoading(true);
      setError(null);
      const data = await fetchUserDrinks();
      setDrinks(data);
    } catch (err) {
      console.error('Load drinks error:', err);
      setError(err.message || 'Ошибка загрузки напитков');
    } finally {
      if (isRefresh) setRefreshing(false);
      else setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadDrinks();
  }, [loadDrinks]);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    loadDrinks(true);
  }, [loadDrinks]);

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
      onPress={() => navigation.navigate('DrinkDetail', { drinkId: item.drinkId,  isCustom: true })}
    >
      <View style={styles.drinkImagePlaceholder}>
        <Ionicons name="beer" size={40} color="gray" />
      </View>
      <Text style={styles.drinkName}>{item.drinkName}</Text>
      <Text style={styles.drinkInfo}>
        {DRINK_STRENGTH_RU[item.type] || item.type} • {item.degree}%
      </Text>
    </TouchableOpacity>
  );

  if (loading && !refreshing) {
    return (
      <View style={[styles.container, styles.centered]}>
        <ActivityIndicator size="large" color="#d3ae35" />
      </View>
    );
  }

  if (error) {
    return (
      <View style={[styles.container, styles.centered]}>
        <Text style={styles.errorText}>{error}</Text>
        <TouchableOpacity style={styles.retryButton} onPress={() => loadDrinks()}>
          <Text style={styles.retryButtonText}>Попробовать снова</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        ref={scrollRef}
        data={drinks}
        renderItem={renderDrinkItem}
        keyExtractor={item => item.drinkId.toString()}
        numColumns={2}
        contentContainerStyle={styles.listContent}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            colors={['#d3ae35']}
            tintColor="#d3ae35"
          />
        }
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