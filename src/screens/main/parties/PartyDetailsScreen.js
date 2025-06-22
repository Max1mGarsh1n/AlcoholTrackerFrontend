import { View, Text } from 'react-native';
import styles from './PartiesScreen.styles';

export default function PartyDetailsScreen({ route }) {
  const { partyId } = route.params;
  
  return (
    <View style={styles.container}>
      <Text>Детали вечеринки {partyId}</Text>
    </View>
  );
}