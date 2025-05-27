import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from '../screens/LoginScreen';
import UnRegisteredScreen from '../screens/UnRegisteredScreen'; 
import RegisteredScreen from '../screens/RegisteredScreen';
import DormRegisterScreen from '../screens/DormRegisterScreen';
import ContractsScreen from '../screens/ContractsScreen';
import ContractDetailScreen from '../screens/ContractDetail';
import ProfileScreen from '../screens/ProfileScreen';
import ChangePasswordScreen from '../screens/ChangePasswordScreen';
import SettingsScreen from '../screens/SettingsScreen';
import ProfileDetailScreen from '../screens/ProfileDetailScreen';
import RequestScreen from '../screens/RequestScreen'; 
import ForgotPasswordScreen from '../screens/ForgotPasswordScreen';
import ExtendContractScreen from '../screens/ExtendContractScreen';
import FlashMessage from 'react-native-flash-message';
import ContractPdfScreen from '../screens/ContractPdfScreen'; 
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
      <Stack.Screen name="ChangePassword" component={ChangePasswordScreen} options={{ headerShown: false }} />
      <Stack.Screen name="Settings" component={SettingsScreen} options={{ headerShown: false }} />
      <Stack.Screen name="ProfileDetail" component={ProfileDetailScreen} options={{ headerShown: false }} />
      <Stack.Screen name="Request" component={RequestScreen} options={{ headerShown: false }} />
      <Stack.Screen name="ForgotPassword" component={ForgotPasswordScreen} options={{ headerShown: false }} />
      <Stack.Screen name="ExtendContract" component={ExtendContractScreen} options={{ headerShown: false }} />
      <Stack.Screen name="ContractPdf" component={ContractPdfScreen} options={{ headerShown: false }} />
      {/* Add other screens here */}
    </Stack.Navigator>
  );
}