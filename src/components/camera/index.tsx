import React, { useEffect, useState, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
  Image,
  Platform,
} from 'react-native';
import { Camera, useCameraDevice } from 'react-native-vision-camera';
import {
  check,
  request,
  PERMISSIONS,
  RESULTS,
  openSettings,
} from 'react-native-permissions';
import Icon from 'react-native-vector-icons/Ionicons';
import { styles } from './styles';

interface CameraComponentProps {
  onPhotoTaken: (photoUri: string) => void;
  onClose: () => void;
}

const CameraComponent: React.FC<CameraComponentProps> = ({
  onPhotoTaken,
  onClose,
}) => {
  const device = useCameraDevice('back');
  const camera = useRef<Camera>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [capturedPhoto, setCapturedPhoto] = useState<string | null>(null);
  const [permissionStatus, setPermissionStatus] = useState<string | null>(null);

  const CAMERA_PERMISSION = Platform.select({
    ios: PERMISSIONS.IOS.CAMERA,
    android: PERMISSIONS.ANDROID.CAMERA,
  });

  useEffect(() => {
    checkCameraPermission();
  }, []);

  const checkCameraPermission = async () => {
    if (!CAMERA_PERMISSION) return;

    try {
      const status = await check(CAMERA_PERMISSION);
      setPermissionStatus(status);

      if (status === RESULTS.DENIED) {
        const requestStatus = await request(CAMERA_PERMISSION);
        setPermissionStatus(requestStatus);
      }
    } catch (error) {
      console.error('Permission check error:', error);
    }
  };

  const handleRequestPermission = async () => {
    if (!CAMERA_PERMISSION) return;

    try {
      const status = await request(CAMERA_PERMISSION);
      setPermissionStatus(status);

      if (status === RESULTS.BLOCKED) {
        Alert.alert(
          'Permission Blocked',
          'Camera permission is blocked. Please enable it in your device settings.',
          [
            { text: 'Cancel', style: 'cancel' },
            { text: 'Open Settings', onPress: () => openSettings() },
          ],
        );
      }
    } catch (error) {
      console.error('Permission request error:', error);
    }
  };

  const takePhoto = async () => {
    if (!camera.current) return;

    try {
      setIsLoading(true);
      const photo = await camera.current.takePhoto({
        flash: 'off',
        enableShutterSound: true,
      });
      setCapturedPhoto(`file://${photo.path}`);
    } catch (error) {
      Alert.alert('Error', 'Failed to take photo. Please try again.');
      console.error('Camera error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleRetake = () => {
    setCapturedPhoto(null);
  };

  const handleUsePhoto = () => {
    if (capturedPhoto) {
      onPhotoTaken(capturedPhoto);
    }
  };

  // Show permission UI if permission is not granted
  if (
    permissionStatus === RESULTS.DENIED ||
    permissionStatus === RESULTS.BLOCKED ||
    permissionStatus === RESULTS.UNAVAILABLE
  ) {
    return (
      <View style={styles.container}>
        <View style={styles.permissionContainer}>
          <Icon name="camera-outline" size={80} color="#999" />
          <Text style={styles.permissionText}>
            {permissionStatus === RESULTS.BLOCKED
              ? 'Camera permission is blocked'
              : permissionStatus === RESULTS.UNAVAILABLE
              ? 'Camera is not available on this device'
              : 'Camera permission is required'}
          </Text>
          {permissionStatus === RESULTS.BLOCKED ? (
            <>
              <TouchableOpacity
                style={styles.permissionButton}
                onPress={() => openSettings()}
              >
                <Text style={styles.permissionButtonText}>Open Settings</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.closeButton} onPress={onClose}>
                <Text style={styles.closeButtonText}>Cancel</Text>
              </TouchableOpacity>
            </>
          ) : permissionStatus === RESULTS.UNAVAILABLE ? (
            <TouchableOpacity style={styles.closeButton} onPress={onClose}>
              <Text style={styles.closeButtonText}>Close</Text>
            </TouchableOpacity>
          ) : (
            <>
              <TouchableOpacity
                style={styles.permissionButton}
                onPress={handleRequestPermission}
              >
                <Text style={styles.permissionButtonText}>
                  Grant Permission
                </Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.closeButton} onPress={onClose}>
                <Text style={styles.closeButtonText}>Cancel</Text>
              </TouchableOpacity>
            </>
          )}
        </View>
      </View>
    );
  }

  // Show loading while checking permission
  if (permissionStatus === null) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#FF6B6B" />
        <Text style={styles.loadingText}>Checking permissions...</Text>
      </View>
    );
  }

  if (!device) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#FF6B6B" />
        <Text style={styles.loadingText}>Loading camera...</Text>
      </View>
    );
  }

  // Preview captured photo
  if (capturedPhoto) {
    return (
      <View style={styles.container}>
        <Image source={{ uri: capturedPhoto }} style={styles.preview} />
        <View style={styles.previewControls}>
          <TouchableOpacity style={styles.retakeButton} onPress={handleRetake}>
            <Icon name="refresh" size={24} color="#FFF" />
            <Text style={styles.retakeText}>Retake</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.useButton} onPress={handleUsePhoto}>
            <Icon name="checkmark-circle" size={24} color="#FFF" />
            <Text style={styles.useText}>Use Photo</Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity style={styles.topCloseButton} onPress={onClose}>
          <Icon name="close" size={30} color="#FFF" />
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Camera
        ref={camera}
        style={StyleSheet.absoluteFill}
        device={device}
        isActive={true}
        photo={true}
      />

      {/* Top Controls */}
      <View style={styles.topControls}>
        <TouchableOpacity style={styles.topCloseButton} onPress={onClose}>
          <Icon name="close" size={30} color="#FFF" />
        </TouchableOpacity>
      </View>

      {/* Bottom Controls */}
      <View style={styles.bottomControls}>
        <View style={styles.captureButtonContainer}>
          <TouchableOpacity
            style={styles.captureButton}
            onPress={takePhoto}
            disabled={isLoading}
          >
            {isLoading ? (
              <ActivityIndicator color="#FFF" />
            ) : (
              <View style={styles.captureButtonInner} />
            )}
          </TouchableOpacity>
        </View>
        <Text style={styles.instructionText}>Tap to capture your burger</Text>
      </View>
    </View>
  );
};

export default CameraComponent;
