import theme from "@/styles";
import getFormattedDuration from "@/utils/getFormattedDuration";
import { Slider, Typography } from "@mui/material";
import { useEffect, useState } from "react";

interface VideoSliderProps {
  duration: number;
  onChange: (value: number) => void;
  paused: boolean;
  handleGetCurrentTime: () => number;
}

const VideoSlider = (props: VideoSliderProps) => {
  const { duration, onChange, paused, handleGetCurrentTime } = props;
  const [position, setPosition] = useState(0);

  const handleOnChange = (value: number) => {
    setPosition(value)
    onChange(value)
  }


  setTimeout(() => {
    if (!paused)
      setPosition(Math.round(handleGetCurrentTime()))
  }, 1000);

  return (
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
        onChange={(_e, value) => handleOnChange(value as number)}
        step={1}
        value={position}
        valueLabelDisplay="auto"
        sx={{
          zIndex: 5,
          color: theme.palette.primary.main,
          height: 4,
          '& .MuiSlider-thumb': {
            color: theme.palette.primary.main,
            width: 16,
            height: 16,
            transition: '0.3s cubic-bezier(.47,1.64,.41,.8)',
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
  )
}

export default VideoSlider