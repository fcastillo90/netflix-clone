import { useState } from "react";
import SearchIcon from '@mui/icons-material/Search';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import { IconButton, Input, InputAdornment } from '@mui/material'
import { NAV_BAR_HEIGHT } from "@/constants";
import theme from "@/styles";

const SearchInput = () => {
  const [value, setValue] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  let timer: NodeJS.Timeout

  const handleToggle = () => {
    if (isOpen) {
      clearTimeout(timer)
      return setIsOpen(false)
    }
    setIsOpen(true)
  }

  const handleOnEnter = () => {
    clearTimeout(timer)
    setIsOpen(true)
  }

  const handleOnLeave = () => {
    if (!value) {
      timer = setTimeout(() => {
        setIsOpen(false);
      }, 750);
    }
  }

  return (
    <div
      style={{
        height: NAV_BAR_HEIGHT,
        paddingTop: 14,
        paddingBottom: 14,
      }}
      onMouseEnter={handleOnEnter}
      onMouseLeave={handleOnLeave}
    >
      <div
        style={{
          transition: 'all 0.5s',
          ...(isOpen && {
            display: "flex",
            border: '1px solid white',
            backgroundColor: theme.palette.background.default
          })
        }}
      >
        <IconButton
          onClick={handleToggle}
        >
          <SearchIcon 
            style={{
              color: 'white',
              fontWeight: 'bold'
            }}
            fontSize="small" 
          />
        </IconButton>
        <Input 
          id="standard-basic" 
          placeholder="Titles, people, genres"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          disableUnderline={true}
          endAdornment={
            <InputAdornment 
              position="end"
              style={{
                transition: 'all 0.5s',
                display: isOpen ? 'flex' : 'none',
              }}
            >
              <IconButton
                onClick={() => setValue("")}
                edge="end"
              >
                <CloseRoundedIcon style={{color: 'white'}} />
              </IconButton>
            </InputAdornment>
          }
          style={{
            transition: 'all 0.5s',
            width: 0,
            ...(isOpen && {
              paddingRight: 8,
              width: 256,
            })
          }}
        />
      </div>
    </div>
  )
  
}

export default SearchInput