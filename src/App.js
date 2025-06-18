// import { NavigationContainer } from '@react-navigation/native';
// import { createStackNavigator } from '@react-navigation/stack';
// import AuthSwitcher from '../navigation/AuthSwitcher';
// import MainTabNavigator from '../navigation/MainTabNavigator';

// const Stack = createStackNavigator();

// export default function App() {
//   return (
//     <NavigationContainer>
//       <Stack.Navigator 
//         screenOptions={{ 
//           headerShown: false,
//           animationEnabled: false
//         }}
//       >
//         <Stack.Screen name="Auth" component={AuthSwitcher} />
//         <Stack.Screen name="Main" component={MainTabNavigator} />
//       </Stack.Navigator>
//     </NavigationContainer>
//   );
// }

// import { NavigationContainer } from '@react-navigation/native';
// import AuthStack from '../navigation/AuthStack';
// import MainApp from '../navigation/MainApp';
// import { useState, useEffect } from 'react';
// import * as SecureStore from 'expo-secure-store';

// export default function App() {
//   const [isAuthenticated, setIsAuthenticated] = useState(false);
//   const [isLoading, setIsLoading] = useState(true);

//   // Проверка токена при запуске
//   useEffect(() => {
//     const checkAuth = async () => {
//       const token = await SecureStore.getItemAsync('authToken');
//       setIsAuthenticated(!!token);
//       setIsLoading(false);
//     };
//     checkAuth();
//   }, []);

//   if (isLoading) return null; // Или экран загрузки

//   return (
//     <NavigationContainer>
//       {isAuthenticated ? <MainApp /> : <AuthStack />}
//     </NavigationContainer>
//   );
// }


import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AuthStack from '../navigation/AuthStack';
import MainTabNavigator from '../navigation/MainTabNavigator';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Auth" component={AuthStack} />
        <Stack.Screen name="Main" component={MainTabNavigator} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}