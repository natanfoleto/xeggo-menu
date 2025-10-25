import type { ComponentProps } from 'react'
import { Link, useLocation } from 'react-router-dom'

import { useRestaurant } from '@/contexts/restaurant-context'

export interface NavLinkProps extends ComponentProps<typeof Link> {
  disablePrefix?: boolean
}

export function NavLink({ disablePrefix = false, to, ...props }: NavLinkProps) {
  const { pathname } = useLocation()
  const { slug } = useRestaurant()

  const linkTo = disablePrefix ? to : `/${slug}${to}`

  return (
    <Link
      {...props}
      to={linkTo}
      data-current={pathname === linkTo}
      className="text-muted-foreground hover:text-foreground data-[current=true]:text-foreground flex cursor-pointer items-center gap-1.5 text-sm font-medium transition-colors"
    />
  )
}
