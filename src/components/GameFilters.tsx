import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";

interface GameFiltersProps {
  selectedGenres: string[];
  selectedSort: string;
  onGenreToggle: (genre: string) => void;
  onSortChange: (sort: string) => void;
  onClearFilters: () => void;
}

const GENRES = [
  "Экшен",
  "RPG",
  "Стратегия",
  "Симулятор",
  "Спорт",
  "Гонки",
  "Головоломка",
];

const SORT_OPTIONS = [
  { value: "popular", label: "По популярности" },
  { value: "price-low", label: "Сначала дешевые" },
  { value: "price-high", label: "Сначала дорогие" },
  { value: "rating", label: "По рейтингу" },
  { value: "newest", label: "Новинки" },
];

const GameFilters = ({
  selectedGenres,
  selectedSort,
  onGenreToggle,
  onSortChange,
  onClearFilters,
}: GameFiltersProps) => {
  return (
    <div className="bg-slate-800 rounded-lg p-6 border border-slate-700">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-white font-montserrat">
          Фильтры
        </h3>
        <Button
          variant="ghost"
          size="sm"
          onClick={onClearFilters}
          className="text-slate-400 hover:text-white"
        >
          Очистить
        </Button>
      </div>

      <div className="space-y-4">
        <div>
          <label className="text-sm font-medium text-slate-300 mb-2 block">
            Сортировка
          </label>
          <Select value={selectedSort} onValueChange={onSortChange}>
            <SelectTrigger className="w-full bg-slate-700 border-slate-600 text-white">
              <SelectValue />
            </SelectTrigger>
            <SelectContent className="bg-slate-700 border-slate-600">
              {SORT_OPTIONS.map((option) => (
                <SelectItem
                  key={option.value}
                  value={option.value}
                  className="text-white hover:bg-slate-600"
                >
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div>
          <label className="text-sm font-medium text-slate-300 mb-2 block">
            Жанры
          </label>
          <div className="flex flex-wrap gap-2">
            {GENRES.map((genre) => (
              <Badge
                key={genre}
                variant={
                  selectedGenres.includes(genre) ? "default" : "secondary"
                }
                className={`cursor-pointer transition-colors ${
                  selectedGenres.includes(genre)
                    ? "bg-purple-600 hover:bg-purple-700 text-white"
                    : "bg-slate-700 hover:bg-slate-600 text-slate-300"
                }`}
                onClick={() => onGenreToggle(genre)}
              >
                {genre}
              </Badge>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default GameFilters;
