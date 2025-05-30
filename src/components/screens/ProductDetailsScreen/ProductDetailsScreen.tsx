import React, { useEffect, useState, useCallback } from 'react';
import { SafeAreaView, ActivityIndicator, Alert } from 'react-native';
import { RouteProp, useRoute, useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import API from '../../../services/axios';
import { ProductDetail, ProductDetailProps } from '../../organisms/ProductDetail/ProductDetail';
import { useAuthStore } from '../../../stores/authStore';
import * as Animatable from 'react-native-animatable';
import styles from './styles';

export type RootStackParamList = {
  ProductList: undefined;
  ProductDetail: { productId: string };
  EditProduct: { productId: string };
};

type DetailRouteProp = RouteProp<RootStackParamList, 'ProductDetail'>;
type DetailNavProp = NativeStackNavigationProp<RootStackParamList, 'ProductDetail'>;

const DEFAULT_OWNER = { _id: '', email: '' };

export const ProductDetailScreen: React.FC = () => {
  const { params } = useRoute<DetailRouteProp>();
  const navigation = useNavigation<DetailNavProp>();
  const accessToken = useAuthStore(state => state.accessToken);
  const userId = useAuthStore(state => (state as any).userId);
  const [product, setProduct] = useState<ProductDetailProps | null>(null);
  const [loading, setLoading] = useState(true);

 const handleDelete = useCallback(() => {
  Alert.alert('Confirm Delete', 'Are you sure you want to delete this product?', [
    { text: 'Cancel', style: 'cancel' },
    {
      text: 'Delete',
      style: 'destructive',
      onPress: async () => {
        try {
          await API.delete(`/api/products/${params.productId}`, {
            headers: { Authorization: `Bearer ${accessToken}` },
          });
          Alert.alert('Deleted', 'Your product has been removed');

          if (navigation.canGoBack()) {
            navigation.goBack();
          } else {
            navigation.navigate('ProductList'); 
          }
        } catch (error: any) {
          console.error('[ProductDetailScreen] delete failed:', error);
          Alert.alert(
            'Error',
            error.response?.status === 521
              ? 'Service temporarily unavailable.'
              : 'Could not delete product'
          );
        }
      },
    },
  ]);
}, [params.productId, accessToken, navigation]);


 const MAX_RETRIES = 3;

const fetchProduct = useCallback(
  async (retries = 0): Promise<void> => {
    try {
      const response = await API.get(`/api/products/${params.productId}`, {
        headers: { Authorization: `Bearer ${accessToken}` },
      });
      const d = response.data.data || response.data;

      setProduct({
        id: d._id,
        title: d.title,
        description: d.description,
        price: typeof d.price === 'number' ? d.price : 0,
        images: Array.isArray(d.images) ? d.images : [],
        location:
          d.location?.latitude && d.location?.longitude
            ? d.location
            : { latitude: 0, longitude: 0 },
        owner: d.user ? { _id: d.user._id, email: d.user.email } : DEFAULT_OWNER,
        currentUserId: userId || '',
        onDelete: handleDelete,
        onEdit: () => navigation.navigate('EditProduct', { productId: params.productId }),
      });
      setLoading(false);
    } catch (error: any) {
      if (
        retries < MAX_RETRIES &&
        (error.response?.status === 521 || error.code === 'ECONNABORTED')
      ) {
        const delay = 1000 * 2 ** retries; 
        await new Promise(res => setTimeout(res, delay));
        return fetchProduct(retries + 1);
      }
      console.error('[ProductDetailScreen] fetchProduct failed:', error);
      Alert.alert(
        'Error',
        error.response?.status === 521
          ? 'Service temporarily unavailable. Please try again later.'
          : 'Failed to load product details'
      );
      setLoading(false);
      navigation.goBack();
    }
  },
  [params.productId, accessToken, handleDelete, navigation, userId]
);

  useEffect(() => {
    fetchProduct();
  }, [fetchProduct]);

  if (loading) {
    return (
      <SafeAreaView style={[styles.container, { justifyContent: 'center', alignItems: 'center' }]}>
        <ActivityIndicator size="large" />
      </SafeAreaView>
    );
  }

  if (!product) return null;

 return (
  <SafeAreaView style={styles.container}>
<Animatable.View animation="fadeInUp" duration={4000} style={{ flex: 1 }}>
      <ProductDetail {...product} />
    </Animatable.View>
  </SafeAreaView>
);

};

export default ProductDetailScreen;
