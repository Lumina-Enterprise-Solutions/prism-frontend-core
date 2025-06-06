import type { Task } from "../../components/molecules/kanban-board/task-card";

export const initialTasks: Task[] = [
  {
    id: 'task1',
    columnId: 'done',
    title: 'Project Setup',
    description: 'Project initiation and planning',
    date: '2023-10-10',
    priority: 'High',
    assignedTo: [
      {
        first_name: 'Alice',
        last_name: 'Johnson',
        email: 'alice.johnson@example.com',
        avatarUrl: 'https://github.com/leerob.png',
      },
      {
        first_name: 'Niaj',
        last_name: 'Adams',
        email: 'niaj.adams@example.com',
        avatarUrl: '/avatars/niaj.png',
      },
      {
        first_name: 'Olivia',
        last_name: 'Clark',
        email: 'olivia.clark@example.com',
        avatarUrl: '/avatars/olivia.png',
      },
    ],
  },
  {
    id: 'task2',
    columnId: 'done',
    title: 'Requirements Gathering',
    description: 'Gather requirements from stakeholders',
    priority: 'Medium',
    assignedTo: [
      {
        first_name: 'Bob',
        last_name: 'Smith',
        email: 'bob.smith@example.com',
        avatarUrl: 'https://github.com/evilrabbit.png',
      },
      {
        first_name: 'Carol',
        last_name: 'Danvers',
        email: 'carol.danvers@example.com',
        avatarUrl: '/avatars/carol.png',
      },
    ],
  },
  {
    id: 'task3',
    columnId: 'done',
    title: 'UI Mockups',
    description: 'Create wireframes and mockups',
    priority: 'Low',
    assignedTo: [
      {
        first_name: 'Niaj',
        last_name: 'Adams',
        email: 'niaj.adams@example.com',
        avatarUrl: '/avatars/niaj.png',
      },
      {
        first_name: 'Olivia',
        last_name: 'Clark',
        email: 'olivia.clark@example.com',
        avatarUrl: '/avatars/olivia.png',
      },
    ],
  },
  {
    id: 'task4',
    columnId: 'in-progress',
    title: 'Homepage Layout',
    description: 'Develop homepage layout',
    priority: 'Medium',
    assignedTo: [
      {
        first_name: 'David',
        last_name: 'Lee',
        email: 'david.lee@example.com',
        avatarUrl: '/avatars/david.png',
      },
      {
        first_name: 'Eve',
        last_name: 'Miller',
        email: 'eve.miller@example.com',
        avatarUrl: '/avatars/eve.png',
      },
    ],
  },
  {
    id: 'task5',
    columnId: 'in-progress',
    title: 'Design System',
    description: 'Design color scheme and typography',
    priority: 'High',
    assignedTo: [
      {
        first_name: 'Eve',
        last_name: 'Miller',
        email: 'eve.miller@example.com',
        avatarUrl: '/avatars/eve.png',
      },
      {
        first_name: 'Frank',
        last_name: 'White',
        email: 'frank.white@example.com',
        avatarUrl: '/avatars/frank.png',
      },
    ],
  },
  {
    id: 'task6',
    columnId: 'todo',
    title: 'Authentication',
    description: 'Implement user authentication',
    priority: 'High',
    assignedTo: [
      {
        first_name: 'Grace',
        last_name: 'Brown',
        email: 'grace.brown@example.com',
        avatarUrl: '/avatars/grace.png',
      },{
        first_name: 'Niaj',
        last_name: 'Adams',
        email: 'niaj.adams@example.com',
        avatarUrl: '/avatars/niaj.png',
      },
      {
        first_name: 'Olivia',
        last_name: 'Clark',
        email: 'olivia.clark@example.com',
        avatarUrl: '/avatars/olivia.png',
      },
    ],
  },
  {
    id: 'task7',
    columnId: 'todo',
    title: 'Contact Page',
    description: 'Build contact us page',
    priority: 'Low',
    assignedTo: [
      {
        first_name: 'Niaj',
        last_name: 'Adams',
        email: 'niaj.adams@example.com',
        avatarUrl: '/avatars/niaj.png',
      },
      {
        first_name: 'Olivia',
        last_name: 'Clark',
        email: 'olivia.clark@example.com',
        avatarUrl: '/avatars/olivia.png',
      },
    ],
  },
  {
    id: 'task8',
    columnId: 'todo',
    title: 'Product Catalog',
    description: 'Create product catalog',
    priority: 'Medium',
    assignedTo: [
      {
        first_name: 'Heidi',
        last_name: 'Jones',
        email: 'heidi.jones@example.com',
        avatarUrl: '/avatars/heidi.png',
      },
      {
        first_name: 'Ivan',
        last_name: 'Green',
        email: 'ivan.green@example.com',
        avatarUrl: '/avatars/ivan.png',
      },
    ],
  },
  {
    id: 'task9',
    columnId: 'todo',
    title: 'About Page',
    description: 'Develop about us page',
    priority: 'Low',
    assignedTo: [],
  },
  {
    id: 'task10',
    columnId: 'todo',
    title: 'Mobile Optimization',
    description: 'Optimize website for mobile devices',
    priority: 'High',
    assignedTo: [
      {
        first_name: 'Judy',
        last_name: 'Taylor',
        email: 'judy.taylor@example.com',
        avatarUrl: '/avatars/judy.png',
      },
      {
        first_name: 'Niaj',
        last_name: 'Adams',
        email: 'niaj.adams@example.com',
        avatarUrl: '/avatars/niaj.png',
      },
      {
        first_name: 'Olivia',
        last_name: 'Clark',
        email: 'olivia.clark@example.com',
        avatarUrl: '/avatars/olivia.png',
      },
    ],
  },
  {
    id: 'task11',
    columnId: 'todo',
    title: 'Payment Integration',
    description: 'Integrate payment gateway',
    priority: 'Medium',
    assignedTo: [
      {
        first_name: 'Mallory',
        last_name: 'Scott',
        email: 'mallory.scott@example.com',
        avatarUrl: '/avatars/mallory.png',
      },{
        first_name: 'Niaj',
        last_name: 'Adams',
        email: 'niaj.adams@example.com',
        avatarUrl: '/avatars/niaj.png',
      },
      {
        first_name: 'Olivia',
        last_name: 'Clark',
        email: 'olivia.clark@example.com',
        avatarUrl: '/avatars/olivia.png',
      },
    ],
  },
  {
    id: 'task12',
    columnId: 'todo',
    title: 'Testing',
    description: 'Perform testing and bug fixing',
    priority: 'Medium',
    assignedTo: [
      {
        first_name: 'Niaj',
        last_name: 'Adams',
        email: 'niaj.adams@example.com',
        avatarUrl: '/avatars/niaj.png',
      },
      {
        first_name: 'Olivia',
        last_name: 'Clark',
        email: 'olivia.clark@example.com',
        avatarUrl: '/avatars/olivia.png',
      },
    ],
  },
  {
    id: 'task13',
    columnId: 'todo',
    title: 'Deployment',
    description: 'Launch website and deploy to server',
    priority: 'High',
    assignedTo: [
      {
        first_name: 'Peggy',
        last_name: 'Hall',
        email: 'peggy.hall@example.com',
        avatarUrl: 'https://cdn.shadcnstudio.com/ss-assets/avatar/avatar-3.png',
      },
    ],
  },
];
