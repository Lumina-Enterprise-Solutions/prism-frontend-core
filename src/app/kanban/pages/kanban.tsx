import { Button } from '../../../components/atoms/Button';
import { Card, CardContent, CardTitle } from '../../../components/atoms/Card';

export default function KanbanPage() {
  return (
    <div className="mx-auto w-full h-full sm:px-4 lg:px-6 py-4">
      <Card className="overflow-hidden shadow-sm sm:rounded-lg p-6">
        <CardTitle className="pb-4">
          <div className="flex flex-col items-center justify-center">
            <h1 className="text-2xl font-bold uppercase">Kanban</h1>
            <p className="text-sm font-semibold">
              Supervise the distribution of cutting products to each sewing line
              in an easy and structured manner.
            </p>
          </div>
        </CardTitle>
        <CardContent className="border border-muted-foreground/10 rounded-md p-4">
          {/* <div className="flex items-center justify-between p-4">
            <div>
              <Button>Filter</Button>
            </div>
            <div className="gap-2">
              <Button>Edit</Button>
              <Button>Import</Button>
              <Button>Export</Button>
            </div>
          </div> */}
          <div className="flex items-center p-4">
            <p className="text-md font-semibold">Title</p>
          </div>
          <div className="grid grid-flow-col grid-rows gap-4">
            <Card className="p-6 shadow-none border border-muted-foreground/10">
              Card 1
            </Card>
            <Card className="p-6 shadow-none border border-muted-foreground/10">
              Card 1
            </Card>
            <Card className="p-6 shadow-none border border-muted-foreground/10">
              Card 1
            </Card>
            <Card className="p-6 shadow-none border border-muted-foreground/10">
              Card 1
            </Card>
            <Card className="p-6 shadow-none border border-muted-foreground/10">
              Card 1
            </Card>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
