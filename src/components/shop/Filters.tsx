import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Slider } from "@/components/ui/slider";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { Filter, RotateCcw } from "lucide-react";
import { bookCategories } from "@/data/booksData";
import { FilterState, SortOption } from "@/types/shop";

interface FiltersProps {
  filters: FilterState;
  onFiltersChange: (filters: Partial<FilterState>) => void;
  onResetFilters: () => void;
  activeFiltersCount: number;
  availableAuthors: string[];
  sortOptions: { value: SortOption; label: string }[];
  isOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
}

const Filters = ({
  filters,
  onFiltersChange,
  onResetFilters,
  activeFiltersCount,
  availableAuthors,
  sortOptions,
  isOpen = false,
  onOpenChange
}: FiltersProps) => {

  const handleCategoryChange = (categoryId: string, checked: boolean) => {
    const newCategories = checked
      ? [...filters.categories, categoryId]
      : filters.categories.filter(id => id !== categoryId);
    
    onFiltersChange({ categories: newCategories });
  };

  const handlePriceRangeChange = (value: number[]) => {
    onFiltersChange({ priceRange: [value[0], value[1]] as [number, number] });
  };

  const handleAuthorChange = (author: string) => {
    onFiltersChange({ author: author === "all" ? "" : author });
  };

  const handleLanguageChange = (language: string) => {
    onFiltersChange({ language: language as FilterState['language'] });
  };

  const handleRatingChange = (rating: number) => {
    onFiltersChange({ minRating: rating });
  };

  const handleSortChange = (sortBy: string) => {
    onFiltersChange({ sortBy: sortBy as SortOption });
  };

  const handleStockChange = (checked: boolean) => {
    onFiltersChange({ inStockOnly: checked });
  };

  const FilterSection = ({ title, children }: { title: string; children: React.ReactNode }) => (
    <div className="space-y-3">
      <h3 className="font-semibold text-sm text-foreground">{title}</h3>
      {children}
    </div>
  );

  const filtersContent = (
    <div className="space-y-6">
      {/* Сортировка */}
      <FilterSection title="Сортировка">
        <Select value={filters.sortBy} onValueChange={handleSortChange}>
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {sortOptions.map(option => (
              <SelectItem key={option.value} value={option.value}>
                {option.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </FilterSection>

      <Separator />

      {/* Категории */}
      <FilterSection title="Категории">
        <div className="space-y-2">
          {bookCategories.map(category => (
            <div key={category.id} className="flex items-center space-x-2">
              <Checkbox
                id={category.id}
                checked={filters.categories.includes(category.id)}
                onCheckedChange={(checked) => 
                  handleCategoryChange(category.id, checked as boolean)
                }
              />
              <Label 
                htmlFor={category.id} 
                className="text-sm cursor-pointer flex-1"
              >
                {category.name}
              </Label>
            </div>
          ))}
        </div>
      </FilterSection>

      <Separator />

      {/* Цена */}
      <FilterSection title="Цена">
        <div className="space-y-3">
          <div className="flex items-center justify-between text-sm text-muted-foreground">
            <span>{filters.priceRange[0].toLocaleString()} ₽</span>
            <span>{filters.priceRange[1].toLocaleString()} ₽</span>
          </div>
          <Slider
            value={filters.priceRange}
            onValueChange={handlePriceRangeChange}
            max={5000}
            min={0}
            step={100}
            className="w-full"
          />
        </div>
      </FilterSection>

      <Separator />

      {/* Автор */}
      <FilterSection title="Автор">
        <Select value={filters.author || "all"} onValueChange={handleAuthorChange}>
          <SelectTrigger>
            <SelectValue placeholder="Выберите автора" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Все авторы</SelectItem>
            {availableAuthors.map(author => (
              <SelectItem key={author} value={author}>
                {author}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </FilterSection>

      <Separator />

      {/* Язык */}
      <FilterSection title="Язык">
        <RadioGroup value={filters.language} onValueChange={handleLanguageChange}>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="all" id="lang-all" />
            <Label htmlFor="lang-all" className="text-sm cursor-pointer">Все языки</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="ru" id="lang-ru" />
            <Label htmlFor="lang-ru" className="text-sm cursor-pointer">Русский</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="en" id="lang-en" />
            <Label htmlFor="lang-en" className="text-sm cursor-pointer">Английский</Label>
          </div>
        </RadioGroup>
      </FilterSection>

      <Separator />

      {/* Рейтинг */}
      <FilterSection title="Минимальный рейтинг">
        <div className="space-y-2">
          {[1, 2, 3, 4, 5].map(rating => (
            <div key={rating} className="flex items-center space-x-2">
              <Checkbox
                id={`rating-${rating}`}
                checked={filters.minRating === rating}
                onCheckedChange={(checked) => 
                  checked ? handleRatingChange(rating) : handleRatingChange(0)
                }
              />
              <Label htmlFor={`rating-${rating}`} className="text-sm cursor-pointer flex items-center gap-1">
                <span>{rating}+ звезд</span>
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <div
                      key={i}
                      className={`w-3 h-3 ${
                        i < rating ? 'text-yellow-400' : 'text-gray-300'
                      }`}
                    >
                      ★
                    </div>
                  ))}
                </div>
              </Label>
            </div>
          ))}
        </div>
      </FilterSection>

      <Separator />

      {/* Наличие */}
      <FilterSection title="Наличие">
        <div className="flex items-center space-x-2">
          <Checkbox
            id="in-stock"
            checked={filters.inStockOnly}
            onCheckedChange={handleStockChange}
          />
          <Label htmlFor="in-stock" className="text-sm cursor-pointer">
            Только в наличии
          </Label>
        </div>
      </FilterSection>
    </div>
  );

  return (
    <>
      {/* Десктопная версия */}
      <Card className="hidden lg:block p-4 h-fit">
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-semibold text-lg">Фильтры</h2>
          {activeFiltersCount > 0 && (
            <Button
              variant="ghost"
              size="sm"
              onClick={onResetFilters}
              className="text-muted-foreground hover:text-foreground"
            >
              <RotateCcw className="h-4 w-4 mr-1" />
              Сбросить
            </Button>
          )}
        </div>
        {filtersContent}
      </Card>

      {/* Мобильная версия - Sheet */}
      <Sheet open={isOpen} onOpenChange={onOpenChange}>
        <SheetContent side="bottom" className="h-[80vh]">
          <SheetHeader>
            <SheetTitle className="flex items-center gap-2">
              <Filter className="h-5 w-5" />
              Фильтры
              {activeFiltersCount > 0 && (
                <Badge variant="secondary">
                  {activeFiltersCount}
                </Badge>
              )}
            </SheetTitle>
          </SheetHeader>
          <div className="mt-6 overflow-y-auto">
            {filtersContent}
            <div className="mt-6 space-y-2">
              <Button
                onClick={onResetFilters}
                variant="outline"
                className="w-full"
              >
                <RotateCcw className="h-4 w-4 mr-2" />
                Сбросить фильтры
              </Button>
              <Button
                onClick={() => onOpenChange?.(false)}
                className="w-full"
              >
                Применить фильтры
              </Button>
            </div>
          </div>
        </SheetContent>
      </Sheet>
    </>
  );
};

export default Filters;
