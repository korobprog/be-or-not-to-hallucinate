import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Book } from '@/types/shop';
import { getBookById } from '@/data/booksData';
import ProductCard from '@/components/shop/ProductCard';
import { useNavigate } from 'react-router-dom';

interface RelatedBooksProps {
  relatedBookIds?: string[];
  currentBookId: string;
}

const RelatedBooks = ({ relatedBookIds, currentBookId }: RelatedBooksProps) => {
  const navigate = useNavigate();
  const [currentIndex, setCurrentIndex] = useState(0);

  if (!relatedBookIds || relatedBookIds.length === 0) {
    return null;
  }

  // Получаем книги по ID и исключаем текущую книгу
  const relatedBooks = relatedBookIds
    .map(id => getBookById(id))
    .filter((book): book is Book => book !== undefined && book.id !== currentBookId);

  if (relatedBooks.length === 0) {
    return null;
  }

  const itemsPerPage = 4;
  const totalPages = Math.ceil(relatedBooks.length / itemsPerPage);
  const currentBooks = relatedBooks.slice(
    currentIndex * itemsPerPage,
    (currentIndex + 1) * itemsPerPage
  );

  const nextPage = () => {
    setCurrentIndex((prev) => (prev + 1) % totalPages);
  };

  const prevPage = () => {
    setCurrentIndex((prev) => (prev - 1 + totalPages) % totalPages);
  };

  const handleBookClick = (book: Book) => {
    navigate(`/shop/book/${book.id}`);
  };

  return (
    <Card className="p-6">
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-xl font-semibold">Похожие книги</h3>
          {totalPages > 1 && (
            <div className="flex items-center gap-2">
              <Button
                size="sm"
                variant="outline"
                onClick={prevPage}
                disabled={totalPages <= 1}
              >
                <ChevronLeft className="w-4 h-4" />
              </Button>
              <span className="text-sm text-muted-foreground">
                {currentIndex + 1} из {totalPages}
              </span>
              <Button
                size="sm"
                variant="outline"
                onClick={nextPage}
                disabled={totalPages <= 1}
              >
                <ChevronRight className="w-4 h-4" />
              </Button>
            </div>
          )}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {currentBooks.map((book) => (
            <div
              key={book.id}
              onClick={() => handleBookClick(book)}
              className="cursor-pointer"
            >
              <ProductCard book={book} />
            </div>
          ))}
        </div>

        {totalPages > 1 && (
          <div className="flex justify-center gap-2">
            {[...Array(totalPages)].map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`w-2 h-2 rounded-full transition-colors ${
                  index === currentIndex ? 'bg-primary' : 'bg-muted-foreground/30'
                }`}
              />
            ))}
          </div>
        )}
      </div>
    </Card>
  );
};

export default RelatedBooks;
