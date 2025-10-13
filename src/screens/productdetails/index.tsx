import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../../navigation/types';
import { styles } from './styles';

type AddOn = {
  id: string;
  name: string;
  emoji: string;
  selected: boolean;
};

type NavigationProp = NativeStackNavigationProp<RootStackParamList, 'ProductDetails'>;

const ProductDetailsScreen = () => {
  const navigation = useNavigation<NavigationProp>();
  const [quantity, setQuantity] = useState(1);
  const [addOns, setAddOns] = useState<AddOn[]>([
    { id: '1', name: 'Pepper Julienned', emoji: '🌶️', selected: false },
    { id: '2', name: 'Baby Spinach', emoji: '🥬', selected: false },
    { id: '3', name: 'Masroom', emoji: '🍄', selected: false },
  ]);

  const productPrice = 20;

  const toggleAddOn = (id: string) => {
    setAddOns(
      addOns.map(addon =>
        addon.id === id ? { ...addon, selected: !addon.selected } : addon,
      ),
    );
  };

  const incrementQuantity = () => setQuantity(quantity + 1);
  const decrementQuantity = () => {
    if (quantity > 1) setQuantity(quantity - 1);
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Text style={styles.backButtonText}>←</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.favoriteButton}>
          <Text style={styles.favoriteIcon}>🤍</Text>
        </TouchableOpacity>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Product Image */}
        <View style={styles.imageContainer}>
          <View style={styles.imagePlaceholder}>
            <Text style={styles.productEmoji}>🍔</Text>
          </View>
        </View>

        {/* Product Info */}
        <View style={styles.contentContainer}>
          {/* Rating Badge */}
          <View style={styles.ratingContainer}>
            <View style={styles.ratingBadge}>
              <Text style={styles.ratingText}>⭐ 4.8</Text>
            </View>
          </View>

          {/* Title and Price */}
          <Text style={styles.productTitle}>Beef Burger</Text>
          <Text style={styles.productDescription}>
            Big juicy Burger with Cheese,Lettuce,Onions, Tomato and special
            sauce!
          </Text>

          {/* Add Ons Section */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Add Ons:</Text>
            <View style={styles.addOnsContainer}>
              {addOns.map(addon => (
                <TouchableOpacity
                  key={addon.id}
                  style={[
                    styles.addOnCard,
                    addon.selected && styles.addOnCardSelected,
                  ]}
                  onPress={() => toggleAddOn(addon.id)}
                >
                  <Text style={styles.addOnEmoji}>{addon.emoji}</Text>
                  {addon.selected && (
                    <View style={styles.checkmark}>
                      <Text style={styles.checkmarkText}>✓</Text>
                    </View>
                  )}
                </TouchableOpacity>
              ))}
            </View>
          </View>

          {/* Quantity and Price */}
          <View style={styles.bottomSection}>
            <View style={styles.quantityContainer}>
              <TouchableOpacity
                style={styles.quantityButton}
                onPress={decrementQuantity}
              >
                <Text style={styles.quantityButtonText}>−</Text>
              </TouchableOpacity>
              <Text style={styles.quantityText}>{quantity}</Text>
              <TouchableOpacity
                style={styles.quantityButton}
                onPress={incrementQuantity}
              >
                <Text style={styles.quantityButtonText}>+</Text>
              </TouchableOpacity>
            </View>

            <View style={styles.priceContainer}>
              <Text style={styles.priceLabel}>Total:</Text>
              <Text style={styles.priceValue}>${productPrice * quantity}</Text>
            </View>
          </View>

          {/* Add to Cart Button */}
          <TouchableOpacity style={styles.addToCartButton}>
            <Text style={styles.addToCartText}>Add to Cart</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
};

export default ProductDetailsScreen;
