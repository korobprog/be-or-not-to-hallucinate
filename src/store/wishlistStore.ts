import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Book } from '@/types/shop';

interface WishlistState {
  items: Book[];
  addToWishlist: (book: Book) => void;
  removeFromWishlist: (bookId: string) => void;
  toggleWishlist: (bookId: string) => void;
  isInWishlist: (bookId: string) => boolean;
  clearWishlist: () => void;
  getWishlistCount: () => number;
}

export const useWishlistStore = create<WishlistState>()(
  persist(
    (set, get) => ({
      items: [],

      addToWishlist: (book: Book) => {
        const { items } = get();
        if (!items.some(item => item.id === book.id)) {
          set({ items: [...items, book] });
        }
      },

      removeFromWishlist: (bookId: string) => {
        set({
          items: get().items.filter(book => book.id !== bookId)
        });
      },

      toggleWishlist: (bookId: string) => {
        const { items, isInWishlist } = get();
        if (isInWishlist(bookId)) {
          get().removeFromWishlist(bookId);
        } else {
          const book = items.find(item => item.id === bookId);
          if (book) {
            get().addToWishlist(book);
          }
        }
      },

      isInWishlist: (bookId: string) => {
        return get().items.some(book => book.id === bookId);
      },

      clearWishlist: () => {
        set({ items: [] });
      },

      getWishlistCount: () => {
        return get().items.length;
      },
    }),
    {
      name: 'wishlist-storage',
    }
  )
);
