import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Image,
  Alert,
  Modal,
} from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { RouteProp } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';
import type { RootStackParamList } from '../../navigation/types';
import CameraComponent from '../../components/camera';
import { styles } from './styles';

type NavigationProp = NativeStackNavigationProp<RootStackParamList, 'Review'>;
type RouteProps = RouteProp<RootStackParamList, 'Review'>;

const ReviewScreen = () => {
  const navigation = useNavigation<NavigationProp>();
  const route = useRoute<RouteProps>();
  const { item } = route.params;

  const [rating, setRating] = useState(0);
  const [reviewText, setReviewText] = useState('');
  const [photos, setPhotos] = useState<string[]>([]);
  const [showCamera, setShowCamera] = useState(false);

  const handlePhotoTaken = (photoUri: string) => {
    setPhotos([...photos, photoUri]);
    setShowCamera(false);
  };

  const removePhoto = (index: number) => {
    setPhotos(photos.filter((_, i) => i !== index));
  };

  const handleSubmitReview = () => {
    if (rating === 0) {
      Alert.alert(
        'Rating Required',
        'Please select a rating before submitting.',
      );
      return;
    }

    if (reviewText.trim() === '') {
      Alert.alert(
        'Review Required',
        'Please write a review before submitting.',
      );
      return;
    }

    // Here you would typically send the review to your backend
    Alert.alert(
      'Review Submitted!',
      `Thank you for reviewing ${item.itemName}!\n\nRating: ${rating} stars\nPhotos: ${photos.length}`,
      [
        {
          text: 'OK',
          onPress: () => navigation.goBack(),
        },
      ],
    );
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Icon name="arrow-back" size={24} color="#FFF" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Write a Review</Text>
        <View style={styles.placeholder} />
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Product Info */}
        <View style={styles.productInfo}>
          {item.imageUrl ? (
            <Image
              source={{ uri: item.imageUrl }}
              style={styles.productImage}
            />
          ) : (
            <View style={styles.productImagePlaceholder}>
              <Icon name="fast-food" size={40} color="#999" />
            </View>
          )}
          <View style={styles.productDetails}>
            <Text style={styles.productName}>{item.itemName}</Text>
            <Text style={styles.restaurantName}>{item.restaurantName}</Text>
          </View>
        </View>

        {/* Rating */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Your Rating</Text>
          <View style={styles.starsContainer}>
            {[1, 2, 3, 4, 5].map(star => (
              <TouchableOpacity
                key={star}
                onPress={() => setRating(star)}
                style={styles.starButton}
              >
                <Icon
                  name={star <= rating ? 'star' : 'star-outline'}
                  size={40}
                  color={star <= rating ? '#FFD700' : '#DDD'}
                />
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Review Text */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Your Review</Text>
          <TextInput
            style={styles.reviewInput}
            placeholder="Share your experience with this burger..."
            placeholderTextColor="#999"
            multiline
            numberOfLines={6}
            value={reviewText}
            onChangeText={setReviewText}
            textAlignVertical="top"
          />
        </View>

        {/* Photos */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Add Photos</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            <View style={styles.photosContainer}>
              {/* Add Photo Button */}
              <TouchableOpacity
                style={styles.addPhotoButton}
                onPress={() => setShowCamera(true)}
              >
                <Icon name="camera" size={32} color="#FF6B6B" />
                <Text style={styles.addPhotoText}>Take Photo</Text>
              </TouchableOpacity>

              {/* Photo Previews */}
              {photos.map((photo, index) => (
                <View key={index} style={styles.photoPreview}>
                  <Image source={{ uri: photo }} style={styles.photoImage} />
                  <TouchableOpacity
                    style={styles.removePhotoButton}
                    onPress={() => removePhoto(index)}
                  >
                    <Icon name="close-circle" size={24} color="#FF6B6B" />
                  </TouchableOpacity>
                </View>
              ))}
            </View>
          </ScrollView>
        </View>

        {/* Submit Button */}
        <TouchableOpacity
          style={styles.submitButton}
          onPress={handleSubmitReview}
        >
          <Text style={styles.submitButtonText}>Submit Review</Text>
        </TouchableOpacity>
      </ScrollView>

      {/* Camera Modal */}
      <Modal
        visible={showCamera}
        animationType="slide"
        presentationStyle="fullScreen"
      >
        <CameraComponent
          onPhotoTaken={handlePhotoTaken}
          onClose={() => setShowCamera(false)}
        />
      </Modal>
    </View>
  );
};

export default ReviewScreen;
