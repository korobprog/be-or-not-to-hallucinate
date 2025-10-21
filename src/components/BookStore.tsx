import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ShoppingCart, Star } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { useCartActions } from "@/hooks/useCart";
import { getBookById } from "@/data/booksData";

const BookStore = () => {
  const navigate = useNavigate();
  const { addToCart } = useCartActions();

  // Используем ID книг из наших данных
  const bookIds = [
    'bhagavad-gita',
    'srimad-bhagavatam', 
    'chaitanya-charitamrita',
    'science-of-self-realization',
    'isopanisad',
    'easy-journey',
    'krishna-book',
    'teachings-of-lord-kapila'
  ];

  const handleAddToCart = (bookId: string, bookTitle: string, e: React.MouseEvent) => {
    e.stopPropagation(); // Предотвращаем клик по карточке
    const book = getBookById(bookId);
    if (book) {
      addToCart(book);
      toast.success(`"${bookTitle}" добавлена в корзину`);
    }
  };

  const handleCardClick = (bookId: string) => {
    navigate(`/shop/book/${bookId}`);
  };

  return (
    <section className="py-24 bg-secondary/30">
      <div className="container px-4 mx-auto">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="text-center max-w-3xl mx-auto mb-16">
            <div className="inline-block px-4 py-2 bg-accent/10 border border-accent/20 rounded-full text-sm font-medium text-accent mb-6">
              Магазин книг
            </div>
            
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
              Книги Шрилы Прабхупады
            </h2>
            
            <p className="text-lg text-muted-foreground">
              Духовные произведения основателя Международного общества сознания Кришны
            </p>
          </div>

          {/* Books Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {bookIds.map((bookId) => {
              const book = getBookById(bookId);
              if (!book) return null;

              return (
                <Card
                  key={bookId}
                  className="overflow-hidden hover:shadow-2xl transition-all duration-300 group cursor-pointer"
                  onClick={() => handleCardClick(bookId)}
                >
                  <div className="relative aspect-[2/3] overflow-hidden">
                    <img
                      src={book.image}
                      alt={book.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>

                  <div className="p-6 space-y-4">
                    <div>
                      <h3 className="text-xl font-semibold text-foreground mb-1 line-clamp-1 group-hover:text-accent transition-colors">
                        {book.title}
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        Автор: {book.author}
                      </p>
                    </div>

                    <p className="text-sm text-muted-foreground line-clamp-2">
                      {book.description}
                    </p>

                    <div className="flex items-center gap-2">
                      <div className="flex items-center gap-1">
                        <Star className="w-4 h-4 fill-accent text-accent" />
                        <span className="text-sm font-medium">{book.rating}</span>
                      </div>
                      <span className="text-xs text-muted-foreground">
                        ({book.reviews} отзывов)
                      </span>
                    </div>

                    <div className="flex items-center justify-between pt-2">
                      <div className="text-2xl font-bold text-foreground">
                        {book.price.toLocaleString()} ₽
                      </div>
                      <Button
                        size="sm"
                        className="bg-accent hover:bg-accent/90 text-primary font-semibold"
                        onClick={(e) => handleAddToCart(bookId, book.title, e)}
                      >
                        <ShoppingCart className="w-4 h-4 mr-2" />
                        В корзину
                      </Button>
                    </div>
                  </div>
                </Card>
              );
            })}
          </div>

          {/* CTA */}
          <div className="text-center mt-12">
            <Button
              asChild
              size="lg"
              variant="outline"
              className="font-semibold"
            >
              <Link to="/shop">
                Посмотреть все книги
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BookStore;