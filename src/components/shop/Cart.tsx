import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { ShoppingCart, Trash2, Plus, Minus, ShoppingBag } from "lucide-react";
import { useCartActions } from "@/hooks/useCart";
import { Link } from "react-router-dom";
import { toast } from "sonner";

interface CartProps {
  children?: React.ReactNode;
}

const Cart = ({ children }: CartProps) => {
  const { 
    items, 
    getTotal, 
    getItemCount, 
    removeFromCart, 
    updateQuantity, 
    clearCart 
  } = useCartActions();
  const [isOpen, setIsOpen] = useState(false);

  const total = getTotal();
  const itemCount = getItemCount();

  const handleQuantityChange = (bookId: string, newQuantity: number) => {
    if (newQuantity <= 0) {
      removeFromCart(bookId);
    } else {
      updateQuantity(bookId, newQuantity);
    }
  };

  const handleClearCart = () => {
    clearCart();
    setIsOpen(false);
  };

  const handleCheckout = () => {
    if (items.length === 0) {
      toast.error("Корзина пуста");
      return;
    }
    setIsOpen(false);
    // Навигация к странице оформления заказа будет через Link
  };

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        {children || (
          <Button variant="outline" size="sm" className="relative">
            <ShoppingCart className="h-4 w-4" />
            {itemCount > 0 && (
              <Badge 
                variant="destructive" 
                className="absolute -top-2 -right-2 h-5 w-5 flex items-center justify-center p-0 text-xs"
              >
                {itemCount > 99 ? '99+' : itemCount}
              </Badge>
            )}
          </Button>
        )}
      </SheetTrigger>
      
      <SheetContent className="w-full sm:max-w-md">
        <SheetHeader>
          <SheetTitle className="flex items-center gap-2">
            <ShoppingCart className="h-5 w-5" />
            Корзина
            {itemCount > 0 && (
              <Badge variant="secondary">
                {itemCount} {itemCount === 1 ? 'товар' : 'товаров'}
              </Badge>
            )}
          </SheetTitle>
        </SheetHeader>

        <div className="flex flex-col h-full">
          {items.length === 0 ? (
            // Пустая корзина
            <div className="flex-1 flex flex-col items-center justify-center text-center space-y-4">
              <ShoppingBag className="h-16 w-16 text-muted-foreground" />
              <div>
                <h3 className="text-lg font-semibold">Корзина пуста</h3>
                <p className="text-muted-foreground">
                  Добавьте книги в корзину, чтобы продолжить покупки
                </p>
              </div>
              <Button asChild onClick={() => setIsOpen(false)}>
                <Link to="/shop">
                  Перейти в магазин
                </Link>
              </Button>
            </div>
          ) : (
            <>
              {/* Список товаров */}
              <div className="flex-1 overflow-y-auto space-y-4 py-4">
                {items.map((item) => (
                  <Card key={item.book.id} className="p-3">
                    <div className="flex gap-3">
                      {/* Изображение */}
                      <img
                        src={item.book.image}
                        alt={item.book.title}
                        className="w-16 h-20 object-cover rounded"
                      />
                      
                      {/* Информация о товаре */}
                      <div className="flex-1 min-w-0">
                        <h4 className="font-medium text-sm line-clamp-2 mb-1">
                          {item.book.title}
                        </h4>
                        <p className="text-xs text-muted-foreground mb-2">
                          {item.book.author}
                        </p>
                        
                        {/* Цена */}
                        <div className="text-sm font-semibold mb-2">
                          {item.book.price.toLocaleString()} ₽
                        </div>
                        
                        {/* Управление количеством */}
                        <div className="flex items-center gap-2">
                          <Button
                            variant="outline"
                            size="sm"
                            className="h-6 w-6 p-0"
                            onClick={() => handleQuantityChange(item.book.id, item.quantity - 1)}
                          >
                            <Minus className="h-3 w-3" />
                          </Button>
                          
                          <span className="text-sm font-medium min-w-[20px] text-center">
                            {item.quantity}
                          </span>
                          
                          <Button
                            variant="outline"
                            size="sm"
                            className="h-6 w-6 p-0"
                            onClick={() => handleQuantityChange(item.book.id, item.quantity + 1)}
                          >
                            <Plus className="h-3 w-3" />
                          </Button>
                          
                          <Button
                            variant="ghost"
                            size="sm"
                            className="h-6 w-6 p-0 ml-auto text-destructive hover:text-destructive"
                            onClick={() => removeFromCart(item.book.id)}
                          >
                            <Trash2 className="h-3 w-3" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>

              <Separator />

              {/* Итого и действия */}
              <div className="space-y-4 py-4">
                {/* Итоговая сумма */}
                <div className="flex justify-between items-center">
                  <span className="text-lg font-semibold">Итого:</span>
                  <span className="text-xl font-bold text-accent">
                    {total.toLocaleString()} ₽
                  </span>
                </div>

                {/* Кнопки действий */}
                <div className="space-y-2">
                  <Button 
                    asChild 
                    className="w-full"
                    onClick={handleCheckout}
                  >
                    <Link to="/checkout">
                      Оформить заказ
                    </Link>
                  </Button>
                  
                  <div className="flex gap-2">
                    <Button 
                      variant="outline" 
                      className="flex-1"
                      onClick={() => setIsOpen(false)}
                    >
                      Продолжить покупки
                    </Button>
                    
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={handleClearCart}
                      className="text-destructive hover:text-destructive"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default Cart;
