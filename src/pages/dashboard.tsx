import { Card } from '../components/atoms/Card';
import { useEffect } from 'react';
import { useTour } from '@reactour/tour';
import { useTitle } from '../hooks/services/use-title';
import { Tabs, TabsContent, TabsTrigger } from '../components/ui/tab';
import { TabsList } from '@radix-ui/react-tabs';
import { tabs } from '../helper/mock/tab-dashboard';
import DashboardTemplate from '../components/templates/Dashboard/DashboardTemplate';
import EventCalendarTemplate from '../components/templates/Dashboard/EventCalendarTemplate';
import { KanbanBoard } from '../components/templates/Dashboard/KanbanBoardTemplate';

export default function Dashboard() {
  const { setIsOpen } = useTour();
  useTitle('Dashboard - Prism');

  useEffect(() => {
    const hasSeenDashboardTour = localStorage.getItem('hasSeenDashboardTour');
    if (!hasSeenDashboardTour) {
      setIsOpen(true);
      localStorage.setItem('hasSeenDashboardTour', 'true');
    }
  }, [setIsOpen]);

  return (
    <div className="mx-auto w-full h-full sm:px-4 lg:px-6">
      <Card className="overflow-hidden shadow-sm sm:rounded-lg">
        <Tabs defaultValue="dashboard">
          <div className="flex justify-between">
            <div className="px-10 py-4 gap-1">
              <h1 className="text-foreground text-3xl font-semibold tour-welcome">
                Hello, <span className="font-normal">John Doe</span>
              </h1>
              <p className="text-muted-foreground text-sm font-light">
                Track your businesse and peformance of your stategy
              </p>
            </div>
            <div className="px-10 pt-4 gap-1">
              <TabsList className="w-full p-0 bg-muted/10 justify-start rounded-none">
                {tabs.map((tab) => (
                  <TabsTrigger
                    key={tab.value}
                    value={tab.value}
                    className="rounded-md bg-muted/20 h-full data-[state=active]:shadow-none border-b-2 border-muted/10 data-[state=active]:border-muted-foreground/50 data-[state=active]:bg-muted-10 data-[state=active]:font-semibold"
                  >
                    <p className="text-sm">{tab.name}</p>
                  </TabsTrigger>
                ))}
              </TabsList>
            </div>
          </div>
          <TabsContent value="dashboard">
            <DashboardTemplate />
          </TabsContent>
          <TabsContent value="calendar">
            <div className="p-4">
              <EventCalendarTemplate />
            </div>
          </TabsContent>
          <TabsContent value="kanban">
            <div className="p-4">
              <KanbanBoard />
            </div>
          </TabsContent>
        </Tabs>
      </Card>
    </div>
  );
}
