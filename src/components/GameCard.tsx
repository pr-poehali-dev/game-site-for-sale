import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Icon from "@/components/ui/icon";

export interface Game {
  id: number;
  title: string;
  price: number;
  originalPrice?: number;
  image: string;
  genre: string;
  rating: number;
  discount?: number;
}

interface GameCardProps {
  game: Game;
  onAddToCart: (game: Game) => void;
}

const GameCard = ({ game, onAddToCart }: GameCardProps) => {
  return (
    <div className="bg-slate-800 rounded-lg overflow-hidden border border-slate-700 hover:border-purple-500 transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-purple-500/20">
      <div className="relative">
        <img
          src={game.image}
          alt={game.title}
          className="w-full h-48 object-cover"
        />
        {game.discount && (
          <Badge className="absolute top-2 right-2 bg-red-500 text-white">
            -{game.discount}%
          </Badge>
        )}
      </div>

      <div className="p-4">
        <div className="flex items-start justify-between mb-2">
          <h3 className="text-lg font-semibold text-white line-clamp-2 font-montserrat">
            {game.title}
          </h3>
        </div>

        <div className="flex items-center justify-between mb-3">
          <Badge variant="secondary" className="bg-slate-700 text-slate-300">
            {game.genre}
          </Badge>
          <div className="flex items-center space-x-1">
            <Icon
              name="Star"
              className="text-yellow-400 fill-current"
              size={16}
            />
            <span className="text-slate-300 text-sm">{game.rating}</span>
          </div>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <span className="text-xl font-bold text-white">{game.price} ₽</span>
            {game.originalPrice && (
              <span className="text-sm text-slate-400 line-through">
                {game.originalPrice} ₽
              </span>
            )}
          </div>

          <Button
            onClick={() => onAddToCart(game)}
            className="bg-purple-600 hover:bg-purple-700 text-white"
            size="sm"
          >
            <Icon name="ShoppingCart" size={16} className="mr-1" />
            Купить
          </Button>
        </div>
      </div>
    </div>
  );
};

export default GameCard;
