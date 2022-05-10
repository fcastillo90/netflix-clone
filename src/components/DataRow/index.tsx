import {  Typography } from "@mui/material"
import { MovieList, SerieList } from "@/types";
import { Slider, Modal } from "@/components"
import { getSlug } from "@/utils/getSlug";
import { useState } from "react";

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
  const [isOpen, setIsOpen] = useState<number | false>(false)

  const handleOpen = (index: number) => {
    setIsOpen(index)
  }
  const handleClose = () => {
    setIsOpen(false)
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
          handleDetailModal={handleOpen}
        />
      </div>
      <Modal
        category={category}
        isOpen={isOpen}
        handleClose={handleClose}
      />
    </>
  )
}

export default DataRow