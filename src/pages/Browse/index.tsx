import { Container } from "@mui/material"
import { useGetPopularMoviesQuery, useGetTopRatedMoviesQuery } from "@/store/services/ApiMovieSlice";
import { Billboard, YoutubeEmbed, Modal } from "@/components";
import DataRow from "@/components/DataRow";
import useVideoHook from "@/hooks/useVideoHook";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/store";

const Home = () => {
  const isOpen = useSelector((state: RootState) => state.modal.isOpen)

  const [playerRef, containerRef, handlePlay, handlePause] = useVideoHook();

  const { data: popularMoviesData, isLoading: isLoadingPopularMovies } = useGetPopularMoviesQuery(null)
  const { data: topRatedMoviesData, isLoading: isLoadingTopRatedMovies } = useGetTopRatedMoviesQuery(null)

  const onModalClose = () => {
    handlePlay(false)
  }

  const {
    id = 0,
    backdrop_path = '',
    overview = '',
    poster_path = '',
    title = '',
  } = popularMoviesData?.results[0] || { }

  useEffect(() => {
    if (isOpen) handlePause(true)
  }, [isOpen])

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
          {({key, width, height, margin}) => (
            <YoutubeEmbed 
              id={key} 
              width={width}
              height={height}
              margin={margin}
              ref={playerRef}
            />
          )}
        </Billboard>
      </div>
      {popularMoviesData && <DataRow
        title="Popular on Netflix"
        category="movieApi"
        data={popularMoviesData}
      />}
      {popularMoviesData && <DataRow
        title="Popular on Netflix"
        category="movieApi"
        data={popularMoviesData}
        isTopTen={true}
      />}
      {topRatedMoviesData && <DataRow
        title="Lastest Movies"
        category="movieApi"
        data={topRatedMoviesData}
        isLarge={true}
      />}
      {topRatedMoviesData && <DataRow
        title="Lastest Movies"
        category="movieApi"
        data={topRatedMoviesData}
        isLarge={true}
        isTopTen={true}
      />}

      <Modal
        onClose={onModalClose}
      />
    </Container>
  )
}

export default Home