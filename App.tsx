/**
 * Burger Shop App
 * @format
 */

import 'react-native-gesture-handler';
import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Provider } from 'react-redux';
import BootSplash from 'react-native-bootsplash';
import RootNavigator from './src/navigation/RootNavigator';
import { store } from './src/store';

function App() {
  useEffect(() => {
    const timer = setTimeout(() => {
      BootSplash.hide({ fade: true });
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <Provider store={store}>
      <SafeAreaProvider>
        <NavigationContainer>
          <RootNavigator />
        </NavigationContainer>
      </SafeAreaProvider>
    </Provider>
  );
}

export default App;
