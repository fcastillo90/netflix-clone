import useIntersection from "@/hooks/useIntersection";
import { useEffect, useRef, useState } from "react";
import YouTube from "react-youtube";

interface YoutubeEmbedProps {
  id: string;
  width: string | number;
  height: string | number;
}

const YoutubeEmbed = ({ id, width, height }: YoutubeEmbedProps) => {
  const [isVisible, setIsVisible] = useState(false);
  let playerRef = useRef<any>(null);

  const [ containerRef, isOnViewport, isTabFocus ] = useIntersection<HTMLDivElement>({
    root: null,
    rootMargin: "0px",
    threshold:0
  })

  useEffect(() => {
    if(playerRef.current) {
      if (isOnViewport && isTabFocus) {
        playerRef.current.playVideo();
      } else {
        playerRef.current.pauseVideo();
      }
    }
  }, [isOnViewport, isTabFocus, playerRef.current])


  return (
    <div ref={containerRef}>
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
            origin: window.location.origin
          }
        }}
        onReady={(e) => {
          playerRef.current = e.target 
          setIsVisible(true)
        }}
        onPlay={() => {
          setIsVisible(true)
        }}
        onEnd={() => { 
          setIsVisible(false) 
        }}
      />
    </div>
  )
};

export default YoutubeEmbed;