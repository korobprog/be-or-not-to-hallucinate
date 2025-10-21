import { Link, useLocation } from "react-router-dom";
import { ChevronRight, Home } from "lucide-react";
import { cn } from "@/lib/utils";

interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface BreadcrumbsProps {
  items?: BreadcrumbItem[];
  className?: string;
}

const Breadcrumbs = ({ items = [], className }: BreadcrumbsProps) => {
  const location = useLocation();

  // Автоматическое создание breadcrumbs на основе текущего пути
  const getBreadcrumbsFromPath = (): BreadcrumbItem[] => {
    const pathSegments = location.pathname.split('/').filter(Boolean);
    const breadcrumbs: BreadcrumbItem[] = [
      { label: 'Главная', href: '/shop' }
    ];

    let currentPath = '';
    pathSegments.forEach((segment, index) => {
      currentPath += `/${segment}`;
      
      // Преобразуем сегменты пути в читаемые названия
      let label = segment;
      switch (segment) {
        case 'shop':
          label = 'Магазин';
          break;
        case 'checkout':
          label = 'Оформление заказа';
          break;
        case 'cart':
          label = 'Корзина';
          break;
        default:
          // Преобразуем kebab-case в обычный текст
          label = segment
            .split('-')
            .map(word => word.charAt(0).toUpperCase() + word.slice(1))
            .join(' ');
      }

      // Последний элемент не должен быть ссылкой
      const isLast = index === pathSegments.length - 1;
      breadcrumbs.push({
        label,
        href: isLast ? undefined : currentPath
      });
    });

    return breadcrumbs;
  };

  const breadcrumbs = items.length > 0 ? items : getBreadcrumbsFromPath();

  return (
    <nav className={cn("flex items-center space-x-1 text-sm text-muted-foreground", className)}>
      {breadcrumbs.map((item, index) => (
        <div key={index} className="flex items-center">
          {index === 0 && (
            <Home className="h-4 w-4 mr-1" />
          )}
          
          {item.href ? (
            <Link
              to={item.href}
              className="hover:text-foreground transition-colors"
            >
              {item.label}
            </Link>
          ) : (
            <span className="text-foreground font-medium">
              {item.label}
            </span>
          )}
          
          {index < breadcrumbs.length - 1 && (
            <ChevronRight className="h-4 w-4 mx-1" />
          )}
        </div>
      ))}
    </nav>
  );
};

export default Breadcrumbs;
