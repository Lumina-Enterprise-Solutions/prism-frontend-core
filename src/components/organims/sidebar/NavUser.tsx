'use client';

import {
  BadgeCheck,
  Bell,
  ChevronsUpDown,
  CreditCard,
  LogOut,
  Sparkles,
} from 'lucide-react';
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from '../../ui/sidebar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '../../ui/dropdown-menu';
import { Avatar, AvatarFallback, AvatarImage } from '../../atoms/Avatar';
import { Link, useNavigate } from 'react-router-dom';
import { useLogout } from '../../../features/auth/useAuth';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import { logout } from '../../../store/slices/auth';

export function NavUser({
  user,
}: {
  user: {
    name: string;
    email: string;
    avatar: string;
  };
}) {
  const { isMobile } = useSidebar();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { mutate: logoutMutation } = useLogout();

  const onLogout = async () => {
    try {
      await logoutMutation();
      dispatch(logout());
      navigate("/login");
    } catch (error) {
      console.error(error)
      toast.error("Something went wrong");
    }
  }

  return (
    <SidebarMenu className="text-sidebar-foreground">
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton
              size="lg"
              className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
            >
              <Avatar className="h-8 w-8 rounded-lg">
                <AvatarImage
                  // src={user.avatar}
                  alt={user.name}
                />
                <AvatarFallback className="rounded-lg">CN</AvatarFallback>
              </Avatar>
              <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-semibold">{user.name}</span>
                <span className="truncate text-xs">{user.email}</span>
              </div>
              <ChevronsUpDown className="ml-auto size-4" />
            </SidebarMenuButton>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg"
            side={isMobile ? 'bottom' : 'right'}
            align="end"
            sideOffset={4}
          >
            <DropdownMenuLabel className="p-0 font-normal">
              <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                <Avatar className="h-8 w-8 rounded-lg">
                  <AvatarImage
                    // src={user.avatar}
                    alt={user.name}
                  />
                  <AvatarFallback className="rounded-lg text-primary-foreground">
                    CN
                  </AvatarFallback>
                </Avatar>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-semibold text-sidebar-foreground">
                    {user.name}
                  </span>
                  <span className="truncate text-xs text-sidebar-foreground">
                    {user.email}
                  </span>
                </div>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <DropdownMenuItem className="text-sidebar-foreground">
                <Sparkles />
                Upgrade to Pro
              </DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <DropdownMenuItem className="text-sidebar-foreground">
                <BadgeCheck />
                <Link to="#">Account</Link>
              </DropdownMenuItem>
              <DropdownMenuItem className="text-sidebar-foreground">
                <CreditCard />
                <Link to="#">Billing</Link>
              </DropdownMenuItem>
              <DropdownMenuItem className="text-sidebar-foreground">
                <Bell />
                Notifications
              </DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={onLogout} className="text-sidebar-foreground">
              <LogOut />
              <Link to="#">Log out</Link>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
