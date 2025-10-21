import { Card } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Book } from '@/types/shop';
import BookReviews from './BookReviews';
import VideoEmbed from './VideoEmbed';

interface BookTabsProps {
  book: Book;
}

const BookTabs = ({ book }: BookTabsProps) => {
  return (
    <Card className="p-6">
      <Tabs defaultValue="description" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="description">Описание</TabsTrigger>
          <TabsTrigger value="specifications">Характеристики</TabsTrigger>
          <TabsTrigger value="contents">Оглавление</TabsTrigger>
          <TabsTrigger value="reviews">Отзывы</TabsTrigger>
        </TabsList>

        <TabsContent value="description" className="mt-6 space-y-6">
          <div>
            <h3 className="text-xl font-semibold mb-4">Описание</h3>
            <div className="prose prose-gray max-w-none">
              <p className="text-muted-foreground leading-relaxed">
                {book.fullDescription || book.description}
              </p>
            </div>
          </div>

          {book.videoUrl && (
            <div>
              <h3 className="text-xl font-semibold mb-4">Видео</h3>
              <VideoEmbed videoUrl={book.videoUrl} title={book.title} />
            </div>
          )}
        </TabsContent>

        <TabsContent value="specifications" className="mt-6">
          <h3 className="text-xl font-semibold mb-4">Характеристики</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-3">
              <div className="flex justify-between py-2 border-b">
                <span className="text-muted-foreground">Автор</span>
                <span className="font-medium">{book.author}</span>
              </div>
              <div className="flex justify-between py-2 border-b">
                <span className="text-muted-foreground">Издательство</span>
                <span className="font-medium">{book.publisher || 'Не указано'}</span>
              </div>
              <div className="flex justify-between py-2 border-b">
                <span className="text-muted-foreground">Год издания</span>
                <span className="font-medium">{book.year}</span>
              </div>
              <div className="flex justify-between py-2 border-b">
                <span className="text-muted-foreground">ISBN</span>
                <span className="font-medium font-mono">{book.isbn}</span>
              </div>
              <div className="flex justify-between py-2 border-b">
                <span className="text-muted-foreground">Язык</span>
                <span className="font-medium">
                  {book.language === 'ru' ? 'Русский' : 'English'}
                </span>
              </div>
            </div>

            <div className="space-y-3">
              <div className="flex justify-between py-2 border-b">
                <span className="text-muted-foreground">Количество страниц</span>
                <span className="font-medium">{book.pages}</span>
              </div>
              <div className="flex justify-between py-2 border-b">
                <span className="text-muted-foreground">Вес</span>
                <span className="font-medium">
                  {book.weight ? `${book.weight} г` : 'Не указано'}
                </span>
              </div>
              <div className="flex justify-between py-2 border-b">
                <span className="text-muted-foreground">Размеры</span>
                <span className="font-medium">
                  {book.dimensions || 'Не указано'}
                </span>
              </div>
              <div className="flex justify-between py-2 border-b">
                <span className="text-muted-foreground">Категория</span>
                <span className="font-medium">{book.category}</span>
              </div>
              <div className="flex justify-between py-2 border-b">
                <span className="text-muted-foreground">Наличие</span>
                <span className={`font-medium ${
                  book.inStock ? 'text-green-600' : 'text-orange-600'
                }`}>
                  {book.inStock ? 'В наличии' : 'Предзаказ'}
                </span>
              </div>
            </div>
          </div>

          {book.tags && book.tags.length > 0 && (
            <div className="mt-6">
              <h4 className="text-lg font-semibold mb-3">Теги</h4>
              <div className="flex flex-wrap gap-2">
                {book.tags.map((tag, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 bg-secondary text-secondary-foreground rounded-full text-sm"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          )}
        </TabsContent>

        <TabsContent value="contents" className="mt-6">
          <h3 className="text-xl font-semibold mb-4">Оглавление</h3>
          {book.tableOfContents && book.tableOfContents.length > 0 ? (
            <div className="space-y-2">
              {book.tableOfContents.map((chapter, index) => (
                <div
                  key={index}
                  className="flex items-center py-2 px-3 rounded-md hover:bg-muted/50 transition-colors"
                >
                  <span className="text-sm text-muted-foreground w-8">
                    {index + 1}.
                  </span>
                  <span className="text-sm">{chapter}</span>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center text-muted-foreground py-8">
              <p>Оглавление не предоставлено</p>
            </div>
          )}
        </TabsContent>

        <TabsContent value="reviews" className="mt-6">
          <BookReviews bookId={book.id} />
        </TabsContent>
      </Tabs>
    </Card>
  );
};

export default BookTabs;
