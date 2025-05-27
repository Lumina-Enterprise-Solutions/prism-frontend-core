import { Moon, Sun } from 'lucide-react';
import { Button } from './Button';
import { useTheme } from '../theme-provider';
import { AnimatePresence, motion } from 'framer-motion';

const MotionMoon = motion(Moon);
const MotionSun = motion(Sun);

export function DarkModeToggle() {
  const { theme, setTheme } = useTheme();

  const isDark = theme === 'dark';

  const handleThemeChange = () => {
    setTheme(isDark ? 'light' : 'dark');
  };

  return (
    <Button
      variant="outline"
      size="icon"
      className="hover:cursor-pointer"
      onClick={handleThemeChange}
    >
      <AnimatePresence mode="wait">
        {isDark ? (
          <MotionMoon
            key="moon"
            className="h-[1.2rem] w-[1.2rem] text-primary absolute"
            initial={{ rotate: 90, scale: 0, opacity: 0 }}
            animate={{ rotate: 0, scale: 1, opacity: 1 }}
            exit={{ rotate: 90, scale: 0, opacity: 0 }}
            transition={{ type: 'spring', stiffness: 300, damping: 20 }}
            whileHover={{ scale: 1.1 }}
          />
        ) : (
          <MotionSun
            key="sun"
            className="h-[1.2rem] w-[1.2rem] absolute"
            initial={{ rotate: -90, scale: 0, opacity: 0 }}
            animate={{ rotate: 0, scale: 1, opacity: 1 }}
            exit={{ rotate: -90, scale: 0, opacity: 0 }}
            transition={{ type: 'spring', stiffness: 300, damping: 20 }}
            whileHover={{
              rotate: 90,
              opacity: 1,
              transition: { duration: 0.2 },
            }}
          />
        )}
      </AnimatePresence>
    </Button>
  );
}
