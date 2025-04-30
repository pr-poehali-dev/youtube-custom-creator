
import { useState, useRef, useEffect } from 'react';
import { Play, Pause, Volume2, VolumeX, Maximize, SkipBack, SkipForward } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Slider } from '@/components/ui/slider';

interface VideoPlayerProps {
  src?: string;
  poster?: string;
}

export function VideoPlayer({ src, poster }: VideoPlayerProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [volume, setVolume] = useState(1);
  const [isMuted, setIsMuted] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isControlsVisible, setIsControlsVisible] = useState(true);
  const controlsTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Если не указан src, используем эмбед YouTube
  const placeholderSrc = src || 'https://www.youtube.com/embed/dQw4w9WgXcQ';
  const isYouTubeEmbed = !src;

  useEffect(() => {
    if (!videoRef.current) return;
    
    const video = videoRef.current;
    
    const onLoadedMetadata = () => {
      setDuration(video.duration);
    };
    
    const onTimeUpdate = () => {
      setCurrentTime(video.currentTime);
      setProgress((video.currentTime / video.duration) * 100);
    };
    
    video.addEventListener('loadedmetadata', onLoadedMetadata);
    video.addEventListener('timeupdate', onTimeUpdate);
    
    return () => {
      video.removeEventListener('loadedmetadata', onLoadedMetadata);
      video.removeEventListener('timeupdate', onTimeUpdate);
    };
  }, [videoRef]);

  const togglePlay = () => {
    if (!videoRef.current) return;
    
    if (isPlaying) {
      videoRef.current.pause();
    } else {
      videoRef.current.play();
    }
    
    setIsPlaying(!isPlaying);
  };

  const toggleMute = () => {
    if (!videoRef.current) return;
    
    videoRef.current.muted = !isMuted;
    setIsMuted(!isMuted);
  };

  const changeVolume = (value: number) => {
    if (!videoRef.current) return;
    
    videoRef.current.volume = value;
    setVolume(value);
    setIsMuted(value === 0);
  };

  const seekTo = (value: number) => {
    if (!videoRef.current) return;
    
    const newTime = (value * videoRef.current.duration) / 100;
    videoRef.current.currentTime = newTime;
    setProgress(value);
  };

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      videoRef.current?.parentElement?.requestFullscreen().catch(err => {
        console.error(`Ошибка при попытке перейти в полноэкранный режим:`, err);
      });
    } else {
      document.exitFullscreen();
    }
    setIsFullscreen(!isFullscreen);
  };

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${minutes}:${secs < 10 ? '0' : ''}${secs}`;
  };

  const showControls = () => {
    setIsControlsVisible(true);
    
    if (controlsTimeoutRef.current) {
      clearTimeout(controlsTimeoutRef.current);
    }
    
    controlsTimeoutRef.current = setTimeout(() => {
      if (isPlaying) {
        setIsControlsVisible(false);
      }
    }, 3000);
  };

  const skip = (seconds: number) => {
    if (!videoRef.current) return;
    videoRef.current.currentTime += seconds;
  };

  if (isYouTubeEmbed) {
    return (
      <div className="video-container rounded-lg overflow-hidden bg-black">
        <iframe 
          src={placeholderSrc}
          title="YouTube video player" 
          frameBorder="0" 
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
          allowFullScreen
        ></iframe>
      </div>
    );
  }

  return (
    <div 
      className="relative aspect-video rounded-lg overflow-hidden bg-black"
      onMouseMove={showControls}
      onMouseLeave={() => isPlaying && setIsControlsVisible(false)}
    >
      <video
        ref={videoRef}
        src={placeholderSrc}
        poster={poster}
        className="w-full h-full object-contain"
        onClick={togglePlay}
      />
      
      <div 
        className={cn(
          "absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent transition-opacity flex flex-col justify-end",
          isControlsVisible ? "opacity-100" : "opacity-0"
        )}
      >
        <div className="p-2 sm:p-4">
          <div className="flex-1 w-full mb-1">
            <Slider
              value={[progress]}
              max={100}
              step={0.1}
              onValueChange={(vals) => seekTo(vals[0])}
              className="cursor-pointer"
            />
          </div>
          
          <div className="flex items-center justify-between text-white">
            <div className="flex items-center gap-2">
              <button onClick={togglePlay} className="h-8 w-8 flex items-center justify-center hover:bg-white/10 rounded-full">
                {isPlaying ? <Pause size={20} /> : <Play size={20} />}
              </button>
              
              <button onClick={() => skip(-10)} className="h-8 w-8 flex items-center justify-center hover:bg-white/10 rounded-full">
                <SkipBack size={18} />
              </button>
              
              <button onClick={() => skip(10)} className="h-8 w-8 flex items-center justify-center hover:bg-white/10 rounded-full">
                <SkipForward size={18} />
              </button>
              
              <div className="flex items-center gap-2 ml-2">
                <button onClick={toggleMute} className="h-8 w-8 flex items-center justify-center hover:bg-white/10 rounded-full">
                  {isMuted ? <VolumeX size={20} /> : <Volume2 size={20} />}
                </button>
                
                <div className="hidden sm:block w-20">
                  <Slider
                    value={[isMuted ? 0 : volume]}
                    max={1}
                    step={0.01}
                    onValueChange={(vals) => changeVolume(vals[0])}
                  />
                </div>
              </div>

              <span className="text-xs sm:text-sm ml-2">
                {formatTime(currentTime)} / {formatTime(duration)}
              </span>
            </div>
            
            <div className="flex items-center">
              <button onClick={toggleFullscreen} className="h-8 w-8 flex items-center justify-center hover:bg-white/10 rounded-full">
                <Maximize size={20} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default VideoPlayer;
