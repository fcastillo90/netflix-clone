import { MutableRefObject, useEffect, useRef, useState } from "react";
import useIntersection from "./useIntersection";

const useVideoHook = (): [MutableRefObject<any>, MutableRefObject<any>, (otherPlaying?: boolean) => void, (otherPlaying?: boolean) => void] => {
  let playerRef = useRef<any>(null);
  const [isOtherPlaying, setIsOtherPlaying] = useState(false);

  const [containerRef, isOnViewport, isCurrentTabFocus] = useIntersection<HTMLDivElement>({
    root: null,
    rootMargin: "0px",
    threshold: 0.3
  })

  const onPlay = () => {
    if (playerRef?.current && isOnViewport && !isOtherPlaying) {
      playerRef.current.playVideo()
    }
  }
  const onPause = () => {
    if (playerRef?.current) playerRef.current.pauseVideo()
  }

  const handlePlay = (otherVideoPlaying: boolean = false) => {
    setIsOtherPlaying(otherVideoPlaying)
    onPlay()
  }
  const handlePause = (otherVideoPlaying: boolean = false) => {
    setIsOtherPlaying(otherVideoPlaying)
    onPause()
  }

  useEffect(() => {
    if (isOnViewport && isCurrentTabFocus && !isOtherPlaying) {
      onPlay();
    } else {
      onPause();
    }
  }, [isOnViewport, isCurrentTabFocus, isOtherPlaying])

  return [playerRef, containerRef, handlePlay, handlePause]
}

export default useVideoHook