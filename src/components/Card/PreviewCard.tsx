import * as React from 'react';
import Typography from '@mui/material/Typography';
import { Genre, Movie, Serie } from '@/types';
import CircleRoundedIcon from '@mui/icons-material/CircleRounded';
import { useSelector } from 'react-redux';
import { RootState } from '@/store';
import theme from '@/styles';
import ButtonGroup from '../Button/ButtonGroup';

interface PreviewCardProps {
  data: Movie | Serie;
  category: 'movieApi' | 'serieApi';
  isActive: boolean;
  handleMoreInfo?: (movieId: number) => void;
}

const PreviewCard = (props: PreviewCardProps) => {
  const { category, data, isActive, handleMoreInfo } = props;

  const dataApi: any = useSelector((state: RootState) => state[category]?.queries['getGenreList(null)']?.data);

  const getGenres = (genresIds: number[]) =>
    genresIds.map((id) => 
      dataApi?.genres.find((genre: Genre) => genre.id === id))

  return (
      
    <div style={{
      display: isActive ? 'block' : 'none',
      padding: 16
    }}>
      <ButtonGroup
        handleMoreInfo={handleMoreInfo}
        movie={data}
      />
      <div>
        <Typography color="lightgreen" style={{marginTop:16, fontWeight: 700}}>
          99% Match
        </Typography>
      </div>

      {isActive && <Typography variant="body2" color="text">
        {getGenres(data.genre_ids).map((genre, index) => {
          return <React.Fragment key={genre.id}>
            {genre?.name}
            {index !== data.genre_ids.length - 1 && <CircleRoundedIcon 
              style={{
                fontSize: 6,
                marginLeft: 6,
                marginRight: 6,
                marginBottom: 2,
                color: theme.palette.secondary.light,
              }} 
            />}
          </React.Fragment>
        })}
      </Typography>}
    </div>
  );
}

export default PreviewCard;