import { PlusIcon, UserPlusIcon } from 'lucide-react';
import { Button } from '../../atoms/Button';
import { Label } from '../../atoms/Label';
import { Input } from '../../atoms/Input';
import { Avatar, AvatarFallback, AvatarImage } from '../../ui/avatar';
import { Popover, PopoverContent, PopoverTrigger } from '../../ui/popover';
import type { DialogInviteUserProps } from '../../../types/avatar-group-type';

const friends = [
  {
    src: 'https://cdn.shadcnstudio.com/ss-assets/avatar/avatar-1.png',
    fallback: 'CP',
    name: 'Cristofer Press',
    mail: 'cristoferpress@gmail.com',
    first_name: 'Cristofer',
    last_name: 'Press',
    avatarUrl: 'https://cdn.shadcnstudio.com/ss-assets/avatar/avatar-1.png',
  },
];

const DialogInviteUser = ({ onSelectUser }: DialogInviteUserProps) => {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline">
          <PlusIcon size={16} />
          Invite
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[360px] p-4">
        <form className="flex gap-4 flex-col">
          <div className="grid gap-2">
            <Label htmlFor="email">Email</Label>
            <Input
              type="email"
              id="email"
              name="email"
              placeholder="example@gmail.com"
              required
            />
          </div>
          <Button type="submit">Send Invite</Button>
        </form>
        <p className="mt-4 text-sm font-medium">Invite Friends</p>
        <ul className="space-y-3 mt-2 max-h-48 overflow-y-auto pr-2">
          {friends.map((item, index) => (
            <li key={index} className="flex items-center justify-between gap-3">
              <div className="flex items-center gap-3 max-[420px]:w-50">
                <Avatar className="size-9">
                  <AvatarImage src={item.src} alt={item.name} />
                  <AvatarFallback className="text-xs">
                    {item.fallback}
                  </AvatarFallback>
                </Avatar>
                <div className="flex flex-1 flex-col overflow-hidden">
                  <span className="text-sm">{item.name}</span>
                  <span className="text-muted-foreground truncate text-xs">
                    {item.mail}
                  </span>
                </div>
              </div>
              <Button
                size="sm"
                onClick={() =>
                  onSelectUser({
                    firstname: item.first_name,
                    lastname: item.last_name,
                    email: item.mail,
                    avatarUrl: item.avatarUrl,
                  })
                }
              >
                <UserPlusIcon size={14} />
              </Button>
            </li>
          ))}
        </ul>
      </PopoverContent>
    </Popover>
  );
};

export default DialogInviteUser;
