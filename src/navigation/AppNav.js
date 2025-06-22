import { View, Text } from 'react-native'
import React, { useContext } from 'react'
import AuthStack from './AuthStack'
import MainTabNavigator from './MainTabNavigator'
import { NavigationContainer } from '@react-navigation/native'
import { AuthContext } from '../context/AuthContext'

const AppNav = () => {
  const {isLoading, userToken} = useContext(AuthContext);

  if ( isLoading ) {
    <View>
        <Text>
            Загрузка
        </Text>
    </View>
  }

  return (
    <NavigationContainer>
        {userToken !== null ? <MainTabNavigator/> : <AuthStack />}
    </NavigationContainer>
  )
}

export default AppNav;