import { Container } from "@mui/material"
import { useGetPopularMoviesQuery, useGetTopRatedMoviesQuery } from "@/store/services/ApiMovieSlice";
import { Billboard, Modal } from "@/components";
import DataRow from "@/components/DataRow";

const Home = () => {
  const { data: popularMoviesData, isLoading: isLoadingPopularMovies } = useGetPopularMoviesQuery(null)
  const { data: topRatedMoviesData, isLoading: isLoadingTopRatedMovies } = useGetTopRatedMoviesQuery(null)

  const {
    id = 0,
    backdrop_path = '',
    overview = '',
    poster_path = '',
    title = '',
  } = popularMoviesData?.results[0] || { }

  return (
    <Container
      disableGutters
      maxWidth={false}
    >
      <Billboard 
        category="movieApi"
        id={id}
        title={title}
        image={backdrop_path ?? poster_path}
        overview={overview}
      />
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

      <Modal />
    </Container>
  )
}

export default Home