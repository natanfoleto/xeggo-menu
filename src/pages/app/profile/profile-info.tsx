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
    <div className="flex flex-col items-center gap-2 p-4">
      <Avatar className="size-16">
        <AvatarFallback className="text-muted-foreground font-medium">
          {getInitialsName(user.name)}
        </AvatarFallback>
      </Avatar>

      <div className="text-center">
        <p>{user.name}</p>
        <p className="text-muted-foreground text-sm">{user.email}</p>
      </div>
    </div>
  )
}
