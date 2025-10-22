import { createBrowserRouter } from 'react-router-dom'

import { AppLayout } from './pages/_layouts/app'
import { NotFound } from './pages/404'
import { Category } from './pages/app/category/category'
import { Home } from './pages/app/home/home'
import { Info } from './pages/app/info/info'
import { Menu } from './pages/app/menu/menu'
import { Search } from './pages/app/search/search'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <AppLayout />,
    errorElement: <NotFound />,
    children: [
      { path: '/:slug', element: <Home /> },
      { path: '/:slug/menu', element: <Menu /> },
      { path: '/:slug/info', element: <Info /> },
      { path: '/:slug/search', element: <Search /> },
      { path: '/:slug/category/:id', element: <Category /> },
    ],
  },
])
