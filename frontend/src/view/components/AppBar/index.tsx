import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { AppBar, Box, Button, Toolbar, Typography } from '@mui/material';

import { RootState } from '../../../redux/rootReducer';
import { logout } from '../../../redux/slices/loginSlice';

export default function AppBarComponent() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state: RootState) => state.login);

  const handleLogOut = () => {
    dispatch(logout());
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
