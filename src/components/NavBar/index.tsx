import React, { useEffect, useState } from "react"
import { Grid, Avatar, Badge, Popper, Box, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Divider } from "@mui/material"
import NotificationsIcon from '@mui/icons-material/Notifications';
import { CustomDropDown, NetflixIcon } from "@/components";
import {NAV_BAR_HEIGHT} from "@/constants";
import LinkList from "./LinkList";
import PersonIcon from '@mui/icons-material/Person';
import HelpOutlineRoundedIcon from '@mui/icons-material/HelpOutlineRounded';
import SearchInput from "../Input/SearchInput";
import { RootState } from "@/store";
import { useSelector } from "react-redux";

const NavBar = () => {
  const [isTransparent, setIsTransparent] = useState(true);
  const showNavbar = useSelector((state: RootState) => state.config.navbar.isVisible)

  const handleScrollEvent = () => {
    if (isTransparent && window.scrollY > 1) {
      return setIsTransparent(false);
    }
    setIsTransparent(true);
  }


  useEffect(() => {
    window.addEventListener('scroll', handleScrollEvent);
  
    return () =>
      window.removeEventListener('scroll', handleScrollEvent);
  }, []);
  return (
    <>
      <Grid 
        container
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        style={{
          zIndex: 10,
          position: 'fixed',
          transition: 'all 0.5s',
          paddingLeft: '3.5rem',
          paddingRight: '3.5rem',
          background: isTransparent ? "linear-gradient(rgba(20,20,20,0.75) 0%, rgba(20,20,20,0) 100%)" : '#000000',
          display: showNavbar ? 'flex' : 'none'
        }}
      >
        <Grid 
          container 
          item 
          xs="auto"
        >
          <Grid 
            item
            style={{height: NAV_BAR_HEIGHT}}
          >
            <NetflixIcon 
              style={{
                width: 92,
                marginRight: 28,
                height: NAV_BAR_HEIGHT
              }} 
            />
          </Grid>
          <Grid 
            item 
            xs
          >
            <LinkList />
          </Grid>
        </Grid>
        <Grid 
          container 
          item 
          xs
          spacing={3}
          justifyContent="flex-end"
          alignItems="center" 
        >
          <Grid item>
            <SearchInput />
          </Grid>
          <Grid item>
            <Badge 
              badgeContent={4} 
              color="primary"
              sx={{ "& .MuiBadge-badge": { fontSize: '0.7rem', height: 13, minWidth: 13 } }}
            >
              <NotificationsIcon fontSize="small" />
            </Badge>
          </Grid>
          <Grid item>
            <CustomDropDown popperId="account" showArrow={true}>
              {({id, isOpen, anchorEl, handleClose}) => (
                <div onMouseLeave={handleClose}>
                  <Popper 
                    id={id} 
                    open={isOpen} 
                    anchorEl={anchorEl}
                    placement="bottom-end"
                    modifiers={[
                      {
                        name: 'offset',
                        options: {
                          offset: [0, 5],
                        },
                      },
                    ]}
                  >
                    <Box sx={{ p: 1, bgcolor: 'rgba(0,0,0,0.8)' }}>
                      <List disablePadding>
                        <ListItem disablePadding>
                          <ListItemButton>
                            <ListItemIcon>
                              <PersonIcon style={{color: 'white'}} />
                            </ListItemIcon>
                            <ListItemText primary="Account" />
                          </ListItemButton>
                        </ListItem>
                        <ListItem disablePadding>
                          <ListItemButton>
                            <ListItemIcon>
                              <HelpOutlineRoundedIcon style={{color: 'white'}} />
                            </ListItemIcon>
                            <ListItemText primary="Help Center" />
                          </ListItemButton>
                        </ListItem>
                      </List>
                      <Divider style={{borderColor: 'white'}} />
                      <List>
                        <ListItem disablePadding>
                          <ListItemButton>
                            <ListItemText primary="Sign out of Netflix" />
                          </ListItemButton>
                        </ListItem>
                      </List>
                    </Box>
                  </Popper>
                  <Avatar 
                    sx={{ width: 32, height: 32 }}
                    variant="rounded"
                  >
                    H
                  </Avatar>
                </div>
              )}
            </CustomDropDown>
          </Grid>
        </Grid>
      </Grid>
    </>
  )
}

export default NavBar