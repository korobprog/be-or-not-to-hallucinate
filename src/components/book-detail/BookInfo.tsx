import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Star, Heart, ShoppingCart, Plus, Minus, CheckCircle, AlertCircle } from 'lucide-react';
import { Book } from '@/types/shop';
import { useCartStore } from '@/store/cartStore';
import { useWishlistStore } from '@/store/wishlistStore';
import { toast } from 'sonner';

interface BookInfoProps {
  book: Book;
}

const BookInfo = ({ book }: BookInfoProps) => {
  const [quantity, setQuantity] = useState(1);
  
  const { 
    addItem, 
    isInCart, 
    getQuantity, 
    updateQuantity 
  } = useCartStore();
  
  const { 
    toggleWishlist, 
    isInWishlist 
  } = useWishlistStore();

  const inCart = isInCart(book.id);
  const cartQuantity = getQuantity(book.id);
  const inWishlist = isInWishlist(book.id);

  const handleAddToCart = () => {
    if (inCart) {
      updateQuantity(book.id, cartQuantity + quantity);
    } else {
      for (let i = 0; i < quantity; i++) {
        addItem(book);
      }
    }
    toast.success(`"${book.title}" добавлена в корзину`);
  };

  const handleWishlistToggle = () => {
    toggleWishlist(book.id);
    toast.success(
      inWishlist 
        ? `"${book.title}" удалена из избранного`
        : `"${book.title}" добавлена в избранное`
    );
  };

  const handleQuantityChange = (newQuantity: number) => {
    if (newQuantity >= 1 && newQuantity <= 10) {
      setQuantity(newQuantity);
    }
  };

  return (
    <Card className="p-6">
      <div className="space-y-6">
        {/* Заголовок и автор */}
        <div>
          <h1 className="text-3xl font-bold text-foreground mb-2">
            {book.title}
          </h1>
          <p className="text-lg text-muted-foreground">
            {book.author}
          </p>
        </div>

        {/* Рейтинг и отзывы */}
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`w-5 h-5 ${
                    i < Math.floor(book.rating)
                      ? 'fill-yellow-400 text-yellow-400'
                      : 'fill-gray-200 text-gray-200'
                  }`}
                />
              ))}
            </div>
            <span className="text-lg font-semibold">{book.rating}</span>
          </div>
          <Separator orientation="vertical" className="h-6" />
          <span className="text-muted-foreground">
            {book.reviews} отзывов
          </span>
        </div>

        {/* Статус наличия */}
        <div className="flex items-center gap-2">
          {book.inStock ? (
            <>
              <CheckCircle className="w-5 h-5 text-green-500" />
              <span className="text-green-600 font-medium">В наличии</span>
            </>
          ) : (
            <>
              <AlertCircle className="w-5 h-5 text-orange-500" />
              <span className="text-orange-600 font-medium">Предзаказ</span>
            </>
          )}
        </div>

        {/* Цена */}
        <div className="space-y-2">
          <div className="flex items-baseline gap-3">
            <span className="text-3xl font-bold text-foreground">
              {book.price.toLocaleString()} ₽
            </span>
            {book.originalPrice && book.originalPrice > book.price && (
              <>
                <span className="text-xl text-muted-foreground line-through">
                  {book.originalPrice.toLocaleString()} ₽
                </span>
                <Badge variant="secondary" className="text-sm">
                  Скидка {Math.round((1 - book.price / book.originalPrice) * 100)}%
                </Badge>
              </>
            )}
          </div>
        </div>

        {/* Краткое описание */}
        <div>
          <p className="text-muted-foreground leading-relaxed">
            {book.description}
          </p>
        </div>

        {/* Выбор количества */}
        <div className="space-y-3">
          <label className="text-sm font-medium">Количество:</label>
          <div className="flex items-center gap-3">
            <div className="flex items-center border rounded-md">
              <Button
                size="sm"
                variant="ghost"
                className="h-10 w-10 p-0"
                onClick={() => handleQuantityChange(quantity - 1)}
                disabled={quantity <= 1}
              >
                <Minus className="h-4 w-4" />
              </Button>
              <span className="px-4 py-2 min-w-[60px] text-center font-medium">
                {quantity}
              </span>
              <Button
                size="sm"
                variant="ghost"
                className="h-10 w-10 p-0"
                onClick={() => handleQuantityChange(quantity + 1)}
                disabled={quantity >= 10}
              >
                <Plus className="h-4 w-4" />
              </Button>
            </div>
            <span className="text-sm text-muted-foreground">
              Максимум 10 штук
            </span>
          </div>
        </div>

        {/* Кнопки действий */}
        <div className="space-y-3">
          <Button
            size="lg"
            className="w-full bg-primary hover:bg-primary/90 text-primary-foreground"
            onClick={handleAddToCart}
            disabled={!book.inStock}
          >
            <ShoppingCart className="w-5 h-5 mr-2" />
            {book.inStock ? 'Добавить в корзину' : 'Предзаказ'}
          </Button>

          <Button
            size="lg"
            variant="outline"
            className="w-full"
            onClick={handleWishlistToggle}
          >
            <Heart 
              className={`w-5 h-5 mr-2 ${
                inWishlist ? 'fill-red-500 text-red-500' : ''
              }`} 
            />
            {inWishlist ? 'В избранном' : 'Добавить в избранное'}
          </Button>
        </div>

        {/* Дополнительная информация */}
        <div className="space-y-2 text-sm text-muted-foreground">
          <div className="flex justify-between">
            <span>Страниц:</span>
            <span>{book.pages}</span>
          </div>
          <div className="flex justify-between">
            <span>Год издания:</span>
            <span>{book.year}</span>
          </div>
          <div className="flex justify-between">
            <span>ISBN:</span>
            <span className="font-mono">{book.isbn}</span>
          </div>
          {book.publisher && (
            <div className="flex justify-between">
              <span>Издательство:</span>
              <span>{book.publisher}</span>
            </div>
          )}
        </div>
      </div>
    </Card>
  );
};

export default BookInfo;
