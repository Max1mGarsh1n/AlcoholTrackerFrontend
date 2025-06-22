import styles from './PartiesScreen.styles';
import { useState, useEffect } from 'react';
import { useIsFocused } from '@react-navigation/native';
import { View, Text, TouchableOpacity, ScrollView, FlatList, ActivityIndicator } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { fetchParties } from '../../../api/partiesApi';
import * as SecureStore from 'expo-secure-store';

export default function PartiesScreen() {
  const navigation = useNavigation();
  const isFocused = useIsFocused();
  const [userId, setUserId] = useState(null);
  const [parties, setParties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const loadParties = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const data = await fetchParties();
      console.log('Loaded parties:', data);
      
      if (!Array.isArray(data)) {
        throw new Error('Некорректный формат данных');
      }
      
      setParties(data);
    } catch (err) {
      console.error('Load parties error:', err);
      setError(err.message || 'Ошибка загрузки данных');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isFocused) {
      loadParties();
    }
  }, [isFocused]);

  const renderPartyItem = ({ item }) => (
    <TouchableOpacity 
      style={styles.partyItem}
      onPress={() => navigation.navigate('PartyDetailsScreen', { 
        partyId: item.partyId,
        userId: user.userId
      })}
    >
      <Text style={styles.partyDate}>
        {new Date(item.date).toLocaleDateString('ru-RU', {
          day: 'numeric',
          month: 'long',
          year: 'numeric'
        })}
      </Text>
      <Text style={styles.partyDescription}>{item.place}</Text>
    </TouchableOpacity>
  );

  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>{error}</Text>
        <TouchableOpacity 
          style={styles.retryButton}
           onPress={loadParties}
        >
          <Text>Попробовать снова</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <ScrollView>
        <TouchableOpacity 
          style={styles.newPartyButton}
          onPress={() => navigation.navigate('NewParty')}
        >
          <Text style={styles.buttonText}>Создать новое застолье</Text>
        </TouchableOpacity>

        <Text style={styles.historyTitle}>История застолий</Text>
        
        {parties.length > 0 ? (
          <FlatList
            data={parties}
            renderItem={renderPartyItem}
            keyExtractor={item => item.partyId.toString()}
            scrollEnabled={false}
          />
        ) : (
          <Text style={styles.emptyText}>У вас пока нет сохранённых застолий</Text>
        )}
      </ScrollView>
    </View>
  );
}