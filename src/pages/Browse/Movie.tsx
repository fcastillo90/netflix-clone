import { Billboard } from "@/components";
import { DataRow } from "@/components";
import { useGetPopularMoviesQuery } from "@/store/services/ApiMovieSlice";
import { Container } from "@mui/material";

const BrowseMovie = () => {
  const { data: popularData, isLoading: isLoadingPopular } = useGetPopularMoviesQuery(null)

  const {
    id = 0,
    backdrop_path = '',
    overview = '',
    poster_path = '',
    title = '',
  } = popularData?.results[0] || { }
  
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
    {popularData && <DataRow
      category="movieApi"
      data={popularData}
      title="Popular on Netflix"
    />}
  </Container>)
}

export default BrowseMovie