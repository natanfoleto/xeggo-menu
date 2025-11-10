import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { getInitialsName } from '@/utils/get-initials-name'

interface ProfileInfoProps {
  user: {
    name: string
    email: string
  }
}

export function ProfileInfo({ user }: ProfileInfoProps) {
  return (
    <div className="flex flex-col items-center gap-3 p-6">
      <Avatar className="size-20">
        <AvatarFallback className="text-muted-foreground text-sm font-medium">
          {getInitialsName(user.name)}
        </AvatarFallback>
      </Avatar>

      <div className="text-center">
        <h2>{user.name}</h2>
        <p className="text-muted-foreground text-sm">{user.email}</p>
      </div>
    </div>
  )
}
