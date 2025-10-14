import React from 'react';
import { View, TouchableOpacity, Text } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { styles } from './styles';

type Tab = 'home' | 'search' | 'cart' | 'profile';

type Props = {
  activeTab: Tab;
  onTabPress: (tab: Tab) => void;
  cartCount?: number;
};

const BottomNav = ({ activeTab, onTabPress, cartCount = 0 }: Props) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.tab} onPress={() => onTabPress('home')}>
        <View
          style={[
            styles.iconContainer,
            activeTab === 'home' && styles.activeIcon,
          ]}
        >
          <Icon name="home" size={24} color={activeTab === 'home' ? '#FF6B6B' : '#999'} />
        </View>
        <View style={[styles.activeDot, activeTab !== 'home' && { opacity: 0 }]} />
      </TouchableOpacity>

      <TouchableOpacity style={styles.tab} onPress={() => onTabPress('search')}>
        <View
          style={[
            styles.iconContainer,
            activeTab === 'search' && styles.activeIcon,
          ]}
        >
          <Icon name="search" size={24} color={activeTab === 'search' ? '#FF6B6B' : '#999'} />
        </View>
        <View style={[styles.activeDot, activeTab !== 'search' && { opacity: 0 }]} />
      </TouchableOpacity>

      <TouchableOpacity style={styles.tab} onPress={() => onTabPress('cart')}>
        <View
          style={[
            styles.iconContainer,
            activeTab === 'cart' && styles.activeIcon,
          ]}
        >
          <Icon name="cart" size={24} color={activeTab === 'cart' ? '#FF6B6B' : '#999'} />
          <View style={[styles.badge, cartCount === 0 && { opacity: 0 }]}>
            <Text style={styles.badgeText}>{cartCount || 0}</Text>
          </View>
        </View>
        <View style={[styles.activeDot, activeTab !== 'cart' && { opacity: 0 }]} />
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.tab}
        onPress={() => onTabPress('profile')}
      >
        <View
          style={[
            styles.iconContainer,
            activeTab === 'profile' && styles.activeIcon,
          ]}
        >
          <Icon name="person" size={24} color={activeTab === 'profile' ? '#FF6B6B' : '#999'} />
        </View>
        <View style={[styles.activeDot, activeTab !== 'profile' && { opacity: 0 }]} />
      </TouchableOpacity>
    </View>
  );
};

export default BottomNav;
