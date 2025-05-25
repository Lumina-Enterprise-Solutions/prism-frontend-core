import { Label } from '../atoms/Label';
import { Switch } from '../ui/switch';

interface SwitchWithLabelProps {
  id: string;
  label: string;
  checked?: boolean;
  defaultChecked?: boolean;
  onCheckedChange?: (checked: boolean) => void;
  disabled?: boolean;
  labelPosition?: 'left' | 'right'; // Optional posisi label
}

export function SwitchWithLabel({
  id,
  label,
  checked,
  defaultChecked,
  onCheckedChange,
  disabled = false,
  labelPosition = 'right',
}: SwitchWithLabelProps) {
  const labelEl = <Label htmlFor={id}>{label}</Label>;
  const switchEl = (
    <Switch
      id={id}
      checked={checked}
      defaultChecked={defaultChecked}
      onCheckedChange={onCheckedChange}
      disabled={disabled}
    />
  );

  return (
    <div className="flex items-center space-x-2">
      {labelPosition === 'left' && labelEl}
      {switchEl}
      {labelPosition === 'right' && labelEl}
    </div>
  );
}
