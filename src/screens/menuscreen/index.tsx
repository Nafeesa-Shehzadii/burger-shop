import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, Image } from 'react-native';
import { styles } from './styles';

type Props = {
  onProductPress?: () => void;
};

const MenuScreen = ({ onProductPress }: Props) => {
  const categories = [
    { id: '1', name: 'All', emoji: '🍔', color: '#FF6B6B' },
    { id: '2', name: 'Burger', emoji: '🍔', color: '#4ECDC4' },
    { id: '3', name: 'Pizza', emoji: '🍕', color: '#FFE66D' },
    { id: '4', name: 'Drinks', emoji: '🥤', color: '#95E1D3' },
  ];

  const popularItems = [
    { id: '1', name: 'Beef Burger', price: '$20', rating: 4.8 },
    { id: '2', name: 'Cheese Burger', price: '$18', rating: 4.6 },
    { id: '3', name: 'Chicken Burger', price: '$15', rating: 4.7 },
  ];

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Menu</Text>
        <TouchableOpacity style={styles.cartIcon}>
          <Text style={styles.cartIconText}>🛒</Text>
          <View style={styles.cartBadge}>
            <Text style={styles.cartBadgeText}>2</Text>
          </View>
        </TouchableOpacity>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Search Bar */}
        <View style={styles.searchContainer}>
          <Text style={styles.searchIcon}>🔍</Text>
          <Text style={styles.searchPlaceholder}>Search</Text>
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
              <Text style={styles.categoryEmoji}>{category.emoji}</Text>
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
              <Text style={styles.promotionEmoji}>🍟</Text>
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
              onPress={onProductPress} // Add this line
            >
              <View style={styles.itemImagePlaceholder}>
                <Text style={styles.itemEmoji}>🍔</Text>
              </View>
              <View style={styles.itemInfo}>
                <Text style={styles.itemName}>{item.name}</Text>
                <Text style={styles.itemPrice}>{item.price}</Text>
              </View>
              <View style={styles.ratingBadge}>
                <Text style={styles.ratingText}>⭐ {item.rating}</Text>
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </View>
  );
};

export default MenuScreen;
