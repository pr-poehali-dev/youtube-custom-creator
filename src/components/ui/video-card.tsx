
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Link } from "react-router-dom";

interface VideoCardProps {
  id: number;
  title: string;
  channelName: string;
  views: string;
  time: string;
  thumbnail: string;
  avatarSrc?: string;
}

export function VideoCard({ id, title, channelName, views, time, thumbnail, avatarSrc }: VideoCardProps) {
  return (
    <Link to={`/video/${id}`}>
      <Card className="bg-background border-none shadow-none hover:bg-accent/50 transition-colors">
        <CardContent className="p-3">
          <div className="aspect-video rounded-lg overflow-hidden mb-3 relative group">
            <img
              src={thumbnail}
              alt={title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
            />
            <div className="absolute bottom-2 right-2 bg-black/80 text-white text-xs py-0.5 px-1 rounded">
              10:28
            </div>
          </div>
          <div className="flex gap-3">
            <Avatar className="h-9 w-9 mt-1 rounded-full overflow-hidden flex-shrink-0">
              <AvatarImage src={avatarSrc || `https://i.pravatar.cc/150?u=${channelName}`} />
              <AvatarFallback className="bg-primary/10">{channelName[0]}</AvatarFallback>
            </Avatar>
            <div>
              <h3 className="font-medium line-clamp-2 text-foreground">{title}</h3>
              <p className="text-sm text-muted-foreground mt-1">{channelName}</p>
              <p className="text-sm text-muted-foreground">
                {views} • {time}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}

export default VideoCard;
