import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '../ui/select';

export interface GroupedSelectOption {
  label: string;
  options: { value: string; label: string }[];
}

interface GroupedSelectProps {
  placeholder?: string;
  groups: GroupedSelectOption[];
  onChange?: (value: string) => void;
  defaultValue?: string;
  className?: string;
}

export function SelectScrollable({
  placeholder = 'Select an option',
  groups,
  onChange,
  defaultValue,
  className = 'w-[280px]',
}: GroupedSelectProps) {
  return (
    <Select onValueChange={onChange} defaultValue={defaultValue}>
      <SelectTrigger className={className}>
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>
      <SelectContent>
        {groups.map((group, index) => (
          <SelectGroup key={index}>
            <SelectLabel>{group.label}</SelectLabel>
            {group.options.map((option) => (
              <SelectItem key={option.value} value={option.value}>
                {option.label}
              </SelectItem>
            ))}
          </SelectGroup>
        ))}
      </SelectContent>
    </Select>
  );
}
