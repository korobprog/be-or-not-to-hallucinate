import { useNavigate, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Store, Filter, ShoppingCart } from "lucide-react";
import { useCartActions } from "@/hooks/useCart";

interface MobileBottomNavProps {
  onFiltersOpen: () => void;
}

const MobileBottomNav = ({ onFiltersOpen }: MobileBottomNavProps) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { getItemCount } = useCartActions();

  const navItems = [
    {
      id: "shop",
      icon: Store,
      label: "Каталог",
      path: "/shop",
      isActive: location.pathname === "/shop"
    },
    {
      id: "filters",
      icon: Filter,
      label: "Фильтры",
      onClick: onFiltersOpen,
      isActive: false
    },
    {
      id: "cart",
      icon: ShoppingCart,
      label: "Корзина",
      path: "/checkout",
      isActive: location.pathname === "/checkout",
      badge: getItemCount() > 0 ? getItemCount() : undefined
    }
  ];

  const handleNavClick = (item: typeof navItems[0]) => {
    if (item.onClick) {
      item.onClick();
    } else if (item.path) {
      navigate(item.path);
    }
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 lg:hidden">
      <div className="bg-background/95 backdrop-blur-lg border-t shadow-lg">
        <div className="flex items-center justify-around px-4 py-2 h-16">
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <Button
                key={item.id}
                variant={item.isActive ? "default" : "ghost"}
                size="sm"
                onClick={() => handleNavClick(item)}
                className="flex flex-col items-center gap-1 h-12 w-16 px-2 py-1 relative"
              >
                <Icon className="h-5 w-5" />
                <span className="text-xs font-medium">{item.label}</span>
                {item.badge && (
                  <Badge 
                    variant="destructive" 
                    className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 text-xs"
                  >
                    {item.badge > 99 ? '99+' : item.badge}
                  </Badge>
                )}
              </Button>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default MobileBottomNav;
