import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { AppBar, Box, Button, Toolbar, Typography } from '@mui/material';

import { clearUserData } from '../../../redux/slices/authSlice';
import { RootState } from '../../../redux/store';

export default function AppBarComponent() {
  const { user } = useSelector((state: RootState) => state.auth);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogOut = () => {
    dispatch(clearUserData());
    navigate('/login');
  };

  return (
    <AppBar
      position="fixed"
      component="nav"
      sx={{
        backgroundColor: 'black',
        zIndex: 1300
      }}>
      <Toolbar>
        {user && (
          <>
            <Box
              sx={{
                flexGrow: '1'
              }}>
              <Typography variant="h6">Home</Typography>
            </Box>
            <Button onClick={() => handleLogOut()}>Sing out</Button>{' '}
          </>
        )}
      </Toolbar>
    </AppBar>
  );
}
