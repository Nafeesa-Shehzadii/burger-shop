import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Modal,
  TextInput,
  Image,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import type { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Icon from 'react-native-vector-icons/Ionicons';
import type { MainTabParamList } from '../../navigation/types';
import { styles } from './styles';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { updateQuantity, removeFromCart, clearCart } from '../../store/cartSlice';

type Props = {
  onCheckout?: () => void;
  handleMenuPress?: () => void;
};

type NavigationProp = BottomTabNavigationProp<MainTabParamList, 'Cart'>;

const CartScreen = ({ onCheckout, handleMenuPress }: Props) => {
  const navigation = useNavigation<NavigationProp>();
  const [showCheckoutModal, setShowCheckoutModal] = useState(false);
  const cartItems = useAppSelector(state => state.cart.items);
  const dispatch = useAppDispatch();

  const handleUpdateQuantity = (itemID: number, delta: number) => {
    const item = cartItems.find(i => i.itemID === itemID);
    if (!item) return;

    const newQuantity = item.quantity + delta;
    
    if (newQuantity <= 0) {
      dispatch(removeFromCart(itemID));
    } else {
      dispatch(updateQuantity({ itemID, quantity: newQuantity }));
    }
  };

  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.itemPrice * item.quantity,
    0,
  );
  const deliveryFee = 50;
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
    dispatch(clearCart());
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
        {cartItems.length === 0 ? (
          <View style={styles.emptyCart}>
            <MaterialCommunityIcons
              name="cart-outline"
              size={80}
              color="#CCC"
            />
            <Text style={styles.emptyCartText}>Your cart is empty</Text>
            <Text style={styles.emptyCartSubtext}>Add items to get started</Text>
          </View>
        ) : (
          cartItems.map(item => (
            <View key={item.itemID} style={styles.cartItem}>
              {item.imageUrl ? (
                <Image
                  source={{ uri: item.imageUrl }}
                  style={styles.itemImage}
                  resizeMode="cover"
                />
              ) : (
                <View style={styles.itemImagePlaceholder}>
                  <MaterialCommunityIcons
                    name="image-off"
                    size={30}
                    color="#999"
                  />
                </View>
              )}
              <View style={styles.itemDetails}>
                <Text style={styles.itemName}>{item.itemName}</Text>
                <Text style={styles.itemPrice}>Rs. {item.itemPrice}</Text>
                {item.selectedAddOns && item.selectedAddOns.length > 0 && (
                  <Text style={styles.addOnsText}>
                    Add-ons: {item.selectedAddOns.join(', ')}
                  </Text>
                )}
              </View>
              <View style={styles.quantityControls}>
                <TouchableOpacity
                  style={styles.quantityButton}
                  onPress={() => handleUpdateQuantity(item.itemID, -1)}
                >
                  <Text style={styles.quantityButtonText}>−</Text>
                </TouchableOpacity>
                <Text style={styles.quantityText}>{item.quantity}</Text>
                <TouchableOpacity
                  style={styles.quantityButton}
                  onPress={() => handleUpdateQuantity(item.itemID, 1)}
                >
                  <Text style={styles.quantityButtonText}>+</Text>
                </TouchableOpacity>
              </View>
            </View>
          ))
        )}

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
            <Text style={styles.summaryValue}>Rs. {subtotal}</Text>
          </View>
          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Delivery Fee:</Text>
            <Text style={styles.summaryValue}>Rs. {deliveryFee}</Text>
          </View>
          <View style={styles.divider} />
          <View style={styles.summaryRow}>
            <Text style={styles.totalLabel}>TOTAL:</Text>
            <Text style={styles.totalValue}>Rs. {total}</Text>
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
                <Text style={styles.modalSummaryValueBold}>Rs. {total}</Text>
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
