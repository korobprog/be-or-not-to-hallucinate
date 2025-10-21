import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ShoppingCart, Star } from "lucide-react";
import { toast } from "sonner";

const books = [
  {
    title: "Путь осознанности",
    author: "Павел",
    price: "1 200 ₽",
    rating: 4.9,
    reviews: 234,
    image: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=400&h=600&fit=crop",
    description: "Практическое руководство по развитию осознанности в повседневной жизни",
  },
  {
    title: "Эффективное действие",
    author: "Павел",
    price: "1 500 ₽",
    rating: 5.0,
    reviews: 189,
    image: "https://images.unsplash.com/photo-1543002588-bfa74002ed7e?w=400&h=600&fit=crop",
    description: "Как действовать из состояния присутствия и достигать целей",
  },
  {
    title: "Внутренняя сила",
    author: "Павел",
    price: "1 350 ₽",
    rating: 4.8,
    reviews: 156,
    image: "https://images.unsplash.com/photo-1512820790803-83ca734da794?w=400&h=600&fit=crop",
    description: "Раскрытие потенциала через работу с сознанием",
  },
  {
    title: "Философия лидерства",
    author: "Павел",
    price: "1 400 ₽",
    rating: 4.9,
    reviews: 203,
    image: "https://images.unsplash.com/photo-1589998059171-988d887df646?w=400&h=600&fit=crop",
    description: "Лидерство через осознанность и подлинное присутствие",
  },
];

const BookStore = () => {
  const handleAddToCart = (bookTitle: string) => {
    toast.success(`"${bookTitle}" добавлена в корзину`);
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
              Книги по самоосознанию
            </h2>
            
            <p className="text-lg text-muted-foreground">
              Авторские работы Павла по психологии, философии и духовному развитию
            </p>
          </div>

          {/* Books Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {books.map((book, index) => (
              <Card
                key={index}
                className="overflow-hidden hover:shadow-2xl transition-all duration-300 group"
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
                    <h3 className="text-xl font-semibold text-foreground mb-1 line-clamp-1">
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
                      {book.price}
                    </div>
                    <Button
                      size="sm"
                      className="bg-accent hover:bg-accent/90 text-primary font-semibold"
                      onClick={() => handleAddToCart(book.title)}
                    >
                      <ShoppingCart className="w-4 h-4 mr-2" />
                      В корзину
                    </Button>
                  </div>
                </div>
              </Card>
            ))}
          </div>

          {/* CTA */}
          <div className="text-center mt-12">
            <Button
              size="lg"
              variant="outline"
              className="font-semibold"
            >
              Посмотреть все книги
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BookStore;
