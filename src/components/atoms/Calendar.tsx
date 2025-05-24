import { Calendar } from '../ui/calendar';

interface CalendarSingleProps {
  selected?: Date;
  onSelect?: (date?: Date) => void;
  className?: string;
}

export function CalendarSingle({
  selected = new Date(),
  onSelect,
  className = 'rounded-md border shadow',
}: CalendarSingleProps) {
  return (
    <Calendar
      mode="single"
      selected={selected}
      onSelect={onSelect}
      className={className}
    />
  );
}
