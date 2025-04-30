
import React from 'react';

interface YouTubeEmbedProps {
  src: string;
}

export const YouTubeEmbed: React.FC<YouTubeEmbedProps> = ({ src }) => {
  return (
    <div className="video-container rounded-lg overflow-hidden bg-black aspect-video">
      <iframe 
        src={src}
        title="YouTube video player" 
        frameBorder="0" 
        className="w-full h-full"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
        allowFullScreen
      ></iframe>
    </div>
  );
};

export default YouTubeEmbed;
