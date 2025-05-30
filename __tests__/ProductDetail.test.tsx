import React from 'react';
import { Alert, Linking, Share } from 'react-native';
import { render, fireEvent } from '@testing-library/react-native';
import * as cartStore from '../src/stores/cartStore';
import { ProductDetail } from '../src/components/organisms/ProductDetail';

jest.mock('../src/stores/themeStore', () => ({
  useThemeStore: () => ({ theme: 'light' }),
}));

jest.mock('../src/stores/cartStore', () => ({
  useCartStore: () => ({
    addToCart: jest.fn(),
  }),
}));

jest.mock('../src/services/axios', () => ({
  defaults: { baseURL: 'https://example.com' },
}));

jest.spyOn(Linking, 'openURL').mockImplementation(() => Promise.resolve());
jest.spyOn(Share, 'share').mockImplementation(() =>
  Promise.resolve({ action: Share.sharedAction })
);
jest.spyOn(Alert, 'alert').mockImplementation(() => {});

describe('ProductDetail', () => {
  const defaultProps = {
    id: '123',
    title: 'Test Product',
    description: 'This is a test product',
    price: 42.5,
    images: [{ url: '/image1.jpg' }],
    location: { latitude: 10, longitude: 20 },
    owner: { _id: 'owner123', email: 'owner@example.com' },
    currentUserId: 'currentUser123',
    onDelete: jest.fn(),
    onEdit: jest.fn(),
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders product details correctly', () => {
    const { getByText } = render(<ProductDetail {...defaultProps} />);
    expect(getByText('Test Product')).toBeTruthy();
    expect(getByText('$42.50')).toBeTruthy();
    expect(getByText('This is a test product')).toBeTruthy();
  });

  it('calls Linking.openURL with mailto on Contact Owner press', () => {
    const { getByText } = render(<ProductDetail {...defaultProps} />);
    fireEvent.press(getByText('Contact Owner'));
    expect(Linking.openURL).toHaveBeenCalledWith('mailto:owner@example.com');
  });

  it('calls Share.share on Share button press', () => {
    const { getByText } = render(<ProductDetail {...defaultProps} />);
    fireEvent.press(getByText('Share'));
    expect(Share.share).toHaveBeenCalled();
  });

  it('calls addToCart and shows alert on Add to Cart button press', () => {
    const { addToCart } = cartStore.useCartStore();

    const { getByText } = render(<ProductDetail {...defaultProps} />);
    fireEvent.press(getByText('Add to Cart'));

    expect(addToCart).toHaveBeenCalledWith(defaultProps.id);
    expect(Alert.alert).toHaveBeenCalledWith('Success', 'Product added to cart!');
  });

  it('renders Edit and Delete buttons when currentUser is owner', () => {
    const { getByText } = render(
      <ProductDetail {...defaultProps} currentUserId="owner123" />
    );
    expect(getByText('Edit')).toBeTruthy();
    expect(getByText('Delete')).toBeTruthy();
  });

  it('does not render Edit and Delete buttons when currentUser is NOT owner', () => {
    const { queryByText } = render(
      <ProductDetail {...defaultProps} currentUserId="notOwner" />
    );
    expect(queryByText('Edit')).toBeNull();
    expect(queryByText('Delete')).toBeNull();
  });
});
