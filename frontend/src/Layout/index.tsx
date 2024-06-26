import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import App from '../App';
import { RootState } from '../redux/rootReducer';
import { setUserData } from '../redux/slices/authSlice';
import { AppDispatch } from '../redux/store';
import cookieService from '../services/CookieService';
import storage from '../services/storage';
import { AppBar } from '../view/components';

export default function Layout() {
  const dispatch = useDispatch<AppDispatch>();
  const { user } = useSelector((state: RootState) => state.auth);
  const isUserDataLoaded = storage.getUser('userDataLoaded');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = cookieService.getCookie('token');
    const userInfo = cookieService.getCookie('userInfo');
    if (token && userInfo) {
      try {
        const { email, fullName } = userInfo;
        dispatch(setUserData({ token, email, fullName }));
        storage.addUser('userDataLoaded', true);
      } catch (error) {
        console.error('Error parsing userInfo from cookies:', error);
      }
    } else {
      console.error('userInfo cookie is missing or invalid');
    }
    setLoading(false);
  }, [dispatch]);
  if (loading) {
    return <div>Loading...</div>; // Optionally show a loading indicator
  }

  return (
    <>
      <AppBar user={user} /> <App user={user} />
    </>
  );
}
