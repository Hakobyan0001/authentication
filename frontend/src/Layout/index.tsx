import React from 'react';
import { useSelector } from 'react-redux';

import App from '../App';
import { RootState } from '../redux/rootReducer';
import { AppBar } from '../view/components';

export default function Layout() {
  const { user } = useSelector((state: RootState) => state.auth);
  return (
    <>
      <AppBar user={user} /> <App />
    </>
  );
}
