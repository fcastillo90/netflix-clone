import { createPortal } from "react-dom"
import { useGetMovieDetailQuery } from "@/store/services/ApiMovieSlice";
import { getImgUrl } from "@/utils/getUrl";
import { Card, CardContent, CardMedia, CircularProgress, Fab, Grid, Modal, Slide, Typography } from "@mui/material";
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import {ButtonGroup, GradientBottom} from "@/components";
import { useGetSerieDetailQuery } from "@/store/services/ApiSerieSlice";
import { MovieDetail, SerieDetail } from "@/types";

interface ModalProps {
  category: 'movieApi' | 'serieApi';
  isOpen: number | false;
  handleClose: () => void;
}

const ModalComponent = (props: ModalProps) => {
  const { category, isOpen, handleClose } = props

    const { data, isLoading } = category === 'movieApi' ? 
    useGetMovieDetailQuery(isOpen as number) 
    : 
    useGetSerieDetailQuery(isOpen as number)
  
  const modalWidth = 850

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
            <div style={{position: 'relative'}}>
              <GradientBottom />
              <CardMedia
                component="img"
                height="478"
                image={getImgUrl((data as MovieDetail | SerieDetail)?.backdrop_path ?? ' ', 'original')}
                alt={(data as MovieDetail)?.title ?? (data as SerieDetail)?.name ?? ' '}
              />
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
                  top: '40%',
                  width: '100%',
                  textAlign: 'center',
                  paddingRight: 32,
                  paddingLeft: 32,
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

const ModalContainer = (props: ModalProps) => {
  const { isOpen } = props

  if (!isOpen) return null

  return createPortal(
    <ModalComponent 
      {...props}
    />,
    document.getElementById('portal') as HTMLElement
  )
}

export default ModalContainer