import { Activity, TrendingUp } from 'lucide-react';
import { Card } from '../components/atoms/Card';
import { Separator } from '../components/ui/separator';
import { ChartAreaInteractive } from '../components/molecules/ChartAreaInteractive';
import { useEffect } from 'react';
import { useTour } from '@reactour/tour';

export default function Dashboard() {
  const { setIsOpen } = useTour();

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
        <div className="px-10 pt-4 gap-1">
          <h1 className="text-foreground text-3xl font-semibold tour-welcome">
            Hello, <span className="font-normal">John Doe</span>
          </h1>
          <p className="text-muted-foreground text-sm font-light">
            Track your businesse and peformance of your stategy
          </p>
        </div>
        <div className="flex items-center justify-center tour-product-overview">
          <div className="grid grid-cols-1 gap-4 sm:p-2 md:p-6 w-4xl">
            <Separator />
            <div className="px-4 flex items-center space-x-4 justify-center">
              <div className="p-4 rounded-lg flex items-center gap-2">
                <div className="relative flex h-10 w-10 shrink-0 overflow-hidden rounded-full">
                  <div className="flex h-full w-full items-center justify-center rounded-full bg-muted shadow-2xl text-muted-foreground">
                    <Activity className="w-4 h-4" />
                  </div>
                </div>
                <div className="flex flex-col">
                  <h1 className="text-foreground text-md font-semibold">
                    Product overview
                  </h1>
                  <div className="flex flex-row items-center">
                    <p className="text-muted-foreground text-sm">25 products</p>
                    <div className="flex flex-row text-growth-green ml-2 gap-1">
                      <p className="text-xs">28+</p>
                      <TrendingUp className="w-3 h-3" />
                    </div>
                  </div>
                </div>
              </div>
              <Separator orientation="vertical" />
              <div className="p-4 rounded-lg flex items-center gap-2">
                <div className="relative flex h-10 w-10 shrink-0 overflow-hidden rounded-full">
                  <div className="flex h-full w-full items-center justify-center rounded-full bg-muted shadow-2xl text-muted-foreground">
                    <Activity className="w-4 h-4" />
                  </div>
                </div>
                <div className="flex flex-col">
                  <h1 className="text-foreground text-md font-semibold">
                    Product overview
                  </h1>
                  <div className="flex flex-row items-center">
                    <p className="text-muted-foreground text-sm">25 products</p>
                    <div className="flex flex-row text-growth-green ml-2 gap-1">
                      <p className="text-xs">28+</p>
                      <TrendingUp className="w-3 h-3" />
                    </div>
                  </div>
                </div>
              </div>
              <Separator orientation="vertical" />
              <div className="p-4 rounded-lg flex items-center gap-2">
                <div className="relative flex h-10 w-10 shrink-0 overflow-hidden rounded-full">
                  <div className="flex h-full w-full items-center justify-center rounded-full bg-muted shadow-2xl text-muted-foreground">
                    <Activity className="w-4 h-4" />
                  </div>
                </div>
                <div className="flex flex-col">
                  <h1 className="text-foreground text-md font-semibold">
                    Product overview
                  </h1>
                  <div className="flex flex-row items-center">
                    <p className="text-muted-foreground text-sm">25 products</p>
                    <div className="flex flex-row text-growth-green ml-2 gap-1">
                      <p className="text-xs">28+</p>
                      <TrendingUp className="w-3 h-3" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <Separator />
          </div>
        </div>
        <div className="tour-chart">
          <ChartAreaInteractive />
        </div>
      </Card>
    </div>
  );
}
