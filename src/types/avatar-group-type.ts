export type AvatarGroupType = {
    firstname: string;
    lastname: string;
    email: string;
    avatarUrl: string;
  };
  
export  type DialogInviteUserProps = {
    onSelectUser: (user: AvatarGroupType) => void;
  };