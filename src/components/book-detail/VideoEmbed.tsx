import { Card } from '@/components/ui/card';
import { Play } from 'lucide-react';

interface VideoEmbedProps {
  videoUrl?: string;
  title?: string;
}

const VideoEmbed = ({ videoUrl, title }: VideoEmbedProps) => {
  if (!videoUrl) return null;

  // Функция для извлечения ID видео из различных форматов YouTube URL
  const getYouTubeVideoId = (url: string): string | null => {
    const patterns = [
      /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([^&\n?#]+)/,
      /youtube\.com\/watch\?.*v=([^&\n?#]+)/,
    ];

    for (const pattern of patterns) {
      const match = url.match(pattern);
      if (match) {
        return match[1];
      }
    }
    return null;
  };

  const videoId = getYouTubeVideoId(videoUrl);

  if (!videoId) {
    return (
      <Card className="p-6">
        <div className="text-center text-muted-foreground">
          <Play className="w-12 h-12 mx-auto mb-4 opacity-50" />
          <p>Не удалось загрузить видео</p>
        </div>
      </Card>
    );
  }

  const embedUrl = `https://www.youtube.com/embed/${videoId}`;
  const thumbnailUrl = `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`;

  return (
    <Card className="overflow-hidden">
      <div className="relative aspect-video">
        <iframe
          src={embedUrl}
          title={title || 'Видео о книге'}
          className="w-full h-full"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      </div>
    </Card>
  );
};

export default VideoEmbed;
