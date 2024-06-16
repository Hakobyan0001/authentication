import { Button, Box, Typography } from '@mui/material';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { logout } from '../../../redux/slices/loginSlice';
import { RootState } from '../../../redux/rootReducer';

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
