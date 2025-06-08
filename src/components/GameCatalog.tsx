import { useState, useMemo } from "react";
import GameCard, { type Game } from "./GameCard";
import GameFilters from "./GameFilters";

interface GameCatalogProps {
  searchQuery: string;
  onAddToCart: (game: Game) => void;
}

const MOCK_GAMES: Game[] = [
  {
    id: 1,
    title: "Cyberpunk 2077",
    price: 1999,
    originalPrice: 2999,
    image:
      "https://images.unsplash.com/photo-1542751371-adc38448a05e?w=400&h=300&fit=crop",
    genre: "RPG",
    rating: 4.2,
    discount: 33,
  },
  {
    id: 2,
    title: "The Witcher 3: Wild Hunt",
    price: 899,
    image:
      "https://images.unsplash.com/photo-1511512578047-dfb367046420?w=400&h=300&fit=crop",
    genre: "RPG",
    rating: 4.8,
  },
  {
    id: 3,
    title: "Call of Duty: Modern Warfare",
    price: 2499,
    image:
      "https://images.unsplash.com/photo-1493711662062-fa541adb3fc8?w=400&h=300&fit=crop",
    genre: "Экшен",
    rating: 4.5,
  },
  {
    id: 4,
    title: "FIFA 24",
    price: 3499,
    image:
      "https://images.unsplash.com/photo-1574623452334-1e0ac2b3ccb4?w=400&h=300&fit=crop",
    genre: "Спорт",
    rating: 4.0,
  },
  {
    id: 5,
    title: "Civilization VI",
    price: 1499,
    originalPrice: 1999,
    image:
      "https://images.unsplash.com/photo-1606092195730-5d7b9af1efc5?w=400&h=300&fit=crop",
    genre: "Стратегия",
    rating: 4.6,
    discount: 25,
  },
  {
    id: 6,
    title: "Gran Turismo 7",
    price: 2999,
    image:
      "https://images.unsplash.com/photo-1583121274602-3e2820c69888?w=400&h=300&fit=crop",
    genre: "Гонки",
    rating: 4.3,
  },
];

const GameCatalog = ({ searchQuery, onAddToCart }: GameCatalogProps) => {
  const [selectedGenres, setSelectedGenres] = useState<string[]>([]);
  const [selectedSort, setSelectedSort] = useState("popular");

  const filteredAndSortedGames = useMemo(() => {
    let filtered = MOCK_GAMES;

    // Фильтр по поиску
    if (searchQuery) {
      filtered = filtered.filter((game) =>
        game.title.toLowerCase().includes(searchQuery.toLowerCase()),
      );
    }

    // Фильтр по жанрам
    if (selectedGenres.length > 0) {
      filtered = filtered.filter((game) => selectedGenres.includes(game.genre));
    }

    // Сортировка
    const sorted = [...filtered].sort((a, b) => {
      switch (selectedSort) {
        case "price-low":
          return a.price - b.price;
        case "price-high":
          return b.price - a.price;
        case "rating":
          return b.rating - a.rating;
        case "newest":
          return b.id - a.id;
        default: // popular
          return b.rating - a.rating;
      }
    });

    return sorted;
  }, [searchQuery, selectedGenres, selectedSort]);

  const handleGenreToggle = (genre: string) => {
    setSelectedGenres((prev) =>
      prev.includes(genre) ? prev.filter((g) => g !== genre) : [...prev, genre],
    );
  };

  const handleClearFilters = () => {
    setSelectedGenres([]);
    setSelectedSort("popular");
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        <div className="lg:col-span-1">
          <GameFilters
            selectedGenres={selectedGenres}
            selectedSort={selectedSort}
            onGenreToggle={handleGenreToggle}
            onSortChange={setSelectedSort}
            onClearFilters={handleClearFilters}
          />
        </div>

        <div className="lg:col-span-3">
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-white font-montserrat mb-2">
              Каталог игр
            </h2>
            <p className="text-slate-400">
              Найдено игр: {filteredAndSortedGames.length}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {filteredAndSortedGames.map((game) => (
              <GameCard key={game.id} game={game} onAddToCart={onAddToCart} />
            ))}
          </div>

          {filteredAndSortedGames.length === 0 && (
            <div className="text-center py-12">
              <p className="text-slate-400 text-lg">
                Игры не найдены. Попробуйте изменить фильтры.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default GameCatalog;
