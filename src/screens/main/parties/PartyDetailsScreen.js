import { useEffect, useState } from 'react';
import { View, Text, ActivityIndicator } from 'react-native';
import styles from './PartyDetailsScreen.styles';
import { fetchPartyDetails } from '../../../api/partiesApi';

export default function PartyDetailsScreen({ route }) {
  const { partyId, userId } = route.params;

  const [party, setParty] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadPartyDetails = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await fetchPartyDetails(userId, partyId);
        setParty(data);
      } catch (err) {
        console.error('Ошибка загрузки деталей вечеринки:', err);
        setError('Ошибка загрузки данных');
      } finally {
        setLoading(false);
      }
    };

    loadPartyDetails();
  }, [partyId, userId]);

  if (loading) {
    return (
      <View style={[styles.container, styles.centeredContent]}>
        <ActivityIndicator size="large" color="#d3ae35" />
      </View>
    );
  }

  if (error || !party) {
    return (
      <View style={[styles.container, styles.centeredContent]}>
        <Text style={styles.errorText}>
          {error || 'Нет данных о вечеринке'}
        </Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.topContainer}>
        <Text style={styles.title}>Детали вечеринки</Text>

        <View style={styles.detailRow}>
          <Text style={styles.label}>Дата:</Text>
          <Text style={styles.value}>
            {new Date(party.date).toLocaleString('ru-RU', {
              day: 'numeric',
              month: 'long',
              year: 'numeric',
              hour: '2-digit',
              minute: '2-digit'
            })}
          </Text>
        </View>

        <View style={styles.detailRow}>
          <Text style={styles.label}>Место:</Text>
          <Text style={styles.value}>{party.place}</Text>
        </View>

        <View style={styles.detailRow}>
          <Text style={styles.label}>Сытость:</Text>
          <Text style={styles.value}>{party.satiety}</Text>
        </View>

        <View style={styles.detailRow}>
          <Text style={styles.label}>Вы водитель:</Text>
          <Text style={styles.value}>{party.isDriver ? 'Да' : 'Нет'}</Text>
        </View>

        <View style={styles.detailRow}>
          <Text style={styles.label}>Вы мать:</Text>
          <Text style={styles.value}>{party.isMother ? 'Да' : 'Нет'}</Text>
        </View>
      </View>
    </View>
  );
}
