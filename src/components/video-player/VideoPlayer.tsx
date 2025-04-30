
import { useState, useRef, useEffect } from 'react';
import { cn } from '@/lib/utils';
import { VideoPlayerProps } from './types';
import { YouTubeEmbed } from './YouTubeEmbed';
import { VideoControls } from './VideoControls';

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

  const skip = (seconds: number) => {
    if (!videoRef.current) return;
    videoRef.current.currentTime += seconds;
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

  if (isYouTubeEmbed) {
    return <YouTubeEmbed src={placeholderSrc} />;
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
      
      <VideoControls 
        isPlaying={isPlaying}
        progress={progress}
        duration={duration}
        currentTime={currentTime}
        volume={volume}
        isMuted={isMuted}
        isFullscreen={isFullscreen}
        isControlsVisible={isControlsVisible}
        togglePlay={togglePlay}
        toggleMute={toggleMute}
        changeVolume={changeVolume}
        seekTo={seekTo}
        toggleFullscreen={toggleFullscreen}
        skip={skip}
      />
    </div>
  );
}

export default VideoPlayer;
