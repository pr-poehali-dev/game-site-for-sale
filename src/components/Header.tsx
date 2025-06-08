import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Icon from "@/components/ui/icon";

interface HeaderProps {
  cartCount: number;
  onCartClick: () => void;
  onSearch: (query: string) => void;
}

const Header = ({ cartCount, onCartClick, onSearch }: HeaderProps) => {
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(searchQuery);
  };

  return (
    <header className="bg-slate-900 border-b border-slate-700 sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Icon name="Gamepad2" className="text-purple-400" size={32} />
            <h1 className="text-2xl font-bold text-white font-montserrat">
              GameStore
            </h1>
          </div>

          <form onSubmit={handleSearch} className="flex-1 max-w-md mx-8">
            <div className="relative">
              <Input
                type="text"
                placeholder="Поиск игр..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-slate-800 border-slate-600 text-white placeholder-slate-400 pr-10"
              />
              <Button
                type="submit"
                variant="ghost"
                size="icon"
                className="absolute right-0 top-0 h-full px-3 text-slate-400 hover:text-white"
              >
                <Icon name="Search" size={20} />
              </Button>
            </div>
          </form>

          <div className="flex items-center space-x-4">
            <Button
              variant="ghost"
              onClick={onCartClick}
              className="relative text-white hover:text-purple-400"
            >
              <Icon name="ShoppingCart" size={24} />
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-purple-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
