import * as React from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { cn } from '../../utils/utils';
import { AvatarUser } from './Avatar';

type AvatarProps = React.ComponentProps<typeof Avatar>;

interface AvatarGroupProps extends React.ComponentProps<'div'> {
  children: React.ReactElement<AvatarProps>[];
  max?: number;
}

const AvatarGroup = ({
  children,
  max,
  className,
  ...props
}: AvatarGroupProps) => {
  const totalAvatars = React.Children.count(children);
  const displayedAvatars = React.Children.toArray(children)
    .slice(0, max)
    .reverse();
  const remainingAvatars = max ? Math.max(totalAvatars - max, 1) : 0;
  return (
    <div
      className={cn('flex items-center flex-row-reverse', className)}
      {...props}
    >
      {remainingAvatars > 0 && (
        <Avatar className="-ml-2 hover:z-10 relative ring-2 ring-background h-6 w-6">
          <AvatarFallback className="bg-muted-foreground text-white text-sm">
            +{remainingAvatars}
          </AvatarFallback>
        </Avatar>
      )}
      {displayedAvatars.map((avatar, index) => {
        if (!React.isValidElement<AvatarProps>(avatar)) return null;
        return (
          <div key={index} className="-ml-2 hover:z-10 relative">
            {React.cloneElement(avatar, {
              className: cn(avatar.props.className, 'ring-2 ring-background'),
            })}
          </div>
        );
      })}
    </div>
  );
};

interface AvatarGroupMaxAvatarProps {
  avatars: {
    first_name: string;
    last_name: string;
    email: string;
    avatarUrl: string;
  }[];
}

export default function AvatarGroupMaxAvatar({
  avatars,
}: AvatarGroupMaxAvatarProps) {
  return (
    <AvatarGroup className="flex items-center" max={3}>
      {avatars.map((user, index) => (
        <Avatar key={index} className="-ml-2 first:ml-0 cursor-pointer h-6 w-6">
          <AvatarImage
            src={user.avatarUrl}
            alt={user.first_name}
            onError={(e) => {
              e.currentTarget.src =
                'https://cdn.shadcnstudio.com/ss-assets/avatar/avatar-3.png';
            }}
          />
          <AvatarFallback className="bg-gradient-to-r from-primary/70 to-primary text-primary-foreground font-semibold text-xs">
            <AvatarUser firstname={user.first_name} lastname={user.last_name} />
          </AvatarFallback>
        </Avatar>
      ))}
    </AvatarGroup>
  );
}
