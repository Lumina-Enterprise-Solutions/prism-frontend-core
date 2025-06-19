'use client';
import * as React from 'react';
import { ChevronsUpDown } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from '../../ui/dropdown-menu';
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from '../../ui/sidebar';
export function TeamSwitcher({
  departments,
}: {
  departments: {
    name: string;
    logo: React.ElementType;
    plan: string;
    url: string;
  }[];
}) {
  const { isMobile } = useSidebar();
  const [activeTeam, setActiveTeam] = React.useState(departments[0]);
  if (!activeTeam) {
    return null;
  }
  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton
              size="lg"
              className="data-[state=open]:text-foreground text-foreground hover:text-foreground hover:bg-muted/30"
            >
              <div className="flex aspect-square size-8 items-center justify-center rounded-lg border-none bg-card shadow-sm hover:bg-muted/30 duration-200 hover:shadow-md">
                <activeTeam.logo className="size-4" />
              </div>
              <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-semibold text-sidebar-foreground">
                  {activeTeam.name}
                </span>
                <span className="truncate text-xs text-sidebar-foreground">
                  {activeTeam.plan}
                </span>
              </div>
              {/* <ChevronsUpDown className="h-4 w-4" /> */}
            </SidebarMenuButton>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg text-sidebar-foreground"
            align="start"
            side={isMobile ? 'bottom' : 'right'}
            sideOffset={4}
          >
            <DropdownMenuLabel className="text-xs text-muted-foreground">
              Department
            </DropdownMenuLabel>
            {departments.map((department, index) => (
              <DropdownMenuItem
                key={department.name}
                onClick={() => setActiveTeam(department)}
                className="gap-2 p-2 hover:bg-muted focus:bg-muted focus:text-foreground"
              >
                <a
                  href={department.url}
                  className="flex items-center justify-center space-x-2"
                >
                  <div className="size-4 rounded-sm">
                    <department.logo className="size-4 shrink-0" />
                  </div>
                  <p>{department.name}</p>
                </a>
                <DropdownMenuShortcut>⌘{index + 1}</DropdownMenuShortcut>
              </DropdownMenuItem>
            ))}
            <DropdownMenuSeparator />
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
