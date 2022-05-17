import { forwardRef, MutableRefObject, useEffect, useRef, useState } from "react";
import YouTube from "react-youtube";

interface YoutubeEmbedProps {
  height: string | number;
  id: string;
  margin?: string | number;
  onReady?: (duration: number) => void;
  width: string | number;
}

const YoutubeEmbed = forwardRef((props: YoutubeEmbedProps, ref) => {
  const { id, width, height, margin=0, onReady } = props
  const [isVisible, setIsVisible] = useState(false);

  return (
    <div {...(isVisible && {style: {margin: margin}})}>
      <YouTube
        videoId={id}
        id={id}
        style={{
          transition: 'all 0.5s',
          display: isVisible ? 'block' : 'none',
          zIndex: 4
        }}
        opts={{
          width, 
          height,
          playerVars: {
            autoplay: 1,
            controls: 0,
            enablejsapi: 1,
            modestbranding: 1,
            rel: 0,
            showinfo: 0,
          },
        }}
        onReady={(e) => {
          e.target.playVideo();
          if (ref) (ref as MutableRefObject<any>).current = e.target;
          if (onReady) onReady(e.target.getDuration())
        }}
        onPlay={(e) => {
          setIsVisible(true)
          e.target.setPlaybackQuality('highres');
        }}
        onEnd={() => { 
          setIsVisible(false) 
        }}
        onError={() => {
          console.log('error')
        }}
      />
    </div>
  )
});

export default YoutubeEmbed;