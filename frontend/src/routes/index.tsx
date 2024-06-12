import Login from '../view/pages/Login';
import Registration from '../view/pages/Registration';
import Home from '../view/pages/Home';

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
  }
];

export default routes;
