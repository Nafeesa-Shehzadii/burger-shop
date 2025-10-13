import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MenuScreen from '../screens/menuscreen';
import CartScreen from '../screens/cartscreen';
import BottomNav from '../components/bottomNavigation';
import type { MainTabParamList } from './types';

const Tab = createBottomTabNavigator<MainTabParamList>();

const BottomTabNavigator = () => {
  return (
    <Tab.Navigator
      tabBar={(props) => {
        const activeRoute = props.state.routes[props.state.index].name;
        const activeTab = activeRoute.toLowerCase() as 'home' | 'search' | 'cart' | 'profile';
        
        // Count cart items (you can pass this as context or props later)
        const cartCount = 2;

        return (
          <BottomNav
            activeTab={activeTab}
            onTabPress={(tab) => {
              const routeMap: Record<string, keyof MainTabParamList> = {
                home: 'Home',
                search: 'Search',
                cart: 'Cart',
                profile: 'Profile',
              };
              const routeName = routeMap[tab];
              if (routeName) {
                props.navigation.navigate(routeName);
              }
            }}
            cartCount={cartCount}
          />
        );
      }}
      screenOptions={{
        headerShown: false,
      }}
    >
      <Tab.Screen name="Home" component={MenuScreen} />
      <Tab.Screen name="Search" component={MenuScreen} />
      <Tab.Screen name="Cart" component={CartScreen} />
      <Tab.Screen name="Profile" component={MenuScreen} />
    </Tab.Navigator>
  );
};

export default BottomTabNavigator;
