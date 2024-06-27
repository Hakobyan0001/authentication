import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate, Route, Routes } from 'react-router-dom';

import { CssBaseline } from '@mui/material';

import { RootState } from '../redux/store';
import routes from '../routes';

function App() {
  const { user } = useSelector((state: RootState) => state.auth);

  return (
    <div className="App">
      <CssBaseline />
      <Routes>
        {routes.map((route) => (
          <Route
            key={route.path}
            path={route.path}
            element={route.private && !user ? <Navigate to="/login" /> : route.element}
          />
        ))}
      </Routes>
    </div>
  );
}

export default App;
