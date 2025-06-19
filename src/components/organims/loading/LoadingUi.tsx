'use client';

import { motion } from 'framer-motion';

import { useState, useEffect } from 'react';
import { useTheme } from '../../../context/theme-provider';
import { Logo } from '../../atoms/Logo';

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
}

export function LoadingUI({
  isLoading = true,
  duration = 2,
  loadingText = 'Loading...',
  showProgress = true,
  onAnimationComplete,
  logoVariant = 'icon',
}: LoadingScreenProps) {
  const [progress, setProgress] = useState(0);
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  // Calculate logo size based on the logoSize prop

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
    <div className="fixed inset-0 w-full h-full flex items-center justify-center overflow-hidden bg-gradient-to-br from-background to-muted">
      {/* Subtle animated background */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute inset-0 bg-[linear-gradient(rgba(120,120,120,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(120,120,120,0.03)_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_50%_50%_at_50%_50%,black,transparent)]" />

        {/* Subtle gradient orbs using logo colors */}
        <motion.div
          className="absolute left-1/4 top-1/4 w-[40vmax] h-[40vmax] rounded-full opacity-5 primary bg-[#0D5C5B] blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            x: ['-10%', '0%', '-10%'],
            y: ['-10%', '0%', '-10%'],
          }}
          transition={{
            duration: 8,
            ease: 'easeInOut',
            repeat: Number.POSITIVE_INFINITY,
          }}
        />

        <motion.div
          className="absolute right-1/4 bottom-1/4 w-[40vmax] h-[40vmax] rounded-full opacity-5 backdrop-blur-3xl bg-[#FFBA08] blur-3xl"
          animate={{
            scale: [1.2, 1, 1.2],
            x: ['10%', '0%', '10%'],
            y: ['10%', '0%', '10%'],
          }}
          transition={{
            duration: 8,
            ease: 'easeInOut',
            repeat: Number.POSITIVE_INFINITY,
          }}
        />
      </div>

      {/* Logo animation container */}
      <div className="relative z-10 max-w-md w-full px-8">
        <div className="flex flex-col items-center">
          {/* Logo reveal animation */}
          <div className="relative w-full mb-12 overflow-hidden">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: 'easeOut' }}
            >
              <Logo
                variant={logoVariant}
                darkMode={isDark}
                className="h-auto w-full"
              />
            </motion.div>
          </div>

          {/* Loading indicator */}
          <motion.div
            className="h-0.5 bg-[#0D5C5B] dark:bg-[#FFBA08] rounded-full overflow-hidden w-24 mt-2"
            initial={{ width: '24px' }}
            animate={{ width: '96px' }}
            transition={{
              duration: 1.5,
              repeat: Number.POSITIVE_INFINITY,
              repeatType: 'reverse',
              ease: 'easeInOut',
            }}
          >
            <motion.div
              className="h-full bg-[#FFBA08] dark:bg-[#0D5C5B]"
              animate={{
                x: ['0%', '100%', '0%'],
              }}
              transition={{
                duration: 2,
                repeat: Number.POSITIVE_INFINITY,
                ease: 'easeInOut',
              }}
            />
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
        </div>
      </div>
    </div>
  );
}
