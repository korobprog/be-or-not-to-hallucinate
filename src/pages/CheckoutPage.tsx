import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { ShoppingCart, CreditCard, Truck, CheckCircle, AlertCircle } from "lucide-react";
import { useCartActions } from "@/hooks/useCart";
import { useViewHistory } from "@/hooks/useLocalStorage";
import Breadcrumbs from "@/components/shop/Breadcrumbs";
import { toast } from "sonner";

// Схема валидации формы
const checkoutSchema = z.object({
  firstName: z.string().min(2, "Имя должно содержать минимум 2 символа"),
  lastName: z.string().min(2, "Фамилия должна содержать минимум 2 символа"),
  email: z.string().email("Введите корректный email"),
  phone: z.string().min(10, "Введите корректный номер телефона"),
  address: z.string().min(10, "Адрес должен содержать минимум 10 символов"),
  city: z.string().min(2, "Введите город"),
  postalCode: z.string().min(5, "Введите корректный почтовый индекс"),
  comment: z.string().optional(),
  deliveryMethod: z.enum(["pickup", "delivery"], {
    required_error: "Выберите способ доставки"
  })
});

type CheckoutFormData = z.infer<typeof checkoutSchema>;

const CheckoutPage = () => {
  const navigate = useNavigate();
  const { items, getTotal, clearCart } = useCartActions();
  const { addToHistory } = useViewHistory();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [orderSuccess, setOrderSuccess] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors }
  } = useForm<CheckoutFormData>({
    resolver: zodResolver(checkoutSchema),
    defaultValues: {
      deliveryMethod: "delivery"
    }
  });

  const deliveryMethod = watch("deliveryMethod");

  // Если корзина пуста, перенаправляем в магазин
  if (items.length === 0 && !orderSuccess) {
    return (
      <div className="min-h-screen bg-background">
        <div className="container mx-auto px-4 py-8">
          <Breadcrumbs />
          <Card className="max-w-md mx-auto mt-8 p-8 text-center">
            <AlertCircle className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
            <h2 className="text-xl font-semibold mb-2">Корзина пуста</h2>
            <p className="text-muted-foreground mb-4">
              Добавьте товары в корзину, чтобы оформить заказ
            </p>
            <Button onClick={() => navigate("/shop")}>
              Перейти в магазин
            </Button>
          </Card>
        </div>
      </div>
    );
  }

  // Страница успешного заказа
  if (orderSuccess) {
    return (
      <div className="min-h-screen bg-background">
        <div className="container mx-auto px-4 py-8">
          <Breadcrumbs />
          <Card className="max-w-md mx-auto mt-8 p-8 text-center">
            <CheckCircle className="h-12 w-12 mx-auto mb-4 text-green-500" />
            <h2 className="text-xl font-semibold mb-2">Заказ оформлен!</h2>
            <p className="text-muted-foreground mb-4">
              Спасибо за покупку! Мы свяжемся с вами в ближайшее время.
            </p>
            <div className="space-y-2">
              <Button onClick={() => navigate("/shop")} className="w-full">
                Продолжить покупки
              </Button>
              <Button variant="outline" onClick={() => navigate("/")} className="w-full">
                На главную
              </Button>
            </div>
          </Card>
        </div>
      </div>
    );
  }

  const onSubmit = async (data: CheckoutFormData) => {
    setIsSubmitting(true);
    
    try {
      // Имитация отправки заказа
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Добавляем товары в историю просмотров
      items.forEach(item => addToHistory(item.book.id));
      
      // Очищаем корзину
      clearCart();
      
      // Показываем успех
      setOrderSuccess(true);
      
      toast.success("Заказ успешно оформлен!");
    } catch (error) {
      toast.error("Произошла ошибка при оформлении заказа");
    } finally {
      setIsSubmitting(false);
    }
  };

  const deliveryCost = deliveryMethod === "delivery" ? 300 : 0;
  const finalTotal = getTotal() + deliveryCost;

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-40">
        <div className="container mx-auto px-4 py-4">
          <Breadcrumbs />
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-3xl font-bold mb-8">Оформление заказа</h1>

          <div className="grid lg:grid-cols-2 gap-8">
            {/* Левая колонка - форма */}
            <div>
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <ShoppingCart className="h-5 w-5" />
                    Данные для заказа
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                    {/* Личная информация */}
                    <div className="space-y-4">
                      <h3 className="font-semibold">Личная информация</h3>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="firstName">Имя *</Label>
                          <Input
                            id="firstName"
                            {...register("firstName")}
                            className={errors.firstName ? "border-destructive" : ""}
                          />
                          {errors.firstName && (
                            <p className="text-sm text-destructive mt-1">
                              {errors.firstName.message}
                            </p>
                          )}
                        </div>
                        <div>
                          <Label htmlFor="lastName">Фамилия *</Label>
                          <Input
                            id="lastName"
                            {...register("lastName")}
                            className={errors.lastName ? "border-destructive" : ""}
                          />
                          {errors.lastName && (
                            <p className="text-sm text-destructive mt-1">
                              {errors.lastName.message}
                            </p>
                          )}
                        </div>
                      </div>

                      <div>
                        <Label htmlFor="email">Email *</Label>
                        <Input
                          id="email"
                          type="email"
                          {...register("email")}
                          className={errors.email ? "border-destructive" : ""}
                        />
                        {errors.email && (
                          <p className="text-sm text-destructive mt-1">
                            {errors.email.message}
                          </p>
                        )}
                      </div>

                      <div>
                        <Label htmlFor="phone">Телефон *</Label>
                        <Input
                          id="phone"
                          type="tel"
                          placeholder="+7 (999) 123-45-67"
                          {...register("phone")}
                          className={errors.phone ? "border-destructive" : ""}
                        />
                        {errors.phone && (
                          <p className="text-sm text-destructive mt-1">
                            {errors.phone.message}
                          </p>
                        )}
                      </div>
                    </div>

                    <Separator />

                    {/* Способ доставки */}
                    <div className="space-y-4">
                      <h3 className="font-semibold">Способ доставки</h3>
                      <RadioGroup
                        value={deliveryMethod}
                        onValueChange={(value) => {
                          register("deliveryMethod").onChange({ target: { value } });
                        }}
                      >
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="delivery" id="delivery" />
                          <Label htmlFor="delivery" className="flex items-center gap-2 cursor-pointer">
                            <Truck className="h-4 w-4" />
                            Доставка (300 ₽)
                          </Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="pickup" id="pickup" />
                          <Label htmlFor="pickup" className="flex items-center gap-2 cursor-pointer">
                            <ShoppingCart className="h-4 w-4" />
                            Самовывоз (бесплатно)
                          </Label>
                        </div>
                      </RadioGroup>
                      {errors.deliveryMethod && (
                        <p className="text-sm text-destructive">
                          {errors.deliveryMethod.message}
                        </p>
                      )}
                    </div>

                    {/* Адрес доставки */}
                    {deliveryMethod === "delivery" && (
                      <>
                        <Separator />
                        <div className="space-y-4">
                          <h3 className="font-semibold">Адрес доставки</h3>
                          <div>
                            <Label htmlFor="city">Город *</Label>
                            <Input
                              id="city"
                              {...register("city")}
                              className={errors.city ? "border-destructive" : ""}
                            />
                            {errors.city && (
                              <p className="text-sm text-destructive mt-1">
                                {errors.city.message}
                              </p>
                            )}
                          </div>

                          <div>
                            <Label htmlFor="address">Адрес *</Label>
                            <Textarea
                              id="address"
                              placeholder="Улица, дом, квартира"
                              {...register("address")}
                              className={errors.address ? "border-destructive" : ""}
                            />
                            {errors.address && (
                              <p className="text-sm text-destructive mt-1">
                                {errors.address.message}
                              </p>
                            )}
                          </div>

                          <div>
                            <Label htmlFor="postalCode">Почтовый индекс *</Label>
                            <Input
                              id="postalCode"
                              {...register("postalCode")}
                              className={errors.postalCode ? "border-destructive" : ""}
                            />
                            {errors.postalCode && (
                              <p className="text-sm text-destructive mt-1">
                                {errors.postalCode.message}
                              </p>
                            )}
                          </div>
                        </div>
                      </>
                    )}

                    <Separator />

                    {/* Комментарий */}
                    <div className="space-y-4">
                      <h3 className="font-semibold">Комментарий к заказу</h3>
                      <Textarea
                        placeholder="Дополнительные пожелания по заказу..."
                        {...register("comment")}
                      />
                    </div>

                    {/* Кнопка отправки */}
                    <Button
                      type="submit"
                      size="lg"
                      className="w-full"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? "Оформляем заказ..." : "Оформить заказ"}
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </div>

            {/* Правая колонка - информация о заказе */}
            <div className="space-y-6">
              {/* Товары в заказе */}
              <Card>
                <CardHeader>
                  <CardTitle>Ваш заказ</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {items.map((item) => (
                      <div key={item.book.id} className="flex gap-3">
                        <img
                          src={item.book.image}
                          alt={item.book.title}
                          className="w-16 h-20 object-cover rounded"
                        />
                        <div className="flex-1">
                          <h4 className="font-medium text-sm line-clamp-2">
                            {item.book.title}
                          </h4>
                          <p className="text-xs text-muted-foreground">
                            {item.book.author}
                          </p>
                          <div className="flex items-center justify-between mt-2">
                            <span className="text-sm">
                              {item.quantity} шт.
                            </span>
                            <span className="font-semibold">
                              {(item.book.price * item.quantity).toLocaleString()} ₽
                            </span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Итоговая стоимость */}
              <Card>
                <CardHeader>
                  <CardTitle>Итого</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span>Товары ({items.reduce((sum, item) => sum + item.quantity, 0)} шт.)</span>
                      <span>{getTotal().toLocaleString()} ₽</span>
                    </div>
                    
                    {deliveryMethod === "delivery" && (
                      <div className="flex justify-between">
                        <span>Доставка</span>
                        <span>{deliveryCost.toLocaleString()} ₽</span>
                      </div>
                    )}
                    
                    <Separator />
                    
                    <div className="flex justify-between text-lg font-semibold">
                      <span>К оплате</span>
                      <span className="text-accent">{finalTotal.toLocaleString()} ₽</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Информация о доставке */}
              <Alert>
                <Truck className="h-4 w-4" />
                <AlertDescription>
                  {deliveryMethod === "delivery" 
                    ? "Доставка осуществляется в течение 3-5 рабочих дней"
                    : "Самовывоз доступен в нашем центре по адресу: г. Москва, ул. Примерная, д. 1"
                  }
                </AlertDescription>
              </Alert>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
