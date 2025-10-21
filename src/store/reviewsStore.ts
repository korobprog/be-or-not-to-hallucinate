import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { BookReview, ReviewsData } from '@/types/shop';

interface ReviewsState {
  reviews: Map<string, BookReview[]>;
  addReview: (review: Omit<BookReview, 'id' | 'date'>) => void;
  markReviewHelpful: (reviewId: string, bookId: string) => void;
  getReviewsForBook: (bookId: string) => ReviewsData;
  initializeMockReviews: () => void;
}

// Mock данные отзывов
const mockReviews: Record<string, Omit<BookReview, 'id' | 'date'>[]> = {
  'bhagavad-gita': [
    {
      bookId: 'bhagavad-gita',
      userName: 'Анна Петрова',
      rating: 5,
      comment: 'Невероятно глубокая книга! Комментарии Шрилы Прабхупады помогают понять древнюю мудрость в контексте современной жизни. Рекомендую всем, кто ищет смысл жизни.',
      helpful: 12,
      verified: true
    },
    {
      bookId: 'bhagavad-gita',
      userName: 'Михаил Козлов',
      rating: 5,
      comment: 'Классика духовной литературы. Каждый раз перечитывая, открываю для себя что-то новое. Качество печати отличное.',
      helpful: 8,
      verified: true
    },
    {
      bookId: 'bhagavad-gita',
      userName: 'Елена Смирнова',
      rating: 4,
      comment: 'Очень информативная книга, но местами сложная для понимания. Нужно читать медленно и вдумчиво.',
      helpful: 5,
      verified: false
    }
  ],
  'srimad-bhagavatam': [
    {
      bookId: 'srimad-bhagavatam',
      userName: 'Дмитрий Волков',
      rating: 5,
      comment: 'Великолепное произведение! Подробные комментарии делают древние тексты понятными современному читателю.',
      helpful: 15,
      verified: true
    },
    {
      bookId: 'srimad-bhagavatam',
      userName: 'Ольга Новикова',
      rating: 5,
      comment: 'Книга изменила мое понимание жизни. Рекомендую всем, кто интересуется ведической философией.',
      helpful: 10,
      verified: true
    }
  ],
  'chaitanya-charitamrita': [
    {
      bookId: 'chaitanya-charitamrita',
      userName: 'Сергей Морозов',
      rating: 4,
      comment: 'Интересная биография великого святого. Узнал много нового о движении санкиртаны.',
      helpful: 7,
      verified: true
    },
    {
      bookId: 'chaitanya-charitamrita',
      userName: 'Татьяна Лебедева',
      rating: 5,
      comment: 'Вдохновляющая история жизни Шри Чайтаньи Махапрабху. Книга написана очень доступно.',
      helpful: 9,
      verified: false
    }
  ],
  'science-of-self-realization': [
    {
      bookId: 'science-of-self-realization',
      userName: 'Александр Кузнецов',
      rating: 5,
      comment: 'Отличная книга для понимания основ ведической философии. Лекции Шрилы Прабхупады очень глубокие.',
      helpful: 11,
      verified: true
    },
    {
      bookId: 'science-of-self-realization',
      userName: 'Мария Соколова',
      rating: 4,
      comment: 'Помогает понять природу души и сознания. Некоторые концепции требуют времени для осмысления.',
      helpful: 6,
      verified: true
    }
  ],
  'isopanisad': [
    {
      bookId: 'isopanisad',
      userName: 'Игорь Петров',
      rating: 4,
      comment: 'Компактная, но очень содержательная книга. Комментарии помогают понять суть Упанишад.',
      helpful: 8,
      verified: true
    }
  ],
  'easy-journey': [
    {
      bookId: 'easy-journey',
      userName: 'Владимир Сидоров',
      rating: 4,
      comment: 'Увлекательное описание ведической космологии. Открывает новые горизонты понимания вселенной.',
      helpful: 5,
      verified: false
    }
  ],
  'krishna-book': [
    {
      bookId: 'krishna-book',
      userName: 'Екатерина Морозова',
      rating: 5,
      comment: 'Прекрасная книга для детей и взрослых! Истории о играх Кришны очень увлекательные.',
      helpful: 13,
      verified: true
    },
    {
      bookId: 'krishna-book',
      userName: 'Андрей Козлов',
      rating: 5,
      comment: 'Читаю детям перед сном. Им очень нравятся истории о Кришне. Качество иллюстраций отличное.',
      helpful: 7,
      verified: true
    }
  ],
  'teachings-of-lord-kapila': [
    {
      bookId: 'teachings-of-lord-kapila',
      userName: 'Николай Волков',
      rating: 4,
      comment: 'Интересное изложение философии санкхьи. Помогает понять материальную природу.',
      helpful: 4,
      verified: true
    }
  ]
};

export const useReviewsStore = create<ReviewsState>()(
  persist(
    (set, get) => ({
      reviews: new Map(),

      addReview: (reviewData) => {
        const { reviews } = get();
        const newReview: BookReview = {
          ...reviewData,
          id: `review_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
          date: new Date()
        };

        const bookReviews = reviews.get(reviewData.bookId) || [];
        const updatedReviews = new Map(reviews);
        updatedReviews.set(reviewData.bookId, [...bookReviews, newReview]);
        
        set({ reviews: updatedReviews });
      },

      markReviewHelpful: (reviewId: string, bookId: string) => {
        const { reviews } = get();
        const bookReviews = reviews.get(bookId) || [];
        const updatedReviews = bookReviews.map(review =>
          review.id === reviewId
            ? { ...review, helpful: review.helpful + 1 }
            : review
        );

        const newReviews = new Map(reviews);
        newReviews.set(bookId, updatedReviews);
        set({ reviews: newReviews });
      },

      getReviewsForBook: (bookId: string) => {
        const { reviews } = get();
        const bookReviews = reviews.get(bookId) || [];
        
        const averageRating = bookReviews.length > 0
          ? bookReviews.reduce((sum, review) => sum + review.rating, 0) / bookReviews.length
          : 0;

        return {
          reviews: bookReviews.sort((a, b) => b.date.getTime() - a.date.getTime()),
          averageRating: Math.round(averageRating * 10) / 10,
          totalReviews: bookReviews.length
        };
      },

      initializeMockReviews: () => {
        const { reviews } = get();
        const newReviews = new Map(reviews);

        Object.entries(mockReviews).forEach(([bookId, reviewData]) => {
          if (!newReviews.has(bookId)) {
            const bookReviews: BookReview[] = reviewData.map(data => ({
              ...data,
              id: `mock_${bookId}_${Math.random().toString(36).substr(2, 9)}`,
              date: new Date(Date.now() - Math.random() * 365 * 24 * 60 * 60 * 1000) // случайная дата в прошлом году
            }));
            newReviews.set(bookId, bookReviews);
          }
        });

        set({ reviews: newReviews });
      },
    }),
    {
      name: 'reviews-storage',
    }
  )
);
