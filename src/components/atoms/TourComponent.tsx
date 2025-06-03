import { useEffect, useState } from 'react';
import { TourProvider, useTour } from '@reactour/tour';

const steps = [
  {
    selector: '.step-1',
    content: 'This is the first step',
  },
  {
    selector: '.step-2',
    content: 'This is the second step',
  },
];

export const TourWrapper = ({ children }: { children: React.ReactNode }) => {
  const [startTour, setStartTour] = useState(false);

  useEffect(() => {
    const hasSeenTour = localStorage.getItem('hasSeenTour');
    if (!hasSeenTour) {
      setStartTour(true);
      localStorage.setItem('hasSeenTour', 'true');
    }
  }, []);

  return (
    <TourProvider steps={steps}>
      <TourStarter isOpen={startTour} onClose={() => setStartTour(false)} />
      {children}
    </TourProvider>
  );
};

// Separate component to control the tour using useTour()
const TourStarter = ({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) => {
  const { setIsOpen } = useTour();

  useEffect(() => {
    setIsOpen(isOpen);
  }, [isOpen, setIsOpen]);

  useEffect(() => {
    if (!isOpen) setIsOpen(false);
  }, [isOpen, setIsOpen]);

  return null;
};
