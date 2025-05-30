import React from 'react';
import { View, Text, FlatList, TouchableOpacity, SafeAreaView } from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useNavigation } from '@react-navigation/native';
import { RootStackParamList } from '../../../navigation/navigation'; 
import { styles } from './styles';
import { ProductInCart } from '../../organisms/ProductInCart';
import { useCartStore } from '../../../stores/cartStore';
import { Button } from '../../atoms/Button'; 
import { ButtonVariant } from '../../atoms/Button/Button.type';
import { SwipeListView } from 'react-native-swipe-list-view';

type NavigationProp = NativeStackNavigationProp<RootStackParamList, 'Cart'>;

export const CartScreen = () => {
  const navigation = useNavigation<NavigationProp>();

  const cartItems = useCartStore((state) => state.items);
  const removeFromCart = useCartStore((state) => state.removeFromCart);
  const increment = useCartStore((state) => state.increment);
  const decrement = useCartStore((state) => state.decrement);

  const handleStartShopping = () => {
    navigation.navigate('ProductList');
  };

  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  const handleCheckout = () => {
  };

  return (
   <SafeAreaView style={styles.container}>
      {cartItems.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>Your shopping basket is empty</Text>
          <Text style={styles.emptySubText}>What are you waiting for?</Text>
          <TouchableOpacity style={styles.shopButton} onPress={handleStartShopping}>
            <Text style={styles.shopButtonText}>START SHOPPING</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <View style={styles.cartWrapper}>
          {/* Upper scrollable cart list */}
          <View style={styles.listContainer}>
          <SwipeListView
          data={cartItems}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <ProductInCart
              item={item}
              onIncrement={() => increment(item.id)}
              onDecrement={() => decrement(item.id)}
              onRemove={() => {}} 
              onPress={() => navigation.navigate('ProductDetail', { productId: item.id })}

            />
          )}
          renderHiddenItem={({ item }) => (
            <View style={styles.rowBack}>
              <TouchableOpacity
                style={styles.deleteButton}
                onPress={() => removeFromCart(item.id)}
              >
                <Text style={styles.deleteButtonText}>Delete</Text>
              </TouchableOpacity>
            </View>
          )}
          leftOpenValue={0}
          rightOpenValue={-75}
          disableRightSwipe
          previewRowKey={cartItems.length > 0 ? cartItems[0].id.toString() : undefined}
          previewOpenValue={-40}
          previewOpenDelay={3000}
        />

          </View>

          {/* Bottom fixed checkout summary */}
          <View style={styles.orderSummaryContainer}>
            <Text style={styles.summaryTitle}>Order Summary</Text>
            <Text style={styles.summarySubtext}>Subtotal ({totalItems} items)</Text>

            <View style={styles.summaryRow}>
              <Text style={styles.summaryLabel}>Order Totals</Text>
              <Text style={styles.summaryValue}>${subtotal.toFixed(2)}</Text>
            </View>

            <View style={styles.summaryRow}>
              <Text style={styles.totalLabel}>Total</Text>
              <Text style={styles.totalValue}>${subtotal.toFixed(2)}</Text>
            </View>

            <Button
              variant={ButtonVariant.PRIMARY}
              onPress={() => {}}
              disabled={false}
            >
              CHECKOUT NOW
            </Button>
          </View>
        </View>
      )}
    </SafeAreaView>
  );
};
