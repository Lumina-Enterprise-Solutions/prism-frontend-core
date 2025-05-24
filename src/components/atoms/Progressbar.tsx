'use client';

import { Progress } from '../ui/Progress';
import { useEffect, useState } from 'react';

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
  const [progress, setProgress] = useState(initialValue);

  useEffect(() => {
    const timer = setTimeout(() => {
      setProgress(targetValue);
    }, delay);

    return () => clearTimeout(timer);
  }, [targetValue, delay]);

  return <Progress value={progress} className={className} />;
}
