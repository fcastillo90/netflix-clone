import KeyboardBackspaceRoundedIcon from '@mui/icons-material/KeyboardBackspaceRounded';
import EmojiFlagsRoundedIcon from '@mui/icons-material/EmojiFlagsRounded';
import { Box, ClickAwayListener, IconButton, Popper, Slider, Typography } from "@mui/material"
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PlayArrowRoundedIcon from '@mui/icons-material/PlayArrowRounded';
import Replay10RoundedIcon from '@mui/icons-material/Replay10Rounded';
import Forward10RoundedIcon from '@mui/icons-material/Forward10Rounded';
import VolumeUpRoundedIcon from '@mui/icons-material/VolumeUpRounded';
import FullscreenRoundedIcon from '@mui/icons-material/FullscreenRounded';
import PauseRoundedIcon from '@mui/icons-material/PauseRounded';
import VolumeOffRoundedIcon from '@mui/icons-material/VolumeOffRounded';
import VolumeDownRoundedIcon from '@mui/icons-material/VolumeDownRounded';
import SpeedRoundedIcon from '@mui/icons-material/SpeedRounded';
import SubtitlesRoundedIcon from '@mui/icons-material/SubtitlesRounded';
import AutoAwesomeMotionRoundedIcon from '@mui/icons-material/AutoAwesomeMotionRounded';
import SkipNextRoundedIcon from '@mui/icons-material/SkipNextRounded';
import { Video } from '@/types';
import theme from '@/styles';
import getFormattedDuration from '@/utils/getFormattedDuration';
import { preventHorizontalKeyboardNavigation } from '@/utils';

interface HudProps {
  data: Video;
  duration: number;
  handlePause: () => void;
  handlePlay: () => void;
  handleSeek: (value: number) => void;
  handleVolume: (value: number) => void;
  handleGetCurrentTime: () => number;
  handleFullscreen: () => void;
}

const fontSize = 60

