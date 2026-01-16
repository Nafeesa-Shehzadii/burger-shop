import firestore from '@react-native-firebase/firestore';
import type { MenuItem, Order, OrderItem, OrderStatus } from '../navigation/types';
import type { CartItem } from '../store/cartSlice';

export const COLLECTIONS = {
  USERS: 'users',
  MENU_ITEMS: 'menuItems',
  ORDERS: 'orders',
  REVIEWS: 'reviews',
  FAVORITES: 'favorites',
};

// Get all menu items
export const getMenuItems = async (): Promise<MenuItem[]> => {
  const snapshot = await firestore()
    .collection(COLLECTIONS.MENU_ITEMS)
    .orderBy('itemName', 'asc')
    .get();
  
  return snapshot.docs.map(doc => ({
    ...doc.data(),
    itemID: parseInt(doc.id),
  })) as MenuItem[];
};

// ============ ORDER MANAGEMENT ============

// Create an order from cart items
export const createOrder = async (
  userId: string,
  userEmail: string,
  cartItems: CartItem[],
  deliveryAddress?: string,
  specialInstructions?: string,
): Promise<string> => {
  // Convert cart items to order items
  const orderItems: OrderItem[] = cartItems.map(item => ({
    itemID: item.itemID,
    itemName: item.itemName,
    itemPrice: item.itemPrice,
    quantity: item.quantity,
    imageUrl: item.imageUrl,
    selectedAddOns: item.selectedAddOns,
  }));

  // Calculate totals
  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.itemPrice * item.quantity,
    0,
  );
  const deliveryFee = 50;
  const total = subtotal + deliveryFee;

  // Create order object
  const orderData: Omit<Order, 'id'> = {
    userId,
    userEmail,
    items: orderItems,
    subtotal,
    deliveryFee,
    total,
    status: 'pending' as OrderStatus,
    deliveryAddress,
    specialInstructions,
    estimatedDeliveryTime: '30-45 minutes',
    createdAt: firestore.FieldValue.serverTimestamp(),
    updatedAt: firestore.FieldValue.serverTimestamp(),
  };

  const docRef = await firestore()
    .collection(COLLECTIONS.ORDERS)
    .add(orderData);
  
  return docRef.id;
};

// Get user's orders
export const getUserOrders = async (userId: string): Promise<Order[]> => {
  const snapshot = await firestore()
    .collection(COLLECTIONS.ORDERS)
    .where('userId', '==', userId)
    .orderBy('createdAt', 'desc')
    .get();
  
  return snapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data(),
  })) as Order[];
};

// Get a single order by ID
export const getOrderById = async (orderId: string): Promise<Order | null> => {
  const doc = await firestore()
    .collection(COLLECTIONS.ORDERS)
    .doc(orderId)
    .get();
  
  if (!doc.exists) {
    return null;
  }
  
  return {
    id: doc.id,
    ...doc.data(),
  } as Order;
};

// Update order status
export const updateOrderStatus = async (
  orderId: string,
  status: OrderStatus,
): Promise<void> => {
  await firestore()
    .collection(COLLECTIONS.ORDERS)
    .doc(orderId)
    .update({
      status,
      updatedAt: firestore.FieldValue.serverTimestamp(),
    });
};

// Real-time order updates for a specific user
export const subscribeToUserOrders = (
  userId: string,
  callback: (orders: Order[]) => void,
) => {
  return firestore()
    .collection(COLLECTIONS.ORDERS)
    .where('userId', '==', userId)
    .onSnapshot(
      snapshot => {
        if (!snapshot || !snapshot.docs) {
          callback([]);
          return;
        }

        const orders = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
        })) as Order[];

        const sortedOrders = orders.sort((a, b) => {
          const aTime = a.createdAt?.toDate?.() || new Date(a.createdAt || 0);
          const bTime = b.createdAt?.toDate?.() || new Date(b.createdAt || 0);
          return bTime.getTime() - aTime.getTime();
        });

        callback(sortedOrders);
      },
      error => {
        console.error('Error fetching orders:', error);
        callback([]);
      },
    );
};

// Real-time updates for a specific order
export const subscribeToOrder = (
  orderId: string,
  callback: (order: Order | null) => void,
) => {
  return firestore()
    .collection(COLLECTIONS.ORDERS)
    .doc(orderId)
    .onSnapshot(doc => {
      if (doc.exists) {
        callback({
          id: doc.id,
          ...doc.data(),
        } as Order);
      } else {
        callback(null);
      }
    });
};

// Cancel an order
export const cancelOrder = async (orderId: string): Promise<void> => {
  await updateOrderStatus(orderId, 'cancelled' as OrderStatus);
};

// Add to favorites
export const addToFavorites = async (userId: string, itemId: number) => {
  await firestore()
    .collection(COLLECTIONS.FAVORITES)
    .doc(`${userId}_${itemId}`)
    .set({
      userId,
      itemId,
      createdAt: firestore.FieldValue.serverTimestamp(),
    });
};

// Add a review
export const addReview = async (reviewData: any) => {
  const docRef = await firestore()
    .collection(COLLECTIONS.REVIEWS)
    .add({
      ...reviewData,
      createdAt: firestore.FieldValue.serverTimestamp(),
    });
  return docRef.id;
};