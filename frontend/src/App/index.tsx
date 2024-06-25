import { useSelector } from 'react-redux';
import { Navigate, Route, Routes } from 'react-router-dom';

import { CssBaseline } from '@mui/material';

import routes from '../routes';

function App() {
  const { user } = useSelector((state: any) => state.login);

  return (
    <div className="App">
      <CssBaseline />
      <Routes>
        {routes.map((route) =>
          route.private ? (
            user ? (
              <Route key={route.path} path={route.path} element={route.element} />
            ) : (
              <Route key={route.path} path={route.path} element={<Navigate to="/login" />} />
            )
          ) : (
            <Route key={route.path} path={route.path} element={route.element} />
          )
        )}
      </Routes>
    </div>
  );
}

export default App;
