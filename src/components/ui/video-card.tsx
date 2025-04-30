
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface VideoCardProps {
  title: string;
  channelName: string;
  views: string;
  time: string;
  thumbnail: string;
  avatarSrc?: string;
}

export function VideoCard({ title, channelName, views, time, thumbnail, avatarSrc }: VideoCardProps) {
  return (
    <Card className="bg-background border-none shadow-none hover:bg-accent/50 transition-colors">
      <CardContent className="p-3">
        <div className="aspect-video rounded-lg overflow-hidden mb-3">
          <img
            src={thumbnail}
            alt={title}
            className="w-full h-full object-cover"
          />
        </div>
        <div className="flex gap-3">
          <Avatar className="h-9 w-9 mt-1">
            <AvatarImage src={avatarSrc} />
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
  );
}

export default VideoCard;
