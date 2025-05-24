import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '../ui/tooltip';
import { Button } from './Button';

export function TooltipCustom() {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button className="px-4 py-2 rounded-md text-white">Hover me</Button>
        </TooltipTrigger>
        <TooltipContent>Ini adalah tooltip!</TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
