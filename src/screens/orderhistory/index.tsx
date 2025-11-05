import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
  RefreshControl,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import auth from '@react-native-firebase/auth';
import { subscribeToUserOrders } from '../../services/firebaseService';
import type { Order, OrderStatus } from '../../navigation/types';
import { styles } from './styles';

const OrderHistoryScreen = () => {
  const navigation = useNavigation();
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    const currentUser = auth().currentUser;
    if (!currentUser) {
      setLoading(false);
      return;
    }

    // Subscribe to real-time order updates
    const unsubscribe = subscribeToUserOrders(currentUser.uid, userOrders => {
      setOrders(userOrders);
      setLoading(false);
      setRefreshing(false);
    });

    // Cleanup subscription on unmount
    return () => unsubscribe();
  }, []);

  const onRefresh = () => {
    setRefreshing(true);
    // The real-time listener will automatically update the orders
  };

  const getStatusColor = (status: OrderStatus): string => {
    switch (status) {
      case 'pending':
        return '#FFA500';
      case 'confirmed':
        return '#4169E1';
      case 'preparing':
        return '#9370DB';
      case 'out_for_delivery':
        return '#1E90FF';
      case 'delivered':
        return '#32CD32';
      case 'cancelled':
        return '#DC143C';
      default:
        return '#999';
    }
  };

  const getStatusIcon = (status: OrderStatus): string => {
    switch (status) {
      case 'pending':
        return 'time-outline';
      case 'confirmed':
        return 'checkmark-circle-outline';
      case 'preparing':
        return 'restaurant-outline';
      case 'out_for_delivery':
        return 'bicycle-outline';
      case 'delivered':
        return 'checkmark-done-circle-outline';
      case 'cancelled':
        return 'close-circle-outline';
      default:
        return 'help-circle-outline';
    }
  };

  const formatStatus = (status: OrderStatus): string => {
    return status
      .split('_')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  };

  const formatDate = (timestamp: any): string => {
    if (!timestamp) return 'N/A';

    try {
      const date = timestamp.toDate ? timestamp.toDate() : new Date(timestamp);
      const now = new Date();
      const diffInMs = now.getTime() - date.getTime();
      const diffInHours = diffInMs / (1000 * 60 * 60);

      if (diffInHours < 24) {
        const hours = Math.floor(diffInHours);
        if (hours === 0) {
          const minutes = Math.floor(diffInMs / (1000 * 60));
          return `${minutes} min${minutes !== 1 ? 's' : ''} ago`;
        }
        return `${hours} hour${hours !== 1 ? 's' : ''} ago`;
      }

      return date.toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
      });
    } catch (error) {
      return 'N/A';
    }
  };

  if (loading) {
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => navigation.goBack()}
          >
            <Icon name="arrow-back" size={24} color="#FFF" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>My Orders</Text>
          <View style={styles.placeholder} />
        </View>
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#FF6B6B" />
          <Text style={styles.loadingText}>Loading orders...</Text>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Icon name="arrow-back" size={24} color="#FFF" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>My Orders</Text>
        <View style={styles.placeholder} />
      </View>

      {orders.length === 0 ? (
        <View style={styles.emptyContainer}>
          <MaterialCommunityIcons
            name="receipt-text-outline"
            size={100}
            color="#DDD"
          />
          <Text style={styles.emptyTitle}>No Orders Yet</Text>
          <Text style={styles.emptySubtitle}>
            Your order history will appear here
          </Text>
        </View>
      ) : (
        <ScrollView
          showsVerticalScrollIndicator={false}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={onRefresh}
              colors={['#FF6B6B']}
              tintColor="#FF6B6B"
            />
          }
        >
          <View style={styles.ordersContainer}>
            <Text style={styles.orderCount}>
              {orders.length} Order{orders.length !== 1 ? 's' : ''}
            </Text>

            {orders.map((order, index) => (
              <View key={order.id || index} style={styles.orderCard}>
                {/* Order Header */}
                <View style={styles.orderHeader}>
                  <View style={styles.orderHeaderLeft}>
                    <Text style={styles.orderId}>
                      Order #{order.id?.substring(0, 8).toUpperCase()}
                    </Text>
                    <Text style={styles.orderDate}>
                      {formatDate(order.createdAt)}
                    </Text>
                  </View>
                  <View
                    style={[
                      styles.statusBadge,
                      { backgroundColor: getStatusColor(order.status) },
                    ]}
                  >
                    <Icon
                      name={getStatusIcon(order.status)}
                      size={14}
                      color="#FFF"
                    />
                    <Text style={styles.statusText}>
                      {formatStatus(order.status)}
                    </Text>
                  </View>
                </View>

                {/* Order Items */}
                <View style={styles.itemsContainer}>
                  {order.items.map((item, itemIndex) => (
                    <View key={itemIndex} style={styles.orderItem}>
                      <View style={styles.itemLeft}>
                        <Text style={styles.itemQuantity}>
                          {item.quantity}x
                        </Text>
                        <View style={styles.itemDetails}>
                          <Text style={styles.itemName} numberOfLines={1}>
                            {item.itemName}
                          </Text>
                          {item.selectedAddOns &&
                            item.selectedAddOns.length > 0 && (
                              <Text style={styles.itemAddOns} numberOfLines={1}>
                                + {item.selectedAddOns.join(', ')}
                              </Text>
                            )}
                        </View>
                      </View>
                      <Text style={styles.itemPrice}>Rs. {item.itemPrice}</Text>
                    </View>
                  ))}
                </View>

                {/* Delivery Info */}
                {order.deliveryAddress && (
                  <View style={styles.deliveryInfo}>
                    <Icon name="location-outline" size={16} color="#666" />
                    <Text style={styles.deliveryText} numberOfLines={1}>
                      {order.deliveryAddress}
                    </Text>
                  </View>
                )}

                {/* Order Total */}
                <View style={styles.orderFooter}>
                  <View style={styles.totalRow}>
                    <Text style={styles.totalLabel}>Subtotal:</Text>
                    <Text style={styles.totalValue}>Rs. {order.subtotal}</Text>
                  </View>
                  <View style={styles.totalRow}>
                    <Text style={styles.totalLabel}>Delivery:</Text>
                    <Text style={styles.totalValue}>
                      Rs. {order.deliveryFee}
                    </Text>
                  </View>
                  <View style={styles.divider} />
                  <View style={styles.totalRow}>
                    <Text style={styles.grandTotalLabel}>Total:</Text>
                    <Text style={styles.grandTotalValue}>
                      Rs. {order.total}
                    </Text>
                  </View>
                </View>

                {/* Estimated Delivery Time */}
                {order.status !== 'delivered' &&
                  order.status !== 'cancelled' && (
                    <View style={styles.estimatedTime}>
                      <Icon name="time-outline" size={16} color="#FF6B6B" />
                      <Text style={styles.estimatedTimeText}>
                        Estimated:{' '}
                        {order.estimatedDeliveryTime || '30-45 minutes'}
                      </Text>
                    </View>
                  )}
              </View>
            ))}
          </View>
        </ScrollView>
      )}
    </View>
  );
};

export default OrderHistoryScreen;
