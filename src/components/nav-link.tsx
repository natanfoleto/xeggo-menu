import type { ComponentProps } from 'react'
import { Link, useLocation } from 'react-router-dom'

import { useRestaurant } from '@/contexts/restaurant-context'
import { cn } from '@/lib/utils'

export interface NavLinkProps extends ComponentProps<typeof Link> {
  disabled?: boolean
  disablePrefix?: boolean
}

export function NavLink({
  disabled = false,
  disablePrefix = false,
  className,
  to,
  ...props
}: NavLinkProps) {
  const { pathname } = useLocation()
  const { slug } = useRestaurant()

  const linkTo = disablePrefix ? to : `/${slug}${to}`

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (disabled) {
      e.preventDefault()
      return
    }

    props.onClick?.(e)
  }

  return (
    <Link
      {...props}
      to={linkTo}
      onClick={handleClick}
      data-current={pathname === linkTo}
      data-disabled={disabled}
      className={cn(
        'hover:text-foreground data-[current=true]:text-foreground text-muted-foreground flex cursor-pointer items-center gap-1.5 text-sm transition-colors',
        disabled && 'pointer-events-none cursor-not-allowed opacity-50',
        className,
      )}
      aria-disabled={disabled}
      tabIndex={disabled ? -1 : undefined}
    />
  )
}
