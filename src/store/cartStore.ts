import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { CartItem, Book } from '@/types/shop';

interface CartState {
  items: CartItem[];
  addItem: (book: Book) => void;
  removeItem: (bookId: string) => void;
  updateQuantity: (bookId: string, quantity: number) => void;
  clearCart: () => void;
  getTotal: () => number;
  getItemCount: () => number;
  isInCart: (bookId: string) => boolean;
  getQuantity: (bookId: string) => number;
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],

      addItem: (book: Book) => {
        const { items } = get();
        const existingItem = items.find(item => item.book.id === book.id);
        
        if (existingItem) {
          set({
            items: items.map(item =>
              item.book.id === book.id
                ? { ...item, quantity: item.quantity + 1 }
                : item
            )
          });
        } else {
          set({
            items: [...items, { book, quantity: 1 }]
          });
        }
      },

      removeItem: (bookId: string) => {
        set({
          items: get().items.filter(item => item.book.id !== bookId)
        });
      },

      updateQuantity: (bookId: string, quantity: number) => {
        if (quantity <= 0) {
          get().removeItem(bookId);
          return;
        }

        set({
          items: get().items.map(item =>
            item.book.id === bookId
              ? { ...item, quantity }
              : item
          )
        });
      },

      clearCart: () => {
        set({ items: [] });
      },

      getTotal: () => {
        return get().items.reduce((total, item) => 
          total + (item.book.price * item.quantity), 0
        );
      },

      getItemCount: () => {
        return get().items.reduce((count, item) => count + item.quantity, 0);
      },

      isInCart: (bookId: string) => {
        return get().items.some(item => item.book.id === bookId);
      },

      getQuantity: (bookId: string) => {
        const item = get().items.find(item => item.book.id === bookId);
        return item ? item.quantity : 0;
      },
    }),
    {
      name: 'cart-storage',
    }
  )
);
