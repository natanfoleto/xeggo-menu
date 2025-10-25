import type { ComponentProps } from 'react'
import { Link, useLocation } from 'react-router-dom'

import { useRestaurant } from '@/contexts/restaurant-context'
import { cn } from '@/lib/utils'

export interface NavLinkProps extends ComponentProps<typeof Link> {
  disablePrefix?: boolean
}

export function NavLink({
  disablePrefix = false,
  className,
  to,
  ...props
}: NavLinkProps) {
  const { pathname } = useLocation()
  const { slug } = useRestaurant()

  const linkTo = disablePrefix ? to : `/${slug}${to}`

  return (
    <Link
      {...props}
      to={linkTo}
      data-current={pathname === linkTo}
      className={cn(
        'hover:text-foreground data-[current=true]:text-foreground text-muted-foreground flex cursor-pointer items-center gap-1.5 text-sm transition-colors',
        className,
      )}
    />
  )
}
