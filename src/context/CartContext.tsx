import React, { createContext, useContext, useReducer, useEffect, ReactNode } from 'react';
import { Book, CartItem, CartContextType } from '@/types/shop';
import { toast } from 'sonner';

// Типы для reducer
type CartAction =
  | { type: 'ADD_ITEM'; payload: Book }
  | { type: 'REMOVE_ITEM'; payload: string }
  | { type: 'UPDATE_QUANTITY'; payload: { bookId: string; quantity: number } }
  | { type: 'CLEAR_CART' }
  | { type: 'LOAD_CART'; payload: CartItem[] };

// Начальное состояние корзины
const initialState: CartItem[] = [];

// Reducer для управления состоянием корзины
const cartReducer = (state: CartItem[], action: CartAction): CartItem[] => {
  switch (action.type) {
    case 'ADD_ITEM': {
      const existingItem = state.find(item => item.book.id === action.payload.id);
      
      if (existingItem) {
        // Если товар уже есть в корзине, увеличиваем количество
        return state.map(item =>
          item.book.id === action.payload.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        // Если товара нет в корзине, добавляем новый
        return [...state, { book: action.payload, quantity: 1 }];
      }
    }

    case 'REMOVE_ITEM': {
      return state.filter(item => item.book.id !== action.payload);
    }

    case 'UPDATE_QUANTITY': {
      const { bookId, quantity } = action.payload;
      
      if (quantity <= 0) {
        return state.filter(item => item.book.id !== bookId);
      }
      
      return state.map(item =>
        item.book.id === bookId
          ? { ...item, quantity }
          : item
      );
    }

    case 'CLEAR_CART': {
      return [];
    }

    case 'LOAD_CART': {
      return action.payload;
    }

    default:
      return state;
  }
};

// Создаем контекст
const CartContext = createContext<CartContextType | undefined>(undefined);

// Провайдер корзины
export const CartProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [items, dispatch] = useReducer(cartReducer, initialState);

  // Загружаем корзину из localStorage при инициализации
  useEffect(() => {
    const savedCart = localStorage.getItem('bookshop-cart');
    if (savedCart) {
      try {
        const cartItems = JSON.parse(savedCart);
        dispatch({ type: 'LOAD_CART', payload: cartItems });
      } catch (error) {
        console.error('Ошибка при загрузке корзины из localStorage:', error);
        localStorage.removeItem('bookshop-cart');
      }
    }
  }, []);

  // Сохраняем корзину в localStorage при каждом изменении
  useEffect(() => {
    localStorage.setItem('bookshop-cart', JSON.stringify(items));
  }, [items]);

  // Функции для работы с корзиной
  const addItem = (book: Book) => {
    dispatch({ type: 'ADD_ITEM', payload: book });
    toast.success(`"${book.title}" добавлена в корзину`);
  };

  const removeItem = (bookId: string) => {
    const item = items.find(item => item.book.id === bookId);
    if (item) {
      dispatch({ type: 'REMOVE_ITEM', payload: bookId });
      toast.success(`"${item.book.title}" удалена из корзины`);
    }
  };

  const updateQuantity = (bookId: string, quantity: number) => {
    const item = items.find(item => item.book.id === bookId);
    if (item) {
      dispatch({ type: 'UPDATE_QUANTITY', payload: { bookId, quantity } });
      
      if (quantity === 0) {
        toast.success(`"${item.book.title}" удалена из корзины`);
      } else {
        toast.success(`Количество "${item.book.title}" изменено на ${quantity}`);
      }
    }
  };

  const clearCart = () => {
    dispatch({ type: 'CLEAR_CART' });
    toast.success('Корзина очищена');
  };

  // Вычисляемые значения
  const total = items.reduce((sum, item) => sum + (item.book.price * item.quantity), 0);
  const itemCount = items.reduce((sum, item) => sum + item.quantity, 0);

  const value: CartContextType = {
    items,
    addItem,
    removeItem,
    updateQuantity,
    clearCart,
    total,
    itemCount
  };

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
};

// Хук для использования контекста корзины
export const useCart = (): CartContextType => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart должен использоваться внутри CartProvider');
  }
  return context;
};

// Дополнительные утилиты для работы с корзиной
export const cartUtils = {
  // Проверить, есть ли книга в корзине
  isInCart: (items: CartItem[], bookId: string): boolean => {
    return items.some(item => item.book.id === bookId);
  },

  // Получить количество конкретной книги в корзине
  getQuantity: (items: CartItem[], bookId: string): number => {
    const item = items.find(item => item.book.id === bookId);
    return item ? item.quantity : 0;
  },

  // Получить общую стоимость со скидкой (если есть)
  getTotalWithDiscount: (items: CartItem[], discountPercent: number = 0): number => {
    const total = items.reduce((sum, item) => sum + (item.book.price * item.quantity), 0);
    return total * (1 - discountPercent / 100);
  },

  // Получить количество уникальных товаров
  getUniqueItemCount: (items: CartItem[]): number => {
    return items.length;
  },

  // Проверить, пуста ли корзина
  isEmpty: (items: CartItem[]): boolean => {
    return items.length === 0;
  },

  // Получить товары с низким остатком (для уведомлений)
  getLowStockItems: (items: CartItem[], threshold: number = 5): CartItem[] => {
    return items.filter(item => item.quantity <= threshold);
  }
};
