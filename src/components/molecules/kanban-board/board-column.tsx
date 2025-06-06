import { SortableContext, useSortable } from '@dnd-kit/sortable';
import { useDndContext, type UniqueIdentifier } from '@dnd-kit/core';
import { CSS } from '@dnd-kit/utilities';
import { useMemo } from 'react';
import { cva } from 'class-variance-authority';
import { CirclePlus, GripVertical } from 'lucide-react';
import { TaskCard, type Task } from '.';
import { Card, CardContent, CardHeader } from '../../atoms/Card';
import { Button } from '../../atoms/Button';
import { ScrollArea, ScrollBar } from '../../ui/scroll-area';
import { Badge } from '../../atoms/Badge';

export interface Column {
  id: UniqueIdentifier;
  title: string;
}

export type ColumnType = 'Column';

export interface ColumnDragData {
  type: ColumnType;
  column: Column;
}

interface BoardColumnProps {
  column: Column;
  tasks: Task[];
  isOverlay?: boolean;
}

export function BoardColumn({ column, tasks, isOverlay }: BoardColumnProps) {
  const tasksIds = useMemo(() => {
    return tasks.map((task) => task.id);
  }, [tasks]);

  const columnData = useMemo(
    () => ({
      type: 'Column' as const,
      column,
    }),
    [column.id, column.title]
  );

  const {
    setNodeRef,
    attributes,
    listeners,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: column.id,
    data: columnData,
    attributes: {
      roleDescription: `Column: ${column.title}`,
    },
  });

  const style = useMemo(
    () => ({
      transition,
      transform: CSS.Translate.toString(transform),
    }),
    [transition, transform]
  );

  const variants = cva(
    'h-[720px] max-h-[720px] w-[350px] max-w-full bg-card flex flex-col flex-shrink-0 snap-center py-4 shadow-none',
    {
      variants: {
        dragging: {
          default: 'border-2 border-muted-foreground/10 border-transparent',
          over: 'opacity-30',
          overlay: 'ring-2 ring-muted-foreground/10',
        },
      },
    }
  );

  return (
    <div>
      <Card
        ref={setNodeRef}
        style={style}
        className={variants({
          dragging: isOverlay ? 'overlay' : isDragging ? 'over' : undefined,
        })}
      >
        <CardHeader className="p-4 font-semibold text-left flex flex-row space-between items-center">
          <span className="mr-auto flex flex-row gap-2">
            <p>{column.title}</p>
            <Badge variant="destructive">{tasks.length}</Badge>
          </span>
          <Button
            variant={'ghost'}
            {...attributes}
            {...listeners}
            className="p-1 text-primary/50 -ml-2 h-auto cursor-grab relative"
          >
            <span className="sr-only">{`Move column: ${column.title}`}</span>
            <GripVertical />
          </Button>
        </CardHeader>

        <ScrollArea className="flex-grow overflow-y-auto">
          <CardContent className="flex flex-col gap-2 p-2 max-h-[calc(800px-64px)]">
            <SortableContext items={tasksIds}>
              {tasks.map((task) => (
                <TaskCard key={task.id} task={task} />
              ))}
            </SortableContext>
            <Card className="flex items-center justify-center p-4 font-semibold text-muted-foreground/50 gap-2 border border-dashed border-muted-foreground/50 bg-muted/50 shadow-none">
              <CirclePlus size={24} />
              Add new task
            </Card>
          </CardContent>
        </ScrollArea>
      </Card>
    </div>
  );
}

export function BoardContainer({ children }: { children: React.ReactNode }) {
  const dndContext = useDndContext();

  const variations = cva('px-2 md:px-0 flex lg:justify-center pb-4', {
    variants: {
      dragging: {
        default: 'snap-x snap-mandatory',
        active: 'snap-none',
      },
    },
  });

  return (
    <ScrollArea
      className={variations({
        dragging: dndContext.active ? 'active' : 'default',
      })}
    >
      <div className="flex gap-4 items-center flex-row justify-center">
        {children}
      </div>
      <ScrollBar orientation="horizontal" />
    </ScrollArea>
  );
}
