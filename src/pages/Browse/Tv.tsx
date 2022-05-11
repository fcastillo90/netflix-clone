import { Billboard, DataRow, YoutubeEmbed } from "@/components";
import useVideoHook from "@/hooks/useVideoHook";
import { useGetPopularSerieQuery } from "@/store/services/ApiSerieSlice";
import { Container } from "@mui/material";
import { useMemo } from "react";

const BrowseTv = () => {
  const [playerRef, containerRef, handlePlay, handlePause] = useVideoHook();
  const { data: popularData, isLoading: isLoadingPopular } = useGetPopularSerieQuery(null)


  const billboardActions = useMemo(() => ({
    playVideo: handlePlay,
    pauseVideo: handlePause
  }), [])

  const {
    id = 0,
    backdrop_path = '',
    overview = '',
    poster_path = '',
    name = '',
  } = popularData?.results[0] || {}
  return (
    <Container
      disableGutters
      maxWidth={false}
    >
      <div ref={containerRef}>
        <Billboard 
          category="serieApi"
          id={id}
          title={name}
          image={backdrop_path ?? poster_path}
          overview={overview}
        >
          {({key, width, height}) => (
            <YoutubeEmbed 
              id={key} 
              width={width}
              height={height}
              ref={playerRef}
            />
          )}
        </Billboard>
      </div>
      {popularData && <DataRow
        category="serieApi"
        data={popularData}
        title="Popular on Netflix"
        billboardActions={billboardActions}
      />}
    </Container>
  )
}

export default BrowseTv