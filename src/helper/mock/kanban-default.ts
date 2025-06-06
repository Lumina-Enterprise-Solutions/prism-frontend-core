import type { Column } from "../../components/molecules/kanban-board/board-column";

export const defaultCols = [
    {
      id: 'todo' as const,
      title: 'Todo',
    },
    {
      id: 'in-progress' as const,
      title: 'In progress',
    },
    {
      id: 'done' as const,
      title: 'Done',
    },
    {
      id: 'group' as const,
      title: 'Group'
    }
  ] satisfies Column[];