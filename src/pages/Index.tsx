import { useState } from "react";
import Header from "@/components/Header";
import GameCatalog from "@/components/GameCatalog";
import ShoppingCart from "@/components/ShoppingCart";
import type { Game } from "@/components/GameCard";

interface CartItem extends Game {
  quantity: number;
}

const Index = () => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const handleAddToCart = (game: Game) => {
    setCartItems((prev) => {
      const existingItem = prev.find((item) => item.id === game.id);
      if (existingItem) {
        return prev.map((item) =>
          item.id === game.id ? { ...item, quantity: item.quantity + 1 } : item,
        );
      } else {
        return [...prev, { ...game, quantity: 1 }];
      }
    });
  };

  const handleRemoveFromCart = (gameId: number) => {
    setCartItems((prev) => prev.filter((item) => item.id !== gameId));
  };

  const handleUpdateQuantity = (gameId: number, quantity: number) => {
    setCartItems((prev) =>
      prev.map((item) => (item.id === gameId ? { ...item, quantity } : item)),
    );
  };

  const totalCartItems = cartItems.reduce(
    (sum, item) => sum + item.quantity,
    0,
  );

  return (
    <div className="min-h-screen bg-slate-950">
      <Header
        cartCount={totalCartItems}
        onCartClick={() => setIsCartOpen(true)}
        onSearch={setSearchQuery}
      />

      <main>
        <GameCatalog searchQuery={searchQuery} onAddToCart={handleAddToCart} />
      </main>

      <ShoppingCart
        items={cartItems}
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        onRemoveItem={handleRemoveFromCart}
        onUpdateQuantity={handleUpdateQuantity}
      />
    </div>
  );
};

export default Index;
