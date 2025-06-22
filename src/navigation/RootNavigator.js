import React, { useContext } from 'react';
import { View, ActivityIndicator } from 'react-native';
import AuthNavigator from './AuthNavigator';
import MainTabNavigator from './MainTabNavigator';
import { AuthContext } from '../context/AuthContext';

const RootNavigator = () => {
  const { isAuthenticated, isLoading } = useContext(AuthContext);

  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return isAuthenticated ? <MainTabNavigator /> : <AuthNavigator />;
};

export default RootNavigator;
