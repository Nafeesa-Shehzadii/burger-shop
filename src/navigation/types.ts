import type { NavigatorScreenParams } from '@react-navigation/native';

export interface MenuItem {
  itemID: number;
  itemName: string;
  itemDescription: string;
  itemPrice: number;
  imageUrl: string;
  restaurantID: number;
  restaurantName: string;
}

// Order-related types
export interface OrderItem {
  itemID: number;
  itemName: string;
  itemPrice: number;
  quantity: number;
  imageUrl: string;
  selectedAddOns?: string[];
}

export enum OrderStatus {
  PENDING = 'pending',
  CONFIRMED = 'confirmed',
  PREPARING = 'preparing',
  OUT_FOR_DELIVERY = 'out_for_delivery',
  DELIVERED = 'delivered',
  CANCELLED = 'cancelled',
}

export interface Order {
  id?: string;
  userId: string;
  userEmail: string;
  items: OrderItem[];
  subtotal: number;
  deliveryFee: number;
  total: number;
  status: OrderStatus;
  deliveryAddress?: string;
  specialInstructions?: string;
  createdAt?: any; // Firestore Timestamp
  updatedAt?: any; // Firestore Timestamp
  estimatedDeliveryTime?: string;
}

export type RootStackParamList = {
  Auth: NavigatorScreenParams<AuthStackParamList>;
  DrawerNav: NavigatorScreenParams<DrawerParamList>;
  ProductDetails: { item: MenuItem };
  Review: { item: MenuItem };
  OrderHistory: undefined;
};

export type AuthStackParamList = {
  Welcome: undefined;
  Login: undefined;
  Signup: undefined;
};

export type DrawerParamList = {
  MainTabs: NavigatorScreenParams<MainTabParamList>;
};

export type MainTabParamList = {
  Home: undefined;
  Search: undefined;
  Cart: undefined;
  Profile: undefined;
};
