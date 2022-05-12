import { Billboard, DataRow, Modal } from "@/components";
import { useGetPopularSerieQuery } from "@/store/services/ApiSerieSlice";
import { CategoryType } from "@/types";

const BrowseTv = () => {
  const { data: popularData, isLoading: isLoadingPopular } = useGetPopularSerieQuery(null)

  const {
    id = 0,
    backdrop_path = '',
    overview = '',
    poster_path = '',
    name = '',
  } = popularData?.results[0] || {}


  return (
    <>
      <Billboard 
        category={CategoryType.SERIE}
        id={id}
        title={name}
        image={backdrop_path ?? poster_path}
        overview={overview}
      />
      {popularData && <DataRow
        category={CategoryType.SERIE}
        data={popularData}
        title="Popular on Netflix"
      />}
      <Modal />
    </>
  )
}

export default BrowseTv