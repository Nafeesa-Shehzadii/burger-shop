import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ProductDetailsScreen from '../screens/productdetails';
import ReviewScreen from '../screens/review';
import DrawerNavigator from './DrawerNavigator';
import type { RootStackParamList } from './types';

const Stack = createNativeStackNavigator<RootStackParamList>();

const RootNavigator = () => {
  return (
    <Stack.Navigator
      initialRouteName="DrawerNav"
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="DrawerNav" component={DrawerNavigator} />
      <Stack.Screen name="ProductDetails" component={ProductDetailsScreen} />
      <Stack.Screen name="Review" component={ReviewScreen} />
    </Stack.Navigator>
  );
};

export default RootNavigator;
