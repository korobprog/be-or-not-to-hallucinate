import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Gradient Background */}
      <div 
        className="absolute inset-0 z-0"
        style={{ background: 'var(--gradient-hero)' }}
      />
      
      {/* Decorative Elements */}
      <div className="absolute inset-0 z-0 opacity-10">
        <div className="absolute top-20 right-20 w-64 h-64 bg-accent rounded-full blur-3xl" />
        <div className="absolute bottom-20 left-20 w-96 h-96 bg-accent rounded-full blur-3xl" />
      </div>

      {/* Content */}
      <div className="container relative z-10 px-4 py-20 mx-auto text-center">
        <div className="max-w-4xl mx-auto space-y-8">
          {/* Logo/Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full text-sm text-white/90 mb-4">
            <span className="w-2 h-2 bg-accent rounded-full animate-pulse" />
            Онлайн-семинар по самоосознанию
          </div>

          <h1 className="text-5xl md:text-7xl font-bold text-white leading-tight tracking-tight">
            Действуй эффективно
          </h1>
          
          <p className="text-xl md:text-2xl text-white/80 font-light italic max-w-2xl mx-auto">
            Быть, а не галлюцинировать
          </p>

          <div className="flex items-center justify-center gap-4 max-w-2xl mx-auto">
            <img 
              src="/images/pavel.jpg"
              alt="Наставник Павел"
              className="w-16 h-16 rounded-full object-cover border-2 border-white/30 shadow-lg"
            />
            <p className="text-lg text-white/70 leading-relaxed">
              Семинар с Павлом — наставником владельцев бизнеса и судей. 
              Откройте путь к осознанной жизни через психологию, философию и духовные практики.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-8">
            <Button 
              size="lg"
              className="bg-accent text-primary hover:bg-accent/90 font-semibold text-lg px-8 py-6 shadow-lg hover:shadow-xl transition-all"
            >
              Записаться на семинар
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            
            <Button 
              asChild
              size="lg"
              variant="outline"
              className="border-white/30 bg-transparent text-white hover:bg-white/10 hover:text-white font-semibold text-lg px-8 py-6 backdrop-blur-sm"
            >
              <Link to="/shop">
                Купить книги
              </Link>
            </Button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-8 max-w-2xl mx-auto pt-16">
            <div className="text-center">
              <div className="text-3xl font-bold text-accent">500+</div>
              <div className="text-sm text-white/60 mt-1">Участников</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-accent">15+</div>
              <div className="text-sm text-white/60 mt-1">Лет опыта</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-accent">20+</div>
              <div className="text-sm text-white/60 mt-1">Книг</div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10">
        <div className="w-6 h-10 border-2 border-white/30 rounded-full p-1">
          <div className="w-1.5 h-3 bg-accent rounded-full animate-bounce mx-auto" />
        </div>
      </div>
    </section>
  );
};

export default Hero;
