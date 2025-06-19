import { Laptop, Moon, Sun } from 'lucide-react';
import { RadioGroup, RadioGroupItem } from '../ui/radio-group';
import { Label } from '../atoms/Label';
import { useEffect, useId, useState } from 'react';
import { cn } from '../../utils/utils';
import { useTheme } from '../../context/theme-provider';

const themes = [
  {
    label: 'System',
    icon: Laptop,
    value: 'system',
  },
  {
    label: 'Light',
    icon: Sun,
    value: 'light',
  },
  {
    label: 'Dark',
    icon: Moon,
    value: 'dark',
  },
];

export default function ThemeSelector() {
  const id = useId();
  const { theme, setTheme } = useTheme();
  const [selected, setSelected] = useState(theme === 'dark' ? 'dark' : 'light');

  useEffect(() => {
    if (selected === 'dark') {
      setTheme('dark');
    } else if (selected === 'light') {
      setTheme('light');
    } else {
      setTheme('system');
    }
  }, [selected, setTheme]);

  return (
    <RadioGroup
      className="grid grid-cols-3 gap-4 w-full max-w-xl"
      value={selected}
      onValueChange={setSelected}
    >
      {themes.map((theme, index) => {
        const Icon = theme.icon;
        return (
          <div
            key={theme.value}
            data-state={selected === theme.value ? 'checked' : 'unchecked'}
            className={cn(
              'relative flex flex-col items-center gap-2 rounded-md border p-4 transition-all',
              'border-input bg-background',
              'data-[state=checked]:border-primary data-[state=checked]:bg-primary/5'
            )}
          >
            <RadioGroupItem
              value={theme.value}
              id={`${id}-${index}`}
              className="sr-only"
              aria-label={`theme-${theme.label}`}
            />
            <div className="text-muted-foreground data-[state=checked]:text-primary">
              <Icon size={40} />
            </div>
            <Label
              htmlFor={`${id}-${index}`}
              className="text-sm font-medium text-muted-foreground data-[state=checked]:text-primary"
            >
              {theme.label}
            </Label>
          </div>
        );
      })}
    </RadioGroup>
  );
}
