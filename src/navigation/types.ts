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

export type RootStackParamList = {
  DrawerNav: NavigatorScreenParams<DrawerParamList>;
  ProductDetails: { item: MenuItem };
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
