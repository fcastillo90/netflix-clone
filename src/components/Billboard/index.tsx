import { getImgUrl } from "@/utils/getUrl";
import { Button, Container, Grid, Typography, useMediaQuery, useTheme } from "@mui/material";
import NetflixLogo from '@/assets/icon.png'
import PlayArrowRoundedIcon from '@mui/icons-material/PlayArrowRounded';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import { GradientBottom, YoutubeEmbed } from '@/components'
import { useGetMovieVideosQuery } from "@/store/services/ApiMovieSlice";
import useWindowDimensions from "@/hooks/useWindowDimensions";
import { useGetSerieVideosQuery } from "@/store/services/ApiSerieSlice";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store";
import useVideoHook from "@/hooks/useVideoHook";
import { useEffect } from "react";
import { openModal } from "@/store/features/modalSlice";
import { CategoryType } from "@/types";
import { useNavigate } from "react-router-dom";
import { getHeight16by9 } from "@/utils";

interface BillboardProps {
  category: CategoryType;
  id: number;
  title: string;
  image: string;
  overview: string;
}

const Billboard = (props: BillboardProps) => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { category, id, title, image, overview } = props;
  const isOpen = useSelector((state: RootState) => state.modal.isOpen)
  const [playerRef, containerRef, handlePlay, handlePause] = useVideoHook();
  const theme = useTheme();
  const { width } = useWindowDimensions()
  const isViewMdUp = useMediaQuery(theme.breakpoints.up('md'));
  
  const height = isViewMdUp ? width * 0.5625 : width * 0.4

  const getData = () => {
    if (category === CategoryType.MOVIE) return useGetMovieVideosQuery(id)
    return useGetSerieVideosQuery(id)
  }
  
  const handleMoreInfo = () => {
    dispatch(openModal({
      id,
      category,
    }))
  }

  const handleWatch = () => {
    navigate(`/watch/${category[0]}/${id}`)
  }

  const { data } = getData()
  const video = data?.results.find((result) => result.site === 'YouTube') ?? { key: '' }

  useEffect(() => {
    if (isOpen) handlePause(true)
    else handlePlay(false)
  }, [isOpen])
  return (
    <>
      <div 
        data-testid="billboard-img-video-container"
        style={{
          width: '100%',
          position: 'absolute',
          zIndex: -1,
          overflow: 'hidden',
          height: isViewMdUp ? "56.25vw" : "40vw",
          minHeight: getHeight16by9(height),
        }}
      >
        <GradientBottom />
        {video.key &&
          <div 
            data-testid="billboard-video-container"
            ref={containerRef}
          >
            <YoutubeEmbed
              id={video.key}
              width={width}
              height={height + 320}
              margin='-160px 0 0 0'
              ref={playerRef}
            />
          </div>
        }
        <img
          data-testid="billboard-img"
          src={getImgUrl(image, 'original')}
          alt={title}
          style={{
            width: '100%'
          }}
        />
      </div>
      <Container
        data-testid="billboard-info-container"
        disableGutters
        maxWidth={false}
        style={{
          paddingLeft: '3.5rem',
          paddingRight: '3.5rem',
        }}
      >
        <Grid
          container
          direction="row"
          justifyContent="flex-start"
          alignItems="center"
          style={{
            height: isViewMdUp ? "44vw" : "30vw",
            minHeight: getHeight16by9(height),
          }}
        >
          <Grid
            item
            xs={12}
            sm={8}
            md={4}
          >
            <div
              style={{
                display: 'flex',
                width: '100%',
                height: 28,
                justifyContent: "flex-start",
                alignItems: "center"
              }}
            >
              <img
                src={NetflixLogo}
                alt="Netflix"
                style={{
                  height: 24,
                  marginRight: 6
                }}
              />
              <h3 style={{ color: "rgba(255,255,255,0.7" }}>
                {category === CategoryType.MOVIE ? 'FILM' : 'SERIE'}
              </h3>
            </div>
            <Typography variant="h3" component="h2" style={{ margin: 0, textAlign: 'center' }}>{title}</Typography>
            <Typography
              variant="body1"
              paragraph={true}
              noWrap={true}
            >
              {overview}
            </Typography>
            <Button
              data-testid="billboard-info-button-play"
              variant="contained"
              style={{
                backgroundColor: "white",
                marginRight: 8,
                color: 'black'
              }}
              onClick={handleWatch}
            >
              <PlayArrowRoundedIcon fontSize="large" style={{ marginRight: 2 }} /> Play
            </Button>
            <Button
              data-testid="billboard-info-button-more-info"
              onClick={handleMoreInfo}
              variant="contained"
              style={{
                backgroundColor: "rgba(255,255,255,0.5)",
                color: 'black'
              }}
            >
              <InfoOutlinedIcon fontSize="large" style={{ marginRight: 6 }} /> More Info
            </Button>
          </Grid>

          <Grid item xs></Grid>
        </Grid>
      </Container>
    </>
  )
}

export default Billboard