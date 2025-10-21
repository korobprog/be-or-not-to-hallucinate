import { Brain, Heart, Target, Users, Sparkles, Book } from "lucide-react";
import { Card } from "@/components/ui/card";

const topics = [
  {
    icon: Brain,
    title: "Психология осознанности",
    description: "Практические методы развития внимания и присутствия в моменте",
  },
  {
    icon: Heart,
    title: "Эмоциональный интеллект",
    description: "Работа с эмоциями и построение гармоничных отношений",
  },
  {
    icon: Target,
    title: "Целеполагание и действие",
    description: "Как ставить цели и достигать их из состояния ясности",
  },
  {
    icon: Users,
    title: "Лидерство через присутствие",
    description: "Влияние, авторитет и уважение через осознанное поведение",
  },
  {
    icon: Sparkles,
    title: "Духовная практика",
    description: "Интеграция духовности в повседневную жизнь",
  },
  {
    icon: Book,
    title: "Философия действия",
    description: "Древняя мудрость для современных вызовов",
  },
];

const Topics = () => {
  return (
    <section className="py-24 bg-background">
      <div className="container px-4 mx-auto">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center max-w-3xl mx-auto mb-16">
            <div className="inline-block px-4 py-2 bg-accent/10 border border-accent/20 rounded-full text-sm font-medium text-accent mb-6">
              Программа семинара
            </div>
            
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
              Темы семинара
            </h2>
            
            <p className="text-lg text-muted-foreground">
              Глубокое погружение в практики осознанности, психологии и духовного развития
            </p>
          </div>

          {/* Topics Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {topics.map((topic, index) => {
              const Icon = topic.icon;
              return (
                <Card
                  key={index}
                  className="p-6 hover:shadow-xl transition-all duration-300 border-border/50 hover:border-accent/50 group cursor-pointer"
                >
                  <div className="flex flex-col h-full">
                    <div className="w-12 h-12 bg-accent/10 rounded-xl flex items-center justify-center mb-4 group-hover:bg-accent/20 transition-colors">
                      <Icon className="w-6 h-6 text-accent" />
                    </div>
                    
                    <h3 className="text-xl font-semibold text-foreground mb-3 group-hover:text-primary transition-colors">
                      {topic.title}
                    </h3>
                    
                    <p className="text-muted-foreground leading-relaxed">
                      {topic.description}
                    </p>
                  </div>
                </Card>
              );
            })}
          </div>

          {/* Additional Info */}
          <div className="mt-12 text-center">
            <p className="text-muted-foreground">
              Каждая тема включает теорию, практические упражнения и время для вопросов
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Topics;
