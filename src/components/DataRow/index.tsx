import {  Typography } from "@mui/material"
import { MovieList, SerieList } from "@/types";
import { Slider, Modal } from "@/components"
import { getSlug } from "@/utils/getSlug";
import { memo, useState } from "react";
import { useDispatch } from "react-redux";
import { openModal } from "@/store/features/modalSlice";

interface DataRowProps {
  category: 'movieApi' | 'serieApi';
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

  return (
    <>
      <div
        style={{
          height: isLarge ? 
            456 
            : 
            isTopTen ? 256 : 216
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