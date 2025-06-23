import styles from './PartiesScreen.styles';
import { useState, useEffect, useCallback } from 'react';
import { useIsFocused, useNavigation } from '@react-navigation/native';
import { View, Text, TouchableOpacity, FlatList, ActivityIndicator, RefreshControl } from 'react-native';
import { fetchParties } from '../../../api/partiesApi';
import { getStoredUserData } from '../../../utils/storage';

export default function PartiesScreen() {
  const navigation = useNavigation();
  const isFocused = useIsFocused();
  const [parties, setParties] = useState([]);
  const [userId, setUserId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState(null);

  const loadParties = async (isRefresh = false) => {
    try {
      if (!isRefresh) setLoading(true);
      setError(null);

      const userInfo = await getStoredUserData();
      const data = await fetchParties();

      if (!Array.isArray(data)) throw new Error('Некорректный формат данных');

      setUserId(userInfo.userId);
      setParties(data);
    } catch (err) {
      console.error('Load parties error:', err);
      setError(err.message || 'Ошибка загрузки данных');
    } finally {
      if (isRefresh) setRefreshing(false);
      else setLoading(false);
    }
  };

  useEffect(() => {
    if (isFocused) loadParties();
  }, [isFocused]);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    loadParties(true);
  }, []);

  const renderPartyItem = ({ item }) => {
  const handlePress = async () => {
    try {
      const userInfo = await getStoredUserData();
      const currentUserId = item.userId || userInfo.userId;
      
      if (!currentUserId) {
        throw new Error('Не удалось определить ID пользователя');
      }

      navigation.navigate({
        name: 'PartyDetails',
        params: {
          partyId: item.partyId,
          userId: currentUserId,
          uniqueKey: `${item.partyId}_${Date.now()}`
        },
        key: `${item.partyId}_${Date.now()}`
      });
    } catch (err) {
      console.error('Navigation error:', err);
    }
  };

  return (
      <TouchableOpacity style={styles.partyItem} onPress={handlePress}>
        <Text style={styles.partyDate}>
          {new Date(item.date).toLocaleDateString('ru-RU', {
            day: 'numeric',
            month: 'long',
            year: 'numeric',
          })}
        </Text>
        <Text style={styles.partyDescription}>{item.place}</Text>
      </TouchableOpacity>
    );
  };

  if (loading) {
    return (
      <View style={[styles.container, styles.centeredContent]}>
        <ActivityIndicator size="large" color="#d3ae35" />
      </View>
    );
  }

  if (error) {
    return (
      <View style={[styles.container, styles.centeredContent]}>
        <Text style={styles.errorText}>{error}</Text>
        <TouchableOpacity style={styles.retryButton} onPress={() => loadParties()}>
          <Text style={styles.retryButtonText}>Попробовать снова</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {/* Верхняя часть, которая центрирует кнопку */}
      <View style={styles.topContainer}>
        <TouchableOpacity
          style={styles.newPartyButton}
          onPress={() => navigation.navigate('NewParty')}
        >
          <Text style={styles.buttonText}>Создать новое застолье</Text>
        </TouchableOpacity>
      </View>

      {/* Нижняя часть с историей фиксированной высоты */}
      <View style={styles.historyContainer}>
        <Text style={styles.historyTitle}>История застолий</Text>
        {parties.length > 0 ? (
          <FlatList
            data={parties}
            renderItem={renderPartyItem}
            keyExtractor={(item) => item.partyId.toString()}
            refreshControl={
              <RefreshControl
                refreshing={refreshing}
                onRefresh={onRefresh}
                colors={['#d3ae35']}
                tintColor="#d3ae35"
              />
            }
            contentContainerStyle={{ paddingBottom: 20 }}
          />
        ) : (
          <Text style={styles.emptyText}>
            У вас пока нет сохранённых застолий
          </Text>
        )}
      </View>
    </View>
  );
}