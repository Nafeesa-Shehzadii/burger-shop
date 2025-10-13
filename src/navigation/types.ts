import type { NavigatorScreenParams } from '@react-navigation/native';

export type RootStackParamList = {
  Splash: undefined;
  DrawerNav: NavigatorScreenParams<DrawerParamList>;
  ProductDetails: undefined;
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
