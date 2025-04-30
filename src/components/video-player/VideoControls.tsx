
import React from 'react';
import { Play, Pause, Volume2, VolumeX, Maximize, SkipBack, SkipForward } from 'lucide-react';
import { Slider } from '@/components/ui/slider';
import { cn } from '@/lib/utils';
import { ControlsProps } from './types';
import { formatTime } from './utils';

export const VideoControls: React.FC<ControlsProps> = ({
  isPlaying,
  progress,
  duration,
  currentTime,
  volume,
  isMuted,
  isFullscreen,
  isControlsVisible,
  togglePlay,
  toggleMute,
  changeVolume,
  seekTo,
  toggleFullscreen,
  skip
}) => {
  return (
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
  );
};

export default VideoControls;
