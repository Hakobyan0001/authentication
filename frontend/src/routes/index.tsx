import Login from '../view/pages/Login';
import Registration from '../view/pages/Registration';
import Home from '../view/pages/Home';
import { ResetPassword, SetPassword } from '../view/pages/ForgotPassword';

const routes = [
  {
    path: '/',
    element: <Home />,
    private: true
  },
  {
    path: '/login',
    element: <Login />,
    private: false
  },
  {
    path: '/registration',
    element: <Registration />,
    private: false
  },
  {
    path: '/resetPassword',
    element: <ResetPassword />,
    private: false
  },
  {
    path: '/resetPassword/:token',
    element: <SetPassword />,
    private: false
  }
];

export default routes;
