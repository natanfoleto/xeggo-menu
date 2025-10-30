import { ModeToggle } from '@/components/theme-toggle'

export function Header() {
  return (
    <div className="flex items-center justify-between border-b p-4">
      <span className="font-medium">xeggo</span>
      <ModeToggle />
    </div>
  )
}
