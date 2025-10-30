import { NavLink } from './nav-link'

export function Branding() {
  return (
    <footer className="text-center">
      <NavLink
        to="/"
        disablePrefix
        className="text-foreground text-lg font-semibold"
      >
        xeggo
      </NavLink>
    </footer>
  )
}
