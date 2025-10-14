import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import Icon from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import type { RootStackParamList } from '../../navigation/types';
import { styles } from './styles';

type AddOn = {
  id: string;
  name: string;
  icon: string;
  selected: boolean;
};

type NavigationProp = NativeStackNavigationProp<RootStackParamList, 'ProductDetails'>;

const ProductDetailsScreen = () => {
  const navigation = useNavigation<NavigationProp>();
  const [quantity, setQuantity] = useState(1);
  const [addOns, setAddOns] = useState<AddOn[]>([
    { id: '1', name: 'Pepper Julienned', icon: 'chili-hot', selected: false },
    { id: '2', name: 'Baby Spinach', icon: 'leaf', selected: false },
    { id: '3', name: 'Masroom', icon: 'mushroom', selected: false },
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
          <Icon name="arrow-back" size={24} color="#333" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.favoriteButton}>
          <Icon name="heart-outline" size={24} color="#FF6B6B" />
        </TouchableOpacity>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Product Image */}
        <View style={styles.imageContainer}>
          <View style={styles.imagePlaceholder}>
            <MaterialCommunityIcons name="hamburger" size={120} color="#FF6B6B" />
          </View>
        </View>

        {/* Product Info */}
        <View style={styles.contentContainer}>
          {/* Rating Badge */}
          <View style={styles.ratingContainer}>
            <View style={styles.ratingBadge}>
              <Icon name="star" size={16} color="#FFD700" />
              <Text style={styles.ratingText}> 4.8</Text>
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
                  <MaterialCommunityIcons name={addon.icon} size={32} color={addon.selected ? '#FF6B6B' : '#999'} />
                  {addon.selected && (
                    <View style={styles.checkmark}>
                      <Icon name="checkmark" size={16} color="#FFFFFF" />
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
