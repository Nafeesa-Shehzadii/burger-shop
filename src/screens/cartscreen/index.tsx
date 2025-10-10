import React from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { styles } from './styles';

type CartItem = {
  id: string;
  name: string;
  price: number;
  quantity: number;
  emoji: string;
};

type Props = {
  onCheckout?: () => void;
};

const CartScreen = ({ onCheckout }: Props) => {
  const [cartItems, setCartItems] = React.useState<CartItem[]>([
    { id: '1', name: 'Beef Burger', price: 20, quantity: 1, emoji: '🍔' },
    { id: '2', name: 'Noodles', price: 18, quantity: 2, emoji: '🍜' },
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
              <Text style={styles.itemEmoji}>{item.emoji}</Text>
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
            <Text style={styles.instructionsPlaceholder}>
              Add special instructions...
            </Text>
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
        <TouchableOpacity style={styles.checkoutButton} onPress={onCheckout}>
          <Text style={styles.checkoutText}>Checkout</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.backToMenuButton}>
          <Text style={styles.backToMenuText}>Back to Menu</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default CartScreen;
