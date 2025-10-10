import React from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import { styles } from './styles';
type Props = {
  onGetStarted: () => void;
};

const SplashScreen = ({ onGetStarted }: Props) => {
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
      <TouchableOpacity style={styles.button} onPress={onGetStarted}>
        <Text style={styles.buttonText}>Get Started</Text>
      </TouchableOpacity>
    </View>
  );
};

export default SplashScreen;
