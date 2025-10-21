import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Check, Sparkles } from "lucide-react";
import { toast } from "sonner";

const tickets = [
  {
    name: "Базовый",
    price: "0 ₽",
    description: "Идеально для начала пути",
    features: [
      "Доступ к семинару в Zoom",
      "Запись на 30 дней",
      "Методические материалы",
    ],
    popular: false,
  },
  {
    name: "Премиум",
    price: "7 500 ₽",
    description: "Максимальная ценность",
    features: [
      "Всё из Базового пакета",
      "Личная консультация с Павлом (30 мин)",
      "Доступ к закрытому чату",
      "Дополнительные материалы",
      "Скидка 20% на книги",
    ],
    popular: true,
  },
  {
    name: "VIP",
    price: "1 000 000 ₽",
    description: "Для глубокой трансформации",
    features: [
      "Всё из Премиум пакета",
      "3 личные встречи с Павлом (по 60 мин)",
      "Индивидуальный план развития",
      "Безлимитный доступ к записям",
      "Приглашение на закрытые встречи",
    ],
    popular: false,
  },
];

const Tickets = () => {
  const handlePurchase = (ticketName: string, price: string) => {
    const action = price === "0 ₽" ? "записались на" : "купили";
    toast.success(`Вы ${action} "${ticketName}". Перенаправляем на оплату...`);
  };

  return (
    <section className="py-24 bg-background">
      <div className="container px-4 mx-auto">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="text-center max-w-3xl mx-auto mb-16">
            <div className="inline-block px-4 py-2 bg-accent/10 border border-accent/20 rounded-full text-sm font-medium text-accent mb-6">
              Билеты
            </div>
            
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
              Выберите свой путь
            </h2>
            
            <p className="text-lg text-muted-foreground">
              Различные уровни участия для максимальной пользы от семинара
            </p>
          </div>

          {/* Tickets Grid */}
          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {tickets.map((ticket, index) => (
              <Card
                key={index}
                className={`relative p-8 hover:shadow-2xl transition-all duration-300 ${
                  ticket.popular
                    ? "border-2 border-accent shadow-xl scale-105"
                    : "border-border"
                }`}
              >
                {ticket.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <div className="flex items-center gap-2 px-4 py-2 bg-accent text-primary rounded-full text-sm font-semibold shadow-lg">
                      <Sparkles className="w-4 h-4" />
                      Популярный
                    </div>
                  </div>
                )}

                <div className="text-center mb-8">
                  <h3 className="text-2xl font-bold text-foreground mb-2">
                    {ticket.name}
                  </h3>
                  <p className="text-sm text-muted-foreground mb-6">
                    {ticket.description}
                  </p>
                  <div className="mb-2">
                    <span className="text-4xl font-bold text-foreground">
                      {ticket.price}
                    </span>
                  </div>
                </div>

                <ul className="space-y-4 mb-8">
                  {ticket.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-start gap-3">
                      <div className="w-5 h-5 bg-accent/10 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                        <Check className="w-3 h-3 text-accent" />
                      </div>
                      <span className="text-sm text-muted-foreground">
                        {feature}
                      </span>
                    </li>
                  ))}
                </ul>

                <Button
                  className={`w-full h-12 font-semibold ${
                    ticket.popular
                      ? "bg-accent hover:bg-accent/90 text-primary"
                      : "bg-primary hover:bg-primary/90 text-primary-foreground"
                  }`}
                  onClick={() => handlePurchase(ticket.name, ticket.price)}
                >
                  {ticket.price === "0 ₽" ? "Записаться" : "Купить"}
                </Button>
              </Card>
            ))}
          </div>

          {/* Additional Info */}
          <div className="text-center mt-12 max-w-2xl mx-auto">
            <p className="text-muted-foreground">
              Все платежи защищены. При возникновении вопросов свяжитесь с нами.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Tickets;
