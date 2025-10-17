import React from 'react';
import { View, Text, TouchableOpacity, Image, StatusBar } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { AuthStackParamList } from '../../navigation/types';
import Icon from 'react-native-vector-icons/Ionicons';
import { styles } from './styles';

type NavigationProp = NativeStackNavigationProp<AuthStackParamList, 'Welcome'>;

const WelcomeScreen = () => {
  const navigation = useNavigation<NavigationProp>();

  return (
    <View style={styles.welcomeContainer}>
      <StatusBar barStyle="light-content" backgroundColor="#FF6B6B" />

      {/* Top Section */}
      <View style={styles.welcomeTopSection}>
        <Icon name="fast-food" size={100} color="#FFF" />
        <Text style={styles.welcomeTitle}>Burger Shop</Text>
        <Text style={styles.welcomeSubtitle}>
          Delicious burgers delivered to your door
        </Text>
      </View>

      {/* Bottom Section */}
      <View style={styles.welcomeBottomSection}>
        <TouchableOpacity
          style={styles.welcomePrimaryButton}
          onPress={() => navigation.navigate('Signup')}
        >
          <Text style={styles.welcomePrimaryButtonText}>Get Started</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.welcomeSecondaryButton}
          onPress={() => navigation.navigate('Login')}
        >
          <Text style={styles.welcomeSecondaryButtonText}>
            Already have an account?{' '}
            <Text style={styles.boldText}>Sign In</Text>
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default WelcomeScreen;
