import React from 'react';
import { TouchableOpacity, View, Text, StyleSheet } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { Home, UserCircle, PlusCircle, ShoppingCart } from 'lucide-react-native'; 
import { useCartStore } from '../../../stores/cartStore';  
import { styles } from './styles';


export const TabBar = () => {
  const navigation = useNavigation();
  const route = useRoute();

  const tabs = [
    { name: 'ProductList', icon: Home },
    { name: 'AddProduct', icon: PlusCircle },
    { name: 'Cart', icon: ShoppingCart },          
    { name: 'ProfileEdit', icon: UserCircle },
  ];

  const cartCount = useCartStore((state) => state.items.length);
  
  return (
    <View style={styles.container}>
      {tabs.map(({ name, icon: Icon }) => {
        const isActive = route.name === name;

        const color =
          name === 'ProfileEdit' || name === 'AddProduct'
            ? '#000'
            : isActive
            ? '#000'
            : '#000';

        return (
          <TouchableOpacity
            key={name}
            style={styles.tabButton}
            onPress={() => navigation.navigate(name as never)}
          >
            <View>
              <Icon size={28} color={color} strokeWidth={2} />
              {name === 'Cart' && cartCount >=0 && (
                <View style={styles.badge}>
                  <Text style={styles.badgeText}>
                    {cartCount > 99 ? '99+' : cartCount}
                  </Text>
                </View>
              )}
            </View>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

