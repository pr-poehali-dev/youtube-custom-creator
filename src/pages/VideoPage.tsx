
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Navbar } from "@/components/navbar";
import { Sidebar } from "@/components/sidebar";
import { VideoCard } from "@/components/ui/video-card";
import { VideoPlayer } from "@/components/video-player";
import { CommentsSection } from "@/components/comments-section";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { 
  ThumbsUp, 
  ThumbsDown, 
  Share2, 
  Download, 
  MoreHorizontal, 
  Bell
} from "lucide-react";
import { Separator } from "@/components/ui/separator";

// База данных видео
const videoDatabase = [
  {
    id: 1,
    title: "Как создать свой YouTube за 10 минут с React и Tailwind CSS",
    description: "В этом видео я покажу, как с помощью современных инструментов разработки создать собственный аналог YouTube. Мы будем использовать React для пользовательского интерфейса и Tailwind CSS для стилизации. Видео будет полезно разработчикам с базовым пониманием React и CSS.\n\nТаймкоды:\n00:00 Введение\n01:23 Настройка проекта\n05:47 Создание компонентов\n12:35 Стилизация с Tailwind CSS\n18:52 Добавление функциональности\n24:11 Заключение",
    channelName: "ПрограммистПРО",
    channelAvatar: "https://images.unsplash.com/photo-1568602471122-7832951cc4c5?q=80&w=2070&auto=format&fit=crop",
    subscribers: "1,2 млн подписчиков",
    views: "450 тыс. просмотров",
    likes: 32580,
    dislikes: 210,
    date: "15 апр. 2025 г.",
    thumbnail: "https://images.unsplash.com/photo-1587620962725-abab7fe55159?q=80&w=2062&auto=format&fit=crop",
  },
  {
    id: 2,
    title: "Документальный фильм о космосе: тайны чёрных дыр и квазаров",
    description: "Погрузитесь в захватывающее путешествие по бескрайним просторам космоса! В этом документальном фильме мы исследуем самые загадочные объекты вселенной — чёрные дыры и квазары. Узнайте о последних открытиях астрономов и теориях квантовой физики, объясняющих эти удивительные феномены.\n\nОсобая благодарность космическим агентствам NASA и ESA за предоставленные материалы и визуализации.",
    channelName: "Космос ТВ",
    channelAvatar: "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?q=80&w=1780&auto=format&fit=crop",
    subscribers: "3,5 млн подписчиков",
    views: "1,2 млн просмотров",
    likes: 87520,
    dislikes: 1240,
    date: "30 янв. 2025 г.",
    thumbnail: "https://images.unsplash.com/photo-1462331940025-496dfbfc7564?q=80&w=2022&auto=format&fit=crop",
  },
  {
    id: 3,
    title: "Как я построил дом своими руками за год",
    description: "Здравствуйте, друзья! В этом видео я расскажу и покажу весь процесс постройки дома своими руками с нуля до готового жилья. Весь проект занял ровно год — от покупки участка до переезда. Расскажу об основных этапах строительства, использованных материалах, инструментах и технологиях, а также поделюсь советами для тех, кто только планирует подобное строительство.",
    channelName: "Мастер на все руки",
    channelAvatar: "https://images.unsplash.com/photo-1599566150163-29194dcaad36?q=80&w=987&auto=format&fit=crop",
    subscribers: "870 тыс. подписчиков",
    views: "850 тыс. просмотров",
    likes: 54320,
    dislikes: 870,
    date: "5 мая 2024 г.",
    thumbnail: "https://images.unsplash.com/photo-1513584684374-8bab748fbf90?q=80&w=2065&auto=format&fit=crop",
  },
];

// Похожие видео
const relatedVideos = [
  {
    id: 4,
    title: "Топ-10 самых красивых мест в России, которые стоит посетить",
    channelName: "Путешествия и приключения",
    views: "2,5 млн просмотров",
    time: "5 месяцев назад",
    thumbnail: "https://images.unsplash.com/photo-1564585222527-c2777a5bc6cb?q=80&w=1974&auto=format&fit=crop",
  },
  {
    id: 5,
    title: "Готовим идеальный стейк: секреты шеф-повара",
    channelName: "Кухня Мастера",
    views: "780 тыс. просмотров",
    time: "3 недели назад",
    thumbnail: "https://images.unsplash.com/photo-1558030006-450675393462?q=80&w=2031&auto=format&fit=crop",
  },
  {
    id: 30,
    title: "Изучаем React с нуля до профи",
    channelName: "КодМастер",
    views: "720 тыс. просмотров",
    time: "1 месяц назад",
    thumbnail: "https://images.unsplash.com/photo-1633356122102-3fe601e05bd2?q=80&w=2070&auto=format&fit=crop",
  },
  {
    id: 31,
    title: "TypeScript в 2025: что нового",
    channelName: "ТехноБлог",
    views: "350 тыс. просмотров",
    time: "5 дней назад",
    thumbnail: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=2072&auto=format&fit=crop",
  },
];

