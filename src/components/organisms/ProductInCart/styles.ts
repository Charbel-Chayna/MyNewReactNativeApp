import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  productContainer: {
    flexDirection: 'row',
    marginVertical: 8,
    padding: 10,
    backgroundColor: '#fff',
    borderRadius: 12,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 3,
  },
  productImage: {
    width: 70,
    height: 70,
    borderRadius: 8,
  },
  productInfo: {
    flex: 1,
    marginLeft: 10,
    justifyContent: 'space-between',
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  description: {
    fontSize: 12,
    color: '#555',
  },
  removeButton: {
  alignSelf: 'flex-start',
  paddingTop: 4,
  paddingLeft: 2,
},

removeButtonText: {
  fontSize: 10,
  color: 'gray',
  fontFamily: 'Poppins-Regular',
},

  priceSection: {
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  price: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  quantityButton: {
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 4,
  },
  quantityText: {
    fontSize: 16,
  },
  quantity: {
    marginHorizontal: 8,
    fontSize: 16,
  },
});
