import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Calendar, Clock, Video } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

const Registration = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Basic validation
    if (!formData.name || !formData.email) {
      toast.error("Пожалуйста, заполните все обязательные поля");
      return;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      toast.error("Пожалуйста, введите корректный email");
      return;
    }

    toast.success("Заявка отправлена! Мы свяжемся с вами в ближайшее время.");
    setFormData({ name: "", email: "", phone: "" });
  };

  return (
    <section className="py-24 bg-gradient-to-b from-secondary/30 to-background">
      <div className="container px-4 mx-auto">
        <div className="max-w-5xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-start">
            {/* Info */}
            <div className="space-y-8">
              <div>
                <div className="inline-block px-4 py-2 bg-accent/10 border border-accent/20 rounded-full text-sm font-medium text-accent mb-6">
                  Регистрация
                </div>
                
                <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
                  Записаться на семинар
                </h2>
                
                <p className="text-lg text-muted-foreground">
                  Присоединяйтесь к онлайн-семинару в Zoom и начните свой путь к осознанной жизни
                </p>
              </div>

              <div className="space-y-4">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-accent/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Calendar className="w-5 h-5 text-accent" />
                  </div>
                  <div>
                    <div className="font-semibold text-foreground mb-1">Дата проведения</div>
                    <div className="text-muted-foreground">15 марта 2025, суббота</div>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-accent/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Clock className="w-5 h-5 text-accent" />
                  </div>
                  <div>
                    <div className="font-semibold text-foreground mb-1">Время</div>
                    <div className="text-muted-foreground">10:00 - 18:00 (МСК)</div>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-accent/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Video className="w-5 h-5 text-accent" />
                  </div>
                  <div>
                    <div className="font-semibold text-foreground mb-1">Формат</div>
                    <div className="text-muted-foreground">Онлайн-трансляция в Zoom</div>
                  </div>
                </div>
              </div>

              <Card className="p-6 bg-accent/5 border-accent/20">
                <div className="space-y-2">
                  <div className="font-semibold text-foreground">Что включено:</div>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li className="flex items-start gap-2">
                      <span className="w-1.5 h-1.5 bg-accent rounded-full mt-1.5 flex-shrink-0" />
                      Доступ к 8-часовому семинару
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="w-1.5 h-1.5 bg-accent rounded-full mt-1.5 flex-shrink-0" />
                      Запись семинара на 30 дней
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="w-1.5 h-1.5 bg-accent rounded-full mt-1.5 flex-shrink-0" />
                      Методические материалы
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="w-1.5 h-1.5 bg-accent rounded-full mt-1.5 flex-shrink-0" />
                      Сертификат участника
                    </li>
                  </ul>
                </div>
              </Card>
            </div>

            {/* Form */}
            <Card className="p-8 shadow-2xl">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="name">Имя *</Label>
                  <Input
                    id="name"
                    type="text"
                    placeholder="Ваше имя"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    required
                    maxLength={100}
                    className="h-12"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">Email *</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="your@email.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    required
                    maxLength={255}
                    className="h-12"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="phone">Телефон</Label>
                  <Input
                    id="phone"
                    type="tel"
                    placeholder="+7 (999) 999-99-99"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    maxLength={20}
                    className="h-12"
                  />
                </div>

                <Button 
                  type="submit"
                  className="w-full h-12 bg-accent hover:bg-accent/90 text-primary font-semibold text-base"
                  size="lg"
                >
                  Зарегистрироваться
                </Button>

                <p className="text-xs text-muted-foreground text-center">
                  Нажимая кнопку, вы соглашаетесь с политикой конфиденциальности
                </p>
              </form>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Registration;
