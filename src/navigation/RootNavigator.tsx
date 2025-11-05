import React, { useEffect } from 'react';
import { ActivityIndicator, View, StyleSheet } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ProductDetailsScreen from '../screens/productdetails';
import ReviewScreen from '../screens/review';
import OrderHistoryScreen from '../screens/orderhistory';
import DrawerNavigator from './DrawerNavigator';
import AuthNavigator from './authNavigator';
import type { RootStackParamList } from './types';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { restoreAuthFromStorage } from '../store/authSlice';

const Stack = createNativeStackNavigator<RootStackParamList>();

const RootNavigator = () => {
  const dispatch = useAppDispatch();
  const { isAuthenticated, isLoading } = useAppSelector(state => state.auth);

  useEffect(() => {
    dispatch(restoreAuthFromStorage());
  }, [dispatch]);

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#FF6B6B" />
      </View>
    );
  }

  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      {!isAuthenticated ? (
        <Stack.Screen name="Auth" component={AuthNavigator} />
      ) : (
        <>
          <Stack.Screen name="DrawerNav" component={DrawerNavigator} />
          <Stack.Screen
            name="ProductDetails"
            component={ProductDetailsScreen}
          />
          <Stack.Screen name="Review" component={ReviewScreen} />
          <Stack.Screen name="OrderHistory" component={OrderHistoryScreen} />
        </>
      )}
    </Stack.Navigator>
  );
};

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFF',
  },
});

export default RootNavigator;
