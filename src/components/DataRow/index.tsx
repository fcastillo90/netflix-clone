import {  Typography } from "@mui/material"
import { CategoryType, MovieList, SerieList } from "@/types";
import { Slider } from "@/components"
import { getSlug } from "@/utils/getSlug";
import { memo } from "react";
import { useDispatch } from "react-redux";
import { openModal } from "@/store/features/modalSlice";

interface DataRowProps {
  category: CategoryType;
  data: MovieList | SerieList;
  title: string;
  isLarge?: boolean;
  isTopTen?: boolean;
}

const typographyStyle = {
  fontWeight: 'bold',
  paddingLeft: '3.5rem',
  paddingRight: '3.5rem',
  marginBottom: -95,
  fontSize: '1.3rem'
}

const DataRow = (props: DataRowProps) => {
  const {category, data, title, isLarge, isTopTen} = props
  const dispatch = useDispatch()

  const handleOpenModal = (id: number) => {
    dispatch(openModal({
      id,
      category
    }))
  }

  const getHeight = () => {
    if (isLarge) return 456
    if (isTopTen) return 256
    return 216
  }

  return (
    <>
      <div
        style={{
          height: getHeight()
        }}
      >
        <Typography
          style={typographyStyle}
        >
          {title}
        </Typography>
        <Slider 
          category={category}
          slug={getSlug(title)}
          data={data.results}
          isLarge={isLarge}
          isTopTen={isTopTen}
          handleDetailModal={handleOpenModal}
        />
      </div>
    </>
  )
}

export default memo(DataRow)