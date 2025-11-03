import firestore from '@react-native-firebase/firestore';
import type { MenuItem } from '../navigation/types';
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

// Create an order
export const createOrder = async (orderData: any): Promise<string> => {
  const docRef = await firestore()
    .collection(COLLECTIONS.ORDERS)
    .add({
      ...orderData,
      createdAt: firestore.FieldValue.serverTimestamp(),
      updatedAt: firestore.FieldValue.serverTimestamp(),
    });
  return docRef.id;
};

// Get user's orders
export const getUserOrders = async (userId: string) => {
  const snapshot = await firestore()
    .collection(COLLECTIONS.ORDERS)
    .where('userId', '==', userId)
    .orderBy('createdAt', 'desc')
    .get();
  
  return snapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data(),
  }));
};

// Real-time order updates
export const subscribeToUserOrders = (userId: string, callback: (orders: any[]) => void) => {
  return firestore()
    .collection(COLLECTIONS.ORDERS)
    .where('userId', '==', userId)
    .orderBy('createdAt', 'desc')
    .onSnapshot(snapshot => {
      const orders = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
      }));
      callback(orders);
    });
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