import { Billboard, DataRow, Modal, YoutubeEmbed } from "@/components";
import useVideoHook from "@/hooks/useVideoHook";
import { RootState } from "@/store";
import { useGetPopularSerieQuery } from "@/store/services/ApiSerieSlice";
import { Container } from "@mui/material";
import { useEffect } from "react";
import { useSelector } from "react-redux";

const BrowseTv = () => {
  const isOpen = useSelector((state: RootState) => state.modal.isOpen)

  const [playerRef, containerRef, handlePlay, handlePause] = useVideoHook();
  const { data: popularData, isLoading: isLoadingPopular } = useGetPopularSerieQuery(null)

  const onModalClose = () => {
    handlePlay(false)
  }

  const {
    id = 0,
    backdrop_path = '',
    overview = '',
    poster_path = '',
    name = '',
  } = popularData?.results[0] || {}

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
          category="serieApi"
          id={id}
          title={name}
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
      {popularData && <DataRow
        category="serieApi"
        data={popularData}
        title="Popular on Netflix"
      />}
      <Modal
        onClose={onModalClose}
      />
    </Container>
  )
}

export default BrowseTv