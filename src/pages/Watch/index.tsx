import { useNavigate, useParams } from "react-router-dom"
import { VideoHud, YoutubeEmbed } from "@/components"
import useWindowDimensions from "@/hooks/useWindowDimensions"
import { useGetMovieVideosQuery } from "@/store/services/ApiMovieSlice"
import { useGetSerieVideosQuery } from "@/store/services/ApiSerieSlice"
import { useEffect, useRef, useState } from "react"
import { useDispatch } from "react-redux"
import { setNavbarVisibility } from "@/store/features/configSlice"
import { Video } from "@/types"
import NoMatch from "../NoMatch"
import { CircularProgress, IconButton } from "@mui/material"
import ArrowBackRoundedIcon from '@mui/icons-material/ArrowBackRounded';


const Watch = () => {
  let containerRef = useRef<any>(null);
  let playerRef = useRef<any>(null);
  const {category, id} = useParams()
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [duration, setDuration] = useState<number>(0)

  if (!id || !(category === 'm' || category === 's')) {
    return <h1>no match</h1>
  }

  const getVideoData = () => {
    if (id && (category === 'm' || category === 's')) {
      if (category ==='m') return useGetMovieVideosQuery(Number(id))
      return useGetSerieVideosQuery(Number(id))
    }
    return { data: undefined, isLoading: false }
  }

  const { width, height } = useWindowDimensions()
  const { data: videoData, isLoading } = getVideoData()

  const video = videoData?.results.find((result) => result.site === 'YouTube') ?? { key: '' }

  const handleOnReady = (duration: number) => {
    setDuration(duration)
  }

  const handlePlay = () => playerRef.current.playVideo()
  const handlePause = () => playerRef.current.pauseVideo()
  const handleSeek = (time: number) => playerRef.current.seekTo(time)
  const handleVolume = (volume: number) => playerRef.current.setVolume(volume)
  const handleGetCurrentTime = () => playerRef.current.getCurrentTime()
  const handleFullscreen = (e: any) => {
    containerRef.current.requestFullscreen()
    e.stopPropagation()
  }

  useEffect(() => {
    dispatch(setNavbarVisibility(false))
    return () => {dispatch(setNavbarVisibility(true))}
  }, [])

  return (
    <div
      ref={containerRef}
      style={{
        overflow: 'hidden',
        width: width,
        height: height,
      }}
    >
    {video.key ?
      <>
        <VideoHud 
          data={video as Video}
          duration={duration}
          handlePause={handlePause}
          handlePlay={handlePlay}
          handleSeek={handleSeek}
          handleVolume={handleVolume}
          handleGetCurrentTime={handleGetCurrentTime}
          handleFullscreen={handleFullscreen}
        />
        <YoutubeEmbed
          height={height + 320}
          id={video.key}
          margin='-160px 0 0 0'
          onReady={handleOnReady}
          ref={playerRef}
          width={width}
        />
      </>
      :
      <div
        style={{
          position: 'absolute',
          width: '100%',
          height: '100%',
          zIndex: 10
        }}
      >
        <IconButton 
          aria-label="back"
          onClick={() => navigate(-1)}
          style={{
            position: 'absolute',
            color: 'white',
            top: 16,
            left: 16,
            fontSize: 60
          }}
        >
          <ArrowBackRoundedIcon fontSize="inherit" />
        </IconButton>
        {isLoading ? 
          <CircularProgress 
            style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
            }} 
          />
          :
          <NoMatch />
        }
      </div>
    }
    </div>
  )
}

export default Watch