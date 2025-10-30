import { createBrowserRouter } from 'react-router-dom'

import { Address } from './pages/app/address'
import { Auth } from './pages/app/auth'
import { Customer } from './pages/app/customer'
import { Home } from './pages/app/home'
import { Orders } from './pages/app/orders'
import { Profile } from './pages/app/profile'
import { SaveAddress } from './pages/app/save-address'
import { AppLayout } from './pages/layouts/app'
import { RestaurantLayout } from './pages/layouts/restaurant'
import { RootLayout } from './pages/layouts/root'
import { SafeAppLayout } from './pages/layouts/safe-app'
import { SafeRestaurantLayout } from './pages/layouts/safe-restaurant'
import { NotFound } from './pages/not-found'
import { About } from './pages/restaurants/about'
import { Bag } from './pages/restaurants/bag'
import { Category } from './pages/restaurants/category'
import { Checkout } from './pages/restaurants/checkout'
import { Menu } from './pages/restaurants/menu'
import { Product } from './pages/restaurants/product'
import { Restaurant } from './pages/restaurants/restaurant'
import { Search } from './pages/restaurants/search'

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
          { path: 'auth', element: <Auth /> },
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
