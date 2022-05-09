import { useState } from 'react';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import { Button } from '@mui/material';
import { NAV_BAR_HEIGHT } from '@/constants';

interface CustomDropDownProps {
  showArrow?: boolean;
  popperId: string;
  children: (props: {
    id: string | undefined, 
    isOpen: boolean, 
    anchorEl: HTMLElement | null, 
    handleClose?: () => void
  }) => React.ReactNode;
}

const CustomDropDown = (props: CustomDropDownProps) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)

  const isOpen = Boolean(anchorEl)
  const id = isOpen ? props.popperId : undefined
  let timer: NodeJS.Timeout


  const handleToggle = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>, state?: boolean | undefined) => {
    if (state) {
      clearTimeout(timer)
      return setAnchorEl(event.currentTarget)
    } 
    if (state !== undefined) return setAnchorEl(null)
    setAnchorEl(anchorEl ? null : event.currentTarget)
  }

  const handleClose = () => {
    timer = setTimeout(() => {
      setAnchorEl(null)
    }, 750)
  }

  return (
    <Button 
      disableRipple
      size="small"
      onClick={(e) => handleToggle(e)} 
      onMouseEnter={(e) => handleToggle(e, true)} 
      aria-describedby={id}
      style={{
        padding: 0,
        display: 'flex',
        backgroundColor: 'transparent',
        height: NAV_BAR_HEIGHT
      }} 
      {...( !!props.showArrow && 
        {endIcon: <ArrowDropDownIcon 
          fontSize="large"
          style={{
            marginTop: 4,
            color: 'white',
            transition: 'all 0.2s',
            ...(isOpen && { transform: "rotate(180deg)" }),
          }} 
        />}
      )}
    >
      {props.children({id, isOpen, anchorEl, handleClose})}
    </Button>
  )
}

export default CustomDropDown;