import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ShoppingCart, Star, Eye, Heart, Plus, Minus } from "lucide-react";
import { Book } from "@/types/shop";
import { useCartActions } from "@/hooks/useCart";
import { useWishlist } from "@/hooks/useLocalStorage";
import { useState } from "react";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

interface ProductCardProps {
  book: Book;
  onQuickView?: (book: Book) => void;
}

const ProductCard = ({ book, onQuickView }: ProductCardProps) => {
  const { addToCart, isInCart, getQuantity, increaseQuantity, decreaseQuantity } = useCartActions();
  const { toggleWishlist, isInWishlist } = useWishlist();
  const [imageLoading, setImageLoading] = useState(true);
  const navigate = useNavigate();

  const handleCardClick = () => {
    navigate(`/shop/book/${book.id}`);
  };

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation();
    addToCart(book);
  };

  const handleQuickView = (e: React.MouseEvent) => {
    e.stopPropagation();
    onQuickView?.(book);
  };

  const handleWishlistToggle = (e: React.MouseEvent) => {
    e.stopPropagation();
    toggleWishlist(book.id);
    toast.success(
      isInWishlist(book.id) 
        ? `"${book.title}" удалена из списка желаний`
        : `"${book.title}" добавлена в список желаний`
    );
  };

  const quantity = getQuantity(book.id);
  const inCart = isInCart(book.id);
  const inWishlist = isInWishlist(book.id);

  return (
    <Card className="overflow-hidden hover:shadow-2xl transition-all duration-300 group cursor-pointer" onClick={handleCardClick}>
      <div className="relative aspect-[2/3] overflow-hidden">
        <img
          src={book.image}
          alt={book.title}
          className={`w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ${
            imageLoading ? 'blur-sm' : ''
          }`}
          onLoad={() => setImageLoading(false)}
          onError={() => setImageLoading(false)}
        />
        
        {/* Overlay с градиентом */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
        
        {/* Badges */}
        <div className="absolute top-2 left-2 flex flex-col gap-1">
          {!book.inStock && (
            <Badge variant="destructive" className="text-xs">
              Предзаказ
            </Badge>
          )}
          {book.originalPrice && book.originalPrice > book.price && (
            <Badge variant="secondary" className="text-xs">
              Скидка
            </Badge>
          )}
        </div>

        {/* Кнопки действий */}
        <div className="absolute top-2 right-2 flex flex-col gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
          <Button
            size="sm"
            variant="secondary"
            className="h-8 w-8 p-0"
            onClick={handleWishlistToggle}
          >
            <Heart 
              className={`h-4 w-4 ${inWishlist ? 'fill-red-500 text-red-500' : ''}`} 
            />
          </Button>
          
          <Button
            size="sm"
            variant="secondary"
            className="h-8 w-8 p-0"
            onClick={handleQuickView}
          >
            <Eye className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <div className="p-4 space-y-3">
        {/* Заголовок и автор */}
        <div>
          <h3 className="text-lg font-semibold text-foreground mb-1 line-clamp-2 group-hover:text-accent transition-colors">
            {book.title}
          </h3>
          <p className="text-sm text-muted-foreground line-clamp-1">
            {book.author}
          </p>
        </div>

        {/* Описание */}
        <p className="text-sm text-muted-foreground line-clamp-2">
          {book.description}
        </p>

        {/* Рейтинг */}
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1">
            <Star className="w-4 h-4 fill-accent text-accent" />
            <span className="text-sm font-medium">{book.rating}</span>
          </div>
          <span className="text-xs text-muted-foreground">
            ({book.reviews} отзывов)
          </span>
        </div>

        {/* Цена */}
        <div className="text-center pt-2">
          <div className="text-xl font-bold text-foreground">
            {book.price.toLocaleString()} ₽
          </div>
          {book.originalPrice && book.originalPrice > book.price && (
            <div className="text-sm text-muted-foreground line-through">
              {book.originalPrice.toLocaleString()} ₽
            </div>
          )}
        </div>

        {/* Кнопка корзины или управление количеством */}
        <div className="flex justify-center pt-2">
          {!inCart ? (
            <Button
              size="sm"
              className="bg-accent hover:bg-accent/90 text-primary font-semibold"
              onClick={handleAddToCart}
              disabled={!book.inStock}
            >
              <ShoppingCart className="w-4 h-4 mr-2" />
              {book.inStock ? 'В корзину' : 'Предзаказ'}
            </Button>
          ) : (
            <div className="flex items-center gap-2">
              <Button
                size="sm"
                variant="outline"
                className="h-8 w-8 p-0"
                onClick={(e) => {
                  e.stopPropagation();
                  decreaseQuantity(book.id);
                }}
              >
                <Minus className="h-4 w-4" />
              </Button>
              <span className="text-sm font-medium min-w-[20px] text-center">
                {quantity}
              </span>
              <Button
                size="sm"
                variant="outline"
                className="h-8 w-8 p-0"
                onClick={(e) => {
                  e.stopPropagation();
                  increaseQuantity(book.id);
                }}
              >
                <Plus className="h-4 w-4" />
              </Button>
            </div>
          )}
        </div>

        {/* Дополнительная информация */}
        <div className="flex items-center justify-between text-xs text-muted-foreground">
          <span>{book.pages} стр.</span>
          <span>{book.year}</span>
        </div>
      </div>
    </Card>
  );
};

export default ProductCard;
