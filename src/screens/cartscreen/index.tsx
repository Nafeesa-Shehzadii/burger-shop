import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Modal,
  TextInput,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import type { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Icon from 'react-native-vector-icons/Ionicons';
import type { MainTabParamList } from '../../navigation/types';
import { styles } from './styles';

type CartItem = {
  id: string;
  name: string;
  price: number;
  quantity: number;
  icon: string;
};

type Props = {
  onCheckout?: () => void;
  handleMenuPress?: () => void;
};

type NavigationProp = BottomTabNavigationProp<MainTabParamList, 'Cart'>;

const CartScreen = ({ onCheckout, handleMenuPress }: Props) => {
  const navigation = useNavigation<NavigationProp>();
  const [showCheckoutModal, setShowCheckoutModal] = useState(false);
  const [cartItems, setCartItems] = React.useState<CartItem[]>([
    { id: '1', name: 'Beef Burger', price: 20, quantity: 1, icon: 'hamburger' },
    { id: '2', name: 'Noodles', price: 18, quantity: 2, icon: 'noodles' },
  ]);

  const updateQuantity = (id: string, delta: number) => {
    setCartItems(
      cartItems
        .map(item =>
          item.id === id
            ? { ...item, quantity: Math.max(0, item.quantity + delta) }
            : item,
        )
        .filter(item => item.quantity > 0),
    );
  };

  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  );
  const deliveryFee = 5;
  const total = subtotal + deliveryFee;

  const handleCheckout = () => {
    if (cartItems.length === 0) {
      return;
    }
    setShowCheckoutModal(true);
    if (onCheckout) {
      onCheckout();
    }
  };

  const handleBackToMenu = () => {
    navigation.navigate('Home');
    if (handleMenuPress) {
      handleMenuPress();
    }
  };

  const handleConfirmOrder = () => {
    setShowCheckoutModal(false);
    // Clear cart after successful order
    setCartItems([]);
    // Navigate to home after a short delay
    setTimeout(() => {
      navigation.navigate('Home');
    }, 500);
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>{cartItems.length} Items in Cart</Text>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Cart Items */}
        {cartItems.map(item => (
          <View key={item.id} style={styles.cartItem}>
            <View style={styles.itemImagePlaceholder}>
              <MaterialCommunityIcons
                name={item.icon}
                size={40}
                color="#FF6B6B"
              />
            </View>
            <View style={styles.itemDetails}>
              <Text style={styles.itemName}>{item.name}</Text>
              <Text style={styles.itemPrice}>${item.price}</Text>
              <Text style={styles.itemQuantity}>{item.quantity}</Text>
            </View>
            <View style={styles.quantityControls}>
              <TouchableOpacity
                style={styles.quantityButton}
                onPress={() => updateQuantity(item.id, -1)}
              >
                <Text style={styles.quantityButtonText}>−</Text>
              </TouchableOpacity>
              <Text style={styles.quantityText}>{item.quantity}</Text>
              <TouchableOpacity
                style={styles.quantityButton}
                onPress={() => updateQuantity(item.id, 1)}
              >
                <Text style={styles.quantityButtonText}>+</Text>
              </TouchableOpacity>
            </View>
          </View>
        ))}

        {/* Order Instructions */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Order Instructions:</Text>
          <View style={styles.instructionsBox}>
            <TextInput
              style={styles.instructionsPlaceholder}
              placeholder="Add special instructions..."
              placeholderTextColor="#999"
            />
          </View>
        </View>

        {/* Price Summary */}
        <View style={styles.summarySection}>
          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Subtotal:</Text>
            <Text style={styles.summaryValue}>${subtotal}</Text>
          </View>
          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Delivery Fee:</Text>
            <Text style={styles.summaryValue}>${deliveryFee}</Text>
          </View>
          <View style={styles.divider} />
          <View style={styles.summaryRow}>
            <Text style={styles.totalLabel}>TOTAL:</Text>
            <Text style={styles.totalValue}>${total}</Text>
          </View>
        </View>
      </ScrollView>

      {/* Checkout Button */}
      <View style={styles.checkoutContainer}>
        <TouchableOpacity
          style={[
            styles.checkoutButton,
            cartItems.length === 0 && styles.checkoutButtonDisabled,
          ]}
          onPress={handleCheckout}
          disabled={cartItems.length === 0}
        >
          <Text style={styles.checkoutText}>Checkout</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.backToMenuButton}
          onPress={handleBackToMenu}
        >
          <Text style={styles.backToMenuText}>Back to Menu</Text>
        </TouchableOpacity>
      </View>

      {/* Checkout Modal */}
      <Modal
        visible={showCheckoutModal}
        transparent={true}
        animationType="fade"
        onRequestClose={() => setShowCheckoutModal(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.modalIconContainer}>
              <Icon name="checkmark-circle" size={80} color="#4CAF50" />
            </View>

            <Text style={styles.modalTitle}>Order Confirmed!</Text>
            <Text style={styles.modalMessage}>
              Your order has been placed successfully.
            </Text>

            <View style={styles.modalOrderSummary}>
              <View style={styles.modalSummaryRow}>
                <Text style={styles.modalSummaryLabel}>Items:</Text>
                <Text style={styles.modalSummaryValue}>{cartItems.length}</Text>
              </View>
              <View style={styles.modalSummaryRow}>
                <Text style={styles.modalSummaryLabel}>Total Amount:</Text>
                <Text style={styles.modalSummaryValueBold}>${total}</Text>
              </View>
            </View>

            <Text style={styles.modalDeliveryText}>
              Estimated delivery: 30-45 minutes
            </Text>

            <TouchableOpacity
              style={styles.modalButton}
              onPress={handleConfirmOrder}
            >
              <Text style={styles.modalButtonText}>Track Order</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.modalButtonSecondary}
              onPress={() => setShowCheckoutModal(false)}
            >
              <Text style={styles.modalButtonSecondaryText}>
                Continue Shopping
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default CartScreen;
