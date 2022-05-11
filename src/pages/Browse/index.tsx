import { Container } from "@mui/material"
import { useGetPopularMoviesQuery, useGetTopRatedMoviesQuery } from "@/store/services/ApiMovieSlice";
import { Billboard, YoutubeEmbed } from "@/components";
import DataRow from "@/components/DataRow";
import useVideoHook from "@/hooks/useVideoHook";
import { useEffect, useMemo } from "react";

const Home = () => {

  const [playerRef, containerRef, handlePlay, handlePause] = useVideoHook();

  const { data: popularMoviesData, isLoading: isLoadingPopularMovies } = useGetPopularMoviesQuery(null)
  const { data: topRatedMoviesData, isLoading: isLoadingTopRatedMovies } = useGetTopRatedMoviesQuery(null)

  const billboardActions = useMemo(() => ({
    playVideo: handlePlay,
    pauseVideo: handlePause
  }), [])

  const {
    id = 0,
    backdrop_path = '',
    overview = '',
    poster_path = '',
    title = '',
  } = popularMoviesData?.results[0] || { }

  useEffect(() => {
    handlePlay()
  }, [])
  return (
    <Container
      disableGutters
      maxWidth={false}
    >
      <div ref={containerRef}>
        <Billboard 
          category="movieApi"
          id={id}
          title={title}
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
      {popularMoviesData && <DataRow
        title="Popular on Netflix"
        category="movieApi"
        data={popularMoviesData}
        billboardActions={billboardActions}
      />}
      {popularMoviesData && <DataRow
        title="Popular on Netflix"
        category="movieApi"
        data={popularMoviesData}
        isTopTen={true}
        billboardActions={billboardActions}
      />}
      {topRatedMoviesData && <DataRow
        title="Lastest Movies"
        category="movieApi"
        data={topRatedMoviesData}
        isLarge={true}
        billboardActions={billboardActions}
      />}
      {topRatedMoviesData && <DataRow
        title="Lastest Movies"
        category="movieApi"
        data={topRatedMoviesData}
        isLarge={true}
        isTopTen={true}
        billboardActions={billboardActions}
      />}
    </Container>
  )
}

export default Home