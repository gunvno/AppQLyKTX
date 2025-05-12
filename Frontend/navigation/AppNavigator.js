import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from '../screens/LoginScreen';
import UnRegisteredScreen from '../screens/UnRegisteredScreen'; //
import RegisteredScreen from '../screens/RegisteredScreen';
import DormRegisterScreen from '../screens/DormRegisterScreen';
import ContractsScreen from '../screens/ContractsScreen';
import ContractDetailScreen from '../screens/ContractDetail';
const Stack = createStackNavigator();

export default function AppNavigator() {
  return (
    <Stack.Navigator initialRouteName="Login">
      <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
      <Stack.Screen name="UnRegistered" component={UnRegisteredScreen} />
      <Stack.Screen name="Registered" component={RegisteredScreen}/>
      <Stack.Screen name="DormRegister" component={DormRegisterScreen} />
      <Stack.Screen name="Contracts" component={ContractsScreen}/>
      <Stack.Screen name="ContractDetail" component={ContractDetailScreen} />
      {/* Add other screens here */}
    </Stack.Navigator>
  );
}