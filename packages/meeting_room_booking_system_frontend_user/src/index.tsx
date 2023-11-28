import ReactDOM from 'react-dom/client';
import './index.css';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { Register } from './page/register/Register';
import { Login } from './page/login/Login';
import { UpdatePassword } from './page/update_password/UpdatePassword';
import { Index } from './page/index';
import { UpdateInfo } from './page/update_info/UpdateInfo';

function ErrorPage() {
  return <div>error</div>;
}

const routes = [
  {
    path: "/",
    element: <Index></Index>,
    errorElement: <ErrorPage />,
    children: [
      {
        path: 'update_info',
        element: <UpdateInfo />
      },
      {
        path: 'bbb',
        element: <div>bbb</div>
      }
    ]
},
  {
    path: "login",
    element: <Login />,
  },
  {
    path: "register",
    element: <Register />,
  },
  {
    path: "update_password",
    element: <UpdatePassword />,
  }
];
const router = createBrowserRouter(routes);

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(<RouterProvider router={router}/>);
