import { getImgUrl } from "@/utils/getUrl";
import { Button, Container, Grid, Typography, useMediaQuery, useTheme } from "@mui/material";
import NetflixLogo from '@/assets/icon.png'
import PlayArrowRoundedIcon from '@mui/icons-material/PlayArrowRounded';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import { GradientBottom } from '@/components'

interface BillboardProps {
  title: string;
  image: string;
  overview: string;
}

const Billboard = ({title, image, overview}: BillboardProps) => {
  const theme = useTheme();
  const isViewMdUp = useMediaQuery(theme.breakpoints.up('md'));

  return (
    <>
    <div style={{
      width: '100%',
      position: 'absolute',
      zIndex: -1,
      overflow: 'hidden',
      height: isViewMdUp ?  "56.25vw": "40vw"
    }}>
      <GradientBottom />
      <img
        src={getImgUrl(image, 'original')}
        alt={title}
        style={{
          width: '100%'
        }}
      />
    </div>
    <Container
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
          height: isViewMdUp ?  "44vw": "30vw"
        }}
      >
        <Grid
          item
          xs={12}
          sm={4}
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
            <h3 style={{color: "rgba(255,255,255,0.7"}}>
              FILM
            </h3>
          </div>
          <h1 style={{ margin: 0, textAlign: 'center', fontSize: '2.8rem' }}>{title}</h1>
          <Typography 
            variant="body1" 
            paragraph={true}
            noWrap={true}
          >
            {overview}
          </Typography>
          <Button
            variant="contained"
            style={{
              marginRight: 8,
              color: 'black'
            }}
          >
            <PlayArrowRoundedIcon fontSize="large" style={{marginRight: 2}} /> Play
          </Button>
          <Button
            variant="contained"
            style={{
              backgroundColor: "rgba(255,255,255,0.5)",
              color: 'black'
            }}
          >
            <InfoOutlinedIcon fontSize="large" style={{marginRight: 6}} /> More Info
          </Button>
        </Grid>

        <Grid item xs></Grid>
      </Grid>
    </Container>
    </>
  )
}

export default Billboard