import { createBrowserRouter } from 'react-router-dom'

import { About } from './pages/app/about'
import { Address } from './pages/app/address'
import { Bag } from './pages/app/bag'
import { Category } from './pages/app/category'
import { Checkout } from './pages/app/checkout'
import { Customer } from './pages/app/customer'
import { Home } from './pages/app/home'
import { Menu } from './pages/app/menu'
import { Orders } from './pages/app/orders'
import { Product } from './pages/app/product'
import { Profile } from './pages/app/profile'
import { Restaurant } from './pages/app/restaurant'
import { SaveAddress } from './pages/app/save-address'
import { Search } from './pages/app/search'
import { AppLayout } from './pages/layouts/app'
import { RestaurantLayout } from './pages/layouts/restaurant'
import { RootLayout } from './pages/layouts/root'
import { SafeAppLayout } from './pages/layouts/safe-app'
import { SafeRestaurantLayout } from './pages/layouts/safe-restaurant'
import { NotFound } from './pages/not-found'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    errorElement: <NotFound />,
    children: [
      {
        path: '',
        element: <AppLayout />,
        children: [
          { index: true, element: <Home /> },
          {
            path: 'profile',
            element: (
              <SafeAppLayout>
                <Profile />
              </SafeAppLayout>
            ),
          },
          {
            path: 'customer',
            element: (
              <SafeAppLayout>
                <Customer />
              </SafeAppLayout>
            ),
          },
          {
            path: 'address',
            element: (
              <SafeAppLayout>
                <Address />
              </SafeAppLayout>
            ),
          },
          {
            path: 'address/save',
            element: (
              <SafeAppLayout>
                <SaveAddress />
              </SafeAppLayout>
            ),
          },
          {
            path: 'orders',
            element: (
              <SafeAppLayout>
                <Orders />
              </SafeAppLayout>
            ),
          },
        ],
      },
      {
        path: ':slug',
        element: <RestaurantLayout />,
        children: [
          { index: true, element: <Restaurant /> },
          { path: 'menu', element: <Menu /> },
          { path: 'about', element: <About /> },
          { path: 'search', element: <Search /> },
          { path: 'category/:id', element: <Category /> },
          { path: 'product/:id', element: <Product /> },
          {
            path: 'bag',
            element: (
              <SafeRestaurantLayout requireOpen>
                <Bag />
              </SafeRestaurantLayout>
            ),
          },
          {
            path: 'checkout',
            element: (
              <SafeRestaurantLayout requireOpen>
                <Checkout />
              </SafeRestaurantLayout>
            ),
          },
        ],
      },
    ],
  },
])
