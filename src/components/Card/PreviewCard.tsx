import * as React from 'react';
import Typography from '@mui/material/Typography';
import { Genre, Movie } from '@/types';
import CircleRoundedIcon from '@mui/icons-material/CircleRounded';
import { useSelector } from 'react-redux';
import { RootState } from '@/store';
import theme from '@/styles';
import ButtonGroup from '../Button/ButtonGroup';

interface PreviewCardProps {
  movie: Movie;
  isActive: boolean;
  handleMoreInfo?: (movieId: number) => void;
}

const PreviewCard = (props: PreviewCardProps) => {
  const { movie, isActive, handleMoreInfo } = props;

  const movieApi: any = useSelector((state: RootState) => state.movieApi?.queries['getGenreList(null)']?.data);

  const getGenres = (genresIds: number[]) =>
    genresIds.map((id) => 
      movieApi?.genres.find((genre: Genre) => genre.id === id))

  return (
      
    <div style={{
      display: isActive ? 'block' : 'none',
      padding: 16
    }}>
      <ButtonGroup
        handleMoreInfo={handleMoreInfo}
        movie={movie}
      />
      <div>
        <Typography color="lightgreen" style={{marginTop:16, fontWeight: 700}}>
          99% Match
        </Typography>
      </div>

      {isActive && <Typography variant="body2" color="text">
        {getGenres(movie.genre_ids).map((genre, index) => {
          return <React.Fragment key={genre.id}>
            {genre?.name}
            {index !== movie.genre_ids.length - 1 && <CircleRoundedIcon 
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