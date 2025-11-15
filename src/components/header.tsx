import { UserRound } from 'lucide-react'

import { AccountMenu } from '@/components/account-menu'
import { ModeToggle } from '@/components/theme-toggle'
import { Button } from '@/components/ui/button'
import { useAuth } from '@/contexts/auth-context'

import { BrandIcon } from './icon/brand-icon'
import { NavLink } from './nav-link'

export function Header() {
  const { isAuthenticated } = useAuth()

  return (
    <div className="flex items-center justify-between border-b p-4">
      <NavLink
        to="/"
        className="text-foreground rounded-lg bg-violet-500 p-2"
        disablePrefix
      >
        <BrandIcon className="size-6 fill-white" />
      </NavLink>

      <div className="flex items-center gap-2">
        <ModeToggle />

        {isAuthenticated ? (
          <AccountMenu />
        ) : (
          <NavLink to="/auth" className="text-foreground" disablePrefix>
            <Button
              variant="outline"
              size="icon"
              className="not-dark:border-muted-foreground flex items-center gap-2 select-none"
            >
              <UserRound className="size-4" />
            </Button>
          </NavLink>
        )}
      </div>
    </div>
  )
}
