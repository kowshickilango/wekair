import React, { useState, FC } from 'react';
import Box from '@mui/system/Box';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import MenuIcon from '@mui/icons-material/Menu';
import IconButton from '@mui/material/IconButton';
import Person2Icon from '@mui/icons-material/Person2';
import AddIcon from '@mui/icons-material/Add';
import DirectionsCarFilledIcon from '@mui/icons-material/DirectionsCarFilled';
import NotificationsIcon from '@mui/icons-material/Notifications';
import HistoryIcon from '@mui/icons-material/History';
import Link from 'next/link';
import Drawer from '@mui/material/Drawer';
import axios from 'axios';
import { useRouter } from 'next/router';

const CustomDrawer = () => {
  const router = useRouter();

  const [isDrawerOpen, setIsDrawerOpen] = useState<boolean>(false);
  const [tabValue, setTabValue] = useState<number>(0);

  const toggleDrawer = () => {
    setIsDrawerOpen((prev) => !prev);
  };

  const handleLogOut = () => {
    axios
      .post('/auth/signout')
      .then((res) => {
        router.replace('/');
        toggleDrawer();
      })
      .catch((err) => {
        // axiosErrorHandler(err);
      });
  };

  return (
    <>
      <IconButton
        aria-controls='account-menu'
        aria-haspopup='true'
        aria-label='account menu'
        onClick={toggleDrawer}
      >
        <MenuIcon color='secondary' fontSize='large' />
      </IconButton>
      <Drawer anchor='right' open={isDrawerOpen} onClose={toggleDrawer}>
        <Box bgcolor='primary.light' height={1}>
          <List>
            <Link href='/'>
              <ListItem>
                <ListItemButton onClick={toggleDrawer}>
                  <ListItemIcon>
                    <Person2Icon className='color-black' fontSize='large' />
                  </ListItemIcon>
                  <ListItemText primary='Profile' />
                </ListItemButton>
              </ListItem>
            </Link>
            <Link href='/our-story'>
              <ListItem>
                <ListItemButton onClick={toggleDrawer}>
                  <ListItemIcon>
                    <NotificationsIcon
                      className='color-black'
                      fontSize='large'
                    />
                  </ListItemIcon>
                  <ListItemText primary='Notifications' />
                </ListItemButton>
              </ListItem>
            </Link>
            <Link href='/our-story'>
              <ListItem>
                <ListItemButton onClick={toggleDrawer}>
                  <ListItemIcon>
                    <HistoryIcon className='color-black' fontSize='large' />
                  </ListItemIcon>
                  <ListItemText primary='Faulty History' />
                </ListItemButton>
              </ListItem>
            </Link>
            <Link href='/my-vehicles'>
              <ListItem>
                <ListItemButton onClick={toggleDrawer}>
                  <ListItemIcon>
                    <DirectionsCarFilledIcon className='color-black' fontSize='large' />
                  </ListItemIcon>
                  <ListItemText primary='My Vehicle' />
                </ListItemButton>
              </ListItem>
            </Link>
            <Link href='/add-vehicle'>
              <ListItem>
                <ListItemButton onClick={toggleDrawer}>
                  <ListItemIcon>
                    <AddIcon className='color-black' fontSize='large' />
                  </ListItemIcon>
                  <ListItemText primary='Add Vehicle' />
                </ListItemButton>
              </ListItem>
            </Link>
          </List>
        </Box>
      </Drawer>
    </>
  );
};

export default CustomDrawer;
