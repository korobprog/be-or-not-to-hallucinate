import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, X, Clock } from "lucide-react";
import { useSearchHistory } from "@/hooks/useLocalStorage";
import { Book } from "@/types/shop";
import { bookService } from "@/services/bookService";

interface SearchBarProps {
  onSearch: (query: string) => void;
  placeholder?: string;
  showSuggestions?: boolean;
}

const SearchBar = ({ 
  onSearch, 
  placeholder = "Поиск книг...",
  showSuggestions = true 
}: SearchBarProps) => {
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState<Book[]>([]);
  const [showSuggestionsList, setShowSuggestionsList] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { searchHistory, addToSearchHistory, removeFromSearchHistory } = useSearchHistory();

  // Debounced поиск для предложений
  useEffect(() => {
    if (!query.trim() || !showSuggestions) {
      setSuggestions([]);
      setShowSuggestionsList(false);
      return;
    }

    const timer = setTimeout(async () => {
      setIsLoading(true);
      try {
        const response = await bookService.searchBooks(query, 5);
        if (response.success) {
          setSuggestions(response.data);
          setShowSuggestionsList(true);
        }
      } catch (error) {
        console.error('Error fetching suggestions:', error);
      } finally {
        setIsLoading(false);
      }
    }, 300);

    return () => clearTimeout(timer);
  }, [query, showSuggestions]);

  const handleSearch = (searchQuery: string = query) => {
    if (searchQuery.trim()) {
      onSearch(searchQuery.trim());
      addToSearchHistory(searchQuery.trim());
      setShowSuggestionsList(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  const handleSuggestionClick = (book: Book) => {
    setQuery(book.title);
    handleSearch(book.title);
  };

  const handleHistoryClick = (historyItem: string) => {
    setQuery(historyItem);
    handleSearch(historyItem);
  };

  const clearQuery = () => {
    setQuery("");
    setSuggestions([]);
    setShowSuggestionsList(false);
  };

  return (
    <div className="relative w-full max-w-md">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
        <Input
          type="text"
          placeholder={placeholder}
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyPress={handleKeyPress}
          onFocus={() => {
            if (suggestions.length > 0 || searchHistory.length > 0) {
              setShowSuggestionsList(true);
            }
          }}
          className="pl-10 pr-10"
        />
        {query && (
          <Button
            variant="ghost"
            size="sm"
            className="absolute right-1 top-1/2 transform -translate-y-1/2 h-6 w-6 p-0"
            onClick={clearQuery}
          >
            <X className="h-3 w-3" />
          </Button>
        )}
      </div>

      {/* Предложения и история поиска */}
      {showSuggestionsList && (
        <div className="absolute top-full left-0 right-0 mt-1 bg-background border rounded-md shadow-lg z-50 max-h-80 overflow-y-auto">
          {/* Предложения */}
          {suggestions.length > 0 && (
            <div className="p-2">
              <div className="text-xs text-muted-foreground mb-2 px-2">Предложения</div>
              {suggestions.map((book) => (
                <div
                  key={book.id}
                  className="flex items-center gap-3 p-2 hover:bg-accent/50 rounded cursor-pointer"
                  onClick={() => handleSuggestionClick(book)}
                >
                  <img
                    src={book.image}
                    alt={book.title}
                    className="w-8 h-12 object-cover rounded"
                  />
                  <div className="flex-1 min-w-0">
                    <div className="text-sm font-medium truncate">{book.title}</div>
                    <div className="text-xs text-muted-foreground">{book.author}</div>
                  </div>
                  <div className="text-sm font-medium">{book.price.toLocaleString()} ₽</div>
                </div>
              ))}
            </div>
          )}

          {/* История поиска */}
          {searchHistory.length > 0 && (!query || suggestions.length === 0) && (
            <div className="p-2">
              <div className="text-xs text-muted-foreground mb-2 px-2">Недавние поиски</div>
              {searchHistory.slice(0, 5).map((historyItem, index) => (
                <div
                  key={index}
                  className="flex items-center gap-2 p-2 hover:bg-accent/50 rounded cursor-pointer"
                  onClick={() => handleHistoryClick(historyItem)}
                >
                  <Clock className="h-3 w-3 text-muted-foreground" />
                  <span className="text-sm">{historyItem}</span>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="ml-auto h-4 w-4 p-0"
                    onClick={(e) => {
                      e.stopPropagation();
                      removeFromSearchHistory(historyItem);
                    }}
                  >
                    <X className="h-3 w-3" />
                  </Button>
                </div>
              ))}
            </div>
          )}

          {/* Состояние загрузки */}
          {isLoading && (
            <div className="p-4 text-center text-sm text-muted-foreground">
              Поиск...
            </div>
          )}

          {/* Пустое состояние */}
          {!isLoading && suggestions.length === 0 && query && (
            <div className="p-4 text-center text-sm text-muted-foreground">
              Ничего не найдено
            </div>
          )}
        </div>
      )}

      {/* Кнопка поиска */}
      <Button
        onClick={() => handleSearch()}
        className="mt-2 w-full"
        disabled={!query.trim()}
      >
        <Search className="h-4 w-4 mr-2" />
        Найти
      </Button>
    </div>
  );
};

export default SearchBar;
