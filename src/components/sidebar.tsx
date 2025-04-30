
import { Home, Compass, Clock, ThumbsUp, PlaySquare, History, Clapperboard, Flame, Film, Music, Gamepad2, Newspaper, Trophy, Lightbulb } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Link } from "react-router-dom";

interface SidebarItemProps {
  icon: React.ReactNode;
  label: string;
  active?: boolean;
  to?: string;
}

const SidebarItem = ({ icon, label, active, to = "/" }: SidebarItemProps) => (
  <Link to={to} className="block">
    <div className={`flex items-center gap-4 p-3 rounded-lg cursor-pointer ${active ? 'bg-accent' : 'hover:bg-accent/50'}`}>
      <div className="text-xl text-foreground">{icon}</div>
      <span className={`text-sm ${active ? 'font-medium' : ''}`}>{label}</span>
    </div>
  </Link>
);

export function Sidebar() {
  const isActive = (path: string) => location.pathname === path;

  return (
    <ScrollArea className="w-60 h-screen bg-background border-r border-border flex-shrink-0 hidden md:block">
      <div className="py-2">
        <div className="px-3 mb-6">
          <SidebarItem icon={<Home />} label="Главная" active={isActive("/")} to="/" />
          <SidebarItem icon={<Compass />} label="Навигатор" />
          <SidebarItem icon={<Flame />} label="Тренды" />
        </div>
        
        <div className="border-t border-border pt-4 px-3 mb-6">
          <h3 className="px-3 mb-1 text-sm font-medium">Библиотека</h3>
          <SidebarItem icon={<History />} label="История" />
          <SidebarItem icon={<PlaySquare />} label="Ваши видео" />
          <SidebarItem icon={<Clock />} label="Смотреть позже" />
          <SidebarItem icon={<ThumbsUp />} label="Понравившиеся" />
        </div>
        
        <div className="border-t border-border pt-4 px-3 mb-6">
          <h3 className="px-3 mb-1 text-sm font-medium">Категории</h3>
          <SidebarItem icon={<Music />} label="Музыка" />
          <SidebarItem icon={<Film />} label="Фильмы" />
          <SidebarItem icon={<Gamepad2 />} label="Игры" />
          <SidebarItem icon={<Newspaper />} label="Новости" />
          <SidebarItem icon={<Trophy />} label="Спорт" />
          <SidebarItem icon={<Lightbulb />} label="Обучение" />
        </div>
        
        <div className="border-t border-border pt-4 px-3">
          <h3 className="px-3 mb-1 text-sm font-medium">Подписки</h3>
          <SidebarItem icon={<Clapperboard />} label="Канал Космонавтов" to="/video/2" />
          <SidebarItem icon={<Clapperboard />} label="ПрограммистПРО" to="/video/1" />
          <SidebarItem icon={<Clapperboard />} label="Мастер на все руки" to="/video/3" />
        </div>
      </div>
    </ScrollArea>
  );
}

export default Sidebar;
