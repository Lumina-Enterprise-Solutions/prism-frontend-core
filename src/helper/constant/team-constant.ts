import { LayoutDashboard, RouteIcon, Scissors, SquareKanban, Warehouse } from "lucide-react";

export const data = {
    department: [
      {
        name: 'Dashboard',
        logo: LayoutDashboard,
        plan: 'Enterprise',
        url: '/dashboard'
      },
      {
        name: 'Cutting',
        logo: Scissors,
        plan: 'Department',
        url: '#'
      },
      {
        name: 'Warehouse',
        logo: Warehouse,
        plan: 'Department',
        url: '#'
      },
      {
        name: 'PMC',
        logo: RouteIcon,
        plan: 'Department',
        url: '#'
      },
      {
        name: 'Kanban',
        logo: SquareKanban,
        plan: 'Enterprise',
        url: '/kanban/board'
      },
    ],
  };