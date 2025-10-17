import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
  Alert,
} from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { RouteProp } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import type { RootStackParamList } from '../../navigation/types';
import { useAppDispatch } from '../../store/hooks';
import { addToCart } from '../../store/cartSlice';
import { styles } from './styles';

type AddOn = {
  id: string;
  name: string;
  icon: string;
  selected: boolean;
};

type NavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'ProductDetails'
>;
type RouteProps = RouteProp<RootStackParamList, 'ProductDetails'>;

const ProductDetailsScreen = () => {
  const navigation = useNavigation<NavigationProp>();
  const route = useRoute<RouteProps>();
  const dispatch = useAppDispatch();
  const { item } = route.params;
  const [quantity, setQuantity] = useState(1);
  const [imageError, setImageError] = useState(false);
  const [addOns, setAddOns] = useState<AddOn[]>([
    { id: '1', name: 'Pepper Julienned', icon: 'chili-hot', selected: false },
    { id: '2', name: 'Baby Spinach', icon: 'leaf', selected: false },
    { id: '3', name: 'Masroom', icon: 'mushroom', selected: false },
    { id: '4', name: 'Onion', icon: 'onion', selected: false },
    { id: '5', name: 'Tomato', icon: 'tomato', selected: false },
  ]);

  const productPrice = item.itemPrice;

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

  const handleAddToCart = () => {
    const selectedAddOnNames = addOns
      .filter(addon => addon.selected)
      .map(addon => addon.name);

    dispatch(
      addToCart({
        ...item,
        quantity,
        selectedAddOns:
          selectedAddOnNames.length > 0 ? selectedAddOnNames : undefined,
      }),
    );

    Alert.alert('Success', `${item.itemName} has been added to your cart!`, [
      {
        text: 'Continue Shopping',
        onPress: () => navigation.goBack(),
      },
      {
        text: 'View Cart',
        onPress: () =>
          navigation.navigate('DrawerNav', {
            screen: 'MainTabs',
            params: { screen: 'Cart' },
          }),
      },
    ]);
  };
  console.log(item.imageUrl);
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
        <View style={styles.headerRight}>
          <TouchableOpacity
            style={styles.reviewButton}
            onPress={() => navigation.navigate('Review', { item })}
          >
            <Icon name="camera-outline" size={24} color="#FF6B6B" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.favoriteButton}>
            <Icon name="heart-outline" size={24} color="#FF6B6B" />
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Product Image */}
        <View style={styles.imageContainer}>
          {item?.imageUrl ? (
            <Image
              source={{ uri: item.imageUrl }}
              style={styles.productImage}
              resizeMode="cover"
              onError={() => setImageError(true)}
            />
          ) : (
            <View style={styles.noImageContainer}>
              <MaterialCommunityIcons
                name="image-off"
                size={80}
                color="rgba(255,255,255,0.5)"
              />
              <Text style={styles.noImageText}>No Image Available</Text>
            </View>
          )}
        </View>

        {/* Product Info */}
        <View style={styles.contentContainer}>
          {/* Rating Badge */}
          {/* <View style={styles.ratingContainer}>
            <View style={styles.ratingBadge}>
              <Icon name="star" size={16} color="#FFD700" />
              <Text style={styles.ratingText}>4.8</Text>
            </View>
          </View> */}

          {/* Title and Price */}
          <Text style={styles.productTitle}>{item.itemName}</Text>
          <Text style={styles.restaurantName}>{item.restaurantName}</Text>
          <Text style={styles.productDescription}>{item.itemDescription}</Text>

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
                  <MaterialCommunityIcons
                    name={addon.icon}
                    size={32}
                    color={addon.selected ? '#FF6B6B' : '#999'}
                  />
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
              <Text style={styles.priceValue}>
                Rs. {productPrice * quantity}
              </Text>
            </View>
          </View>

          {/* Add to Cart Button */}
          <TouchableOpacity
            style={styles.addToCartButton}
            onPress={handleAddToCart}
          >
            <Text style={styles.addToCartText}>Add to Cart</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
};

export default ProductDetailsScreen;
