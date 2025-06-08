import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import Icon from "@/components/ui/icon";
import type { Game } from "./GameCard";

interface CartItem extends Game {
  quantity: number;
}

interface ShoppingCartProps {
  items: CartItem[];
  isOpen: boolean;
  onClose: () => void;
  onRemoveItem: (gameId: number) => void;
  onUpdateQuantity: (gameId: number, quantity: number) => void;
}

const ShoppingCart = ({
  items,
  isOpen,
  onClose,
  onRemoveItem,
  onUpdateQuantity,
}: ShoppingCartProps) => {
  const totalPrice = items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  );

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-end">
      <div className="bg-slate-900 w-full max-w-md h-full overflow-y-auto border-l border-slate-700">
        <div className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-white font-montserrat">
              Корзина
            </h2>
            <Button
              variant="ghost"
              size="icon"
              onClick={onClose}
              className="text-slate-400 hover:text-white"
            >
              <Icon name="X" size={24} />
            </Button>
          </div>

          {items.length === 0 ? (
            <div className="text-center py-8">
              <Icon
                name="ShoppingCart"
                size={48}
                className="text-slate-600 mx-auto mb-4"
              />
              <p className="text-slate-400">Корзина пуста</p>
            </div>
          ) : (
            <div className="space-y-4">
              {items.map((item) => (
                <div
                  key={item.id}
                  className="bg-slate-800 rounded-lg p-4 border border-slate-700"
                >
                  <div className="flex gap-3">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-16 h-16 object-cover rounded"
                    />
                    <div className="flex-1">
                      <h4 className="text-white font-medium text-sm line-clamp-2">
                        {item.title}
                      </h4>
                      <Badge
                        variant="secondary"
                        className="bg-slate-700 text-slate-300 text-xs mt-1"
                      >
                        {item.genre}
                      </Badge>

                      <div className="flex items-center justify-between mt-2">
                        <div className="flex items-center space-x-2">
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-6 w-6 text-slate-400 hover:text-white"
                            onClick={() =>
                              onUpdateQuantity(
                                item.id,
                                Math.max(1, item.quantity - 1),
                              )
                            }
                          >
                            <Icon name="Minus" size={12} />
                          </Button>
                          <span className="text-white text-sm w-6 text-center">
                            {item.quantity}
                          </span>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-6 w-6 text-slate-400 hover:text-white"
                            onClick={() =>
                              onUpdateQuantity(item.id, item.quantity + 1)
                            }
                          >
                            <Icon name="Plus" size={12} />
                          </Button>
                        </div>

                        <div className="flex items-center space-x-2">
                          <span className="text-white font-medium text-sm">
                            {item.price * item.quantity} ₽
                          </span>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-6 w-6 text-red-400 hover:text-red-300"
                            onClick={() => onRemoveItem(item.id)}
                          >
                            <Icon name="Trash2" size={12} />
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}

              <Separator className="bg-slate-700" />

              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-lg font-semibold text-white">
                    Итого:
                  </span>
                  <span className="text-xl font-bold text-purple-400">
                    {totalPrice} ₽
                  </span>
                </div>

                <Button className="w-full bg-purple-600 hover:bg-purple-700 text-white">
                  <Icon name="CreditCard" size={20} className="mr-2" />
                  Оформить заказ
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ShoppingCart;
