
export interface VideoPlayerProps {
  src?: string;
  poster?: string;
}

export interface ControlsProps {
  isPlaying: boolean;
  progress: number;
  duration: number;
  currentTime: number;
  volume: number;
  isMuted: boolean;
  isFullscreen: boolean;
  isControlsVisible: boolean;
  togglePlay: () => void;
  toggleMute: () => void;
  changeVolume: (value: number) => void;
  seekTo: (value: number) => void;
  toggleFullscreen: () => void;
  skip: (seconds: number) => void;
}
