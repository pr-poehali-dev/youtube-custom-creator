
import { Navbar } from "@/components/navbar";
import { Sidebar } from "@/components/sidebar";
import { VideoCard } from "@/components/ui/video-card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const videoData = [
  {
    id: 1,
    title: "Как создать свой YouTube за 10 минут с React и Tailwind CSS",
    channelName: "ПрограммистПРО",
    views: "450 тыс. просмотров",
    time: "2 недели назад",
    thumbnail: "https://images.unsplash.com/photo-1587620962725-abab7fe55159?q=80&w=2062&auto=format&fit=crop",
  },
  {
    id: 2,
    title: "Документальный фильм о космосе: тайны чёрных дыр и квазаров",
    channelName: "Космос ТВ",
    views: "1,2 млн просмотров",
    time: "3 месяца назад",
    thumbnail: "https://images.unsplash.com/photo-1462331940025-496dfbfc7564?q=80&w=2022&auto=format&fit=crop",
  },
  {
    id: 3,
    title: "Как я построил дом своими руками за год",
    channelName: "Мастер на все руки",
    views: "850 тыс. просмотров",
    time: "1 год назад",
    thumbnail: "https://images.unsplash.com/photo-1513584684374-8bab748fbf90?q=80&w=2065&auto=format&fit=crop",
  },
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
    id: 6,
    title: "Самые ожидаемые фильмы 2025 года",
    channelName: "КиноОбзор",
    views: "1,5 млн просмотров",
    time: "2 дня назад",
    thumbnail: "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?q=80&w=2070&auto=format&fit=crop",
  },
];

const Index = () => {
  return (
    <div className="flex flex-col h-screen">
      <Navbar />
      <div className="flex flex-1 overflow-hidden">
        <Sidebar />
        <main className="flex-1 overflow-auto p-4 md:p-6">
          <Tabs defaultValue="all" className="mb-6">
            <TabsList className="mb-4">
              <TabsTrigger value="all">Все</TabsTrigger>
              <TabsTrigger value="music">Музыка</TabsTrigger>
              <TabsTrigger value="games">Игры</TabsTrigger>
              <TabsTrigger value="programming">Программирование</TabsTrigger>
              <TabsTrigger value="movies">Фильмы</TabsTrigger>
            </TabsList>
            <TabsContent value="all" className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {videoData.map((video) => (
                <VideoCard 
                  key={video.id}
                  title={video.title}
                  channelName={video.channelName}
                  views={video.views}
                  time={video.time}
                  thumbnail={video.thumbnail}
                />
              ))}
            </TabsContent>
            <TabsContent value="music" className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              <VideoCard 
                title="Новый альбом: полный обзор и анализ каждого трека"
                channelName="МузыкаЭксперт"
                views="320 тыс. просмотров"
                time="1 неделя назад"
                thumbnail="https://images.unsplash.com/photo-1511379938547-c1f69419868d?q=80&w=2070&auto=format&fit=crop"
              />
              <VideoCard 
                title="Как научиться играть на гитаре за 30 дней"
                channelName="МузыкаМастер"
                views="1,7 млн просмотров"
                time="2 месяца назад"
                thumbnail="https://images.unsplash.com/photo-1525201548942-d8732f6617a0?q=80&w=2070&auto=format&fit=crop"
              />
            </TabsContent>
          </Tabs>
        </main>
      </div>
    </div>
  );
};

export default Index;
