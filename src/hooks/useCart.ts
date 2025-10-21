import { useCartStore } from '@/store/cartStore';
import { Book } from '@/types/shop';

// Хук для удобного использования корзины
export const useCartActions = () => {
  const {
    items,
    addItem,
    removeItem,
    updateQuantity,
    clearCart,
    getTotal,
    getItemCount,
    isInCart,
    getQuantity,
  } = useCartStore();

  return {
    items,
    addToCart: (book: Book) => addItem(book),
    removeFromCart: (bookId: string) => removeItem(bookId),
    updateQuantity,
    clearCart,
    getTotal,
    getItemCount,
    isInCart,
    getQuantity,
    increaseQuantity: (bookId: string) => {
      const currentQuantity = getQuantity(bookId);
      updateQuantity(bookId, currentQuantity + 1);
    },
    decreaseQuantity: (bookId: string) => {
      const currentQuantity = getQuantity(bookId);
      updateQuantity(bookId, Math.max(0, currentQuantity - 1));
    },
  };
};
