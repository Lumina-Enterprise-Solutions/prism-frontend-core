import type { PropsWithChildren } from 'react';
import { LanguangeToggle } from '../../../components/atoms/LanguangeToggle';
import { DarkModeToggle } from '../../../components/atoms/DarkModeToggle';
import { TeamSwitcher } from '../../../components/organims/sidebar/TeamSwitcher';
import { data } from '../../../helper/constant/team-constant';
import { Outlet } from 'react-router-dom';
import { SidebarProvider } from '../../../components/ui/sidebar';
import logoFull from '../../../assets/images/logo/Prism_with_text.png';

export default function KanbanLayout({
  header,
}: PropsWithChildren<{ header: string }>) {
  return (
    <SidebarProvider>
      <div className="bg-background relative flex w-full flex-1 flex-col">
        <header className="flex h-16 w-full shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12 bg-card">
          <div className="flex w-full items-center justify-between px-10">
            <div>
              <img src={logoFull} className="h-10" />
            </div>
            <div className="flex items-center gap-2">
              <div className="gap-2 flex items-center">
                <div className="gap-2 flex items-center">
                  <LanguangeToggle />
                  <DarkModeToggle />
                </div>
                <TeamSwitcher departments={data.department} />
              </div>
            </div>
          </div>
        </header>
        <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
          {header && <div className="p-4">{header}</div>}
          <main>
            <Outlet />
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
}
