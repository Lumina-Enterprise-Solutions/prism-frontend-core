import type { UniqueIdentifier } from '@dnd-kit/core';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { cva } from 'class-variance-authority';
import type { ColumnId } from '.';
import { Card, CardContent, CardHeader } from '../../atoms/Card';
import { Badge } from '../../atoms/Badge';
import { cn } from '../../../utils/utils';
import React, { useMemo } from 'react';
import { Button } from '../../atoms/Button';
import { Flag, SquarePen } from 'lucide-react';
import AvatarGroupMaxAvatar from '../../atoms/AvatarGroup';
import { Separator } from '../../ui/separator';

type AssignedUser = {
  first_name: string;
  last_name: string;
  email: string;
  avatarUrl: string;
};

export type Task = {
  id: string;
  columnId: string;
  title: string;
  description: string;
  date?: string;
  priority: 'Low' | 'Medium' | 'High';
  assignedTo: AssignedUser[];
};

interface TaskCardProps {
  task: Task;
  isOverlay?: boolean;
}

export type TaskType = 'Task';

export interface TaskDragData {
  type: TaskType;
  task: Task;
}

export const TaskCard = React.memo(function TaskCard({
  task,
  isOverlay,
}: TaskCardProps) {
  const memoizedTaskData = useMemo(
    () => ({
      type: 'Task' as const,
      task,
    }),
    [
      task.id,
      task.description,
      task.title,
      task.date,
      task.priority,
      task.assignedTo,
    ]
  );

  const {
    setNodeRef,
    attributes,
    listeners,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: task.id,
    data: memoizedTaskData,
    attributes: {
      roleDescription: 'Task',
    },
  });

  const style = useMemo(
    () => ({
      transition,
      transform: CSS.Translate.toString(transform),
    }),
    [transition, transform]
  );

  const variants = cva('', {
    variants: {
      dragging: {
        over: 'ring-2 opacity-30',
        overlay: 'ring-2 ring-muted-foreground/10',
      },
    },
  });

  return (
    <Card
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className={cn(
        'active:cursor-grabbing',
        variants({
          dragging: isOverlay ? 'overlay' : isDragging ? 'over' : undefined,
        })
      )}
    >
      <CardHeader className="px-3 py-3 space-between flex flex-row gap-2 items-center justify-between">
        <h3 className="font-semibold">{task.title}</h3>
        <Button className="px-2 py-1 bg-card shadow-none hover:bg-muted-foreground/10">
          <SquarePen size={12} className="text-foreground" />
        </Button>
      </CardHeader>
      <CardContent className="px-3 pt-3 pb-6 text-left text-sm whitespace-pre-wrap">
        {task.description}
      </CardContent>
      <div className="p-2 gap-1 text-muted-foreground flex flex-row justify-between items-center">
        <div className="items-center flex flex-row space-x-1">
          <Flag size={12} />
          <p className="text-xs font-semibold">{task.date}</p>
        </div>
        <Badge
          variant={
            task.priority === 'High'
              ? 'destructive'
              : task.priority === 'Medium'
              ? 'secondary'
              : 'outline'
          }
        >
          {task.priority ?? 'Low'}
        </Badge>
      </div>
      <Separator />
      <div className="py-2 flex items-center space-x-2">
        <p className="text-xs font-semibold px-2">Assigned to:</p>
        {task.assignedTo?.length === 1 ? (
          <div className="flex items-center space-x-2 px-2">
            <img
              src={task.assignedTo[0].avatarUrl}
              alt={task.assignedTo[0].first_name}
              className="w-6 h-6 rounded-full"
            />
          </div>
        ) : (
          task.assignedTo?.length && (
            <AvatarGroupMaxAvatar avatars={task.assignedTo} />
          )
        )}
      </div>
    </Card>
  );
});
