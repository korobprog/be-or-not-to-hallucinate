import { useState, useEffect, useMemo } from 'react';
import { Book, FilterState, SortOption } from '@/types/shop';
import { bookService, BookFilters } from '@/services/bookService';

// Хук для работы с фильтрами и поиском книг
export const useBookFilters = () => {
  const [filters, setFilters] = useState<FilterState>({
    search: '',
    categories: [],
    priceRange: [0, 5000],
    author: '',
    language: 'all',
    minRating: 0,
    inStockOnly: false,
    sortBy: 'popular'
  });

  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalBooks, setTotalBooks] = useState(0);

  const itemsPerPage = 12;

  // Debounced поиск
  const [searchQuery, setSearchQuery] = useState('');
  const [debouncedSearch, setDebouncedSearch] = useState('');

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(searchQuery);
    }, 300);

    return () => clearTimeout(timer);
  }, [searchQuery]);

  // Загружаем книги при изменении фильтров
  useEffect(() => {
    const loadBooks = async () => {
      setLoading(true);
      setError(null);

      try {
        const bookFilters: BookFilters = {
          search: debouncedSearch || undefined,
          category: filters.categories.length === 1 ? filters.categories[0] : undefined,
          minPrice: filters.priceRange[0] > 0 ? filters.priceRange[0] : undefined,
          maxPrice: filters.priceRange[1] < 5000 ? filters.priceRange[1] : undefined,
          author: filters.author || undefined,
          language: filters.language !== 'all' ? filters.language : undefined,
          minRating: filters.minRating > 0 ? filters.minRating : undefined,
          inStockOnly: filters.inStockOnly,
          sortBy: filters.sortBy,
          page: currentPage,
          limit: itemsPerPage
        };

        const response = await bookService.getBooks(bookFilters);
        
        if (response.success) {
          setBooks(response.data.data);
          setTotalPages(response.data.totalPages);
          setTotalBooks(response.data.total);
        } else {
          setError(response.message || 'Ошибка при загрузке книг');
        }
      } catch (err) {
        setError('Произошла ошибка при загрузке книг');
        console.error('Error loading books:', err);
      } finally {
        setLoading(false);
      }
    };

    loadBooks();
  }, [debouncedSearch, filters, currentPage]);

  // Обновляем фильтры
  const updateFilters = (newFilters: Partial<FilterState>) => {
    setFilters(prev => ({ ...prev, ...newFilters }));
    setCurrentPage(1); // Сбрасываем на первую страницу при изменении фильтров
  };

  // Сброс всех фильтров
  const resetFilters = () => {
    setFilters({
      search: '',
      categories: [],
      priceRange: [0, 5000],
      author: '',
      language: 'all',
      minRating: 0,
      inStockOnly: false,
      sortBy: 'popular'
    });
    setSearchQuery('');
    setCurrentPage(1);
  };

  // Обновление поискового запроса
  const updateSearch = (query: string) => {
    setSearchQuery(query);
  };

  // Переход на страницу
  const goToPage = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Получение активных фильтров (для отображения)
  const activeFiltersCount = useMemo(() => {
    let count = 0;
    if (debouncedSearch) count++;
    if (filters.categories.length > 0) count++;
    if (filters.priceRange[0] > 0 || filters.priceRange[1] < 5000) count++;
    if (filters.author) count++;
    if (filters.language !== 'all') count++;
    if (filters.minRating > 0) count++;
    if (filters.inStockOnly) count++;
    return count;
  }, [debouncedSearch, filters]);

  // Получение уникальных авторов для фильтра
  const availableAuthors = useMemo(() => {
    const authors = new Set<string>();
    books.forEach(book => authors.add(book.author));
    return Array.from(authors).sort();
  }, [books]);

  return {
    // Состояние
    books,
    loading,
    error,
    filters,
    searchQuery,
    currentPage,
    totalPages,
    totalBooks,
    activeFiltersCount,
    availableAuthors,

    // Действия
    updateFilters,
    updateSearch,
    resetFilters,
    goToPage,
    setCurrentPage
  };
};

// Хук для работы с сортировкой
export const useSorting = () => {
  const sortOptions: { value: SortOption; label: string }[] = [
    { value: 'popular', label: 'По популярности' },
    { value: 'rating', label: 'По рейтингу' },
    { value: 'price-asc', label: 'Цена: по возрастанию' },
    { value: 'price-desc', label: 'Цена: по убыванию' },
    { value: 'newest', label: 'Сначала новые' }
  ];

  return { sortOptions };
};

// Хук для работы с пагинацией
export const usePagination = (currentPage: number, totalPages: number) => {
  const getPageNumbers = () => {
    const pages: (number | string)[] = [];
    const maxVisiblePages = 5;

    if (totalPages <= maxVisiblePages) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      if (currentPage <= 3) {
        for (let i = 1; i <= 4; i++) {
          pages.push(i);
        }
        pages.push('...');
        pages.push(totalPages);
      } else if (currentPage >= totalPages - 2) {
        pages.push(1);
        pages.push('...');
        for (let i = totalPages - 3; i <= totalPages; i++) {
          pages.push(i);
        }
      } else {
        pages.push(1);
        pages.push('...');
        for (let i = currentPage - 1; i <= currentPage + 1; i++) {
          pages.push(i);
        }
        pages.push('...');
        pages.push(totalPages);
      }
    }

    return pages;
  };

  return {
    pageNumbers: getPageNumbers(),
    hasNextPage: currentPage < totalPages,
    hasPrevPage: currentPage > 1,
    isFirstPage: currentPage === 1,
    isLastPage: currentPage === totalPages
  };
};
