import React, { useEffect } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useAuthStore } from '../stores/authStore';
import { LoginScreen } from '../components/screens/LoginScreen';
import { SignupScreen } from '../components/screens/SignupScreen';
import { VerificationScreen } from '../components/screens/VerificationScreen';
import { ProductListScreen } from '../components/screens/ProductListScreen';
import { ProductDetailScreen } from '../components/screens/ProductDetailsScreen';
import { ActivityIndicator, View } from 'react-native';
import { ProfileEditScreen } from '../components/screens/editprofile';
import { AddProductWrapper } from '../components/screens/AddProductWrapper';
import { EditProductWrapper } from '../components/screens/EditProductWrapper';
import { CartScreen } from '../components/screens/CartScreen';
import { getPendingDeepLink, clearPendingDeepLink } from '../utils/notificationHandler'; 
import { Linking } from 'react-native';


export type RootStackParamList = {
  Login: undefined;
  SignUp: { email: string };
  Verification: { email: string };
  ProductList: undefined;
  ProductDetail: { productId: string };
  ProfileEdit: undefined;
  AddProduct: undefined;
  Cart: undefined;
  EditProduct: { productId: string };
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export const AuthNavigator: React.FC = () => {
  const { isLoggedIn, isVerified, isAuthLoading, restoreSession } = useAuthStore();

  useEffect(() => {
    restoreSession();
  }, []);
  useEffect(() => {
  if (isLoggedIn && isVerified) {
    const url = getPendingDeepLink();
    if (url) {
      clearPendingDeepLink();
      Linking.openURL(url).catch(err =>
        console.error('Failed to open deep link after auth:', err)
      );
    }
  }
}, [isLoggedIn, isVerified]);

  if (isAuthLoading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="small" />
      </View>
    );
  }

  console.log('[AuthNavigator]', { isLoggedIn, isVerified });

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {!isLoggedIn && (
        <>
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="SignUp" component={SignupScreen} />
        </>
      )}
      {isLoggedIn && !isVerified && (
        <Stack.Screen name="Verification" component={VerificationScreen} />
      )}
      {isLoggedIn && isVerified && (
        <>
          <Stack.Screen name="ProductList" component={ProductListScreen} />
          <Stack.Screen name="ProductDetail" component={ProductDetailScreen} />
          <Stack.Screen name="ProfileEdit" component={ProfileEditScreen} />
          <Stack.Screen name="AddProduct" component={AddProductWrapper} />
          <Stack.Screen name="EditProduct" component={EditProductWrapper} />
          <Stack.Screen name="Cart" component={CartScreen} />
        </>
      )}
    </Stack.Navigator>
  );
};
