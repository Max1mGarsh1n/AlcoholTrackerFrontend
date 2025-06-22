import { createStackNavigator } from '@react-navigation/stack';
import PartiesScreen from '../screens/main/parties/PartiesScreen';
import FeedbackScreen from '../screens/main/parties/FeedbackScreen';
import NewPartyScreen from '../screens/main/parties/NewPartyScreen';
import PartyDetailsScreen from '../screens/main/parties/PartyDetailsScreen';

const Stack = createStackNavigator();

export default function PartiesStackNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen 
        name="PartiesMain" 
        component={PartiesScreen} 
        options={{ headerShown: false }} 
      />
      <Stack.Screen 
        name="Feedback" 
        component={FeedbackScreen} 
        options={{ title: 'Оставить отзыв' }} 
      />
      <Stack.Screen 
        name="NewParty" 
        component={NewPartyScreen} 
        options={{ title: 'Новая вечеринка' }} 
      />
      <Stack.Screen 
        name="PartyDetails" 
        component={PartyDetailsScreen} 
        options={{ title: 'Детали вечеринки' }} 
      />
    </Stack.Navigator>
  );
}