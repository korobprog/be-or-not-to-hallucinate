import { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Container } from '@/components/ui/container';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { ArrowLeft, Home } from 'lucide-react';
import { getBookById } from '@/data/booksData';
import { useReviewsStore } from '@/store/reviewsStore';
import { useCartActions } from '@/hooks/useCart';
import BookGallery from '@/components/book-detail/BookGallery';
import BookInfo from '@/components/book-detail/BookInfo';
import BookTabs from '@/components/book-detail/BookTabs';
import RelatedBooks from '@/components/book-detail/RelatedBooks';
import Cart from '@/components/shop/Cart';

const BookDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { initializeMockReviews } = useReviewsStore();
  const { getItemCount } = useCartActions();

  const book = id ? getBookById(id) : undefined;

  useEffect(() => {
    // Инициализируем mock отзывы при загрузке страницы
    initializeMockReviews();
  }, [initializeMockReviews]);

  useEffect(() => {
    // Обновляем title страницы
    if (book) {
      document.title = `${book.title} - ${book.author} | Магазин книг`;
    } else {
      document.title = 'Книга не найдена | Магазин книг';
    }
  }, [book]);

  const handleBackClick = () => {
    navigate(-1);
  };

  const handleHomeClick = () => {
    navigate('/shop');
  };

  if (!id) {
    return (
      <Container className="py-8">
        <Alert variant="destructive">
          <AlertDescription>
            Неверный URL. Пожалуйста, перейдите в магазин и выберите книгу.
          </AlertDescription>
        </Alert>
      </Container>
    );
  }

  if (!book) {
    return (
      <Container className="py-8">
        <div className="space-y-6">
          {/* Breadcrumbs */}
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Button variant="ghost" size="sm" onClick={handleHomeClick}>
              <Home className="w-4 h-4 mr-1" />
              Главная
            </Button>
            <span>/</span>
            <span>Книга не найдена</span>
          </div>

          <Alert variant="destructive">
            <AlertDescription>
              Книга с ID "{id}" не найдена. Возможно, она была удалена или перемещена.
            </AlertDescription>
          </Alert>

          <div className="flex gap-4">
            <Button onClick={handleBackClick}>
              <ArrowLeft className="w-4 h-4 mr-2" />
              Назад
            </Button>
            <Button variant="outline" onClick={handleHomeClick}>
              Перейти в магазин
            </Button>
          </div>
        </div>
      </Container>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Container className="py-8">
        <div className="space-y-6">
          {/* Breadcrumbs */}
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Button variant="ghost" size="sm" onClick={handleHomeClick}>
              <Home className="w-4 h-4 mr-1" />
              Главная
            </Button>
            <span>/</span>
            <span className="text-foreground">{book.title}</span>
          </div>

          {/* Кнопка назад */}
          <div>
            <Button variant="outline" onClick={handleBackClick}>
              <ArrowLeft className="w-4 h-4 mr-2" />
              Назад
            </Button>
          </div>

          {/* Основной контент */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 animate-in fade-in-50 duration-500">
            {/* Левая колонка - галерея */}
            <div className="animate-in slide-in-from-left-20 duration-700">
              <BookGallery book={book} />
            </div>

            {/* Правая колонка - информация о книге */}
            <div className="animate-in slide-in-from-right-20 duration-700 delay-200">
              <BookInfo book={book} />
            </div>
          </div>

          {/* Табы с подробной информацией */}
          <div className="animate-in fade-in-50 duration-500 delay-300">
            <BookTabs book={book} />
          </div>

          {/* Похожие книги */}
          {book.relatedBooks && book.relatedBooks.length > 0 && (
            <div className="animate-in fade-in-50 duration-500 delay-400">
              <RelatedBooks 
                relatedBookIds={book.relatedBooks} 
                currentBookId={book.id} 
              />
            </div>
          )}
        </div>
      </Container>

      {/* Плавающая кнопка корзины */}
      <div className="fixed top-6 right-6 z-50">
        <Cart>
          <Button
            variant="outline"
            size="sm"
            className="relative bg-background/90 backdrop-blur-sm border-border shadow-lg hover:shadow-xl transition-all"
          >
            Корзина
            {getItemCount() > 0 && (
              <Badge 
                variant="destructive" 
                className="absolute -top-2 -right-2 h-5 w-5 flex items-center justify-center p-0 text-xs"
              >
                {getItemCount() > 99 ? '99+' : getItemCount()}
              </Badge>
            )}
          </Button>
        </Cart>
      </div>
    </div>
  );
};

export default BookDetailPage;
