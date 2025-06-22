import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { AuthProvider } from './context/AuthContext';

const Stack = createNativeStackNavigator();

// export default function App() {
//   return (
//     <NavigationContainer>
//       <Stack.Navigator screenOptions={{ headerShown: false }}>
//         <Stack.Screen name="Auth" component={AuthStack} />
//         <Stack.Screen name="Main" component={MainTabNavigator} />
//       </Stack.Navigator>
//     </NavigationContainer>
//   );
// }
import AppNav from './navigation/AppNav';

export default function App() {
  return (
    <AuthProvider>
      <AppNav/>
    </AuthProvider>
  );
}