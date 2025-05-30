import { create } from 'zustand';
import AsyncStorage from '@react-native-async-storage/async-storage';

type CartItem = {
  id: string;
  title: string;
  description: string;
  image: string;
  price: number;
  quantity: number;
};

type CartStore = {
  currentUserEmail: string | null;
  items: CartItem[];
  setCurrentUserEmail: (email: string | null) => Promise<void>;
  addToCart: (item: Omit<CartItem, 'quantity'>) => void;
  removeFromCart: (id: string) => void;
  increment: (id: string) => void;
  decrement: (id: string) => void;
  resetCart: () => void;
};

const STORAGE_KEY_PREFIX = 'cart-storage-';

export const useCartStore = create<CartStore>((set, get) => ({
  currentUserEmail: null,
  items: [],

  setCurrentUserEmail: async (email) => {
  set({ currentUserEmail: email, items: [] });
  if (email) {
    try {
      const saved = await AsyncStorage.getItem(STORAGE_KEY_PREFIX + email);
      if (saved) {
        set({ items: JSON.parse(saved) });
      }
    } catch (e) {
      console.error('Failed to load cart for user', email, e);
    }
  }
},

  saveCartToStorage: async () => {
    const { currentUserEmail, items } = get();
    if (!currentUserEmail) return;
    try {
      await AsyncStorage.setItem(STORAGE_KEY_PREFIX + currentUserEmail, JSON.stringify(items));
    } catch (e) {
      console.error('Failed to save cart', e);
    }
  },

  addToCart: (item) =>
    set((state) => {
      const existing = state.items.find((i) => i.id === item.id);
      let newItems;
      if (existing) {
        newItems = state.items.map((i) =>
          i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i
        );
      } else {
        newItems = [...state.items, { ...item, quantity: 1 }];
      }
      AsyncStorage.setItem(STORAGE_KEY_PREFIX + state.currentUserEmail, JSON.stringify(newItems));
      return { items: newItems };
    }),

  removeFromCart: (id) =>
    set((state) => {
      const newItems = state.items.filter((i) => i.id !== id);
      AsyncStorage.setItem(STORAGE_KEY_PREFIX + state.currentUserEmail, JSON.stringify(newItems));
      return { items: newItems };
    }),

  increment: (id) =>
    set((state) => {
      const newItems = state.items.map((i) =>
        i.id === id ? { ...i, quantity: i.quantity + 1 } : i
      );
      AsyncStorage.setItem(STORAGE_KEY_PREFIX + state.currentUserEmail, JSON.stringify(newItems));
      return { items: newItems };
    }),

  decrement: (id) =>
    set((state) => {
      const newItems = state.items
        .map((i) => (i.id === id ? { ...i, quantity: i.quantity - 1 } : i))
        .filter((i) => i.quantity > 0);
      AsyncStorage.setItem(STORAGE_KEY_PREFIX + state.currentUserEmail, JSON.stringify(newItems));
      return { items: newItems };
    }),

  resetCart: () => {
   
    set({ items: [] });
  },
}));
