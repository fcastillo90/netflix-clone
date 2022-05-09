import { Container } from "@mui/material"
import { useGetPopularMoviesQuery, useGetTopRatedMoviesQuery } from "@/store/services/ApiMovieSlice";
import { Billboard } from "@/components";
import DataRow from "@/components/DataRow";

const Home = () => {
  const { data: popularMoviesData, isLoading: isLoadingPopularMovies } = useGetPopularMoviesQuery(null)

  const { data: topRatedMoviesData, isLoading: isLoadingTopRatedMovies } = useGetTopRatedMoviesQuery(null)

  const {
    backdrop_path,
    overview,
    poster_path,
    title,
  } = popularMoviesData?.results[0] || { overview: '', title: '', poster_path: '' }

  return (
    <Container
      disableGutters
      maxWidth={false}
    >
      <Billboard 
        title={title}
        image={backdrop_path ?? poster_path}
        overview={overview}
      />
      {popularMoviesData && <DataRow
        data={popularMoviesData}
        title="Popular on Netflix"
      />}
      {popularMoviesData && <DataRow
        data={popularMoviesData}
        title="Popular on Netflix"
        isTopTen={true}
      />}
      {topRatedMoviesData && <DataRow
        data={topRatedMoviesData}
        title="Lastest Movies"
        isLarge={true}
      />}
      {topRatedMoviesData && <DataRow
        data={topRatedMoviesData}
        title="Lastest Movies"
        isLarge={true}
        isTopTen={true}
      />}
    </Container>
  )
}

export default Home