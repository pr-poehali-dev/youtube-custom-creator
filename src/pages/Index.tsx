
import { Navbar } from "@/components/navbar";
import { Sidebar } from "@/components/sidebar";
import { VideoCard } from "@/components/ui/video-card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";

const videoData = [
  {
    id: 1,
    title: "Как создать свой YouTube за 10 минут с React и Tailwind CSS",
    channelName: "ПрограммистПРО",
    views: "450 тыс. просмотров",
    time: "2 недели назад",
    thumbnail: "https://images.unsplash.com/photo-1587620962725-abab7fe55159?q=80&w=2062&auto=format&fit=crop",
    avatarSrc: "https://images.unsplash.com/photo-1568602471122-7832951cc4c5?q=80&w=2070&auto=format&fit=crop"
  },
  {
    id: 2,
    title: "Документальный фильм о космосе: тайны чёрных дыр и квазаров",
    channelName: "Космос ТВ",
    views: "1,2 млн просмотров",
    time: "3 месяца назад",
    thumbnail: "https://images.unsplash.com/photo-1462331940025-496dfbfc7564?q=80&w=2022&auto=format&fit=crop",
    avatarSrc: "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?q=80&w=1780&auto=format&fit=crop"
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

const musicVideos = [
  {
    id: 10,
    title: "Новый альбом: полный обзор и анализ каждого трека",
    channelName: "МузыкаЭксперт",
    views: "320 тыс. просмотров",
    time: "1 неделя назад",
    thumbnail: "https://images.unsplash.com/photo-1511379938547-c1f69419868d?q=80&w=2070&auto=format&fit=crop",
  },
  {
    id: 11,
    title: "Как научиться играть на гитаре за 30 дней",
    channelName: "МузыкаМастер",
    views: "1,7 млн просмотров",
    time: "2 месяца назад",
    thumbnail: "https://images.unsplash.com/photo-1525201548942-d8732f6617a0?q=80&w=2070&auto=format&fit=crop",
  },
  {
    id: 12,
    title: "История рок-музыки за 15 минут",
    channelName: "РокЭксперт",
    views: "925 тыс. просмотров",
    time: "11 месяцев назад",
    thumbnail: "https://images.unsplash.com/photo-1498038432885-c6f3f1b912ee?q=80&w=2070&auto=format&fit=crop",
  },
];

const gameVideos = [
  {
    id: 20,
    title: "Прохождение новой игры: часть 1",
    channelName: "ИгроМан",
    views: "560 тыс. просмотров",
    time: "4 дня назад",
    thumbnail: "https://images.unsplash.com/photo-1511512578047-dfb367046420?q=80&w=2071&auto=format&fit=crop",
  },
  {
    id: 21,
    title: "Обзор мощного игрового ПК 2025 года",
    channelName: "ТехноГеймер",
    views: "1,3 млн просмотров",
    time: "2 недели назад",
    thumbnail: "https://images.unsplash.com/photo-1560419015-7c427e8ae5ba?q=80&w=2070&auto=format&fit=crop",
  },
];

const programmingVideos = [
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

const moviesVideos = [
  {
    id: 40,
    title: "Лучшие сцены из фильмов 2024 года",
    channelName: "КиноЭксперт",
    views: "890 тыс. просмотров", 
    time: "3 недели назад",
    thumbnail: "https://images.unsplash.com/photo-1543536448-d209d2d13a1c?q=80&w=2070&auto=format&fit=crop",
  },
  {
    id: 41,
    title: "Как снимали спецэффекты в последнем блокбастере",
    channelName: "ЗаКулисье",
    views: "1,1 млн просмотров",
    time: "2 месяца назад",
    thumbnail: "https://images.unsplash.com/photo-1585951237318-9ea5e175b891?q=80&w=2070&auto=format&fit=crop",
  },
];

const Index = () => {
  return (
    <div className="flex flex-col h-screen">
      <Navbar />
      <div className="flex flex-1 overflow-hidden">
        <Sidebar />
        <ScrollArea className="flex-1">
          <main className="p-4 md:p-6">
            <Tabs defaultValue="all" className="mb-6">
              <TabsList className="mb-4 flex items-center w-auto overflow-x-auto pb-1 justify-start">
                <TabsTrigger value="all">Все</TabsTrigger>
                <TabsTrigger value="music">Музыка</TabsTrigger>
                <TabsTrigger value="games">Игры</TabsTrigger>
                <TabsTrigger value="programming">Программирование</TabsTrigger>
                <TabsTrigger value="movies">Фильмы</TabsTrigger>
                <TabsTrigger value="news">Новости</TabsTrigger>
                <TabsTrigger value="sports">Спорт</TabsTrigger>
                <TabsTrigger value="learning">Обучение</TabsTrigger>
              </TabsList>

              <TabsContent value="all" className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                {videoData.map((video) => (
                  <VideoCard 
                    key={video.id}
                    id={video.id}
                    title={video.title}
                    channelName={video.channelName}
                    views={video.views}
                    time={video.time}
                    thumbnail={video.thumbnail}
                    avatarSrc={video.avatarSrc}
                  />
                ))}
              </TabsContent>

              <TabsContent value="music" className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                {musicVideos.map((video) => (
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
              </TabsContent>

              <TabsContent value="games" className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                {gameVideos.map((video) => (
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
              </TabsContent>

              <TabsContent value="programming" className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                {programmingVideos.map((video) => (
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
              </TabsContent>

              <TabsContent value="movies" className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                {moviesVideos.map((video) => (
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
              </TabsContent>
            </Tabs>
          </main>
        </ScrollArea>
      </div>
    </div>
  );
};

export default Index;
