import { Card } from "@/components/ui/card";
import { Star } from "lucide-react";

const testimonials = [
  {
    name: "Александр М.",
    role: "Владелец IT-компании",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&h=200&fit=crop",
    rating: 5,
    text: "Семинар Павла полностью изменил моё понимание лидерства. Теперь я действую из состояния осознанности, а не реакции на внешние обстоятельства.",
  },
  {
    name: "Елена С.",
    role: "Судья окружного суда",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&h=200&fit=crop",
    rating: 5,
    text: "Павел помог мне найти баланс между профессиональной деятельностью и внутренним покоем. Его подход — это идеальное сочетание практичности и духовности.",
  },
  {
    name: "Дмитрий К.",
    role: "Инвестор",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&h=200&fit=crop",
    rating: 5,
    text: "Впервые встретил наставника, который говорит о духовности языком действия и результата. Рекомендую всем лидерам и предпринимателям.",
  },
];

const Testimonials = () => {
  return (
    <section className="py-24 bg-gradient-to-b from-secondary/30 to-background">
      <div className="container px-4 mx-auto">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center max-w-3xl mx-auto mb-16">
            <div className="inline-block px-4 py-2 bg-accent/10 border border-accent/20 rounded-full text-sm font-medium text-accent mb-6">
              Отзывы
            </div>
            
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
              Результаты участников
            </h2>
            
            <p className="text-lg text-muted-foreground">
              Истории трансформации от людей, прошедших путь с Павлом
            </p>
          </div>

          {/* Testimonials Grid */}
          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card
                key={index}
                className="p-8 hover:shadow-xl transition-all duration-300"
              >
                <div className="flex items-center gap-4 mb-6">
                  <img
                    src={testimonial.image}
                    alt={testimonial.name}
                    className="w-16 h-16 rounded-full object-cover"
                  />
                  <div>
                    <div className="font-semibold text-foreground">
                      {testimonial.name}
                    </div>
                    <div className="text-sm text-muted-foreground">
                      {testimonial.role}
                    </div>
                  </div>
                </div>

                <div className="flex gap-1 mb-4">
                  {Array.from({ length: testimonial.rating }).map((_, i) => (
                    <Star
                      key={i}
                      className="w-4 h-4 fill-accent text-accent"
                    />
                  ))}
                </div>

                <p className="text-muted-foreground leading-relaxed">
                  "{testimonial.text}"
                </p>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
