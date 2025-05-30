import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import { ProductCard } from '../src/components/organisms/ProductCard';
import { useThemeStore } from '../src/stores/themeStore';

jest.mock('../src/stores/themeStore', () => ({
  useThemeStore: jest.fn(),
}));

jest.mock('lucide-react-native', () => ({
  ShoppingCart: () => null,
  Share2: () => null,
}));

describe('ProductCard', () => {
  const mockOnPress = jest.fn();
  const mockOnAddToCart = jest.fn();
  const mockOnShare = jest.fn();

  const mockedUseThemeStore = useThemeStore as jest.MockedFunction<typeof useThemeStore>;

  beforeEach(() => {
    jest.clearAllMocks();
    mockedUseThemeStore.mockReturnValue({ theme: 'light' });
  });

  const defaultProps = {
    title: 'Test Product',
    price: 99.99,
    imageUrl: 'https://example.com/image.jpg',
    onPress: mockOnPress,
    onAddToCart: mockOnAddToCart,
    onShare: mockOnShare,
  };

  it('renders correctly with given props', () => {
    const { getByText } = render(<ProductCard {...defaultProps} />);

    expect(getByText('Test Product')).toBeTruthy();
    expect(getByText('$99.99')).toBeTruthy();
  });

  it('calls onPress when card is pressed', () => {
    const { getByTestId } = render(<ProductCard {...defaultProps} />);
    fireEvent.press(getByTestId('product-card'));
    expect(mockOnPress).toHaveBeenCalled();
  });

  it('calls onShare when share icon is pressed and prevents card press', () => {
  const { getByTestId } = render(<ProductCard {...defaultProps} />);
  const stopPropagation = jest.fn();

  fireEvent(getByTestId('share-icon'), 'press', { stopPropagation });
  
  expect(mockOnShare).toHaveBeenCalled();
  expect(mockOnPress).not.toHaveBeenCalled();
  expect(stopPropagation).toHaveBeenCalled();
});


  it('calls onAddToCart when cart icon is pressed', () => {
    const { getByTestId } = render(<ProductCard {...defaultProps} />);
    fireEvent.press(getByTestId('cart-icon'));
    expect(mockOnAddToCart).toHaveBeenCalled();
  });

  it('shows cart quantity badge if cartQuantity > 0', () => {
    const { getByText } = render(
      <ProductCard {...defaultProps} cartQuantity={3} />
    );
    expect(getByText('3')).toBeTruthy();
  });

  it('does not show cart quantity badge if cartQuantity is 0 or undefined', () => {
    const { queryByTestId } = render(<ProductCard {...defaultProps} />);
    expect(queryByTestId('cart-badge')).toBeNull();

    const { queryByTestId: queryByTestIdZero } = render(
      <ProductCard {...defaultProps} cartQuantity={0} />
    );
    expect(queryByTestIdZero('cart-badge')).toBeNull();
  });
});
