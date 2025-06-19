import { useAppreanceTheme } from '../../context/AppearanceThemeProvider';
import { Button } from '../atoms/Button';

const themes = [
  { name: 'Primary', color: '#0a3962' },
  { name: 'Green', color: '#10B981' },
  { name: 'Rose', color: '#F43F5E' },
  { name: 'Amber', color: '#F59E0B' },
  { name: 'Violet', color: '#8B5CF6' },
];

export const ThemeSwitcher = () => {
  const { color, setColor } = useAppreanceTheme();

  return (
    <div className="flex gap-2">
      {themes.map((theme) => (
        <Button
          key={theme.name}
          onClick={() => setColor(theme.color)}
          className={`p-4 rounded-full border-1 transition-all duration-200 ${
            color === theme.color ? 'ring-2 ring-offset-2 ring-primary' : ''
          }`}
          style={{ backgroundColor: theme.color }}
          title={theme.name}
        />
      ))}
    </div>
  );
};
