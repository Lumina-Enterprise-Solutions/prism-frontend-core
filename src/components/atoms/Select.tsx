import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '../ui/select';

export interface SelectOptionProps {
  value: string;
  label: string;
}

interface SelectWithLabelProps {
  placeholder?: string;
  label?: string;
  options: SelectOptionProps[];
  onChange?: (value: string) => void;
  defaultValue?: string;
  disabled?: boolean;
  className?: string;
}

export function SelectOption({
  placeholder = 'Select an option',
  label,
  options,
  onChange,
  defaultValue,
  disabled = false,
  className = 'w-[180px]',
}: SelectWithLabelProps) {
  return (
    <Select
      onValueChange={onChange}
      defaultValue={defaultValue}
      disabled={disabled}
    >
      <SelectTrigger className={className}>
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          {label && <SelectLabel>{label}</SelectLabel>}
          {options.map((option) => (
            <SelectItem key={option.value} value={option.value}>
              {option.label}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
