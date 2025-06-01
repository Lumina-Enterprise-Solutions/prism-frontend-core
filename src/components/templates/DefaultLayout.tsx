import { capitalize } from '../atoms/Breadcrumb';
import { useLocation } from 'react-router-dom';
import { SidebarInset, SidebarProvider, SidebarTrigger } from '../ui/sidebar';
import type { PropsWithChildren, ReactNode } from 'react';
import { AppSidebar } from '../organims/sidebar/AppSidebar';
import { Separator } from '../ui/separator';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
} from '../ui/breadcrumb';
import { Outlet } from 'react-router-dom';

export default function DefaultLayout({
  header,
}: PropsWithChildren<{
  header?: ReactNode;
}>) {
  const location = useLocation();
  const pathnames = location.pathname.split('/').filter((x) => x);

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
          <div className="flex items-center gap-2 px-4">
            <SidebarTrigger className="-ml-1 text-foreground" />
            <Separator orientation="vertical" className="mr-2 h-4" />
            <Breadcrumb>
              <BreadcrumbList>
                {pathnames.map((value, index) => {
                  const to = `/${pathnames.slice(0, index + 1).join('/')}`;
                  const isLast = index === pathnames.length - 1;

                  return (
                    <BreadcrumbItem key={to}>
                      {isLast ? (
                        <BreadcrumbPage>{capitalize(value)}</BreadcrumbPage>
                      ) : (
                        <BreadcrumbLink href={to}>
                          {capitalize(value)}
                        </BreadcrumbLink>
                      )}
                    </BreadcrumbItem>
                  );
                })}
              </BreadcrumbList>
            </Breadcrumb>
          </div>
        </header>
        <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
          {header && <div className="p-4">{header}</div>}
          <main>
            <Outlet />
          </main>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
