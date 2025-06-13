export type CalendarView = "month" | "week" | "day" | "agenda"

export interface CalendarEvent {
  id: string
  title: string
  description?: string
  priority?: 'critical' | 'low' | 'medium' | 'high' | 'info';
  start: string | Date;
  end: string | Date;
  allDay?: boolean
  color?: EventColor
  location?: string
  done?: boolean;
}

export type EventColor =
  | "sky"
  | "amber"
  | "violet"
  | "rose"
  | "emerald"
  | "orange"