import { MutableRefObject, useEffect, useRef } from "react";
import useIntersection from "./useIntersection";

const useVideoHook = ({isOnViewport}: {isOnViewport: boolean}): [MutableRefObject<any>, () => void, () => void] => {
  let playerRef = useRef<any>(null);

  const handlePlay = () => {
    if (playerRef?.current && isOnViewport) playerRef.current.playVideo()
  }
  const handlePause = () => {
    if (playerRef?.current) playerRef.current.pauseVideo()
  }

  useEffect(() => {
    if(playerRef.current) {
      if (isOnViewport) {
        handlePlay();
      } else {
        handlePause();
      }
    }
  }, [isOnViewport, playerRef.current])

  return [playerRef, handlePlay, handlePause]
}

export default useVideoHook