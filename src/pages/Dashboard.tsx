import { Card } from "../components/atoms/Card";

export default function Dashboard() {
  return (
    <div className="py-12">
      <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
        <Card className="overflow-hidden shadow-sm sm:rounded-lg">
          <div className="p-6 text-foreground">You're logged in!</div>
        </Card>
      </div>
    </div>
  );
}
