import { Card } from "@/components/ui/card";
import { Star } from "lucide-react";

const testimonials = [
  {
    name: "Александр М.",
    role: "Владелец IT-компании",
    image: "/images/testimonials/alexander.jpg",
    rating: 5,
    text: "Семинар Павла полностью изменил моё понимание лидерства. Теперь я действую из состояния осознанности, а не реакции на внешние обстоятельства.",
  },
  {
    name: "Елена С.",
    role: "Судья окружного суда",
    image: "/images/testimonials/elena.jpg",
    rating: 5,
    text: "Павел помог мне найти баланс между профессиональной деятельностью и внутренним покоем. Его подход — это идеальное сочетание практичности и духовности.",
  },
  {
    name: "Дмитрий К.",
    role: "Инвестор",
    image: "/images/testimonials/dmitry.jpg",
    rating: 5,
    text: "Впервые встретил наставника, который говорит о духовности языком действия и результата. Рекомендую всем лидерам и предпринимателям.",
  },
  {
    name: "Мария В.",
    role: "Психолог",
    image: "/images/testimonials/maria.jpg",
    rating: 5,
    text: "Методы Павла помогли мне глубже понять природу человеческого сознания. Его подход к самоосознанию действительно работает.",
  },
  {
    name: "Андрей П.",
    role: "Предприниматель",
    image: "/images/testimonials/andrey.jpg",
    rating: 5,
    text: "После семинара я стал принимать более осознанные решения в бизнесе. Результаты превзошли все ожидания.",
  },
  {
    name: "Ольга Н.",
    role: "Коуч",
    image: "/images/testimonials/olga.jpg",
    rating: 5,
    text: "Павел научил меня видеть за поверхностью событий. Теперь я помогаю клиентам находить истинные причины их проблем.",
  },
  {
    name: "Сергей Л.",
    role: "Директор по развитию",
    image: "/images/testimonials/sergey.jpg",
    rating: 5,
    text: "Методы Павла помогли мне стать более эффективным лидером. Теперь я принимаю решения из состояния внутренней силы.",
  },
  {
    name: "Анна К.",
    role: "Маркетолог",
    image: "/images/testimonials/anna.jpg",
    rating: 5,
    text: "После семинара я поняла, что настоящая сила в осознанности. Это изменило не только мою работу, но и всю жизнь.",
  },
  {
    name: "Михаил Р.",
    role: "Финансовый аналитик",
    image: "/images/testimonials/mikhail.jpg",
    rating: 5,
    text: "Павел показал мне, как соединить логику с интуицией. Теперь мои инвестиционные решения стали намного точнее.",
  },
  {
    name: "Татьяна М.",
    role: "HR-менеджер",
    image: "/images/testimonials/tatyana.jpg",
    rating: 5,
    text: "Работа с Павлом помогла мне лучше понимать людей. Теперь я могу видеть потенциал в каждом сотруднике.",
  },
  {
    name: "Владимир С.",
    role: "Консультант",
    image: "/images/testimonials/vladimir.jpg",
    rating: 5,
    text: "Подход Павла к самоосознанию — это не просто теория, а практический инструмент для ежедневного применения.",
  },
  {
    name: "Екатерина В.",
    role: "Дизайнер",
    image: "/images/testimonials/ekaterina.jpg",
    rating: 5,
    text: "Семинар открыл мне новые грани творчества. Теперь я создаю не просто красивые вещи, а то, что действительно вдохновляет.",
  },
  {
    name: "Игорь П.",
    role: "Продакт-менеджер",
    image: "/images/testimonials/igor.jpg",
    rating: 5,
    text: "Павел научил меня видеть продукт не только с точки зрения функций, но и с точки зрения человеческих потребностей.",
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
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
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
