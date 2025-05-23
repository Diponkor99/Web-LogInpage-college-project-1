import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import SignUP from './SignUP/SignUP.jsx';
import LogIn from './LogIn/LogIn.jsx';

const router = createBrowserRouter([
  {
    path: "/",
    element:<SignUP></SignUP>,
  },
   {
    path: "/login",
    element: <LogIn></LogIn>,
  },
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
