import { ReactNode } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { CircularProgress, Container } from '@mui/material';

import { RootState } from '../redux/rootReducer';
import { closeSnackbar } from '../redux/slices/SnackBarSlice';
import { AppDispatch } from '../redux/store';
import { AppBar, SnackBar } from '../view/components';

interface LayoutProps {
  children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  const dispatch = useDispatch<AppDispatch>();
  const { loading } = useSelector((state: RootState) => state.login);
  const { open, message, severity } = useSelector((state: RootState) => state.snackBar);

  const handleCloseSnackbar = () => {
    dispatch(closeSnackbar());
  };
  return (
    <>
      <AppBar />
      {loading && <CircularProgress sx={{ margin: '300px' }} />}
      <SnackBar open={open} message={message} severity={severity} onClose={handleCloseSnackbar} />
      <Container> {!loading && children}</Container>
    </>
  );
}
