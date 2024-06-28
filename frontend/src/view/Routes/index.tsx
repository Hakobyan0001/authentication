import { useSelector } from 'react-redux';
import { Navigate, Route, Routes } from 'react-router-dom';

import { CssBaseline } from '@mui/material';

import Layout from '../../Layout';
import { RootState } from '../../redux/store';
import { Home, Login, NotFound, Register, ResetPassword, SetPassword } from '../pages';

export default function Rout() {
  const { user } = useSelector((state: RootState) => state.auth);
  return (
    <>
      <CssBaseline />
      <Layout>
        <Routes>
          {user ? (
            <>
              <Route path="/" element={<Home />} />
              <Route path="*" element={<Navigate to="/" replace />} />
            </>
          ) : (
            <>
              <Route path="/" element={<Navigate to="/login" replace />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/resetPassword" element={<ResetPassword />} />
              <Route path="/resetPassword/:token" element={<SetPassword />} />
            </>
          )}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Layout>
    </>
  );
}
