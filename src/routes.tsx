import { createBrowserRouter } from 'react-router-dom'

import { AppLayout } from './pages/_layouts/app'
import { ProtectedLayout } from './pages/_layouts/protected'
import { NotFound } from './pages/404'
import { Address } from './pages/app/address/address'
import { Bag } from './pages/app/bag/bag'
import { Category } from './pages/app/category/category'
import { Checkout } from './pages/app/checkout/checkout'
import { Home } from './pages/app/home/home'
import { Info } from './pages/app/info/info'
import { Menu } from './pages/app/menu/menu'
import { Product } from './pages/app/product/product'
import { Profile } from './pages/app/profile/profile'
import { SaveAddress } from './pages/app/save-address/save-address'
import { Search } from './pages/app/search/search'
import { UpdateProfile } from './pages/app/update-profile/update-profile'

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
      { path: '/:slug/product/:id', element: <Product /> },
      {
        path: '/:slug/bag',
        element: (
          <ProtectedLayout requireOpen>
            <Bag />
          </ProtectedLayout>
        ),
      },
      {
        path: '/:slug/checkout',
        element: (
          <ProtectedLayout requireOpen>
            <Checkout />
          </ProtectedLayout>
        ),
      },
      {
        path: '/:slug/profile',
        element: (
          <ProtectedLayout>
            <Profile />
          </ProtectedLayout>
        ),
      },
      {
        path: '/:slug/profile/update',
        element: (
          <ProtectedLayout>
            <UpdateProfile />
          </ProtectedLayout>
        ),
      },
      {
        path: '/:slug/address',
        element: (
          <ProtectedLayout>
            <Address />
          </ProtectedLayout>
        ),
      },
      {
        path: '/:slug/address/save',
        element: (
          <ProtectedLayout>
            <SaveAddress />
          </ProtectedLayout>
        ),
      },
    ],
  },
])
