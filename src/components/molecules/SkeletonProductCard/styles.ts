import { StyleSheet } from 'react-native';

export const getStyles = (cardWidth: number) =>
  StyleSheet.create({
    card: {
      width: cardWidth,
      height: 180,
      borderRadius: 8,
      marginBottom: 10,
    },
    image: {
      width: '100%',
      height: 120,
      borderRadius: 8,
    },
    title: {
      marginTop: 10,
      width: '80%',
      height: 20,
      borderRadius: 4,
    },
    price: {
      marginTop: 6,
      width: '40%',
      height: 20,
      borderRadius: 4,
    },
  });
