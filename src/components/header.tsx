import { UserRound } from 'lucide-react'

import { AccountMenu } from '@/components/account-menu'
import { ModeToggle } from '@/components/theme-toggle'
import { Button } from '@/components/ui/button'
import { useAuth } from '@/contexts/auth-context'

import { LogoIcon } from './icon/logo-icon'
import { NavLink } from './nav-link'

export function Header() {
  const { isAuthenticated } = useAuth()

  return (
    <div className="flex items-center justify-between border-b p-4">
      <NavLink to="/" className="text-foreground" disablePrefix>
        <LogoIcon className="text-foreground size-8" />
        <span className="font-semibold">xeggo</span>
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
