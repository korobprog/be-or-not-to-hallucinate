import { Book } from '@/types/shop';
import { books } from '@/data/booksData';

// Имитация задержки API
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export interface BookServiceResponse<T> {
  data: T;
  success: boolean;
  message?: string;
}

export interface BookFilters {
  search?: string;
  category?: string;
  minPrice?: number;
  maxPrice?: number;
  author?: string;
  language?: 'all' | 'ru' | 'en';
  minRating?: number;
  inStockOnly?: boolean;
  sortBy?: 'price-asc' | 'price-desc' | 'rating' | 'newest' | 'popular';
  page?: number;
  limit?: number;
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

class BookService {
  // Получить все книги с фильтрацией и пагинацией
  async getBooks(filters: BookFilters = {}): Promise<BookServiceResponse<PaginatedResponse<Book>>> {
    await delay(300); // Имитация задержки сети

    try {
      let filteredBooks = [...books];

      // Применяем фильтры
      if (filters.search) {
        const searchLower = filters.search.toLowerCase();
        filteredBooks = filteredBooks.filter(book =>
          book.title.toLowerCase().includes(searchLower) ||
          book.author.toLowerCase().includes(searchLower) ||
          book.description.toLowerCase().includes(searchLower) ||
          book.tags?.some(tag => tag.toLowerCase().includes(searchLower))
        );
      }

      if (filters.category) {
        filteredBooks = filteredBooks.filter(book => book.category === filters.category);
      }

      if (filters.minPrice !== undefined) {
        filteredBooks = filteredBooks.filter(book => book.price >= filters.minPrice!);
      }

      if (filters.maxPrice !== undefined) {
        filteredBooks = filteredBooks.filter(book => book.price <= filters.maxPrice!);
      }

      if (filters.author) {
        filteredBooks = filteredBooks.filter(book => 
          book.author.toLowerCase().includes(filters.author!.toLowerCase())
        );
      }

      if (filters.language && filters.language !== 'all') {
        filteredBooks = filteredBooks.filter(book => book.language === filters.language);
      }

      if (filters.minRating !== undefined) {
        filteredBooks = filteredBooks.filter(book => book.rating >= filters.minRating!);
      }

      if (filters.inStockOnly) {
        filteredBooks = filteredBooks.filter(book => book.inStock);
      }

      // Применяем сортировку
      if (filters.sortBy) {
        switch (filters.sortBy) {
          case 'price-asc':
            filteredBooks.sort((a, b) => a.price - b.price);
            break;
          case 'price-desc':
            filteredBooks.sort((a, b) => b.price - a.price);
            break;
          case 'rating':
            filteredBooks.sort((a, b) => b.rating - a.rating);
            break;
          case 'newest':
            filteredBooks.sort((a, b) => b.year - a.year);
            break;
          case 'popular':
            filteredBooks.sort((a, b) => b.reviews - a.reviews);
            break;
        }
      }

      // Пагинация
      const page = filters.page || 1;
      const limit = filters.limit || 12;
      const startIndex = (page - 1) * limit;
      const endIndex = startIndex + limit;
      const paginatedBooks = filteredBooks.slice(startIndex, endIndex);

      const response: PaginatedResponse<Book> = {
        data: paginatedBooks,
        total: filteredBooks.length,
        page,
        limit,
        totalPages: Math.ceil(filteredBooks.length / limit)
      };

      return {
        data: response,
        success: true
      };
    } catch (error) {
      return {
        data: { data: [], total: 0, page: 1, limit: 12, totalPages: 0 },
        success: false,
        message: 'Ошибка при загрузке книг'
      };
    }
  }

  // Получить книгу по ID
  async getBookById(id: string): Promise<BookServiceResponse<Book | null>> {
    await delay(200);

    try {
      const book = books.find(b => b.id === id);
      return {
        data: book || null,
        success: !!book,
        message: book ? undefined : 'Книга не найдена'
      };
    } catch (error) {
      return {
        data: null,
        success: false,
        message: 'Ошибка при загрузке книги'
      };
    }
  }

  // Получить похожие книги
  async getSimilarBooks(bookId: string, limit: number = 4): Promise<BookServiceResponse<Book[]>> {
    await delay(250);

    try {
      const book = books.find(b => b.id === bookId);
      if (!book) {
        return {
          data: [],
          success: false,
          message: 'Книга не найдена'
        };
      }

      const similarBooks = books
        .filter(b => 
          b.id !== bookId && 
          (b.category === book.category || 
           b.tags?.some(tag => book.tags?.includes(tag)))
        )
        .sort((a, b) => b.rating - a.rating)
        .slice(0, limit);

      return {
        data: similarBooks,
        success: true
      };
    } catch (error) {
      return {
        data: [],
        success: false,
        message: 'Ошибка при загрузке похожих книг'
      };
    }
  }

  // Получить популярные книги
  async getPopularBooks(limit: number = 8): Promise<BookServiceResponse<Book[]>> {
    await delay(200);

    try {
      const popularBooks = books
        .sort((a, b) => b.reviews - a.reviews)
        .slice(0, limit);

      return {
        data: popularBooks,
        success: true
      };
    } catch (error) {
      return {
        data: [],
        success: false,
        message: 'Ошибка при загрузке популярных книг'
      };
    }
  }

  // Получить новинки
  async getNewBooks(limit: number = 8): Promise<BookServiceResponse<Book[]>> {
    await delay(200);

    try {
      const newBooks = books
        .sort((a, b) => b.year - a.year)
        .slice(0, limit);

      return {
        data: newBooks,
        success: true
      };
    } catch (error) {
      return {
        data: [],
        success: false,
        message: 'Ошибка при загрузке новинок'
      };
    }
  }

  // Получить книги по категории
  async getBooksByCategory(categoryId: string, limit?: number): Promise<BookServiceResponse<Book[]>> {
    await delay(200);

    try {
      let categoryBooks = books.filter(book => book.category === categoryId);
      
      if (limit) {
        categoryBooks = categoryBooks.slice(0, limit);
      }

      return {
        data: categoryBooks,
        success: true
      };
    } catch (error) {
      return {
        data: [],
        success: false,
        message: 'Ошибка при загрузке книг категории'
      };
    }
  }

  // Поиск книг
  async searchBooks(query: string, limit: number = 20): Promise<BookServiceResponse<Book[]>> {
    await delay(300);

    try {
      const searchLower = query.toLowerCase();
      const searchResults = books.filter(book =>
        book.title.toLowerCase().includes(searchLower) ||
        book.author.toLowerCase().includes(searchLower) ||
        book.description.toLowerCase().includes(searchLower) ||
        book.tags?.some(tag => tag.toLowerCase().includes(searchLower))
      ).slice(0, limit);

      return {
        data: searchResults,
        success: true
      };
    } catch (error) {
      return {
        data: [],
        success: false,
        message: 'Ошибка при поиске книг'
      };
    }
  }
}

export const bookService = new BookService();
