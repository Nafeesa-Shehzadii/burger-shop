import { StyleSheet }  from 'react-native';
export const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#3D5CFF',
      alignItems: 'center',
      justifyContent: 'center',
      paddingHorizontal: 20,
    },
    imageContainer: {
      marginBottom: 40,
    },
    imagePlaceholder: {
      width: 180,
      height: 180,
      borderRadius: 90,
      backgroundColor: '#FFFFFF',
      alignItems: 'center',
      justifyContent: 'center',
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 4,
      },
      shadowOpacity: 0.3,
      shadowRadius: 8,
      elevation: 8,
    },
    imagePlaceholderText: {
      fontSize: 80,
    },
    title: {
      fontSize: 36,
      fontWeight: 'bold',
      color: '#FFFFFF',
      textAlign: 'center',
      lineHeight: 44,
    },
    button: {
      backgroundColor: '#FFFFFF',
      paddingHorizontal: 40,
      paddingVertical: 14,
      borderRadius: 25,
      marginTop: 50,
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.2,
      shadowRadius: 4,
      elevation: 4,
    },
    buttonText: {
      color: '#3D5CFF',
      fontSize: 16,
      fontWeight: '600',
    },
  });