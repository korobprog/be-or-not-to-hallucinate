import { Quote } from "lucide-react";

const About = () => {
  return (
    <section className="py-24 bg-gradient-to-b from-background to-secondary/30">
      <div className="container px-4 mx-auto">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            {/* Image */}
            <div className="relative">
              <div className="absolute -inset-4 bg-gradient-to-br from-primary/20 to-accent/20 rounded-3xl blur-2xl opacity-30" />
              <div className="relative aspect-[3/4] rounded-2xl overflow-hidden shadow-2xl">
                <img 
                  src="/images/pavel.jpg"
                  alt="Наставник Павел"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-primary/50 to-transparent" />
              </div>
            </div>

            {/* Content */}
            <div className="space-y-6">
              <div className="inline-block px-4 py-2 bg-accent/10 border border-accent/20 rounded-full text-sm font-medium text-accent">
                О наставнике
              </div>

              <h2 className="text-4xl md:text-5xl font-bold text-foreground">
                Павел
              </h2>

              <p className="text-lg text-muted-foreground leading-relaxed">
                Уважаемый ментор владельцев бизнеса и судей. Духовный и практичный лидер 
                с более чем 15-летним опытом работы в области психологии, философии и 
                самоосознания.
              </p>

              <div className="relative pl-6 border-l-4 border-accent/50 py-2">
                <Quote className="absolute -left-3 top-0 w-6 h-6 text-accent" />
                <blockquote className="text-xl font-light italic text-foreground/90 leading-relaxed">
                  "Истинная эффективность начинается с осознанности. Не действуйте механически — 
                  действуйте из состояния присутствия."
                </blockquote>
                <cite className="block mt-4 text-sm font-medium text-muted-foreground not-italic">
                  — Павел
                </cite>
              </div>

              <div className="space-y-3 pt-4">
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-accent rounded-full mt-2" />
                  <p className="text-muted-foreground">
                    Работа с топ-менеджерами и владельцами крупного бизнеса
                  </p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-accent rounded-full mt-2" />
                  <p className="text-muted-foreground">
                    Консультирование судей и представителей юридической сферы
                  </p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-accent rounded-full mt-2" />
                  <p className="text-muted-foreground">
                    Автор более 20 книг по психологии и духовному развитию
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
