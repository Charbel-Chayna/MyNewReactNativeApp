import { StyleSheet, Dimensions, PixelRatio } from 'react-native';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

const scaleFont = (size: number) => {
  const scale = SCREEN_WIDTH / 375;
  const newSize = size * scale;
  return Math.round(PixelRatio.roundToNearestPixel(newSize));
};

const scaleSize = (size: number) => {
  const scale = SCREEN_WIDTH / 375;
  const newSize = size * scale;
  return Math.round(PixelRatio.roundToNearestPixel(newSize));
};

const LIST_PADDING = scaleSize(16);
const SPACE_BETWEEN = scaleSize(12);
const CARD_WIDTH = (SCREEN_WIDTH - 2 * LIST_PADDING - SPACE_BETWEEN) / 2;

export const getStyles = (theme: 'light' | 'dark') =>
  StyleSheet.create({
    shareIconContainer: {
  position: 'absolute',
  top: 8,
  right: 2,
  backgroundColor: 'rgba(162, 152, 152, 0.2)',
  padding: 6,
  borderRadius: 20,
  zIndex: 10,
},
    card: {
      width: CARD_WIDTH,
      marginBottom: SPACE_BETWEEN,
      borderWidth: 1,
      borderColor: theme === 'dark' ? '#333' : '#ddd',
      borderRadius: 10,
      overflow: 'hidden',
      backgroundColor: theme === 'dark' ? '#0a1a2f' : '#fff',
      elevation: 3,
      flexDirection: 'column',
    },
    imageContainer: {
      width: '100%',
      height: CARD_WIDTH,
      backgroundColor: theme === 'dark' ? '#0a1a2f' : '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
    image: {
      width: '80%',
      height: '80%',
      resizeMode: 'contain',
    },
    details: {
      padding: scaleSize(8),
      alignItems: 'center',
      flex: 1,
      justifyContent: 'space-between',
      minHeight: 50,
    },
    title: {
      fontSize: scaleFont(16),
      marginBottom: scaleSize(4),
      textAlign: 'center',
      fontFamily: 'Poppins-Bold',  
      flexShrink: 1,
      color: theme === 'dark' ? 'white' : 'black',
    },
    price: {
      fontSize: scaleFont(14),
      fontFamily: 'Poppins-Bold', 
      color: '#007bff',
      textAlign: 'center',
      marginTop: 'auto',
    },
    cartIconContainer: {
      position: 'absolute',
      bottom: 10,
      right: 10,
      alignItems: 'center',
      justifyContent: 'center',
    },
    cartBadge: {
      position: 'absolute',
      top: -6,
      right: -6,
      backgroundColor: 'red',
      borderRadius: 10,
      minWidth: 16,
      height: 16,
      paddingHorizontal: 3,
      justifyContent: 'center',
      alignItems: 'center',
    },
    cartBadgeText: {
      color: 'white',
      fontSize: 10,
      fontWeight: 'bold',
    },
  });
