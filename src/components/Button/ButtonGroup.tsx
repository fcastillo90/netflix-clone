import { Button } from '@mui/material';
import PlayArrowRoundedIcon from '@mui/icons-material/PlayArrowRounded';
import AddIcon from '@mui/icons-material/Add';
import ThumbUpAltOutlinedIcon from '@mui/icons-material/ThumbUpAltOutlined';
import KeyboardArrowDownRoundedIcon from '@mui/icons-material/KeyboardArrowDownRounded';
import VolumeUpIcon from '@mui/icons-material/VolumeUp';
import theme from '@/styles';
import { Movie } from '@/types';

interface ButtonGroupProps {
  movie?: Movie;
  isLarge?: boolean;
  handleMoreInfo?: (movieId: number) => void;
}

const ButtonGroup = (props: ButtonGroupProps) => {
  const {movie, isLarge, handleMoreInfo} = props;
  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'space-between'
      }}
    >
      <div>
        <Button
          style={{
            backgroundColor: 'white',
            minWidth: 'auto',
            padding: 0,
            width: 32,
            height: 32,
            borderRadius: '50%',
            color: 'black',
            marginRight: 8,
            ...(isLarge && {
              width: 108,
              height: 40,
              borderRadius: 5,
            })
          }}
          size="small"
        >
          <PlayArrowRoundedIcon fontSize='large'  />
          {isLarge && <span style={{fontSize: '1.1rem'}}>Play</span>}
        </Button>
        <Button
          style={{
            backgroundColor: 'rgba(0,0,0,0.5)',
            border: `2px solid ${theme.palette.secondary.light}`,
            color: 'white',
            minWidth: 'auto',
            padding: 0,
            width: 32,
            height: 32,
            borderRadius: '50%',
            marginRight: 8,
            ...(isLarge && {
              width: 40,
              height: 40,
            })
          }}
          size="small"
        >
          <AddIcon fontSize='small' />
        </Button>
        <Button
          style={{
            backgroundColor: 'rgba(0,0,0,0.5)',
            border: `2px solid ${theme.palette.secondary.light}`,
            color: 'white',
            minWidth: 'auto',
            padding: 0,
            width: 32,
            height: 32,
            borderRadius: '50%',
            ...(isLarge && {
              width: 40,
              height: 40,
            })
          }}
          size="small"
        >
          <ThumbUpAltOutlinedIcon fontSize='small' />
        </Button>
      </div>
        <div>
          {isLarge ? 
            <Button
              style={{
                backgroundColor: 'rgba(0,0,0,0.5)',
                border: `2px solid ${theme.palette.secondary.light}`,
                color: 'white',
                minWidth: 'auto',
                padding: 0,
                width: 40,
                height: 40,
                borderRadius: '50%',
              }}
              size="small"
              onClick={() => {}}
            >
              <VolumeUpIcon fontSize='small' />
            </Button>
          : 
            <Button
              style={{
                backgroundColor: theme.palette.secondary.main,
                border: `2px solid ${theme.palette.secondary.light}`,
                color: 'white',
                minWidth: 'auto',
                padding: 0,
                width: 32,
                height: 32,
                borderRadius: '50%',
              }}
              size="small"
              onClick={() => handleMoreInfo && movie && handleMoreInfo(movie.id)}
            >
              <KeyboardArrowDownRoundedIcon fontSize='small' />
            </Button>
          }
        </div>
      </div>
  );
}

export default ButtonGroup;