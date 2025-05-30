import React from 'react';
import { TouchableOpacity, View, Image, Text, Pressable } from 'react-native';
import { getStyles } from './styles';
import { useThemeStore } from '../../../stores/themeStore';
import { ShoppingCart, Share2 } from 'lucide-react-native';

type Props = {
  title: string;
  price: number;
  imageUrl: string;
  onPress: () => void;
  onAddToCart: () => void;
  cartQuantity?: number; 
  onShare: () => void;  

};

export const ProductCard: React.FC<Props> = ({ title, price, imageUrl, onPress, onAddToCart, cartQuantity, onShare }) => {
  const { theme } = useThemeStore();
  const styles = getStyles(theme);


return (
  <Pressable style={styles.card} onPress={onPress}   testID="product-card">
  <View style={styles.imageContainer}>
    <Image source={{ uri: imageUrl }} style={styles.image} />

    <TouchableOpacity
      style={styles.shareIconContainer} testID="share-icon"
      onPress={e => {
        e.stopPropagation(); 
        onShare();
      }}
      activeOpacity={0.7}
      

    >
      <Share2
        color={theme === 'dark' ? 'white' : '#007bff'}
        width={20}
        height={20}
      />
    </TouchableOpacity>
  </View>

  <View style={styles.details}>
    <Text style={styles.title}>{title}</Text>
    <Text style={styles.price} numberOfLines={1} ellipsizeMode="tail">${price}</Text>
  </View>

  <TouchableOpacity onPress={onAddToCart} activeOpacity={0.7} style={styles.cartIconContainer}testID="cart-icon">
    <ShoppingCart
      color={theme === 'dark' ? 'white' : '#007bff'}
      width={24}
      height={24}
    />

    {typeof cartQuantity === 'number' && cartQuantity > 0 && (
      <View style={styles.cartBadge}>
        <Text style={styles.cartBadgeText}>{cartQuantity}</Text>
      </View>
    )}
  </TouchableOpacity>
</Pressable>

);


};

export default ProductCard;
