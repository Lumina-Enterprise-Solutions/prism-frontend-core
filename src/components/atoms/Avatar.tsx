import { Avatar, AvatarFallback } from '../ui/avatar';

export function AvatarUser({
  firstname,
  lastname,
}: {
  firstname: string;
  lastname: string;
}) {
  const initials = `${firstname?.[0] ?? ''}${
    lastname?.[0] ?? ''
  }`.toUpperCase();
  return (
    <Avatar>
      <AvatarFallback className="bg-gradient-to-r from-primary/70 to-primary text-primary-foreground font-semibold">
        {initials}
      </AvatarFallback>
    </Avatar>
  );
}
