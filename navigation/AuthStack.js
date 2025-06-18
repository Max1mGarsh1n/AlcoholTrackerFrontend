import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from '../src/screens/auth/LoginScreen';
import RegisterScreen from '../src/screens/auth/RegisterScreen';
import MainTabNavigator from './MainTabNavigator';

const Stack = createStackNavigator();

// export default function AuthStack() {
//   return (
//     <Stack.Navigator screenOptions={{ 
//         headerShown: false,
//         gestureEnabled: false
//       }}>
//       <Stack.Screen name="Login" component={LoginScreen} />
//       <Stack.Screen name="Register" component={RegisterScreen} />
//       <Stack.Screen name="Main" component={MainTabNavigator} />
//     </Stack.Navigator>
//   );
// }

export default function AuthStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Register" component={RegisterScreen} />
    </Stack.Navigator>
  );
}