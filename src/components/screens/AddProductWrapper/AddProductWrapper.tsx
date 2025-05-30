import React from 'react';
import { ProductFormScreen, type FormData as ProductFormData } from '../ProductFormScreen';
import { useNavigation } from '@react-navigation/native';
import { Alert } from 'react-native';
import axios from '../../../services/axios';
import { triggerLocalNotification } from '../../../utils/notificationHandler'; 

export const AddProductWrapper = () => {
  const navigation = useNavigation();


const handleAddProduct = async (
  data: ProductFormData,
  images: any[],
  location: any
) => {
  if (!location) {
    Alert.alert('Validation Error', 'Please select a location');
    return;
  }

  if (images.length === 0) {
    Alert.alert('Validation Error', 'Please select at least one image');
    return;
  }

  const formData = new FormData();

  formData.append('title', data.title);
  formData.append('description', data.description);
  formData.append('price', data.price.toString());
  formData.append('location', JSON.stringify(location));

  images.forEach((img, index) => {
    formData.append('images', {
      uri: img.uri,
      name: img.name || `image_${index}.jpg`,
      type: img.type || 'image/jpeg',
    } as any);
  });

  try {
    const response = await axios.post('/api/products', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });

    if (response.data.success) {
      const productId = response.data.data._id;

      triggerLocalNotification(productId);

      Alert.alert('Success', 'Product added successfully');
      navigation.goBack();
    } else {
      Alert.alert('Error', 'Failed to add product');
    }
  } catch (error) {
    console.error(error);
    Alert.alert('Error', 'Failed to add product');
  }
};


  return (
    <ProductFormScreen
      onSubmitHandler={handleAddProduct}
      initialValues={{ title: '', description: '', price: 0 }}
      initialImages={[]}
      initialLocation={null}
      isEditing={false}
      submitButtonLabel="Add Product"
      titleText="Add New Product"
    />
  );
};
