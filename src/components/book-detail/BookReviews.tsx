import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Star, ThumbsUp, User, Calendar } from 'lucide-react';
import { BookReview } from '@/types/shop';
import { useReviewsStore } from '@/store/reviewsStore';
import { toast } from 'sonner';

interface BookReviewsProps {
  bookId: string;
}

const BookReviews = ({ bookId }: BookReviewsProps) => {
  const [showAddForm, setShowAddForm] = useState(false);
  const [newReview, setNewReview] = useState({
    userName: '',
    rating: 5,
    comment: '',
  });
  const [sortBy, setSortBy] = useState<'newest' | 'oldest' | 'rating'>('newest');

  const { getReviewsForBook, addReview, markReviewHelpful } = useReviewsStore();
  const { reviews, averageRating, totalReviews } = getReviewsForBook(bookId);

  const handleSubmitReview = () => {
    if (!newReview.userName.trim() || !newReview.comment.trim()) {
      toast.error('Пожалуйста, заполните все поля');
      return;
    }

    addReview({
      bookId,
      userName: newReview.userName.trim(),
      rating: newReview.rating,
      comment: newReview.comment.trim(),
      helpful: 0,
    });

    setNewReview({ userName: '', rating: 5, comment: '' });
    setShowAddForm(false);
    toast.success('Отзыв добавлен!');
  };

  const handleMarkHelpful = (reviewId: string) => {
    markReviewHelpful(reviewId, bookId);
    toast.success('Спасибо за оценку!');
  };

  const sortedReviews = [...reviews].sort((a, b) => {
    switch (sortBy) {
      case 'oldest':
        return a.date.getTime() - b.date.getTime();
      case 'rating':
        return b.rating - a.rating;
      case 'newest':
      default:
        return b.date.getTime() - a.date.getTime();
    }
  });

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('ru-RU', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    }).format(date);
  };

  return (
    <div className="space-y-6">
      {/* Заголовок и статистика */}
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-2xl font-bold">Отзывы</h3>
          <div className="flex items-center gap-4 mt-2">
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-4 h-4 ${
                      i < Math.floor(averageRating)
                        ? 'fill-yellow-400 text-yellow-400'
                        : 'fill-gray-200 text-gray-200'
                    }`}
                  />
                ))}
              </div>
              <span className="font-semibold">{averageRating}</span>
            </div>
            <span className="text-muted-foreground">
              {totalReviews} отзывов
            </span>
          </div>
        </div>

        <div className="flex gap-2">
          <Select value={sortBy} onValueChange={(value: any) => setSortBy(value)}>
            <SelectTrigger className="w-40">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="newest">Новые</SelectItem>
              <SelectItem value="oldest">Старые</SelectItem>
              <SelectItem value="rating">По рейтингу</SelectItem>
            </SelectContent>
          </Select>
          
          <Button onClick={() => setShowAddForm(!showAddForm)}>
            Написать отзыв
          </Button>
        </div>
      </div>

      {/* Форма добавления отзыва */}
      {showAddForm && (
        <Card className="p-6">
          <h4 className="text-lg font-semibold mb-4">Добавить отзыв</h4>
          <div className="space-y-4">
            <div>
              <Label htmlFor="userName">Ваше имя</Label>
              <Input
                id="userName"
                value={newReview.userName}
                onChange={(e) => setNewReview(prev => ({ ...prev, userName: e.target.value }))}
                placeholder="Введите ваше имя"
              />
            </div>

            <div>
              <Label>Оценка</Label>
              <div className="flex items-center gap-1 mt-2">
                {[...Array(5)].map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setNewReview(prev => ({ ...prev, rating: i + 1 }))}
                    className="focus:outline-none"
                  >
                    <Star
                      className={`w-6 h-6 ${
                        i < newReview.rating
                          ? 'fill-yellow-400 text-yellow-400'
                          : 'fill-gray-200 text-gray-200'
                      }`}
                    />
                  </button>
                ))}
                <span className="ml-2 text-sm text-muted-foreground">
                  {newReview.rating} из 5
                </span>
              </div>
            </div>

            <div>
              <Label htmlFor="comment">Комментарий</Label>
              <Textarea
                id="comment"
                value={newReview.comment}
                onChange={(e) => setNewReview(prev => ({ ...prev, comment: e.target.value }))}
                placeholder="Поделитесь своими впечатлениями о книге..."
                rows={4}
              />
            </div>

            <div className="flex gap-2">
              <Button onClick={handleSubmitReview}>
                Отправить отзыв
              </Button>
              <Button variant="outline" onClick={() => setShowAddForm(false)}>
                Отмена
              </Button>
            </div>
          </div>
        </Card>
      )}

      {/* Список отзывов */}
      <div className="space-y-4">
        {sortedReviews.length === 0 ? (
          <Card className="p-8 text-center">
            <div className="text-muted-foreground">
              <User className="w-12 h-12 mx-auto mb-4 opacity-50" />
              <p>Пока нет отзывов</p>
              <p className="text-sm">Станьте первым, кто поделится своим мнением!</p>
            </div>
          </Card>
        ) : (
          sortedReviews.map((review) => (
            <Card key={review.id} className="p-6">
              <div className="space-y-3">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                      <User className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-semibold">{review.userName}</span>
                        {review.verified && (
                          <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded">
                            ✓ Проверенный покупатель
                          </span>
                        )}
                      </div>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <div className="flex items-center gap-1">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={`w-3 h-3 ${
                                i < review.rating
                                  ? 'fill-yellow-400 text-yellow-400'
                                  : 'fill-gray-200 text-gray-200'
                              }`}
                            />
                          ))}
                        </div>
                        <span>•</span>
                        <div className="flex items-center gap-1">
                          <Calendar className="w-3 h-3" />
                          <span>{formatDate(review.date)}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <p className="text-muted-foreground leading-relaxed">
                  {review.comment}
                </p>

                <div className="flex items-center justify-between">
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => handleMarkHelpful(review.id)}
                    className="text-muted-foreground hover:text-foreground"
                  >
                    <ThumbsUp className="w-4 h-4 mr-1" />
                    Полезно ({review.helpful})
                  </Button>
                </div>
              </div>
            </Card>
          ))
        )}
      </div>
    </div>
  );
};

export default BookReviews;
