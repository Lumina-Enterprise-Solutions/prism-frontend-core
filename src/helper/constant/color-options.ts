import type { EventColor } from "../../types/event-calendar-view-types";

export const colorOptions: Array<{
    value: EventColor;
    label: string;
    bgClass: string;
    borderClass: string;
  }> = [
    {
      value: 'card',
      label: 'Card',
      bgClass: 'bg-card data-[state=checked]:bg-card',
      borderClass: 'border-muted-foreground/10 data-[state=checked]:border-muted-foreground/10',
    },
    {
      value: 'sky',
      label: 'Sky',
      bgClass: 'bg-sky-100 data-[state=checked]:bg-sky-100',
      borderClass: 'border-sky-400 data-[state=checked]:border-sky-400',
    },
    {
      value: 'amber',
      label: 'Amber',
      bgClass: 'bg-amber-100 data-[state=checked]:bg-amber-100',
      borderClass: 'border-amber-400 data-[state=checked]:border-amber-400',
    },
    {
      value: 'violet',
      label: 'Violet',
      bgClass: 'bg-violet-100 data-[state=checked]:bg-violet-100',
      borderClass: 'border-violet-400 data-[state=checked]:border-violet-400',
    },
    {
      value: 'rose',
      label: 'Rose',
      bgClass: 'bg-rose-100 data-[state=checked]:bg-rose-100',
      borderClass: 'border-rose-400 data-[state=checked]:border-rose-400',
    },
    {
      value: 'emerald',
      label: 'Emerald',
      bgClass: 'bg-emerald-100 data-[state=checked]:bg-emerald-100',
      borderClass: 'border-emerald-400 data-[state=checked]:border-emerald-400',
    },
    {
      value: 'orange',
      label: 'Orange',
      bgClass: 'bg-orange-100 data-[state=checked]:bg-orange-100',
      borderClass: 'border-orange-400 data-[state=checked]:border-orange-400',
    },
  ];