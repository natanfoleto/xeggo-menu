import { createBrowserRouter } from 'react-router-dom'

import { AppLayout } from './pages/_layouts/app'
import { NotFound } from './pages/404'
import { Home } from './pages/app/home'
import { Menu } from './pages/app/menu'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <AppLayout />,
    errorElement: <NotFound />,
    children: [
      { path: '/:slug', element: <Home /> },
      { path: '/:slug/menu', element: <Menu /> },
      // { path: '/:slug/info', element: <Info /> },
      // { path: '/:slug/sign-in', element: <SignIn /> },
      // { path: '/:slug/sign-up', element: <SignUp /> },
      // { path: '/:slug/cart', element: <Cart /> },
    ],
  },
])
