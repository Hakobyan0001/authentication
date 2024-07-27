import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { Button } from '@mui/material';

import { RootState } from '../../../redux/rootReducer';
import { AppDispatch } from '../../../redux/store';
import { buttonClick } from '../../../redux/thunks/homeThunk';

export default function Home() {
  const dispatch = useDispatch<AppDispatch>();
  const { user } = useSelector((state: RootState) => state.auth);
  function handleClick() {
    dispatch(buttonClick());
  }
  return (
    <>
      {user && (
        <div style={{ margin: '200px' }}>
          name: {user.fullName},<br></br> email: {user.email}
        </div>
      )}
      <Button sx={{ backgroundColor: 'red' }} onClick={handleClick}>
        Click
      </Button>
    </>
  );
}
