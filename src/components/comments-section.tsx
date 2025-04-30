
import { useState } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { ThumbsUp, ThumbsDown } from "lucide-react";

interface Comment {
  id: number;
  author: string;
  avatar?: string;
  time: string;
  content: string;
  likes: number;
  dislikes: number;
  replies?: Comment[];
}

interface CommentsSectionProps {
  videoId: number;
}

export function CommentsSection({ videoId }: CommentsSectionProps) {
  const [commentText, setCommentText] = useState('');
  const [comments, setComments] = useState<Comment[]>([
    {
      id: 1,
      author: "Иван Космонавтов",
      time: "3 дня назад",
      content: "Отличное видео! Впервые вижу такое подробное объяснение этой темы. Продолжайте в том же духе!",
      likes: 128,
      dislikes: 0,
    },
    {
      id: 2,
      author: "Екатерина Программистова",
      time: "неделю назад",
      content: "Спасибо за контент! А будет ли продолжение? Очень интересно узнать больше о продвинутых техниках.",
      likes: 64,
      dislikes: 2,
      replies: [
        {
          id: 21,
          author: "Канал Автора",
          avatar: "https://images.unsplash.com/photo-1568602471122-7832951cc4c5?q=80&w=2070&auto=format&fit=crop",
          time: "6 дней назад",
          content: "Да, планирую выпустить продолжение в следующем месяце! Подписывайтесь, чтобы не пропустить :)",
          likes: 32,
          dislikes: 0,
        }
      ]
    },
    {
      id: 3,
      author: "Алексей Технарь",
      time: "2 недели назад",
      content: "В 5:42 есть небольшая ошибка, лучше использовать другой подход. Но в целом очень полезное видео!",
      likes: 37,
      dislikes: 4,
    },
  ]);

  const handleAddComment = () => {
    if (!commentText.trim()) return;
    
    const newComment: Comment = {
      id: comments.length + 1,
      author: "Вы",
      avatar: "https://images.unsplash.com/photo-1599566150163-29194dcaad36?q=80&w=987&auto=format&fit=crop",
      time: "только что",
      content: commentText,
      likes: 0,
      dislikes: 0,
    };
    
    setComments([newComment, ...comments]);
    setCommentText('');
  };

  const handleLike = (commentId: number) => {
    setComments(comments.map(comment => 
      comment.id === commentId ? { ...comment, likes: comment.likes + 1 } : comment
    ));
  };

  return (
    <div className="mt-6">
      <h3 className="font-medium text-lg mb-4">{comments.length} комментариев</h3>
      
      <div className="flex gap-3 mb-6">
        <Avatar className="h-10 w-10">
          <AvatarImage src="https://images.unsplash.com/photo-1599566150163-29194dcaad36?q=80&w=987&auto=format&fit=crop" />
          <AvatarFallback>ВЫ</AvatarFallback>
        </Avatar>
        
        <div className="flex-1">
          <Textarea
            value={commentText}
            onChange={(e) => setCommentText(e.target.value)}
            placeholder="Добавить комментарий..."
            className="resize-none mb-2"
          />
          
          <div className="flex justify-end">
            <Button 
              onClick={handleAddComment} 
              disabled={!commentText.trim()}
              variant="secondary"
            >
              Комментировать
            </Button>
          </div>
        </div>
      </div>
      
      <div className="space-y-6">
        {comments.map(comment => (
          <div key={comment.id} className="animate-fade-in">
            <div className="flex gap-3">
              <Avatar className="h-10 w-10">
                <AvatarImage src={comment.avatar || `https://i.pravatar.cc/150?u=${comment.author}`} />
                <AvatarFallback>{comment.author[0]}</AvatarFallback>
              </Avatar>
              
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <h4 className="font-medium">{comment.author}</h4>
                  <span className="text-xs text-muted-foreground">{comment.time}</span>
                </div>
                
                <p className="mt-1">{comment.content}</p>
                
                <div className="flex items-center gap-4 mt-2">
                  <button 
                    className="flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground"
                    onClick={() => handleLike(comment.id)}
                  >
                    <ThumbsUp size={16} />
                    <span>{comment.likes}</span>
                  </button>
                  
                  <button className="flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground">
                    <ThumbsDown size={16} />
                    <span>{comment.dislikes}</span>
                  </button>
                  
                  <button className="text-sm text-muted-foreground hover:text-foreground">
                    Ответить
                  </button>
                </div>
              </div>
            </div>
            
            {comment.replies && (
              <div className="ml-12 mt-4 space-y-4">
                {comment.replies.map(reply => (
                  <div key={reply.id} className="flex gap-3">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={reply.avatar || `https://i.pravatar.cc/150?u=${reply.author}`} />
                      <AvatarFallback>{reply.author[0]}</AvatarFallback>
                    </Avatar>
                    
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <h4 className="font-medium">{reply.author}</h4>
                        <span className="text-xs text-muted-foreground">{reply.time}</span>
                      </div>
                      
                      <p className="mt-1">{reply.content}</p>
                      
                      <div className="flex items-center gap-4 mt-2">
                        <button className="flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground">
                          <ThumbsUp size={16} />
                          <span>{reply.likes}</span>
                        </button>
                        
                        <button className="flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground">
                          <ThumbsDown size={16} />
                          <span>{reply.dislikes}</span>
                        </button>
                        
                        <button className="text-sm text-muted-foreground hover:text-foreground">
                          Ответить
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default CommentsSection;
