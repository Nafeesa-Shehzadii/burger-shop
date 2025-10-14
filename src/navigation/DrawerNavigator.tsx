import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItemList,
  DrawerContentComponentProps,
} from '@react-navigation/drawer';
import Icon from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import BottomTabNavigator from './BottomTabNavigator';
import type { DrawerParamList } from './types';

const Drawer = createDrawerNavigator<DrawerParamList>();

// Custom Drawer Content for Burger Shop
const CustomDrawerContent = (props: DrawerContentComponentProps) => {
  return (
    <DrawerContentScrollView {...props} style={styles.drawerContainer}>
      <View style={styles.drawerHeader}>
        <Icon name="fast-food" size={48} color="#FFFFFF" style={styles.drawerHeaderIcon} />
        <Text style={styles.drawerHeaderTitle}>Burger Shop</Text>
        <Text style={styles.drawerHeaderSubtitle}>
          Delicious Burgers & More
        </Text>
      </View>

      <View style={styles.menuSection}>
        <Text style={styles.menuSectionTitle}>MENU</Text>

        <TouchableOpacity style={styles.menuItem}>
          <Icon name="home" size={20} color="#333" style={styles.menuItemIcon} />
          <Text style={styles.menuItemText}>Home</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.menuItem}>
          <MaterialCommunityIcons name="hamburger" size={20} color="#333" style={styles.menuItemIcon} />
          <Text style={styles.menuItemText}>Burgers</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.menuItem}>
          <Icon name="pizza" size={20} color="#333" style={styles.menuItemIcon} />
          <Text style={styles.menuItemText}>Pizza</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.menuItem}>
          <Icon name="beer" size={20} color="#333" style={styles.menuItemIcon} />
          <Text style={styles.menuItemText}>Drinks</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.menuItem}>
          <MaterialCommunityIcons name="french-fries" size={20} color="#333" style={styles.menuItemIcon} />
          <Text style={styles.menuItemText}>Sides</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.menuItem}>
          <Icon name="ice-cream" size={20} color="#333" style={styles.menuItemIcon} />
          <Text style={styles.menuItemText}>Desserts</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.menuSection}>
        <Text style={styles.menuSectionTitle}>ACCOUNT</Text>

        <TouchableOpacity style={styles.menuItem}>
          <Icon name="person" size={20} color="#333" style={styles.menuItemIcon} />
          <Text style={styles.menuItemText}>My Profile</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.menuItem}>
          <Icon name="receipt" size={20} color="#333" style={styles.menuItemIcon} />
          <Text style={styles.menuItemText}>My Orders</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.menuItem}>
          <Icon name="heart" size={20} color="#333" style={styles.menuItemIcon} />
          <Text style={styles.menuItemText}>Favorites</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.menuItem}>
          <Icon name="location" size={20} color="#333" style={styles.menuItemIcon} />
          <Text style={styles.menuItemText}>Delivery Address</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.menuSection}>
        <Text style={styles.menuSectionTitle}>SUPPORT</Text>

        <TouchableOpacity style={styles.menuItem}>
          <Icon name="chatbubbles" size={20} color="#333" style={styles.menuItemIcon} />
          <Text style={styles.menuItemText}>Help & Support</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.menuItem}>
          <Icon name="settings" size={20} color="#333" style={styles.menuItemIcon} />
          <Text style={styles.menuItemText}>Settings</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.menuItem}>
          <Icon name="information-circle" size={20} color="#333" style={styles.menuItemIcon} />
          <Text style={styles.menuItemText}>About Us</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.footer}>
        <TouchableOpacity style={styles.logoutButton}>
          <Icon name="log-out" size={20} color="#FF6B6B" style={styles.logoutIcon} />
          <Text style={styles.logoutText}>Logout</Text>
        </TouchableOpacity>
      </View>
    </DrawerContentScrollView>
  );
};

const DrawerNavigator = () => {
  return (
    <Drawer.Navigator
      drawerContent={props => <CustomDrawerContent {...props} />}
      screenOptions={{
        headerShown: false,
        drawerType: 'front',
        drawerStyle: {
          width: 280,
        },
      }}
    >
      <Drawer.Screen name="MainTabs" component={BottomTabNavigator} />
    </Drawer.Navigator>
  );
};

const styles = StyleSheet.create({
  drawerContainer: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  drawerHeader: {
    padding: 20,
    backgroundColor: '#FF6B6B',
    marginBottom: 10,
  },
  drawerHeaderIcon: {
    marginBottom: 10,
  },
  drawerHeaderTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 4,
  },
  drawerHeaderSubtitle: {
    fontSize: 14,
    color: '#FFFFFF',
    opacity: 0.9,
  },
  menuSection: {
    marginTop: 10,
    marginBottom: 10,
  },
  menuSectionTitle: {
    fontSize: 12,
    fontWeight: '600',
    color: '#999999',
    paddingHorizontal: 20,
    paddingVertical: 10,
    letterSpacing: 1,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 20,
  },
  menuItemIcon: {
    marginRight: 15,
    width: 24,
  },
  menuItemText: {
    fontSize: 16,
    color: '#333333',
    fontWeight: '500',
  },
  footer: {
    marginTop: 20,
    paddingHorizontal: 20,
    paddingBottom: 20,
    borderTopWidth: 1,
    borderTopColor: '#EEEEEE',
    paddingTop: 20,
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFE5E5',
    padding: 12,
    borderRadius: 8,
  },
  logoutIcon: {
    marginRight: 10,
  },
  logoutText: {
    fontSize: 16,
    color: '#FF6B6B',
    fontWeight: '600',
  },
});

export default DrawerNavigator;
