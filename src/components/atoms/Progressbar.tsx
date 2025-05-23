'use client';

import * as React from 'react';
import { Progress } from '../ui/Progress';

interface ProgressCustomProps {
  initialValue?: number;
  targetValue: number;
  delay?: number;
  className?: string;
}

export function ProgressCustom({
  initialValue = 0,
  targetValue,
  delay = 500,
  className,
}: ProgressCustomProps) {
  const [progress, setProgress] = React.useState(initialValue);

  React.useEffect(() => {
    const timer = setTimeout(() => {
      setProgress(targetValue);
    }, delay);

    return () => clearTimeout(timer);
  }, [targetValue, delay]);

  return <Progress value={progress} className={className} />;
}
