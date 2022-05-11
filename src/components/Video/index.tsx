import { forwardRef, MutableRefObject, useEffect, useRef, useState } from "react";
import YouTube from "react-youtube";

interface YoutubeEmbedProps {
  id: string;
  width: string | number;
  height: string | number;
}

const YoutubeEmbed = forwardRef((props: YoutubeEmbedProps, ref) => {
  const { id, width, height } = props
  const [isVisible, setIsVisible] = useState(false);
  return (
      <YouTube
        videoId={id}
        id={id}
        style={{
          transition: 'all 0.5s',
          display: isVisible ? 'block' : 'none'
        }}
        opts={{
          width, 
          height,
          playerVars: {
            autoplay: 1,
            controls: 0,
            showinfo: 0,
            rel: 0,
            modestbranding: 1,
            enablejsapi: 1
          },
        }}
        onReady={(e) => {
          e.target.playVideo();
          if (ref) (ref as MutableRefObject<any>).current = e.target;
        }}
        onPlay={() => {
          setIsVisible(true)
        }}
        onEnd={() => { 
          setIsVisible(false) 
        }}
        onError={() => {
          console.log('error')
        }}
      />
  )
});

export default YoutubeEmbed;