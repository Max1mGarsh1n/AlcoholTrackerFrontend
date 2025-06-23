import React, { useState, useRef, useEffect, useCallback } from 'react';
import { View, Text, FlatList, TouchableOpacity, ActivityIndicator, RefreshControl } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { fetchBasicDrinks } from '../../../api/drinksApi';
import { DRINK_STRENGTH_RU } from '../../../constants/DRINK_STRENGTH_RU';
import styles from './BasicDrinksScreen.styles';

export default function BasicDrinksScreen({ navigation }) {
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
      const data = await fetchBasicDrinks();
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

  const renderDrinkItem = ({ item }) => (
    <TouchableOpacity 
      style={styles.drinkCard}
      onPress={() => navigation.navigate('DrinkDetail', { drinkId: item.drinkId,  isCustom: false })}
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