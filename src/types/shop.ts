export interface Book {
  id: string;
  title: string;
  author: string;
  price: number;
  originalPrice?: number; // для скидок
  rating: number;
  reviews: number;
  image: string;
  description: string;
  fullDescription?: string; // расширенное описание для детального просмотра
  category: string;
  language: 'ru' | 'en';
  pages: number;
  isbn: string;
  inStock: boolean;
  year: number;
  publisher?: string;
  weight?: number; // вес в граммах
  dimensions?: string; // размеры книги
  tags?: string[]; // теги для поиска
  videoUrl?: string; // ссылка на видео (YouTube)
  tableOfContents?: string[]; // оглавление книги
  relatedBooks?: string[]; // ID похожих книг
}

export interface CartItem {
  book: Book;
  quantity: number;
}

export interface CartContextType {
  items: CartItem[];
  addItem: (book: Book) => void;
  removeItem: (bookId: string) => void;
  updateQuantity: (bookId: string, quantity: number) => void;
  clearCart: () => void;
  total: number;
  itemCount: number;
}

export interface FilterState {
  search: string;
  categories: string[];
  priceRange: [number, number];
  author: string;
  language: 'all' | 'ru' | 'en';
  minRating: number;
  inStockOnly: boolean;
  sortBy: 'price-asc' | 'price-desc' | 'rating' | 'newest' | 'popular';
}

export interface CheckoutFormData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  postalCode: string;
  comment?: string;
  deliveryMethod: 'pickup' | 'delivery';
}

export interface Order {
  id: string;
  items: CartItem[];
  customer: CheckoutFormData;
  total: number;
  status: 'pending' | 'confirmed' | 'shipped' | 'delivered' | 'cancelled';
  createdAt: Date;
  estimatedDelivery?: Date;
}

export type SortOption = 'price-asc' | 'price-desc' | 'rating' | 'newest' | 'popular';

export type LanguageFilter = 'all' | 'ru' | 'en';

export interface BookCategory {
  id: string;
  name: string;
  slug: string;
  description?: string;
}

export interface BookReview {
  id: string;
  bookId: string;
  userName: string;
  rating: number;
  comment: string;
  date: Date;
  helpful: number;
  verified?: boolean; // отзыв от верифицированного покупателя
}

export interface ReviewsData {
  reviews: BookReview[];
  averageRating: number;
  totalReviews: number;
}
