'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from '../../../context/theme-provider';
import { cn } from '../../../utils/utils';
import { Logo } from '../../atoms/Logo';
import { DecorativeAccent } from '../../ui/decoration-spacing';

interface LoadingScreenProps {
  /**
   * Whether the loading screen is visible
   */
  isLoading?: boolean;

  /**
   * Duration of the loading animation in seconds
   * @default 2
   */
  duration?: number;

  /**
   * Text to display below the logo
   * @default "Loading..."
   */
  loadingText?: string;

  /**
   * Whether to show a progress bar
   * @default true
   */
  showProgress?: boolean;

  /**
   * Whether to show decorative elements
   * @default true
   */
  showDecorations?: boolean;

  /**
   * Additional CSS classes
   */
  className?: string;

  /**
   * Callback when animation completes
   */
  onAnimationComplete?: () => void;

  /**
   * Whether to use the full logo or just the icon
   * @default "icon"
   */
  logoVariant?: 'full' | 'icon';

  /**
   * Size of the logo
   * @default "large"
   */
  logoSize?: 'small' | 'medium' | 'large';

  /**
   * Background style
   * @default "solid"
   */
  backgroundStyle?: 'solid' | 'gradient' | 'minimal';
}

export function LoadingScreen({
  isLoading = true,
  duration = 2,
  loadingText = 'Loading...',
  showProgress = true,
  showDecorations = true,
  className,
  onAnimationComplete,
  logoVariant = 'icon',
  logoSize = 'large',
  backgroundStyle = 'solid',
}: LoadingScreenProps) {
  const [progress, setProgress] = useState(0);
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  // Calculate logo size based on the logoSize prop
  const logoSizeClass = {
    small: 'h-12 w-12',
    medium: 'h-16 w-16',
    large: 'h-24 w-24',
  }[logoSize];

  // Calculate background style
  const backgroundClass = {
    solid: 'bg-background',
    gradient: 'bg-gradient-to-br from-background to-muted',
    minimal: 'bg-background/80 backdrop-blur-md',
  }[backgroundStyle];

  // Simulate progress
  useEffect(() => {
    if (!isLoading) return;

    const interval = setInterval(() => {
      setProgress((prev) => {
        const newProgress = prev + 1;
        if (newProgress >= 100) {
          clearInterval(interval);
          return 100;
        }
        return newProgress;
      });
    }, (duration * 1000) / 100);

    return () => clearInterval(interval);
  }, [isLoading, duration]);

  // Reset progress when loading state changes
  useEffect(() => {
    if (isLoading) {
      setProgress(0);
    }
  }, [isLoading]);

  // Call onAnimationComplete when progress reaches 100
  useEffect(() => {
    if (progress === 100 && onAnimationComplete) {
      const timer = setTimeout(() => {
        onAnimationComplete();
      }, 500); // Small delay to show completed state

      return () => clearTimeout(timer);
    }
  }, [progress, onAnimationComplete]);

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          className={cn(
            'fixed inset-0 z-50 flex flex-col items-center justify-center',
            backgroundClass,
            className
          )}
        >
          {/* Decorative elements */}
          {showDecorations && (
            <>
              <motion.div
                className="absolute top-1/4 left-1/4 opacity-20"
                initial={{ scale: 0, rotate: 0 }}
                animate={{
                  scale: [0, 1.2, 1],
                  rotate: [0, 45, 0],
                }}
                transition={{
                  duration: 3,
                  repeat: Number.POSITIVE_INFINITY,
                  repeatType: 'reverse',
                }}
              >
                <DecorativeAccent
                  variant="circle"
                  color="primary"
                  className="w-8 h-8"
                />
              </motion.div>

              <motion.div
                className="absolute bottom-1/4 right-1/4 opacity-20"
                initial={{ scale: 0, rotate: 0 }}
                animate={{
                  scale: [0, 1.2, 1],
                  rotate: [0, -45, 0],
                }}
                transition={{
                  duration: 3,
                  repeat: Number.POSITIVE_INFINITY,
                  repeatType: 'reverse',
                  delay: 0.5,
                }}
              >
                <DecorativeAccent
                  variant="square"
                  color="secondary"
                  className="w-8 h-8"
                />
              </motion.div>

              <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-0 left-0 w-full h-px bg-primary/10"></div>
                <div className="absolute bottom-0 left-0 w-full h-px bg-primary/10"></div>
              </div>
            </>
          )}

          <div className="relative flex flex-col items-center">
            {/* Logo container with pulse effect */}
            <motion.div
              className="relative"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              {/* Pulse effect behind logo */}
              <motion.div
                className="absolute inset-0 rounded-full bg-primary/10"
                initial={{ scale: 1, opacity: 0.5 }}
                animate={{ scale: 1.5, opacity: 0 }}
                transition={{
                  duration: 2,
                  repeat: Number.POSITIVE_INFINITY,
                  repeatType: 'loop',
                }}
              />

              {/* Secondary pulse effect */}
              <motion.div
                className="absolute inset-0 rounded-full bg-secondary/10"
                initial={{ scale: 1, opacity: 0.5 }}
                animate={{ scale: 1.3, opacity: 0 }}
                transition={{
                  duration: 2,
                  repeat: Number.POSITIVE_INFINITY,
                  repeatType: 'loop',
                  delay: 0.5,
                }}
              />

              {/* Logo with subtle animation */}
              <motion.div
                className={cn('relative z-10', logoSizeClass)}
                animate={{
                  rotate: [0, 5, 0, -5, 0],
                  scale: [1, 1.05, 1, 1.05, 1],
                }}
                transition={{
                  duration: 5,
                  repeat: Number.POSITIVE_INFINITY,
                  repeatType: 'loop',
                  ease: 'easeInOut',
                }}
              >
                <Logo
                  variant={logoVariant}
                  darkMode={isDark}
                  className="h-full w-full"
                />
              </motion.div>
            </motion.div>

            {/* Loading text with typewriter effect */}
            <motion.div
              className="mt-8 text-center"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.5 }}
            >
              <motion.p
                className="text-lg font-medium text-foreground"
                animate={{ opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
              >
                {loadingText}
              </motion.p>

              {/* Progress text */}
              {showProgress && (
                <motion.p
                  className="text-sm text-muted-foreground mt-2"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5 }}
                >
                  {progress}%
                </motion.p>
              )}
            </motion.div>

            {/* Progress bar */}
            {showProgress && (
              <motion.div
                className="mt-4 w-48 h-1 bg-muted rounded-full overflow-hidden"
                initial={{ opacity: 0, width: 0 }}
                animate={{ opacity: 1, width: '12rem' }}
                transition={{ delay: 0.4, duration: 0.5 }}
              >
                <motion.div
                  className="h-full bg-primary"
                  style={{ width: `${progress}%` }}
                  initial={{ width: '0%' }}
                  transition={{ duration: 0.1, ease: 'linear' }}
                />
              </motion.div>
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

/**
 * A simpler loading spinner component for inline use
 */
export function LoadingSpinner({
  size = 'default',
  className,
}: {
  size?: 'small' | 'default' | 'large';
  className?: string;
}) {
  const sizeClass = {
    small: 'h-4 w-4',
    default: 'h-8 w-8',
    large: 'h-12 w-12',
  }[size];

  return (
    <div className={cn('flex items-center justify-center', className)}>
      <motion.div
        className={cn(
          'border-t-transparent rounded-full border-primary',
          sizeClass
        )}
        style={{ borderWidth: size === 'small' ? 2 : 4 }}
        animate={{ rotate: 360 }}
        transition={{
          duration: 1,
          repeat: Number.POSITIVE_INFINITY,
          ease: 'linear',
        }}
      />
    </div>
  );
}

/**
 * A loading overlay component for use within containers
 */
export function LoadingOverlay({
  isLoading = true,
  message = 'Loading...',
  className,
}: {
  isLoading?: boolean;
  message?: string;
  className?: string;
}) {
  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className={cn(
            'absolute inset-0 z-50 flex flex-col items-center justify-center bg-background/80 backdrop-blur-sm',
            className
          )}
        >
          <LoadingSpinner />
          {message && (
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="mt-4 text-sm text-muted-foreground"
            >
              {message}
            </motion.p>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
