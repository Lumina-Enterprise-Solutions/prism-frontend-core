import { Label } from '../../atoms/Label';
import { RadioGroup, RadioGroupItem } from '../../ui/radio-group';

interface Option {
  label: string;
  value: string;
}

interface ReusableRadioGroupProps {
  options: Option[];
  defaultValue?: string;
  name: string; // wajib jika ingin integrasi dengan RHF
  onChange?: (value: string) => void;
  onValueChange?: (value: string) => void;
  register?: any;
  error?: string;
  className?: string;
  disabled?: boolean;
}

export default function ReusableRadioGroup({
  options,
  defaultValue,
  onChange,
  onValueChange,
  name,
  register,
  error,
  className,
  disabled,
  ...props
}: ReusableRadioGroupProps) {
  return (
    <div className={className}>
      <RadioGroup
        defaultValue={defaultValue}
        onValueChange={onValueChange}
        {...props}
        className="flex items-center gap-4"
      >
        {options.map((option) => (
          <div key={option.value} className="flex items-center gap-2">
            <RadioGroupItem
              value={option.value}
              id={option.value}
              {...(register ? register(name) : {})}
              className="font-normal"
            />
            <Label htmlFor={option.value}>{option.label}</Label>
          </div>
        ))}
      </RadioGroup>
      {error && <p className="text-xs text-red-500">{error}</p>}
    </div>
  );
}
