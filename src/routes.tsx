import { createBrowserRouter } from 'react-router-dom'

import { AppLayout } from './pages/_layouts/app'
import { ProtectedLayout } from './pages/_layouts/protected'
import { NotFound } from './pages/404'
import { Bag } from './pages/app/bag'
import { Category } from './pages/app/category'
import { Checkout } from './pages/app/checkout'
import { Home } from './pages/app/home'
import { Menu } from './pages/app/menu'
import { Product } from './pages/app/product'
import { Profile } from './pages/app/profile'
import { ProfileAddress } from './pages/app/profile-address'
import { ProfileData } from './pages/app/profile-data'
import { ProfileOrders } from './pages/app/profile-orders'
import { ProfileSaveAddress } from './pages/app/profile-save-address'
import { Restaurant } from './pages/app/restaurant'
import { Search } from './pages/app/search'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <AppLayout />,
    errorElement: <NotFound />,
    children: [
      { path: '/:slug', element: <Home /> },
      { path: '/:slug/menu', element: <Menu /> },
      { path: '/:slug/info', element: <Restaurant /> },
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
        path: '/:slug/profile/data',
        element: (
          <ProtectedLayout>
            <ProfileData />
          </ProtectedLayout>
        ),
      },
      {
        path: '/:slug/profile/address',
        element: (
          <ProtectedLayout>
            <ProfileAddress />
          </ProtectedLayout>
        ),
      },
      {
        path: '/:slug/profile/address/save',
        element: (
          <ProtectedLayout>
            <ProfileSaveAddress />
          </ProtectedLayout>
        ),
      },
      {
        path: '/:slug/profile/orders',
        element: (
          <ProtectedLayout>
            <ProfileOrders />
          </ProtectedLayout>
        ),
      },
    ],
  },
])
