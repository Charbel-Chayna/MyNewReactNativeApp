import { LinkingOptions } from '@react-navigation/native';
import { RootStackParamList } from './navigation';

const linking: LinkingOptions<RootStackParamList> = {
  prefixes: ['Cartify://'],
  config: {
    screens: {
      ProductDetail: {
        path: 'product/:productId',
      },
      ProductList: 'products',
      Login: 'login',
      SignUp: 'signup',
      Verification: 'verify/:email',
      ProfileEdit: 'profile/edit',
      AddProduct: 'product/add',
      EditProduct: 'product/edit/:productId',
      Cart: 'cart',
    },
  },
};

export default linking;
