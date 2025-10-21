import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Star, ShoppingCart, Heart, Plus, Minus, BookOpen, Calendar, Hash, Globe } from "lucide-react";
import { Book } from "@/types/shop";
import { useCartActions } from "@/hooks/useCart";
import { useWishlist } from "@/hooks/useLocalStorage";
import { toast } from "sonner";

interface ProductQuickViewProps {
  book: Book | null;
  isOpen: boolean;
  onClose: () => void;
}

const ProductQuickView = ({ book, isOpen, onClose }: ProductQuickViewProps) => {
  const { addToCart, isInCart, getQuantity, increaseQuantity, decreaseQuantity } = useCartActions();
  const { toggleWishlist, isInWishlist } = useWishlist();
  const [imageLoading, setImageLoading] = useState(true);

  if (!book) return null;

  const quantity = getQuantity(book.id);
  const inCart = isInCart(book.id);
  const inWishlist = isInWishlist(book.id);

  const handleAddToCart = () => {
    addToCart(book);
  };

  const handleWishlistToggle = () => {
    toggleWishlist(book.id);
    toast.success(
      inWishlist 
        ? `"${book.title}" удалена из списка желаний`
        : `"${book.title}" добавлена в список желаний`
    );
  };

  const handleQuantityChange = (newQuantity: number) => {
    if (newQuantity <= 0) {
      // Удаляем из корзины
      decreaseQuantity(book.id);
    } else {
      // Устанавливаем точное количество
      if (newQuantity > quantity) {
        increaseQuantity(book.id);
      } else {
        decreaseQuantity(book.id);
      }
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold">{book.title}</DialogTitle>
        </DialogHeader>

        <div className="grid md:grid-cols-2 gap-6">
          {/* Левая колонка - изображение */}
          <div className="space-y-4">
            <div className="relative aspect-[2/3] overflow-hidden rounded-lg">
              <img
                src={book.image}
                alt={book.title}
                className={`w-full h-full object-cover ${
                  imageLoading ? 'blur-sm' : ''
                }`}
                onLoad={() => setImageLoading(false)}
                onError={() => setImageLoading(false)}
              />
              
              {/* Badges */}
              <div className="absolute top-2 left-2 flex flex-col gap-1">
                {!book.inStock && (
                  <Badge variant="destructive">Предзаказ</Badge>
                )}
                {book.originalPrice && book.originalPrice > book.price && (
                  <Badge variant="secondary">Скидка</Badge>
                )}
              </div>
            </div>

            {/* Кнопки действий */}
            <div className="flex gap-2">
              <Button
                variant="outline"
                className="flex-1"
                onClick={handleWishlistToggle}
              >
                <Heart className={`h-4 w-4 mr-2 ${inWishlist ? 'fill-red-500 text-red-500' : ''}`} />
                {inWishlist ? 'В списке желаний' : 'В список желаний'}
              </Button>
            </div>
          </div>

          {/* Правая колонка - информация */}
          <div className="space-y-6">
            {/* Основная информация */}
            <div>
              <h2 className="text-2xl font-bold mb-2">{book.title}</h2>
              <p className="text-lg text-muted-foreground mb-4">{book.author}</p>
              
              {/* Рейтинг */}
              <div className="flex items-center gap-2 mb-4">
                <div className="flex items-center gap-1">
                  <Star className="w-5 h-5 fill-accent text-accent" />
                  <span className="font-semibold">{book.rating}</span>
                </div>
                <span className="text-muted-foreground">
                  ({book.reviews} отзывов)
                </span>
              </div>

              {/* Цена */}
              <div className="mb-6">
                <div className="text-3xl font-bold text-accent mb-1">
                  {book.price.toLocaleString()} ₽
                </div>
                {book.originalPrice && book.originalPrice > book.price && (
                  <div className="text-lg text-muted-foreground line-through">
                    {book.originalPrice.toLocaleString()} ₽
                  </div>
                )}
              </div>
            </div>

            <Separator />

            {/* Описание */}
            <div>
              <h3 className="font-semibold mb-2">Описание</h3>
              <p className="text-muted-foreground leading-relaxed">
                {book.fullDescription || book.description}
              </p>
            </div>

            <Separator />

            {/* Характеристики */}
            <div>
              <h3 className="font-semibold mb-3">Характеристики</h3>
              <div className="grid grid-cols-2 gap-3 text-sm">
                <div className="flex items-center gap-2">
                  <BookOpen className="h-4 w-4 text-muted-foreground" />
                  <span className="text-muted-foreground">Страниц:</span>
                  <span className="font-medium">{book.pages}</span>
                </div>
                
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                  <span className="text-muted-foreground">Год:</span>
                  <span className="font-medium">{book.year}</span>
                </div>
                
                <div className="flex items-center gap-2">
                  <Hash className="h-4 w-4 text-muted-foreground" />
                  <span className="text-muted-foreground">ISBN:</span>
                  <span className="font-medium text-xs">{book.isbn}</span>
                </div>
                
                <div className="flex items-center gap-2">
                  <Globe className="h-4 w-4 text-muted-foreground" />
                  <span className="text-muted-foreground">Язык:</span>
                  <span className="font-medium">
                    {book.language === 'ru' ? 'Русский' : 'Английский'}
                  </span>
                </div>
                
                {book.publisher && (
                  <div className="col-span-2 flex items-center gap-2">
                    <span className="text-muted-foreground">Издательство:</span>
                    <span className="font-medium">{book.publisher}</span>
                  </div>
                )}
                
                {book.weight && (
                  <div className="flex items-center gap-2">
                    <span className="text-muted-foreground">Вес:</span>
                    <span className="font-medium">{book.weight} г</span>
                  </div>
                )}
                
                {book.dimensions && (
                  <div className="flex items-center gap-2">
                    <span className="text-muted-foreground">Размеры:</span>
                    <span className="font-medium">{book.dimensions}</span>
                  </div>
                )}
              </div>
            </div>

            <Separator />

            {/* Теги */}
            {book.tags && book.tags.length > 0 && (
              <div>
                <h3 className="font-semibold mb-2">Теги</h3>
                <div className="flex flex-wrap gap-1">
                  {book.tags.map((tag, index) => (
                    <Badge key={index} variant="outline" className="text-xs">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </div>
            )}

            <Separator />

            {/* Добавление в корзину */}
            <div>
              {!inCart ? (
                <Button
                  size="lg"
                  className="w-full bg-accent hover:bg-accent/90 text-primary font-semibold"
                  onClick={handleAddToCart}
                  disabled={!book.inStock}
                >
                  <ShoppingCart className="w-5 h-5 mr-2" />
                  {book.inStock ? 'Добавить в корзину' : 'Предзаказ'}
                </Button>
              ) : (
                <div className="space-y-3">
                  <div className="text-center text-sm text-muted-foreground">
                    Товар уже в корзине
                  </div>
                  <div className="flex items-center justify-center gap-3">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleQuantityChange(quantity - 1)}
                    >
                      <Minus className="h-4 w-4" />
                    </Button>
                    
                    <span className="text-lg font-semibold min-w-[40px] text-center">
                      {quantity}
                    </span>
                    
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleQuantityChange(quantity + 1)}
                    >
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ProductQuickView;
