/**
 * Burger Shop App
 * @format
 */

import React, { useState } from 'react';
import { StatusBar, View } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import SplashScreen from './src/screens/splashscreen/SplashScreen';
import MenuScreen from './src/screens/menuscreen/index';
import ProductDetailsScreen from './src/screens/productdetails/index';
import CartScreen from './src/screens/cartscreen/index';
import BottomNav from './src/components/bottomNavigation';

type Screen =
  | 'splash'
  | 'menu'
  | 'productDetails'
  | 'cart'
  | 'search'
  | 'profile';
type Tab = 'home' | 'search' | 'cart' | 'profile';

function App() {
  const [currentScreen, setCurrentScreen] = useState<Screen>('splash');
  const [activeTab, setActiveTab] = useState<Tab>('home');

  const handleGetStarted = () => {
    setCurrentScreen('menu');
  };

  const handleProductPress = () => {
    setCurrentScreen('productDetails');
  };

  const handleGoBack = () => {
    setCurrentScreen('menu');
    setActiveTab('home');
  };

  const handleTabPress = (tab: Tab) => {
    setActiveTab(tab);
    switch (tab) {
      case 'home':
        setCurrentScreen('menu');
        break;
      case 'cart':
        setCurrentScreen('cart');
        break;
      case 'search':
        setCurrentScreen('search');
        break;
      case 'profile':
        setCurrentScreen('profile');
        break;
    }
  };

  const showBottomNav =
    currentScreen !== 'splash' && currentScreen !== 'productDetails';

  const renderScreen = () => {
    switch (currentScreen) {
      case 'splash':
        return <SplashScreen onGetStarted={handleGetStarted} />;
      case 'menu':
        return <MenuScreen onProductPress={handleProductPress} />;
      case 'productDetails':
        return <ProductDetailsScreen navigation={{ goBack: handleGoBack }} />;
      case 'cart':
        return <CartScreen />;
      case 'search':
        return <MenuScreen onProductPress={handleProductPress} />;
      case 'profile':
        return <MenuScreen onProductPress={handleProductPress} />;
      default:
        return <SplashScreen onGetStarted={handleGetStarted} />;
    }
  };

  return (
    <SafeAreaProvider>
      <StatusBar
        barStyle={
          currentScreen === 'splash' || currentScreen === 'productDetails'
            ? 'light-content'
            : 'dark-content'
        }
        backgroundColor={
          currentScreen === 'splash' || currentScreen === 'productDetails'
            ? '#3D5CFF'
            : '#FFFFFF'
        }
      />
      <View style={{ flex: 1 }}>
        {renderScreen()}
        {showBottomNav && (
          <BottomNav
            activeTab={activeTab}
            onTabPress={handleTabPress}
            cartCount={2}
          />
        )}
      </View>
    </SafeAreaProvider>
  );
}

export default App;
