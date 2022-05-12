import { createPortal } from "react-dom"
import { useGetMovieDetailQuery, useGetMovieVideosQuery } from "@/store/services/ApiMovieSlice";
import { getImgUrl } from "@/utils/getUrl";
import { Card, CardContent, CardMedia, CircularProgress, Fab, Grid, Modal, Slide, Typography } from "@mui/material";
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import {ButtonGroup, GradientBottom, YoutubeEmbed} from "@/components";
import { useGetSerieDetailQuery, useGetSerieVideosQuery } from "@/store/services/ApiSerieSlice";
import { CategoryProp, MovieDetail, SerieDetail } from "@/types";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store";
import { closeModal } from "@/store/features/modalSlice";

interface ModalProps {
  category: CategoryProp;
  id: number | false;
  handleClose: () => void;
}
  
const modalWidth = 850
const playerHeight = 478

const ModalComponent = (props: ModalProps) => {
  const { id, category, handleClose } = props

  const { data, isLoading } = id ? 
    category === 'movieApi' ? 
      useGetMovieDetailQuery(id) 
      : 
      useGetSerieDetailQuery(id)
    : 
    { data: undefined, isLoading: false }

  const { data: videoData } = id ?
    category === 'movieApi' ? 
      useGetMovieVideosQuery(id) 
      : 
      useGetSerieVideosQuery(id)
    :
      { data: undefined }
  console.log({videoData})
  return (<Modal
    open={true}
    onClose={handleClose}
    aria-labelledby="modal-modal-title"
    aria-describedby="modal-modal-description"
  >
    <Slide direction="up" in={true} mountOnEnter unmountOnExit>
      <div 
        style={{
          position: 'absolute',
          width: '100%',
          height: '100%',
        }}
      >
        <Card  sx={{
          position: 'absolute',
          width: modalWidth,
          bgcolor: 'background.default',
          border: '2px solid #000',
          boxShadow: 24,
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          borderRadius: 3
        }}>
          {isLoading ?
          <CircularProgress />
          :
          <>
            <div 
              style={{
                position: 'relative',
                height: playerHeight
              }}
            >
              <GradientBottom />
              <Fab 
                size="small" 
                color="secondary" 
                aria-label="close" 
                onClick={handleClose}
                style={{
                  position: 'absolute',
                  top: 16,
                  right: 16,
                }}
              >
                <CloseRoundedIcon />
              </Fab>
              <div
                style={{
                  position: 'absolute',
                }}
              >
                <CardMedia
                  component="img"
                  height={playerHeight}
                  image={getImgUrl((data as MovieDetail | SerieDetail)?.backdrop_path ?? ' ', 'original')}
                  style={{
                    position: 'absolute', 
                    zIndex: -1,
                    width: modalWidth
                  }}
                  alt={(data as MovieDetail)?.title ?? (data as SerieDetail)?.name}
                />
                {videoData?.results && videoData?.results[0] && 
                  <YoutubeEmbed 
                    id={videoData?.results[0].key} 
                    width={modalWidth}
                    height={playerHeight}
                  />
                }
              <div
                style={{
                  position: 'absolute',
                  top: playerHeight/2.5,
                  width: modalWidth,
                  textAlign: 'center',
                  paddingRight: 32,
                  paddingLeft: 32,
                  zIndex: 9
                }}
              >
                <Typography 
                  variant="h3" 
                  style={{
                    width: '50%',
                    fontWeight: 'bolder',
                    textAlign: 'center',
                    textShadow: '0px 0px 1px #000',
                    marginBottom: 24
                  }}
                >
                  {(data as MovieDetail)?.title ?? (data as SerieDetail)?.name}
                </Typography>
                <ButtonGroup 
                  isLarge={true}
                />
                </div>
              </div>
            </div>
            <CardContent>
              <Grid container>
                <Grid item xs={12}>
                  <Typography gutterBottom variant="h5" component="h2">
                    {(data as MovieDetail)?.title ?? (data as SerieDetail)?.name}
                  </Typography>
                  <Typography variant="body2" component="p">
                    {data?.overview}
                  </Typography>
                </Grid>
              </Grid>
            </CardContent>
          </>
        }
        </Card>
      </div>
    </Slide>
  </Modal>)
}


interface ModalContainerProps {
  onClose?: () => void;
}

const ModalContainer = (props: ModalContainerProps) => {
  const {onClose} = props
  const dispatch = useDispatch()
  const {id, isOpen, category} = useSelector((state: RootState) => state.modal)

  const handleClose = () => {
    dispatch(closeModal())
    if (onClose) onClose()
  }

  if (!isOpen) return null

  return createPortal(
    <ModalComponent 
      handleClose={handleClose}
      id={id}
      category={category}
    />,
    document.getElementById('portal') as HTMLElement
  )
}

export default ModalContainer

// CSP -> to upload platform - chinese stellar platform