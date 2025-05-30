import { StyleSheet, PixelRatio, Dimensions } from 'react-native';

const { width } = Dimensions.get('window');

const scale = (size: number) => {
  const scaleFactor = width / 375;
  return Math.round(PixelRatio.roundToNearestPixel(size * scaleFactor));
};

export const styles = StyleSheet.create({
  container: {
  flex: 1,
  backgroundColor: '#fff',
  paddingHorizontal: scale(16), 
  paddingTop: scale(16),
},
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyText: {
    fontSize: scale(20),
    fontWeight: 'bold',
    fontFamily: 'Poppins-Bold',
    marginBottom: scale(8),
  },
  emptySubText: {
    fontSize: scale(16),
    fontFamily: 'Poppins-Regular',
    color: '#666',
    marginBottom: scale(20),
  },
  shopButton: {
    backgroundColor: '#000',
    paddingVertical: scale(12),
    paddingHorizontal: scale(24),
    borderRadius: scale(8),
  },
  shopButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: scale(16),
    fontFamily: 'Poppins-Bold',
  },
  productContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: scale(12),
    borderBottomWidth: 1 / PixelRatio.get(),
    borderColor: '#eee',
  },
  productImage: {
    width: scale(60),
    height: scale(60),
    borderRadius: scale(8),
    marginRight: scale(12),
  },
  productInfo: {
    flex: 1,
  },
  title: {
    fontSize: scale(16),
    fontWeight: 'bold',
    fontFamily: 'Poppins-Bold',
  },
  description: {
    fontSize: scale(14),
    color: '#666',
    fontFamily: 'Poppins-Regular',
  },
  removeButton: {
    marginTop: scale(8),
  },
  priceSection: {
    alignItems: 'flex-end',
    justifyContent: 'space-between',
    height: '100%',
  },
  price: {
    fontSize: scale(16),
    fontWeight: 'bold',
    fontFamily: 'Poppins-Bold',
    marginBottom: scale(8),
  },
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  quantityButton: {
    backgroundColor: '#ddd',
    paddingHorizontal: scale(8),
    paddingVertical: scale(4),
    borderRadius: scale(4),
  },
  quantityText: {
    fontSize: scale(16),
    fontWeight: 'bold',
    fontFamily: 'Poppins-Bold',
  },
  quantity: {
    fontSize: scale(16),
    fontFamily: 'Poppins-Medium',
    marginHorizontal: scale(8),
  },
  
  summaryTitle: {
    fontSize: scale(18),
    fontWeight: 'bold',
    fontFamily: 'Poppins-Bold',
    marginBottom: scale(6),
    color: '#222',
  },
  summarySubtext: {
    fontSize: scale(14),
    fontFamily: 'Poppins-Regular',
    color: '#666',
    marginBottom: scale(14),
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: scale(10),
  },
  summaryLabel: {
    fontSize: scale(16),
    color: '#444',
    fontFamily: 'Poppins-Medium',
  },
  summaryValue: {
    fontSize: scale(16),
    fontWeight: '600',
    color: '#444',
    fontFamily: 'Poppins-SemiBold',
  },
  totalLabel: {
    fontSize: scale(20),
    fontWeight: 'bold',
    color: '#111',
    fontFamily: 'Poppins-Bold',
  },
  totalValue: {
    fontSize: scale(20),
    fontWeight: 'bold',
    color: '#111',
    fontFamily: 'Poppins-Bold',
  },
  listContainer: {
  flex: 1, 
},
cartWrapper: {
  flex: 1,
  justifyContent: 'space-between',
},
orderSummaryContainer: {
  backgroundColor: '#fff',
  paddingVertical: scale(20),
  paddingHorizontal: scale(24),
  borderTopLeftRadius: scale(16),
  borderTopRightRadius: scale(16),
  borderTopWidth: 2,
  borderColor: '#ddd',
  shadowColor: '#000',
  shadowOffset: { width:0, height: -4 },
  shadowOpacity: 0.15,
  shadowRadius: 10,
  elevation: 12,
},
rowBack: {
  alignItems: 'center',
  backgroundColor: 'transparent', 
  flex: 1,
  flexDirection: 'row',
  justifyContent: 'flex-end',
  marginVertical: 8,
  borderRadius: 16,
  overflow: 'hidden',
},

deleteButton: {
  backgroundColor: '#e53935', 
  justifyContent: 'center',
  alignItems: 'center',
  width: 75,
  height: '100%',
  borderTopRightRadius: 16,
  borderBottomRightRadius: 16,
},

deleteButtonText: {
  color: '#fff',
  fontSize: 15,
  fontFamily:'Poppins-Bold',
},

});
