import { MutableRefObject, useEffect, useRef } from "react";
import useIntersection from "./useIntersection";

const useVideoHook = (): [MutableRefObject<any>, MutableRefObject<any>, () => void, () => void] => {
  let playerRef = useRef<any>(null);

  const [ containerRef, isOnViewport, isCurrentTabFocus ] = useIntersection<HTMLDivElement>({
    root: null,
    rootMargin: "0px",
    threshold:0
  })

  const handlePlay = () => {
    if (playerRef?.current && isOnViewport) playerRef.current.playVideo()
  }
  const handlePause = () => {
    if (playerRef?.current) playerRef.current.pauseVideo()
  }

  useEffect(() => {
    if(playerRef.current) {
      if (isOnViewport && isCurrentTabFocus) {
        handlePlay();
      } else {
        handlePause();
      }
    }
  }, [isOnViewport, isCurrentTabFocus, playerRef.current])

  return [playerRef, containerRef, handlePlay, handlePause]
}

export default useVideoHook