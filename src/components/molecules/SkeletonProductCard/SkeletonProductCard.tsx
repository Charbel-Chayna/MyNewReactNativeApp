import React from 'react';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
import { View, Dimensions } from 'react-native';
import { getStyles } from './styles';

const { width } = Dimensions.get('window');
const CARD_WIDTH = (width - 40) / 2; 

export const SkeletonProductCard: React.FC = () => {
  const styles = getStyles(CARD_WIDTH);

  return (
    <SkeletonPlaceholder>
      <View style={styles.card}>
        <View style={styles.image} />
        <View style={styles.title} />
        <View style={styles.price} />
      </View>
    </SkeletonPlaceholder>
  );
};
