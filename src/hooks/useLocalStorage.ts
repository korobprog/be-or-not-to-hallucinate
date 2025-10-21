import { useState, useEffect } from 'react';
import { useWishlistStore } from '@/store/wishlistStore';

// Хук для работы с localStorage
export const useLocalStorage = <T>(key: string, initialValue: T) => {
  // Получаем значение из localStorage или используем начальное значение
  const [storedValue, setStoredValue] = useState<T>(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.error(`Ошибка при чтении localStorage ключа "${key}":`, error);
      return initialValue;
    }
  });

  // Функция для обновления значения
  const setValue = (value: T | ((val: T) => T)) => {
    try {
      // Позволяем value быть функцией, чтобы обновление было основано на предыдущем значении
      const valueToStore = value instanceof Function ? value(storedValue) : value;
      
      // Сохраняем состояние
      setStoredValue(valueToStore);
      
      // Сохраняем в localStorage
      window.localStorage.setItem(key, JSON.stringify(valueToStore));
    } catch (error) {
      console.error(`Ошибка при записи в localStorage ключа "${key}":`, error);
    }
  };

  // Функция для удаления значения из localStorage
  const removeValue = () => {
    try {
      window.localStorage.removeItem(key);
      setStoredValue(initialValue);
    } catch (error) {
      console.error(`Ошибка при удалении localStorage ключа "${key}":`, error);
    }
  };

  return [storedValue, setValue, removeValue] as const;
};

// Хук для работы с историей просмотров
export const useViewHistory = () => {
  const [viewHistory, setViewHistory] = useLocalStorage<string[]>('bookshop-view-history', []);

  const addToHistory = (bookId: string) => {
    setViewHistory(prev => {
      // Удаляем дубликаты и добавляем в начало
      const filtered = prev.filter(id => id !== bookId);
      return [bookId, ...filtered].slice(0, 20); // Ограничиваем историю 20 элементами
    });
  };

  const clearHistory = () => {
    setViewHistory([]);
  };

  return {
    viewHistory,
    addToHistory,
    clearHistory
  };
};

// Хук для работы со списком желаний
export const useWishlist = () => {
  const { 
    items, 
    addToWishlist, 
    removeFromWishlist, 
    toggleWishlist, 
    isInWishlist, 
    clearWishlist 
  } = useWishlistStore();

  return {
    wishlist: items.map(book => book.id), // Для обратной совместимости
    addToWishlist: (bookId: string) => {
      const book = items.find(b => b.id === bookId);
      if (book) addToWishlist(book);
    },
    removeFromWishlist,
    toggleWishlist,
    isInWishlist,
    clearWishlist
  };
};

// Хук для работы с настройками пользователя
export const useUserSettings = () => {
  const [settings, setSettings] = useLocalStorage('bookshop-user-settings', {
    currency: 'RUB',
    language: 'ru',
    theme: 'light',
    itemsPerPage: 12,
    defaultSort: 'popular' as const,
    showPrices: true,
    enableNotifications: true
  });

  const updateSetting = <K extends keyof typeof settings>(
    key: K,
    value: typeof settings[K]
  ) => {
    setSettings(prev => ({ ...prev, [key]: value }));
  };

  return {
    settings,
    updateSetting,
    setSettings
  };
};

// Хук для работы с недавними поисками
export const useSearchHistory = () => {
  const [searchHistory, setSearchHistory] = useLocalStorage<string[]>('bookshop-search-history', []);

  const addToSearchHistory = (query: string) => {
    if (!query.trim()) return;
    
    setSearchHistory(prev => {
      const filtered = prev.filter(item => item.toLowerCase() !== query.toLowerCase());
      return [query, ...filtered].slice(0, 10); // Ограничиваем историю 10 элементами
    });
  };

  const removeFromSearchHistory = (query: string) => {
    setSearchHistory(prev => prev.filter(item => item !== query));
  };

  const clearSearchHistory = () => {
    setSearchHistory([]);
  };

  return {
    searchHistory,
    addToSearchHistory,
    removeFromSearchHistory,
    clearSearchHistory
  };
};
