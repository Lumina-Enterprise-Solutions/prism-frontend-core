import clsx from 'clsx';

type ButtonVariant = 'default' | 'secondary' | 'destructive' | 'outline';
type ButtonSize = 'default' | 'sm' | 'lg';

export interface ButtonProps {
  children: React.ReactNode;
  variant?: ButtonVariant;
  type?: 'button' | 'submit' | 'reset';
  disabled?: boolean;
  size?: ButtonSize;
  onClick?: () => void;
}

const variantClasses: Record<ButtonVariant, string> = {
  default: 'bg-primary text-primary-foreground shadow hover:bg-primary/90',
  secondary:
    'bg-secondary text-secondary-foreground shadow-sm hover:bg-secondary/80',
  destructive:
    'bg-destructive text-primary-foreground shadow-sm hover:bg-destructive/90',
  outline:
    'border border-input bg-background shadow-sm hover:border-accent hover:text-accent',
};

const sizeClasses: Record<ButtonSize, string> = {
  default: 'h-9 px-4 py-2',
  sm: 'h-8 rounded-md px-3 text-xs',
  lg: 'h-10 rounded-md px-8',
};

export const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'default',
  type = 'button',
  disabled = false,
  size = 'default',
}) => {
  return (
    <button
      type={type}
      disabled={disabled}
      className={clsx(
        'inline-flex items-center px-4 py-2 rounded-md text-sm font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary',
        variantClasses[variant],
        sizeClasses[size],
        { 'opacity-50 cursor-not-allowed': disabled }
      )}
    >
      {children}
    </button>
  );
};
