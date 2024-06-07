import Login from "../view/pages/Login";
import Registration from "../view/pages/Registration";
import Home from "../view/pages/Home";
const routes = [
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/registration",
    element: <Registration />,
  },
];

export default routes;
