import { CirclePlus } from 'lucide-react';
import { Button } from '../../atoms/Button';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTrigger,
} from '../../ui/dialog';
import type { z, ZodType } from 'zod';
import { useForm, type Path, type SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import type { FieldConfig } from '../../../types/field-config-types';
import { Label } from '../../atoms/Label';
import { Input } from '../../atoms/Input';
import { Textarea } from '../../ui/textarea';
import AvatarGroupMaxAvatar from '../../atoms/AvatarGroup';
import DialogInviteUser from '../advanced-dialog/DialogInviteUser';
import ReusableRadioGroup from '../advanced-radiobox/RadioboxHorizontal';
import { taskPriorityOptions } from '../../../helper/constant/task-priority';
import { useEffect, useState } from 'react';
import { Popover, PopoverContent, PopoverTrigger } from '../../ui/popover';
import { RiCalendarLine } from '@remixicon/react';
import { cn } from '../../../utils/utils';
import { format, isBefore } from 'date-fns';
import { Calendar } from '../../ui/calendar';
import { colorOptions } from '../../../helper/constant/color-options';
import { RadioGroup, RadioGroupItem } from '../../ui/radio-group';
import type { EventColor } from '../../../types/event-calendar-types';
import type { AvatarGroupType } from '../../../types/avatar-group-type';

interface KanbanDialogProps<T extends ZodType<any, any, any>> {
  schema: T;
  fields: FieldConfig[];
  onSubmit: (data: z.infer<T>) => void;
  task?: {
    assignedTo: { name: string; avatarUrl: string }[];
  };
  event?: {
    color?: EventColor;
  };
}

export default function KanbanDialog<T extends ZodType<any, any, any>>({
  fields,
  schema,
  onSubmit,
  event,
}: KanbanDialogProps<T>) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<z.infer<T>>({
    resolver: zodResolver(schema),
  });

  const [startDateOpen, setStartDateOpen] = useState(false);
  const [endDateOpen, setEndDateOpen] = useState(false);
  const [startDate, setStartDate] = useState<Date>(new Date());
  const [endDate, setEndDate] = useState<Date>(new Date());
  const [color, setColor] = useState<EventColor>('sky');
  const [assignedTo, setAssignedTo] = useState<AvatarGroupType[]>([]);
  const [priority, setPriority] = useState<string>('Low');

  useEffect(() => {
    if (event) {
      setColor((event.color as EventColor) || 'sky');
    } else {
      resetTask();
    }
  }, [event]);

  const resetTask = () => {
    setColor('sky');
  };

  const handleSelectUser = (user: AvatarGroupType) => {
    setAssignedTo((prev) => {
      const exists = prev.some((u) => u.email === user.email);
      if (exists) return prev;
      return [...prev, user];
    });
  };

  const handleFormSubmit: SubmitHandler<z.infer<T>> = (data) => {
    onSubmit({ ...data, color, startDate, endDate, assignedTo, priority });
  };

  return (
    <Dialog>
      <DialogTrigger asChild className="hover:bg-muted/60">
        <Button className="flex items-center justify-center p-4 font-semibold text-foreground gap-2 border border-dashed border-muted-foreground/50 bg-muted/50 dark:bg-muted/10 hover:bg-muted/30 hover:dark:bg-muted/20 shadow-none">
          <CirclePlus className="h-4 w-4" />
          Add new task
        </Button>
      </DialogTrigger>
      <DialogContent className="data-[state=open]:!zoom-in-0 data-[state=open]:duration-600 sm:max-w-[425px] h-auto min-w-[calc(70vw-2rem)] overflow-y-auto">
        <form onSubmit={handleSubmit(handleFormSubmit)}>
          <DialogHeader className="text-xl font-semibold text-foreground">
            Create new task
          </DialogHeader>
          <div className="grid grid-cols-2  gap-4 p-4">
            <div className="grid gap-4 py-4">
              {fields.map((field) => {
                const fieldName = field.name as Path<z.infer<T>>;

                return (
                  <div key={field.name} className="grid gap-3">
                    <Label
                      htmlFor={field.name}
                      className="text-sm font-semibold text-foreground"
                    >
                      {field.label}
                    </Label>
                    {field.type === 'textarea' ? (
                      <div className="w-full">
                        <Textarea
                          className="w-full border-muted-foreground/10 border min-h-[calc(15vw-2rem)]"
                          id={field.name}
                          {...register(fieldName)}
                          placeholder={field.placeholder}
                        />
                      </div>
                    ) : (
                      <Input
                        id={field.name}
                        type={field.type || 'text'}
                        {...register(fieldName)}
                        placeholder={field.placeholder}
                      />
                    )}
                    {errors[fieldName] && (
                      <p className="text-xs text-red-500">
                        {(errors[fieldName] as any)?.message}
                      </p>
                    )}
                  </div>
                );
              })}
            </div>
            <div className="grid gap-3 py-4">
              <div className="flex flex-col gap-3">
                <h1 className="text-sm font-semibold text-foreground">
                  Assignee & Communication
                </h1>
                <div className="flex items-center space-x-2 px-2">
                  <AvatarGroupMaxAvatar
                    avatars={assignedTo}
                    avatarClassName="h-10 w-10"
                  />
                  <DialogInviteUser onSelectUser={handleSelectUser} />
                </div>
                <div className="flex flex-col gap-2">
                  <h1 className="text-sm font-semibold text-foreground">
                    Priority
                  </h1>
                  <ReusableRadioGroup
                    name="priority"
                    options={taskPriorityOptions}
                    defaultValue={priority}
                    onValueChange={(value) => {
                      const selectedPriority = taskPriorityOptions.find(
                        (option) => option.value === value
                      );
                      if (selectedPriority) {
                        setPriority(selectedPriority.value);
                      }
                    }}
                    onChange={(value) => setPriority(value)}
                  />
                </div>
                <div className="flex flex-row justify-between gap-2">
                  <div className="w-full">
                    <Label className="text-sm font-semibold text-foreground">
                      Start Date
                    </Label>
                    <Popover
                      open={startDateOpen}
                      onOpenChange={setStartDateOpen}
                    >
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          className={cn(
                            'group bg-background hover:bg-background text-foreground border-input w-full justify-between px-3 font-normal outline-offset-0 outline-none focus-visible:outline-[3px]',
                            !startDate && 'text-foreground'
                          )}
                        >
                          <span
                            className={cn(
                              'truncate',
                              !startDate && 'text-foreground'
                            )}
                          >
                            {startDate
                              ? format(startDate, 'PPP')
                              : 'Pick a date'}
                          </span>
                          <RiCalendarLine
                            size={16}
                            className="text-foreground shrink-0"
                            aria-hidden="true"
                          />
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-2" align="start">
                        <Calendar
                          mode="single"
                          selected={startDate}
                          defaultMonth={startDate}
                          onSelect={(date) => {
                            if (date) {
                              setStartDate(date);
                              if (isBefore(endDate, date)) {
                                setEndDate(date);
                              }
                              setStartDateOpen(false);
                            }
                          }}
                        />
                      </PopoverContent>
                    </Popover>
                  </div>
                  <div className="w-full">
                    <Label className="text-sm font-semibold text-foreground">
                      End Date
                    </Label>
                    <Popover open={endDateOpen} onOpenChange={setEndDateOpen}>
                      <PopoverTrigger asChild>
                        <Button
                          id="end-date"
                          variant={'outline'}
                          className={cn(
                            'group bg-background hover:bg-background text-foreground border-input w-full justify-between px-3 font-normal outline-offset-0 outline-none focus-visible:outline-[3px]',
                            !endDate && 'text-foreground'
                          )}
                        >
                          <span
                            className={cn(
                              'truncate',
                              !endDate && 'text-foreground'
                            )}
                          >
                            {endDate ? format(endDate, 'PPP') : 'Pick a date'}
                          </span>
                          <RiCalendarLine
                            size={16}
                            className="text-foreground shrink-0"
                            aria-hidden="true"
                          />
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-2" align="start">
                        <Calendar
                          mode="single"
                          selected={endDate}
                          defaultMonth={endDate}
                          disabled={{ before: startDate }}
                          onSelect={(date) => {
                            if (date) {
                              setEndDate(date);
                              setEndDateOpen(false);
                            }
                          }}
                        />
                      </PopoverContent>
                    </Popover>
                  </div>
                </div>
                <div>
                  <fieldset className="space-y-4">
                    <legend className="text-foreground text-sm leading-none font-medium">
                      Etiquette
                    </legend>
                    <RadioGroup
                      className="flex gap-1.5"
                      defaultValue={colorOptions[0]?.value}
                      value={color}
                      onValueChange={(value: EventColor) => setColor(value)}
                    >
                      {colorOptions.map((colorOption) => (
                        <RadioGroupItem
                          key={colorOption.value}
                          id={`color-${colorOption.value}`}
                          value={colorOption.value}
                          aria-label={colorOption.label}
                          className={cn(
                            'size-6 shadow-none',
                            colorOption.bgClass,
                            colorOption.borderClass
                          )}
                        />
                      ))}
                    </RadioGroup>
                  </fieldset>
                </div>
              </div>
            </div>
          </div>
          <DialogFooter className="sticky bottom-0 mt-2 py-3 flex justify-end gap-2">
            <DialogClose asChild>
              <Button type="button" variant="outline">
                Cancel
              </Button>
            </DialogClose>
            <Button type="submit">Save changes</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
