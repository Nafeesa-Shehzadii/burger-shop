import React from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
  TextInput,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { DrawerNavigationProp } from '@react-navigation/drawer';
import Icon from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import type {
  RootStackParamList,
  DrawerParamList,
} from '../../navigation/types';
import { styles } from './styles';

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;
type DrawerNavProp = DrawerNavigationProp<DrawerParamList>;

const MenuScreen = () => {
  const navigation = useNavigation<NavigationProp>();
  const drawerNavigation = useNavigation<DrawerNavProp>();

  const handleProductPress = () => {
    navigation.navigate('ProductDetails');
  };

  const handleMenuPress = () => {
    drawerNavigation.openDrawer();
  };
  const categories = [
    {
      id: '1',
      name: 'All',
      icon: 'fast-food',
      iconType: 'ionicon',
      color: '#FF6B6B',
    },
    {
      id: '2',
      name: 'Burger',
      icon: 'hamburger',
      iconType: 'material',
      color: '#4ECDC4',
    },
    {
      id: '3',
      name: 'Pizza',
      icon: 'pizza',
      iconType: 'ionicon',
      color: '#FFE66D',
    },
    {
      id: '4',
      name: 'Drinks',
      icon: 'beer',
      iconType: 'ionicon',
      color: '#95E1D3',
    },
  ];

  const popularItems = [
    { id: '1', name: 'Beef Burger', price: '$20', rating: 4.8 },
    { id: '2', name: 'Cheese Burger', price: '$18', rating: 4.6 },
    { id: '3', name: 'Chicken Burger', price: '$15', rating: 4.7 },
    { id: '4', name: 'coca cola', price: '$20', rating: 4.8 },
    { id: '5', name: 'sandwitch', price: '$18', rating: 4.6 },
    { id: '6', name: 'Chicken Burger', price: '$15', rating: 4.7 },
  ];

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        {/* <TouchableOpacity style={styles.menuIcon}></TouchableOpacity> */}
        <Text style={styles.headerTitle}>Menu</Text>
        <TouchableOpacity style={styles.cartIcon} onPress={handleMenuPress}>
          <Icon name="menu" size={28} color="#FFFFFF" />
        </TouchableOpacity>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Search Bar */}
        <View style={styles.searchContainer}>
          <Icon
            name="search"
            size={20}
            color="#999"
            style={styles.searchIcon}
          />
          <TextInput
            style={styles.searchPlaceholder}
            placeholder="Search"
            placeholderTextColor="#999"
          />
          {/* <Text style={styles.searchPlaceholder}>Search</Text> */}
        </View>

        {/* Categories */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.categoriesContainer}
        >
          {categories.map(category => (
            <TouchableOpacity
              key={category.id}
              style={[styles.categoryCard, { backgroundColor: category.color }]}
            >
              {category.iconType === 'ionicon' ? (
                <Icon name={category.icon} size={32} color="#FFFFFF" />
              ) : (
                <MaterialCommunityIcons
                  name={category.icon}
                  size={32}
                  color="#FFFFFF"
                />
              )}
            </TouchableOpacity>
          ))}
        </ScrollView>

        {/* Promotions */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Promotions</Text>
          <View style={styles.promotionCard}>
            <View style={styles.promotionContent}>
              <Text style={styles.promotionBadge}>Today's Offer</Text>
              <Text style={styles.promotionTitle}>Free box of Fries</Text>
              <Text style={styles.promotionSubtitle}>
                on all orders above $150
              </Text>
            </View>
            <View style={styles.promotionImage}>
              <MaterialCommunityIcons
                name="french-fries"
                size={60}
                color="#FF6B6B"
              />
            </View>
          </View>
        </View>

        {/* Popular Items */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Popular</Text>
          {popularItems.map(item => (
            <TouchableOpacity
              key={item.id}
              style={styles.itemCard}
              onPress={handleProductPress}
            >
              <View style={styles.itemImagePlaceholder}>
                <MaterialCommunityIcons
                  name="hamburger"
                  size={40}
                  color="#FF6B6B"
                />
              </View>
              <View style={styles.itemInfo}>
                <Text style={styles.itemName}>{item.name}</Text>
                <Text style={styles.itemPrice}>{item.price}</Text>
              </View>
              <View style={styles.ratingBadge}>
                <Icon name="star" size={14} color="#FFD700" />
                <Text style={styles.ratingText}> {item.rating}</Text>
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </View>
  );
};

export default MenuScreen;
