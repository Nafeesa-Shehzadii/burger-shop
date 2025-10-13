import { StyleSheet } from "react-native";
import { scale, verticalScale, moderateScale } from 'react-native-size-matters';

export const styles = StyleSheet.create({
    container: {
      position: 'absolute',
      bottom: 0,
      left: 0,
      right: 0,
      flexDirection: 'row',
      backgroundColor: '#FFFFFF',
      paddingVertical: verticalScale(12),
      paddingBottom: verticalScale(20),
      borderTopWidth: 1,
      borderTopColor: '#E0E0E0',
      shadowColor: '#000',
      shadowOffset: { width: 0, height: verticalScale(-2) },
      shadowOpacity: 0.1,
      shadowRadius: moderateScale(8),
      elevation: 10,
    },
    tab: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
    },
    iconContainer: {
      position: 'relative',
      padding: moderateScale(8),
    },
    activeIcon: {
      backgroundColor: '#E8EDFF',
      borderRadius: moderateScale(12),
    },
    icon: {
      fontSize: moderateScale(24),
    },
    activeDot: {
      width: scale(6),
      height: verticalScale(6),
      borderRadius: moderateScale(3),
      backgroundColor: '#3D5CFF',
      marginTop: verticalScale(4),
    },
    badge: {
      position: 'absolute',
      top: verticalScale(2),
      right: scale(2),
      backgroundColor: '#FF6B6B',
      borderRadius: moderateScale(10),
      minWidth: scale(18),
      height: verticalScale(18),
      alignItems: 'center',
      justifyContent: 'center',
      paddingHorizontal: scale(4),
    },
    badgeText: {
      color: '#FFFFFF',
      fontSize: moderateScale(10),
      fontWeight: 'bold',
    },
  });