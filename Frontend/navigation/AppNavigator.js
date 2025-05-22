import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from '../screens/LoginScreen';
import UnRegisteredScreen from '../screens/UnRegisteredScreen'; //
import RegisteredScreen from '../screens/RegisteredScreen';
import DormRegisterScreen from '../screens/DormRegisterScreen';
import ContractsScreen from '../screens/ContractsScreen';
import ContractDetailScreen from '../screens/ContractDetail';
import ProfileScreen from '../screens/ProfileScreen';
const Stack = createStackNavigator();

export default function AppNavigator() {
  return (
    <Stack.Navigator initialRouteName="Login">
      <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
      <Stack.Screen name="UnRegistered" component={UnRegisteredScreen} options={{ headerShown: false }} />
      <Stack.Screen name="Registered" component={RegisteredScreen} options={{ headerShown: false }}/>
      <Stack.Screen name="DormRegister" component={DormRegisterScreen} options={{ headerShown: false }} />
      <Stack.Screen name="Contracts" component={ContractsScreen} options={{ headerShown: false }}/>
      <Stack.Screen name="ContractDetail" component={ContractDetailScreen} options={{ headerShown: false }} />
      <Stack.Screen name="Profile" component={ProfileScreen} options={{ headerShown: false }} />
      {/* Add other screens here */}
    </Stack.Navigator>
  );
}