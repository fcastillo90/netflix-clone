import { Billboard, DataRow } from "@/components";
import { useGetPopularMoviesQuery } from "@/store/services/ApiMovieSlice";

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
  <>
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
  </>)
}

export default BrowseMovie