const VideoPage = () => {
  const { id } = useParams();
  const [video, setVideo] = useState<any>(null);
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [likeStatus, setLikeStatus] = useState<'none' | 'liked' | 'disliked'>('none');
  const [likesCount, setLikesCount] = useState(0);
  const [dislikesCount, setDislikesCount] = useState(0);
  const [isDescriptionExpanded, setIsDescriptionExpanded] = useState(false);

  useEffect(() => {
    // Находим видео по id из URL
    const videoId = parseInt(id || '1');
    const foundVideo = videoDatabase.find(v => v.id === videoId) || videoDatabase[0];
    
    setVideo(foundVideo);
    setLikesCount(foundVideo.likes);
    setDislikesCount(foundVideo.dislikes);
  }, [id]);

  const handleLike = () => {
    if (likeStatus === 'liked') {
      setLikeStatus('none');
      setLikesCount(likesCount - 1);
    } else {
      if (likeStatus === 'disliked') {
        setDislikesCount(dislikesCount - 1);
      }
      setLikeStatus('liked');
      setLikesCount(likesCount + 1);
    }
  };

  const handleDislike = () => {
    if (likeStatus === 'disliked') {
      setLikeStatus('none');
      setDislikesCount(dislikesCount - 1);
    } else {
      if (likeStatus === 'liked') {
        setLikesCount(likesCount - 1);
      }
      setLikeStatus('disliked');
      setDislikesCount(dislikesCount + 1);
    }
  };

  const toggleSubscribe = () => {
    setIsSubscribed(!isSubscribed);
  };

  const formatNumber = (num: number) => {
    if (num >= 1000000) {
      return (num / 1000000).toFixed(1).replace(/\.0$/, '') + ' млн';
    }
    if (num >= 1000) {
      return (num / 1000).toFixed(1).replace(/\.0$/, '') + ' тыс';
    }
    return num.toString();
  };

  if (!video) {
    return <div className="flex justify-center items-center h-screen">Загрузка...</div>;
  }

  return (
    <div className="flex flex-col h-screen">
      <Navbar />
      <div className="flex flex-1 overflow-hidden">
        <Sidebar />
        <ScrollArea className="flex-1">
          <div className="flex flex-col lg:flex-row">
            <main className="flex-1 p-4 md:p-6 lg:pr-0">
              <VideoPlayer poster={video.thumbnail} />
              
              <div className="mt-4">
                <h1 className="text-xl md:text-2xl font-bold">{video.title}</h1>
                
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mt-4 gap-4">
                  <div className="flex items-center gap-4">
                    <Avatar className="h-10 w-10">
                      <AvatarImage src={video.channelAvatar} />
                      <AvatarFallback>{video.channelName[0]}</AvatarFallback>
                    </Avatar>
                    
                    <div>
                      <h3 className="font-medium">{video.channelName}</h3>
                      <p className="text-sm text-muted-foreground">{video.subscribers}</p>
                    </div>
                    
                    <Button 
                      onClick={toggleSubscribe} 
                      variant={isSubscribed ? "outline" : "default"}
                      className={isSubscribed ? "ml-2 bg-accent" : "ml-2 bg-youtube-red hover:bg-youtube-darkred"}
                    >
                      {isSubscribed ? (
                        <div className="flex items-center gap-2">
                          <Bell size={16} />
                          <span>Подписка оформлена</span>
                        </div>
                      ) : (
                        "Подписаться"
                      )}
                    </Button>
                  </div>
                  
                  <div className="flex flex-wrap items-center gap-2">
                    <div className="flex rounded-full bg-accent overflow-hidden">
                      <Button 
                        variant="ghost" 
                        className={`rounded-r-none ${likeStatus === 'liked' ? 'bg-accent-foreground/20' : ''}`}
                        onClick={handleLike}
                      >
                        <ThumbsUp className="mr-2 h-4 w-4" />
                        {formatNumber(likesCount)}
                      </Button>
                      <Separator orientation="vertical" className="h-full" />
                      <Button 
                        variant="ghost" 
                        className={`rounded-l-none ${likeStatus === 'disliked' ? 'bg-accent-foreground/20' : ''}`}
                        onClick={handleDislike}
                      >
                        <ThumbsDown className="mr-2 h-4 w-4" />
                      </Button>
                    </div>
                    
                    <Button variant="secondary">
                      <Share2 className="mr-2 h-4 w-4" />
                      Поделиться
                    </Button>
                    
                    <Button variant="secondary">
                      <Download className="mr-2 h-4 w-4" />
                      Скачать
                    </Button>
                    
                    <Button variant="ghost" size="icon">
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
                
                <div 
                  className={`mt-4 p-3 bg-accent/50 rounded-lg ${!isDescriptionExpanded ? 'cursor-pointer' : ''}`}
                  onClick={() => !isDescriptionExpanded && setIsDescriptionExpanded(true)}
                >
                  <div className="flex items-center text-sm mb-2">
                    <span className="font-medium mr-4">{video.views}</span>
                    <span>{video.date}</span>
                  </div>
                  
                  <div className={`whitespace-pre-line ${!isDescriptionExpanded ? 'line-clamp-2' : ''}`}>
                    {video.description}
                  </div>
                  
                  {!isDescriptionExpanded && (
                    <Button variant="ghost" size="sm" className="mt-1 p-0 h-auto">
                      Развернуть
                    </Button>
                  )}
                </div>
                
                <CommentsSection videoId={video.id} />
              </div>
            </main>
            
            <aside className="w-full lg:w-80 p-4 space-y-4">
              <div className="text-lg font-medium">Похожие видео</div>
              <div className="space-y-3">
                {relatedVideos.map((video) => (
                  <VideoCard 
                    key={video.id}
                    id={video.id}
                    title={video.title}
                    channelName={video.channelName}
                    views={video.views}
                    time={video.time}
                    thumbnail={video.thumbnail}
                  />
                ))}
              </div>
            </aside>
          </div>
        </ScrollArea>
      </div>
    </div>
  );
};

export default VideoPage;