const Hud = (props: HudProps) => {
  const {duration, data, handlePlay, handlePause, handleSeek, handleVolume, handleGetCurrentTime, handleFullscreen} = props
  const navigate = useNavigate();
  const [position, setPosition] = useState(0);
  const [paused, setPaused] = useState(false);
  const [volume, setVolume] = useState(100);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);


  const onPlay = () => {
    setPaused(false)
    handlePlay()
  }
  const onPause = () => {
    setPaused(true)
    handlePause()
  }
  const onSeek = (_event: any, newValue: number | number[]) => {
    setPosition(newValue as number)
    handleSeek(newValue as number)
  }
  const onVolume = (_event: Event, newValue: number | number[]) => {
    handleVolume(newValue as number)
    setVolume(newValue as number)
  }
  const handlePlayPause = () => {
    if (paused) return onPlay()
    return onPause()
  }
  const handleRewind = (value: number) => {
    let newPosition = position - value
    if (newPosition < 0) newPosition = 0
    setPosition(newPosition)
    handleSeek(newPosition)
  }
  const handleForward = (value: number) => {
    let newPosition = position + value
    if (newPosition > duration) newPosition = duration
    setPosition(newPosition)
    handleSeek(newPosition)
  }
  const handleOpenVolume = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(anchorEl ? null : event.currentTarget)
  }
  const handleMute = () => {
    if (volume === 0) {
      setVolume(100)
      handleVolume(100)
      return
    }
    setVolume(0)
    handleVolume(0)
  }

  const handleGetVolumeIcon = () => {
    if (volume === 0) return <VolumeOffRoundedIcon fontSize="inherit" />
    if (volume < 50) return <VolumeDownRoundedIcon fontSize="inherit" />
    return <VolumeUpRoundedIcon fontSize="inherit" />
  }

  useEffect(() => {
    const timeout = setTimeout(() => {
      if (!paused) setPosition(Math.ceil(handleGetCurrentTime()))
    }, 1000);
    return () => clearTimeout(timeout);
  }, [position, paused])

  return (
    <div
      style={{
        position: 'absolute',
        width: '100%',
        height: '100%',
        zIndex: 10
      }}
    >
      <IconButton 
        aria-label="back"
        onClick={() => navigate(-1)}
        style={{
          position: 'absolute',
          color: 'white',
          top: 16,
          left: 16,
          fontSize
        }}
      >
        <KeyboardBackspaceRoundedIcon fontSize="inherit" />
      </IconButton>

      <IconButton 
        aria-label="back"
        style={{
          position: 'absolute',
          color: 'white',
          top: 16,
          right: 16,
          fontSize
        }}
      >
        <EmojiFlagsRoundedIcon fontSize="inherit" />
      </IconButton>

      <div
        style={{
          bottom: 0,
          paddingLeft: 32,
          paddingRight: 32,
          position: 'absolute',
          width: '100%',
        }}
      >
        <div
          style={{
            alignItems: 'center',
            display: 'flex',
            justifyContent: 'space-between',
          }}
        >
          <Slider 
            aria-label="video" 
            defaultValue={0} 
            max={duration}
            min={0}
            onChangeCommitted={onSeek}
            step={1}
            value={position}
            valueLabelDisplay="auto"
            valueLabelFormat={getFormattedDuration}
            sx={{
              zIndex: 5,
              color: theme.palette.primary.main,
              height: 4,
              '& .MuiSlider-thumb': {
                color: theme.palette.primary.main,
                width: 16,
                height: 16,
                transition: '0.3s ease',
                '&:before': {
                  boxShadow: '0 2px 12px 0 rgba(0,0,0,0.4)',
                },
                '&:hover, &.Mui-focusVisible': {
                  boxShadow: '0px 0px 0px 8px rgb(255 255 255 / 16%)',
                },
                '&.Mui-active': {
                  width: 24,
                  height: 24,
                },
              },
              '& .MuiSlider-rail': {
                opacity: 0.28,
                color: '#fff',
              },
            }}
          />
          <Typography variant="body1" style={{marginLeft: 16}}>
            {getFormattedDuration(Math.abs(position-duration))}
          </Typography>
        </div>
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <div>
            <IconButton 
              aria-label="Play"
              onClick={handlePlayPause}
              style={{
                color: 'white',
                fontSize,
                padding: 0
              }}
            >
              {paused ? 
              <PlayArrowRoundedIcon fontSize="inherit" />
              : 
              <PauseRoundedIcon fontSize="inherit" />
              }
            </IconButton>
            <IconButton 
              aria-label="Rewind"
              onClick={() => handleRewind(10)}
              style={{
                color: 'white',
                fontSize
              }}
            >
              <Replay10RoundedIcon fontSize="inherit" />
            </IconButton>
            <IconButton 
              aria-label="Forward"
              onClick={() => handleForward(10)}
              style={{
                color: 'white',
                fontSize
              }}
            >
              <Forward10RoundedIcon fontSize="inherit" />
            </IconButton>
            <ClickAwayListener onClickAway={() => {setAnchorEl(null)}}>
              <div
                style={{
                  display: 'inline-flex',
                  verticalAlign: 'middle',
                }}
              >
              <IconButton 
                aria-label="Volume"
                onMouseEnter={handleOpenVolume}
                onClick={handleMute}
                style={{
                  color: 'white',
                  fontSize
                }}
              >
                {handleGetVolumeIcon()}
              </IconButton>
                <Popper 
                  open={Boolean(anchorEl)} 
                  anchorEl={anchorEl}
                  style={{
                    zIndex: 10
                  }}
                >
                  <Box 
                    sx={{ 
                      border: 1, 
                      p: 1, 
                      bgcolor: 'background.paper',
                      height: 200,
                      paddingTop: 3,
                      paddingBottom: 2,
                    }}
                  >
                    <Slider
                      sx={{
                        '& input[type="range"]': {
                          WebkitAppearance: 'slider-vertical',
                        },
                      }}
                      orientation="vertical"
                      max={100}
                      min={0}
                      value={volume}
                      onChange={onVolume}
                      onKeyDown={preventHorizontalKeyboardNavigation}
                    />
                  </Box>
                </Popper>
              </div>
            </ClickAwayListener>
          </div>
          <div
            style={{
              maxWidth: '33%'
            }}
          >
            <Typography
              variant="h5"
              component="h1"
              noWrap={true}
            >
              {data.name}
            </Typography>
          </div>
          <div>
            <IconButton 
              aria-label="Skip"
              style={{
                color: 'white',
                fontSize
              }}
            >
              <SkipNextRoundedIcon fontSize="inherit" />
            </IconButton>
            <IconButton 
              aria-label="Episodes"
              style={{
                color: 'white',
                fontSize
              }}
            >
              <AutoAwesomeMotionRoundedIcon fontSize="inherit" />
            </IconButton>
            <IconButton 
              aria-label="Subtitles"
              style={{
                color: 'white',
                fontSize
              }}
            >
              <SubtitlesRoundedIcon fontSize="inherit" />
            </IconButton>
            <IconButton 
              aria-label="Speed"
              style={{
                color: 'white',
                fontSize
              }}
            >
              <SpeedRoundedIcon fontSize="inherit" />
            </IconButton>
            <IconButton 
              onClick={handleFullscreen}
              aria-label="Fullscreen"
              style={{
                color: 'white',
                fontSize
              }}
            >
              <FullscreenRoundedIcon fontSize="inherit" />
            </IconButton>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Hud