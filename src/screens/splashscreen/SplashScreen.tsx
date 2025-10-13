import React from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../../navigation/types';
import { styles } from './styles';

type NavigationProp = NativeStackNavigationProp<RootStackParamList, 'Splash'>;

const SplashScreen = () => {
  const navigation = useNavigation<NavigationProp>();

  const handleGetStarted = () => {
    navigation.replace('DrawerNav');
  };
  return (
    <View style={styles.container}>
      {/* Food Image Circle */}
      <View style={styles.imageContainer}>
        <View style={styles.imagePlaceholder}>
          <Image
            source={require('../../assets/Burger.jpg')}
            style={styles.imagePlaceholderText}
            resizeMode="cover"
          />
        </View>
      </View>

      {/* Title Text */}
      <Text style={styles.title}>Enjoy</Text>
      <Text style={styles.title}>Your Food</Text>

      {/* Get Started Button */}
      <TouchableOpacity style={styles.button} onPress={handleGetStarted}>
        <Text style={styles.buttonText}>Get Started</Text>
      </TouchableOpacity>
    </View>
  );
};

export default SplashScreen;
