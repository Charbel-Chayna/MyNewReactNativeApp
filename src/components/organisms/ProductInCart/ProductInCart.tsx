import React from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import { Trash } from 'lucide-react-native';
import { styles } from './styles';

interface ProductInCartProps {
  item: {
    id: string;
    title: string;
    description: string;
    image: string;
    price: number;
    quantity: number;
  };
  onPress?: () => void; 
  onIncrement: () => void;
  onRemove?: () => void;   
  onDecrement: () => void;
}

export const ProductInCart = ({ item, onRemove, onIncrement, onDecrement, onPress }: ProductInCartProps) => {
  return (
    <TouchableOpacity
    onPress={onPress}
    activeOpacity={0.8}
    style={styles.productContainer}
  >
    <Image source={{ uri: item.image }} style={styles.productImage} />
    <View style={styles.productInfo}>
      <Text style={styles.title}>{item.title}</Text>
      <Text style={styles.description}>{item.description}</Text>
      <View style={styles.removeButton}>
        <Text style={styles.removeButtonText}>← Swipe to remove</Text>
      </View>
    </View>
    <View style={styles.priceSection}>
      <Text style={styles.price}>${item.price}</Text>
      <View style={styles.quantityContainer}>
        <TouchableOpacity style={styles.quantityButton} onPress={onDecrement}>
          <Text style={styles.quantityText}>-</Text>
        </TouchableOpacity>
        <Text style={styles.quantity}>{item.quantity}</Text>
        <TouchableOpacity style={styles.quantityButton} onPress={onIncrement}>
          <Text style={styles.quantityText}>+</Text>
        </TouchableOpacity>
      </View>
    </View>
  </TouchableOpacity>
  );
};
