import React, { useRef, useState } from 'react'
import { Button, Typography } from '@mui/material';
import ArrowBackIosNewRoundedIcon from '@mui/icons-material/ArrowBackIosNewRounded';
import ArrowForwardIosRoundedIcon from '@mui/icons-material/ArrowForwardIosRounded';
import { CategoryType, Movie, Serie } from '@/types'
import { getImgUrl } from '@/utils/getUrl';
import theme from '@/styles';
import { PreviewCard, Image } from '@/components';
import { SLIDE_HEIGHT, SLIDE_WIDTH } from '@/constants';
import './slider.css';

interface SliderProps {
  data: Movie[] | Serie[];
  isLarge: boolean | undefined;
  slug: string;
  isTopTen: boolean | undefined;
  handleDetailModal?: (index: number) => void;
  category: CategoryType;
}

const Slider = (props: SliderProps) => {
  const { category, data, isLarge, slug, isTopTen, handleDetailModal } = props
  let timer: NodeJS.Timeout;

  const [isPrevVisible, setPrevVisible] = useState(false)
  const [isNextVisible, setNextVisible] = useState(true)
  const [hover, setHover] = useState<number | null>(null);
  const sliderContainer = useRef<HTMLDivElement>(null)

  const handleClick = (index: number, movieId: number) => {
    if (isTopTen && handleDetailModal) return handleDetailModal(movieId)
    handleClearTimer();
    setHover(index)
  }

  const handleHover = (index: number) => {
    if (!isTopTen) {
      handleClearTimer();
      timer = setTimeout(() => {
        setHover(index)
      }, 500);
    }
  }

  const dismissHover = () => {
    setHover(null)
    handleClearTimer();
  }

  const handleClearTimer = () => clearTimeout(timer);

  const getSlideAmount = (container: HTMLDivElement) => Math.floor(
    isLarge && isTopTen ?
      container.clientWidth / (SLIDE_WIDTH * 2 + 20)
      :
      container.clientWidth / (SLIDE_WIDTH + 10)
  )


  const handlePrev = () => {
    if (sliderContainer.current) {
      const amount = getSlideAmount(sliderContainer.current) * (SLIDE_WIDTH + 10)
      sliderContainer.current.scrollLeft -= amount

      setNextVisible(true)
      if (sliderContainer.current?.scrollLeft - amount <= 0) {
        return setPrevVisible(false)
      }
      setPrevVisible(true)
    }
  }

  const handleNext = () => {
    if (sliderContainer.current) {
      const amount = getSlideAmount(sliderContainer.current) * (SLIDE_WIDTH + 10)
      sliderContainer.current.scrollLeft += amount

      if (sliderContainer.current?.scrollLeft + amount >= sliderContainer.current?.scrollWidth - sliderContainer.current?.clientWidth) {
        setNextVisible(false)
      }
      setPrevVisible(true)
    }
  }

  const dataToRender = isTopTen ? data.slice(0, 10) : data
  const buttonStyle: React.CSSProperties = {
    position: 'absolute',
    height: isLarge ?
      SLIDE_HEIGHT * 3
      :
      isTopTen ? SLIDE_HEIGHT * 1.5 : SLIDE_HEIGHT,
    color: 'white',
    borderRadius: 0,
    zIndex: 5,
  }

  return (
    <div
      className="sliderContainer"
      onScroll={dismissHover}
      ref={sliderContainer}
      style={{
        scrollBehavior: 'smooth',
        paddingLeft: 56,
        height: isLarge ?
          SLIDE_HEIGHT * 4.75
          :
          isTopTen ? SLIDE_HEIGHT * 3.2 : SLIDE_HEIGHT * 2.7,
      }}
    >
      <Button
        key="prev"
        variant="text"
        onClick={handlePrev}
        style={{
          ...buttonStyle,
          display: isPrevVisible ? 'block' : 'none',
          left: 0,
          background: 'linear-gradient(90deg, rgba(0,0,0,1) 0%, rgba(0,0,0,0) 100%)',
        }}
      >
        <ArrowBackIosNewRoundedIcon />
      </Button>
      <Button
        key="next"
        variant="text"
        onClick={handleNext}
        style={{
          ...buttonStyle,
          display: isNextVisible ? 'block' : 'none',
          right: 0,
          background: 'linear-gradient(90deg, rgba(0,0,0,0) 0%, rgba(0,0,0,1) 100%)',
        }}
      >
        <ArrowForwardIosRoundedIcon />
      </Button>

      {dataToRender.map((data, index) => {
        const isActive = hover === index;
        const lastInTopTen = index === 9
        return (
          <div
            key={`${data.id}-${slug}`}
            onClick={() => handleClick(index, data.id)}
            onMouseEnter={() => { handleHover(index) }}
            onMouseLeave={dismissHover}
            style={{
              position: 'relative',
              backgroundColor: theme.palette.background.default,
              transition: 'all 0.3s ease-in-out',
              flex: '1 0 auto',
              width: SLIDE_WIDTH,
              marginRight: 10,
              zIndex: 0,
              overflow: 'hidden',
              height: isLarge ?
                SLIDE_HEIGHT * 3
                :
                SLIDE_HEIGHT,
              ...(isActive && {
                backgroundColor: theme.palette.background.paper,
                overflow: 'none',
                zIndex: 9,
                marginTop: -72,
                alignSelf: 'flex-end',
                float: 'left',
                width: 312,
                height: 'auto',
              }),
              ...(isTopTen && {
                textAlign: "right",
                width: SLIDE_WIDTH,
                height: SLIDE_HEIGHT * 1.5,
                ...(isLarge && {
                  width: SLIDE_WIDTH * 2 + 10,
                  height: SLIDE_HEIGHT * 3,
                }),
              })
            }}
          >
            {isTopTen && (
              <Typography
                style={{
                  position: 'absolute',
                  width: 'min-content',
                  letterSpacing: -SLIDE_WIDTH / 4.3,
                  right: lastInTopTen ?
                    SLIDE_WIDTH / 2.5
                    :
                    SLIDE_WIDTH / 2,
                  color: 'black',
                  textShadow: `3px 3px 0 ${theme.palette.secondary.light}, 
                    -3px -3px 0 ${theme.palette.secondary.light}, 
                    3px -3px 0 ${theme.palette.secondary.light}, 
                    -3px 3px 0 ${theme.palette.secondary.light}, 
                    3px 3px 0 ${theme.palette.secondary.light}`,
                  fontSize: SLIDE_HEIGHT * 2,
                  zIndex: -1,
                  lineHeight: 0.75,
                  ...(isLarge && {
                    fontSize: SLIDE_HEIGHT * 4,
                    letterSpacing: -SLIDE_WIDTH / 2.15,
                    right: lastInTopTen ?
                      SLIDE_WIDTH / 1.1
                      :
                      SLIDE_WIDTH
                  })
                }}
              >
                {index + 1}
              </Typography>
            )}
            <Image
              src={getImgUrl(isLarge || isTopTen ? data.poster_path : data.backdrop_path, 'w500')}
              alt={(data as Movie).title || (data as Serie).name}
              style={{
                objectFit: 'contain',
                width: isTopTen ? '50%' : '100%',
              }}
            />
            <PreviewCard
              category={category}
              data={data}
              isActive={isActive}
              handleMoreInfo={handleDetailModal}
            />
          </div>
        )
      })}
    </div>
  )
}

export default Slider