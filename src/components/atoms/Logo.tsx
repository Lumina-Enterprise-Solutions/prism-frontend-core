import { cn } from '../../utils/utils';
import logo from '../../assets/images/logo/Prism_ERP_Logo.png';
import lightLogo from '../../assets/images/logo/Prism_ERP_montserrat_medium_light_mode.png';
import darkLogo from '../../assets/images/logo/Prism_ERP_montserrat_medium_dark_mode.png';

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
      alt="Teresa Logo"
      className={cn('h-8 w-auto', className)}
    />
  );
}
