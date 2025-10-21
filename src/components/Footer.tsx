import { Mail, Phone, Instagram, Facebook, Youtube } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-primary text-primary-foreground py-16">
      <div className="container px-4 mx-auto">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-4 gap-12 mb-12">
            {/* Brand */}
            <div className="md:col-span-2">
              <h3 className="text-2xl font-bold mb-4">Действуй эффективно</h3>
              <p className="text-primary-foreground/80 mb-6 leading-relaxed">
                Путь к осознанной жизни через психологию, философию и духовные практики. 
                Наставник Павел — для тех, кто готов действовать из состояния присутствия.
              </p>
              <div className="flex gap-4">
                <a
                  href="#"
                  className="w-10 h-10 bg-white/10 hover:bg-accent rounded-full flex items-center justify-center transition-colors"
                  aria-label="Instagram"
                >
                  <Instagram className="w-5 h-5" />
                </a>
                <a
                  href="#"
                  className="w-10 h-10 bg-white/10 hover:bg-accent rounded-full flex items-center justify-center transition-colors"
                  aria-label="Facebook"
                >
                  <Facebook className="w-5 h-5" />
                </a>
                <a
                  href="#"
                  className="w-10 h-10 bg-white/10 hover:bg-accent rounded-full flex items-center justify-center transition-colors"
                  aria-label="YouTube"
                >
                  <Youtube className="w-5 h-5" />
                </a>
              </div>
            </div>

            {/* Navigation */}
            <div>
              <h4 className="font-semibold text-lg mb-4">Навигация</h4>
              <ul className="space-y-3">
                <li>
                  <a href="#about" className="text-primary-foreground/80 hover:text-accent transition-colors">
                    О наставнике
                  </a>
                </li>
                <li>
                  <a href="#topics" className="text-primary-foreground/80 hover:text-accent transition-colors">
                    Темы семинара
                  </a>
                </li>
                <li>
                  <a href="#books" className="text-primary-foreground/80 hover:text-accent transition-colors">
                    Книги
                  </a>
                </li>
                <li>
                  <a href="#tickets" className="text-primary-foreground/80 hover:text-accent transition-colors">
                    Билеты
                  </a>
                </li>
              </ul>
            </div>

            {/* Contact */}
            <div>
              <h4 className="font-semibold text-lg mb-4">Контакты</h4>
              <ul className="space-y-3">
                <li>
                  <a
                    href="mailto:info@acteffectively.com"
                    className="flex items-center gap-2 text-primary-foreground/80 hover:text-accent transition-colors"
                  >
                    <Mail className="w-4 h-4" />
                    info@acteffectively.com
                  </a>
                </li>
                <li>
                  <a
                    href="tel:+79991234567"
                    className="flex items-center gap-2 text-primary-foreground/80 hover:text-accent transition-colors"
                  >
                    <Phone className="w-4 h-4" />
                    +7 (999) 123-45-67
                  </a>
                </li>
              </ul>
            </div>
          </div>

          {/* Bottom */}
          <div className="pt-8 border-t border-white/10">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-primary-foreground/60">
              <p>© 2025 Действуй эффективно. Все права защищены.</p>
              <div className="flex gap-6">
                <a href="#" className="hover:text-accent transition-colors">
                  Политика конфиденциальности
                </a>
                <a href="#" className="hover:text-accent transition-colors">
                  Пользовательское соглашение
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
