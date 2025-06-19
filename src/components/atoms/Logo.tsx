import { cn } from '../../utils/utils';
import logo from '../../assets/images/logo/Prism.png';
import lightLogo from '../../assets/images/logo/Prism_with_text.png';
import darkLogo from '../../assets/images/logo/Prism_with_text.png';

interface LogoProps {
  variant?: 'full' | 'icon';
  className?: string;
  darkMode?: boolean;
}

export function Logo({
  variant = 'full',
  className,
  darkMode = false,
}: LogoProps) {
  if (variant === 'icon') {
    return (
      <img
        src={logo}
        alt="Prism Logo"
        className={cn('h-8 w-auto', className)}
      />
    );
  }

  return (
    <img
      src={darkMode ? `${darkLogo}` : `${lightLogo}`}
      alt="Prism Logo"
      className={cn('h-8 w-auto', className)}
    />
  );
}
