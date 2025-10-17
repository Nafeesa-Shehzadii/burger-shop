import React from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
  Alert,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { logoutUser } from '../../store/authSlice';
import { styles } from './styles';

const ProfileScreen = () => {
  const navigation = useNavigation();
  const dispatch = useAppDispatch();
  const user = useAppSelector(state => state.auth.user);
  const cartItems = useAppSelector(state => state.cart.items);

  const handleLogout = () => {
    Alert.alert(
      'Logout',
      'Are you sure you want to logout?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Logout',
          style: 'destructive',
          onPress: () => dispatch(logoutUser()),
        },
      ],
      { cancelable: true },
    );
  };

  const menuItems = [
    {
      id: '1',
      title: 'My Orders',
      icon: 'receipt-outline',
      iconType: 'ionicon',
      onPress: () =>
        Alert.alert('Coming Soon', 'My Orders feature coming soon!'),
    },
    {
      id: '2',
      title: 'Favorites',
      icon: 'heart-outline',
      iconType: 'ionicon',
      badge: '0',
      onPress: () =>
        Alert.alert('Coming Soon', 'Favorites feature coming soon!'),
    },
    {
      id: '3',
      title: 'Delivery Address',
      icon: 'location-outline',
      iconType: 'ionicon',
      onPress: () =>
        Alert.alert('Coming Soon', 'Address management coming soon!'),
    },
    {
      id: '4',
      title: 'Payment Methods',
      icon: 'card-outline',
      iconType: 'ionicon',
      onPress: () => Alert.alert('Coming Soon', 'Payment methods coming soon!'),
    },
    {
      id: '5',
      title: 'Help & Support',
      icon: 'help-circle-outline',
      iconType: 'ionicon',
      onPress: () =>
        Alert.alert('Support', 'Contact us at support@burgershop.com'),
    },
    {
      id: '6',
      title: 'Settings',
      icon: 'settings-outline',
      iconType: 'ionicon',
      onPress: () => Alert.alert('Coming Soon', 'Settings coming soon!'),
    },
  ];

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Profile</Text>
        <TouchableOpacity
          style={styles.editButton}
          onPress={() =>
            Alert.alert('Coming Soon', 'Edit profile coming soon!')
          }
        >
          <Icon name="create-outline" size={24} color="#FFF" />
        </TouchableOpacity>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Profile Card */}
        <View style={styles.profileCard}>
          <View style={styles.avatarContainer}>
            <View style={styles.avatar}>
              <Icon name="person" size={50} color="#FF6B6B" />
            </View>
            <TouchableOpacity style={styles.cameraButton}>
              <Icon name="camera" size={16} color="#FFF" />
            </TouchableOpacity>
          </View>

          <Text style={styles.userName}>{user?.name || 'Guest User'}</Text>
          <Text style={styles.userEmail}>
            {user?.email || 'guest@example.com'}
          </Text>

          {/* Stats */}
          <View style={styles.statsContainer}>
            <View style={styles.statItem}>
              <Text style={styles.statValue}>{cartItems?.length || 0}</Text>
              <Text style={styles.statLabel}>In Cart</Text>
            </View>
            <View style={styles.statDivider} />
            <View style={styles.statItem}>
              <Text style={styles.statValue}>0</Text>
              <Text style={styles.statLabel}>Orders</Text>
            </View>
            <View style={styles.statDivider} />
            <View style={styles.statItem}>
              <Text style={styles.statValue}>0</Text>
              <Text style={styles.statLabel}>Reviews</Text>
            </View>
          </View>
        </View>

        {/* Menu Items */}
        <View style={styles.menuContainer}>
          {menuItems.map((item, index) => (
            <TouchableOpacity
              key={item.id}
              style={[
                styles.menuItem,
                index === menuItems.length - 1 && styles.menuItemLast,
              ]}
              onPress={item.onPress}
            >
              <View style={styles.menuItemLeft}>
                <View style={styles.menuItemIconContainer}>
                  <Icon name={item.icon} size={22} color="#FF6B6B" />
                </View>
                <Text style={styles.menuItemText}>{item.title}</Text>
              </View>
              <View style={styles.menuItemRight}>
                {item.badge && (
                  <View style={styles.badge}>
                    <Text style={styles.badgeText}>{item.badge}</Text>
                  </View>
                )}
                <Icon name="chevron-forward" size={20} color="#999" />
              </View>
            </TouchableOpacity>
          ))}
        </View>

        {/* Logout Button */}
        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
          <Icon name="log-out-outline" size={22} color="#FF6B6B" />
          <Text style={styles.logoutButtonText}>Logout</Text>
        </TouchableOpacity>

        {/* App Version */}
        <Text style={styles.versionText}>Version 1.0.0</Text>
      </ScrollView>
    </View>
  );
};

export default ProfileScreen;
