import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ShoppingCart, Trash2 } from "lucide-react";
import { useCartActions } from "@/hooks/useCart";
import { Link } from "react-router-dom";

interface CartButtonProps {
  onClick?: () => void;
  className?: string;
}

const CartButton = ({ onClick, className }: CartButtonProps) => {
  const { getItemCount } = useCartActions();

  return (
    <Button
      variant="outline"
      size="sm"
      onClick={onClick}
      className={`relative ${className}`}
    >
      <ShoppingCart className="h-4 w-4" />
      {getItemCount() > 0 && (
        <Badge 
          variant="destructive" 
          className="absolute -top-2 -right-2 h-5 w-5 flex items-center justify-center p-0 text-xs"
        >
          {getItemCount() > 99 ? '99+' : getItemCount()}
        </Badge>
      )}
    </Button>
  );
};

export default CartButton;
