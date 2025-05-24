'use client';

import * as React from 'react';
import { DayPicker, getDefaultClassNames } from 'react-day-picker';

import { cn } from '../../utils/utils';
import { buttonVariants } from '../atoms/Button';

function Calendar({
  className,
  classNames,
  showOutsideDays = true,
  ...props
}: React.ComponentProps<typeof DayPicker>) {
  const defaultClassNames = getDefaultClassNames();
  return (
    <DayPicker
      showOutsideDays={showOutsideDays}
      className={cn('p-3', className)}
      classNames={{
        months: `relative flex ${defaultClassNames.month}`,
        month_caption: `relative mx-10 flex h-7 items-center justify-center ${defaultClassNames.month_caption}`,
        weekdays: cn('flex flex-row', classNames?.weekdays),
        weekday: cn(
          'w-8 text-sm font-normal text-muted-foreground',
          classNames?.weekday
        ),
        month: cn('w-full', classNames?.month),

        caption_label: cn(
          'truncate text-sm font-medium',
          classNames?.caption_label
        ),
        button_next: cn(
          buttonVariants({ variant: 'outline' }),
          'h-7 w-7 bg-transparent p-0 opacity-50 hover:opacity-100 absolute right-1 [&_svg]:fill-foreground',
          classNames?.button_next
        ),
        button_previous: cn(
          buttonVariants({ variant: 'outline' }),
          'h-7 w-7 bg-transparent p-0 opacity-50 hover:opacity-100 absolute left-1 [&_svg]:fill-foreground',
          classNames?.button_previous
        ),
        nav: cn('flex items-start', classNames?.nav),
        month_grid: cn('mx-auto mt-4', classNames?.month_grid),
        week: cn('mt-2 flex w-max items-start', classNames?.week),
        day: cn(
          // "flex size-8 flex-1 items-center justify-center p-0 text-sm",
          // classNames?.day

          buttonVariants({ variant: 'ghost' }),
          'h-9 w-9 p-0 font-normal aria-selected:opacity-100'
        ),
        day_button: cn(
          'size-8 rounded-md p-0 font-normal transition-none aria-selected:opacity-100',
          classNames?.day_button
        ),
        range_start: cn(
          'bg-accent [&>button]:bg-primary [&>button]:text-primary-foreground [&>button]:hover:bg-primary [&>button]:hover:text-primary-foreground day-range-start rounded-s-md',
          classNames?.range_start
        ),
        range_middle: cn(
          'bg-accent !text-foreground [&>button]:bg-transparent [&>button]:!text-foreground [&>button]:hover:bg-transparent [&>button]:hover:!text-foreground               aria-selected:bg-slate-100 aria-selected:text-slate-900 dark:aria-selected:bg-slate-800 dark:aria-selected:text-slate-50',
          classNames?.range_middle
        ),
        range_end: cn(
          'bg-accent [&>button]:bg-primary [&>button]:text-primary-foreground [&>button]:hover:bg-primary [&>button]:hover:text-primary-foreground day-range-end rounded-e-md',
          classNames?.range_end
        ),

        // styling copied from the old calender
        selected: cn(
          '[&>button]:bg-primary [&>button]:text-primary-foreground [&>button]:hover:bg-primary [&>button]:hover:text-primary-foreground                                    bg-slate-900 text-slate-50 hover:bg-slate-900 hover:text-slate-50 focus:bg-slate-900 focus:text-slate-50 dark:bg-slate-50 dark:text-slate-900 dark:hover:bg-slate-50 dark:hover:text-slate-900 dark:focus:bg-slate-50 dark:focus:text-slate-900',
          classNames?.selected
        ),
        today: cn(
          // "[&>button]:bg-accent [&>button]:text-accent-foreground                   bg-slate-100 text-slate-900 dark:bg-slate-800 dark:text-slate-50   ",

          buttonVariants({ variant: 'activtabe' }),
          'h-9 w-9 p-0 font-normal aria-selected:opacity-100',
          classNames?.today
        ),

        // styling copied from the old calender

        outside: cn(
          'day-outside text-muted-foreground opacity-50 aria-selected:bg-accent/50 aria-selected:text-muted-foreground aria-selected:opacity-30                                                                                                                                                                                                                       day-outside text-slate-500 opacity-50 aria-selected:bg-slate-100/50 aria-selected:text-slate-500 aria-selected:opacity-30 dark:text-slate-400 dark:aria-selected:bg-slate-800/50 dark:aria-selected:text-slate-400',
          classNames?.outside
        ),
        disabled: cn('text-muted-foreground opacity-50', classNames?.disabled),
        hidden: cn('invisible flex-1', classNames?.hidden),
        ...classNames,
      }}
      {...props}
    />
  );
}
Calendar.displayName = 'Calendar';

export { Calendar };
