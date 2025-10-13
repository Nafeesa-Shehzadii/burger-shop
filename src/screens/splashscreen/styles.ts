import { StyleSheet }  from 'react-native';
import { scale, verticalScale, moderateScale } from 'react-native-size-matters';

export const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#3D5CFF',
      alignItems: 'center',
      justifyContent: 'center',
      paddingHorizontal: scale(20),
    },
    imageContainer: {
      marginBottom: verticalScale(40),
    },
    imagePlaceholder: {
      width: scale(180),
      height: scale(180),
      borderRadius: scale(90),
      backgroundColor: '#FFFFFF',
      alignItems: 'center',
      justifyContent: 'center',
      overflow: 'hidden',
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: verticalScale(4),
      },
      shadowOpacity: 0.3,
      shadowRadius: moderateScale(8),
      elevation: 8,
    },
    imagePlaceholderText: {
      width: scale(180),
      height: scale(180),
      borderRadius: scale(90),
    },
    title: {
      fontSize: moderateScale(36),
      fontWeight: 'bold',
      color: '#FFFFFF',
      textAlign: 'center',
    },
    button: {
      backgroundColor: '#FFFFFF',
      paddingHorizontal: scale(40),
      paddingVertical: verticalScale(14),
      borderRadius: moderateScale(25),
      marginTop: verticalScale(50),
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: verticalScale(2),
      },
      shadowOpacity: 0.2,
      shadowRadius: moderateScale(4),
      elevation: 4,
    },
    buttonText: {
      color: '#3D5CFF',
      fontSize: moderateScale(16),
      fontWeight: '600',
    },
  });