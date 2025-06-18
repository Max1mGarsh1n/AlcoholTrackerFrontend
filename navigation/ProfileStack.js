import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import ProfileScreen from '../src/screens/main/profile/ProfileScreen';
import AccountDataScreen from '../src/screens/main/profile/AccountDataScreen';
import ParametersScreen from '../src/screens/main/profile/ParametersScreen'; 

const Stack = createStackNavigator();

export default function ProfileStackNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen 
        name="ProfileMain" 
        component={ProfileScreen} 
        options={{ headerShown: false }} 
      />
      <Stack.Screen 
        name="AccountDataScreen" 
        component={AccountDataScreen} 
        options={{ title: 'Данные аккаунта' }} 
      />
      <Stack.Screen 
        name="ParametersScreen" 
        component={ParametersScreen} 
        options={{ title: 'Параметры' }} 
      />
    </Stack.Navigator>
  );
}