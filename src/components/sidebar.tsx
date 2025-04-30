
import { Home, Compass, Clock, ThumbsUp, PlaySquare, History, Clapperboard, Flame } from "lucide-react";

interface SidebarItemProps {
  icon: React.ReactNode;
  label: string;
  active?: boolean;
}

const SidebarItem = ({ icon, label, active }: SidebarItemProps) => (
  <div className={`flex items-center gap-4 p-3 rounded-lg cursor-pointer ${active ? 'bg-accent' : 'hover:bg-accent/50'}`}>
    <div className="text-xl text-foreground">{icon}</div>
    <span className={`text-sm ${active ? 'font-medium' : ''}`}>{label}</span>
  </div>
);

export function Sidebar() {
  return (
    <div className="w-60 h-screen bg-background border-r border-border flex-shrink-0 overflow-auto py-2 hidden md:block">
      <div className="px-3 mb-6">
        <SidebarItem icon={<Home />} label="Главная" active />
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
      
      <div className="border-t border-border pt-4 px-3">
        <h3 className="px-3 mb-1 text-sm font-medium">Подписки</h3>
        <SidebarItem icon={<Clapperboard />} label="Канал 1" />
        <SidebarItem icon={<Clapperboard />} label="Канал 2" />
        <SidebarItem icon={<Clapperboard />} label="Канал 3" />
      </div>
    </div>
  );
}

export default Sidebar;
