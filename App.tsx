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
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import RootNavigator from './src/navigation/RootNavigator';
import { store } from './src/store';

function App() {
  useEffect(() => {
    // Configure Google Sign-In
    GoogleSignin.configure({
      webClientId:
        '222498009091-m111o3n54cm165bnp6ebn53fjllhku53.apps.googleusercontent.com', // From Firebase Console
      offlineAccess: true,
    });

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
