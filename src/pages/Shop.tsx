import { useState } from "react";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { ChevronLeft, ChevronRight, Grid, List, AlertCircle } from "lucide-react";
import { Book } from "@/types/shop";
import { useBookFilters, useSorting, usePagination } from "@/hooks/useBookFilters";
import ProductCard from "@/components/shop/ProductCard";
import Filters from "@/components/shop/Filters";
import SearchBar from "@/components/shop/SearchBar";
import Breadcrumbs from "@/components/shop/Breadcrumbs";
import Cart from "@/components/shop/Cart";
import ProductQuickView from "@/components/shop/ProductQuickView";

const Shop = () => {
  const [selectedBook, setSelectedBook] = useState<Book | null>(null);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  
  const {
    books,
    loading,
    error,
    filters,
    searchQuery,
    currentPage,
    totalPages,
    totalBooks,
    activeFiltersCount,
    availableAuthors,
    updateFilters,
    updateSearch,
    resetFilters,
    goToPage
  } = useBookFilters();

  const { sortOptions } = useSorting();
  const { pageNumbers, hasNextPage, hasPrevPage } = usePagination(currentPage, totalPages);

  const handleQuickView = (book: Book) => {
    setSelectedBook(book);
  };

  const handleCloseQuickView = () => {
    setSelectedBook(null);
  };

  const handleSearch = (query: string) => {
    updateSearch(query);
  };

  const handleFiltersChange = (newFilters: Partial<typeof filters>) => {
    updateFilters(newFilters);
  };

  const handleResetFilters = () => {
    resetFilters();
  };

  // Skeleton для загрузки
  const ProductSkeleton = () => (
    <Card className="overflow-hidden">
      <Skeleton className="aspect-[2/3] w-full" />
      <div className="p-4 space-y-3">
        <Skeleton className="h-4 w-3/4" />
        <Skeleton className="h-3 w-1/2" />
        <Skeleton className="h-3 w-full" />
        <Skeleton className="h-3 w-2/3" />
        <div className="flex justify-between items-center">
          <Skeleton className="h-6 w-16" />
          <Skeleton className="h-8 w-24" />
        </div>
      </div>
    </Card>
  );

  return (
    <div className="min-h-screen bg-background">
      {/* Header с корзиной */}
      <div className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-40">
        <Container className="py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Breadcrumbs />
            </div>
            <Cart />
          </div>
        </Container>
      </div>

      <Container className="py-8">
        {/* Заголовок страницы */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Магазин книг</h1>
          <p className="text-muted-foreground">
            Духовные произведения основателя Международного общества сознания Кришны
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Левая колонка - фильтры */}
          <div className="lg:w-80 flex-shrink-0">
            <Filters
              filters={filters}
              onFiltersChange={handleFiltersChange}
              onResetFilters={handleResetFilters}
              activeFiltersCount={activeFiltersCount}
              availableAuthors={availableAuthors}
              sortOptions={sortOptions}
            />
          </div>

          {/* Правая колонка - товары */}
          <div className="flex-1">
            {/* Панель управления */}
            <div className="flex flex-col sm:flex-row gap-4 mb-6">
              {/* Поиск */}
              <div className="flex-1">
                <SearchBar onSearch={handleSearch} />
              </div>

              {/* Режим просмотра и сортировка */}
              <div className="flex items-center gap-2">
                <div className="flex border rounded-md">
                  <Button
                    variant={viewMode === 'grid' ? 'default' : 'ghost'}
                    size="sm"
                    onClick={() => setViewMode('grid')}
                    className="rounded-r-none"
                  >
                    <Grid className="h-4 w-4" />
                  </Button>
                  <Button
                    variant={viewMode === 'list' ? 'default' : 'ghost'}
                    size="sm"
                    onClick={() => setViewMode('list')}
                    className="rounded-l-none"
                  >
                    <List className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>

            {/* Результаты поиска */}
            <div className="mb-4">
              <div className="flex items-center justify-between">
                <div className="text-sm text-muted-foreground">
                  {loading ? (
                    "Загрузка..."
                  ) : (
                    <>
                      Найдено {totalBooks} {totalBooks === 1 ? 'книга' : 'книг'}
                      {activeFiltersCount > 0 && (
                        <span className="ml-2">
                          (применено фильтров: {activeFiltersCount})
                        </span>
                      )}
                    </>
                  )}
                </div>
                
                {activeFiltersCount > 0 && (
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handleResetFilters}
                  >
                    Сбросить фильтры
                  </Button>
                )}
              </div>
            </div>

            {/* Ошибка загрузки */}
            {error && (
              <Alert variant="destructive" className="mb-6">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            {/* Сетка товаров */}
            {loading ? (
              <div className={`grid gap-6 ${
                viewMode === 'grid' 
                  ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4' 
                  : 'grid-cols-1'
              }`}>
                {Array.from({ length: 12 }).map((_, index) => (
                  <ProductSkeleton key={index} />
                ))}
              </div>
            ) : books.length > 0 ? (
              <div className={`grid gap-6 ${
                viewMode === 'grid' 
                  ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4' 
                  : 'grid-cols-1'
              }`}>
                {books.map((book) => (
                  <ProductCard
                    key={book.id}
                    book={book}
                    onQuickView={handleQuickView}
                  />
                ))}
              </div>
            ) : (
              // Пустое состояние
              <Card className="p-12 text-center">
                <div className="space-y-4">
                  <div className="text-6xl">📚</div>
                  <h3 className="text-xl font-semibold">Книги не найдены</h3>
                  <p className="text-muted-foreground max-w-md mx-auto">
                    Попробуйте изменить параметры поиска или сбросить фильтры
                  </p>
                  <Button onClick={handleResetFilters}>
                    Сбросить фильтры
                  </Button>
                </div>
              </Card>
            )}

            {/* Пагинация */}
            {totalPages > 1 && (
              <div className="flex items-center justify-center gap-2 mt-8">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => goToPage(currentPage - 1)}
                  disabled={!hasPrevPage}
                >
                  <ChevronLeft className="h-4 w-4" />
                  Назад
                </Button>

                <div className="flex items-center gap-1">
                  {pageNumbers.map((page, index) => (
                    <Button
                      key={index}
                      variant={page === currentPage ? "default" : "outline"}
                      size="sm"
                      onClick={() => typeof page === 'number' ? goToPage(page) : undefined}
                      disabled={typeof page !== 'number'}
                      className="w-8 h-8 p-0"
                    >
                      {page}
                    </Button>
                  ))}
                </div>

                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => goToPage(currentPage + 1)}
                  disabled={!hasNextPage}
                >
                  Вперед
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
            )}
          </div>
        </div>
      </Container>

      {/* Quick View Dialog */}
      <ProductQuickView
        book={selectedBook}
        isOpen={!!selectedBook}
        onClose={handleCloseQuickView}
      />
    </div>
  );
};

export default Shop;
