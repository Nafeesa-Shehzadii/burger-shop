import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
  TextInput,
  FlatList,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { DrawerNavigationProp } from '@react-navigation/drawer';
import Icon from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import type {
  RootStackParamList,
  DrawerParamList,
  MenuItem,
} from '../../navigation/types';
import { styles } from './styles';

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;
type DrawerNavProp = DrawerNavigationProp<DrawerParamList>;

const MenuScreen = () => {
  const navigation = useNavigation<NavigationProp>();
  const drawerNavigation = useNavigation<DrawerNavProp>();
  const [popularItems, setPopularItems] = useState<MenuItem[]>([]);
  const [originalItems, setOriginalItems] = useState<MenuItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');

  const handleProductPress = (item: MenuItem) => {
    navigation.navigate('ProductDetails', { item });
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

  useEffect(() => {
    fetch('https://fakerestaurantapi.runasp.net/api/Restaurant/items')
      .then(res => res.json())
      .then((json: MenuItem[]) => {
        setPopularItems(json);
        setOriginalItems(json);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching items:', error);
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    if (searchQuery.trim() === '') {
      setPopularItems(originalItems);
    } else {
      const filteredItems = originalItems.filter(item =>
        item.itemName.toLowerCase().includes(searchQuery.toLowerCase()),
      );
      setPopularItems(filteredItems);
    }
  }, [searchQuery, originalItems]);

  const renderItem = ({ item }: { item: MenuItem }) => (
    <TouchableOpacity
      style={styles.itemCard}
      onPress={() => handleProductPress(item)}
    >
      {item.imageUrl ? (
        <Image
          source={{ uri: item.imageUrl }}
          style={styles.itemImage}
          resizeMode="cover"
        />
      ) : (
        <View style={styles.noImagePlaceholder}>
          <MaterialCommunityIcons name="image-off" size={30} color="#999" />
        </View>
      )}
      <View style={styles.itemInfo}>
        <Text style={styles.itemName}>{item.itemName}</Text>
        <Text style={styles.itemPrice}>Rs. {item.itemPrice}</Text>
        <Text style={styles.restaurantName} numberOfLines={1}>
          {item.restaurantName}
        </Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
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
            onChangeText={text => setSearchQuery(text)}
            value={searchQuery}
          />
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
          {loading ? (
            <Text style={styles.loadingText}>Loading...</Text>
          ) : (
            <FlatList
              data={popularItems}
              renderItem={renderItem}
              keyExtractor={item => item.itemID.toString()}
              scrollEnabled={false} // because parent ScrollView handles scroll
              showsVerticalScrollIndicator={false}
            />
          )}
        </View>
      </ScrollView>
    </View>
  );
};

export default MenuScreen;
