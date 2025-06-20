import {
  AlertTriangle,
  Calendar,
  Clock,
  Container,
  Minus,
  Package,
  TrendingDown,
  TrendingUp,
} from 'lucide-react';
import { Badge } from '../../atoms/Badge';
import { Card, CardContent, CardHeader, CardTitle } from '../../atoms/Card';
import type { SewingLine, SewingLineStatus } from '../../../types/kanban-types';
import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '../../ui/dialog';
import { Button } from '../../atoms/Button';
import { Tooltip, TooltipContent, TooltipTrigger } from '../../ui/tooltip';
import { Progress } from '../../ui/progress';

interface SewingLineProps {
  sewingLine: SewingLine;
  isFullscreen?: boolean;
  previousStatus?: SewingLineStatus;
}

export default function BoardCard({
  sewingLine,
  isFullscreen = false,
  previousStatus,
}: SewingLineProps) {
  const { status, bunCount, pacCount, targetCount, efficiency, type, plan } =
    sewingLine;
  const [isExpanded, setIsExpanded] = useState(false);
  const [showPlanDialog, setShowPlanDialog] = useState(false);
  const progressPercentage = Math.min(
    100,
    Math.round((bunCount / targetCount) * 100)
  );

  // Determine status color
  const getStatusColor = (status: SewingLineStatus) => {
    switch (status.toLowerCase()) {
      case 'excess':
        return 'bg-green-500 dark:bg-green-600';
      case 'standard':
        return 'bg-blue-500 dark:bg-blue-600';
      case 'low':
        return 'bg-amber-500 dark:bg-amber-600';
      case 'timeout':
        return 'bg-red-500 dark:bg-red-600';
      default:
        return 'bg-gray-500';
    }
  };

  const getStatusBg = (status: SewingLineStatus) => {
    switch (status.toLowerCase()) {
      case 'excess':
        return 'bg-green-50 border-green-200 dark:bg-green-950/30 dark:border-green-900';
      case 'standard':
        return 'bg-blue-50 border-blue-200 dark:bg-blue-950/30 dark:border-blue-900';
      case 'low':
        return 'bg-amber-50 border-amber-200 dark:bg-amber-950/30 dark:border-amber-900';
      case 'timeout':
        return 'bg-red-50 border-red-200 dark:bg-red-950/30 dark:border-red-900';
      default:
        return '';
    }
  };

  const getStatusText = (status: SewingLineStatus) => {
    switch (status.toLowerCase()) {
      case 'excess':
        return 'text-green-700 dark:text-green-400';
      case 'standard':
        return 'text-blue-700 dark:text-blue-400';
      case 'low':
        return 'text-amber-700 dark:text-amber-400';
      case 'timeout':
        return 'text-red-700 dark:text-red-400';
      default:
        return '';
    }
  };

  // Format the last activity time
  const formatLastActivity = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / 60000);

    if (diffMins < 1) return 'Just now';
    if (diffMins === 1) return '1 minute ago';
    if (diffMins < 60) return `${diffMins} minutes ago`;

    const diffHours = Math.floor(diffMins / 60);
    if (diffHours === 1) return '1 hour ago';
    return `${diffHours} hours ago`;
  };

  // Determine trend icon
  const getTrendIcon = () => {
    // This is a simplified example - in a real app, you'd compare with historical data
    const ratio = bunCount / targetCount;

    if (ratio > 1.1) return <TrendingUp className="h-4 w-4 text-green-500" />;
    if (ratio < 0.9) return <TrendingDown className="h-4 w-4 text-red-500" />;
    return <Minus className="h-4 w-4 text-gray-500" />;
  };

  // Determine if there's a warning condition
  const hasWarning =
    status === 'Low' || status === 'Timeout' || efficiency < 70;

  // Format time for display
  const formatTime = (timeString: string) => {
    return new Date(timeString).toLocaleTimeString([], {
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const statusAnimationVariants = {
    initial: { scale: 1 },
    animate: {
      scale: [1, 1.2, 1],
      transition: { duration: 0.5 },
    },
  };

  const hasStatusChanged = previousStatus && previousStatus !== status;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      whileHover={{ scale: 1.02 }}
      className="cursor-pointer"
    >
      <Card
        className={`${getStatusBg(
          status
        )} overflow-hidden transition-all duration-300 ${
          isExpanded ? 'shadow-md' : ''
        }`}
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <motion.div
          className={`h-1 ${getStatusColor(status)}`}
          initial={false}
          animate={hasStatusChanged ? 'animate' : 'initial'}
          variants={statusAnimationVariants}
        />
        <CardHeader className="pb-2">
          <div className="flex justify-between items-start">
            <div className="flex flex-col">
              <CardTitle className="text-lg font-semibold">
                {sewingLine.name}
              </CardTitle>
              <div className="flex items-center mt-1">
                <Badge variant="outline" className="text-xs mr-2">
                  {type}
                </Badge>
                <Dialog open={showPlanDialog} onOpenChange={setShowPlanDialog}>
                  <DialogTrigger
                    asChild
                    onClick={(e) => {
                      e.stopPropagation();
                      setShowPlanDialog(true);
                    }}
                  >
                    <Button variant="ghost" size="icon" className="h-5 w-5">
                      <Calendar className="h-3.5 w-3.5" />
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>
                        Sewing Line Plan: {sewingLine.name}
                      </DialogTitle>
                      <DialogDescription>
                        Details for the current production plan
                      </DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <h4 className="font-medium mb-1">Contract</h4>
                          <p className="text-sm">{plan.contractNumber}</p>
                        </div>
                        <div>
                          <h4 className="font-medium mb-1">Style</h4>
                          <p className="text-sm">
                            {plan.styleNumber} - {plan.styleName}
                          </p>
                        </div>
                      </div>
                      <div>
                        <h4 className="font-medium mb-1">Buyer</h4>
                        <p className="text-sm">{plan.buyer}</p>
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <h4 className="font-medium mb-1">Start Time</h4>
                          <p className="text-sm">
                            {formatTime(plan.startTime)}
                          </p>
                        </div>
                        <div>
                          <h4 className="font-medium mb-1">End Time</h4>
                          <p className="text-sm">{formatTime(plan.endTime)}</p>
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <h4 className="font-medium mb-1">Target Per Hour</h4>
                          <p className="text-sm">{plan.targetPerHour} units</p>
                        </div>
                        <div>
                          <h4 className="font-medium mb-1">Total Target</h4>
                          <p className="text-sm">{plan.totalTarget} units</p>
                        </div>
                      </div>
                    </div>
                  </DialogContent>
                </Dialog>
              </div>
            </div>
            <div className="flex items-center gap-1">
              {hasWarning && (
                <Tooltip>
                  <TooltipTrigger>
                    <AlertTriangle className="h-4 w-4 text-amber-500" />
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>This line requires attention</p>
                  </TooltipContent>
                </Tooltip>
              )}
              <motion.div
                className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusText(
                  status
                )}`}
                initial={false}
                animate={hasStatusChanged ? { scale: [1, 1.2, 1] } : {}}
                transition={{ duration: 0.5 }}
              >
                {status}
              </motion.div>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex justify-between items-center text-sm">
              <div className="flex items-center gap-1">
                <Package className="h-4 w-4" />
                <span>BUN: {bunCount}</span>
              </div>
              <div>PAC: {pacCount}</div>
              <div>Target: {targetCount}</div>
            </div>

            <div className="space-y-1">
              <div className="flex justify-between text-xs">
                <span>Progress</span>
                <span>{progressPercentage}%</span>
              </div>
              <Progress value={progressPercentage} className="h-2" />
            </div>

            <div className="flex justify-between items-center text-sm">
              <div className="flex items-center gap-1 text-muted-foreground">
                <Clock className="h-3 w-3" />
                <span>{formatLastActivity(sewingLine.lastActivity)}</span>
              </div>
              <div className="flex items-center gap-1 text-xs font-medium">
                <span>Efficiency: {efficiency}%</span>
                {getTrendIcon()}
              </div>
            </div>

            <AnimatePresence>
              {isExpanded && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="pt-2 border-t"
                >
                  <div className="grid grid-cols-2 gap-2 text-xs">
                    <div>
                      <p className="text-muted-foreground">Remaining</p>
                      <p className="font-medium">
                        {bunCount - pacCount} bundles
                      </p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Completion</p>
                      <p className="font-medium">
                        {Math.round((pacCount / bunCount) * 100)}%
                      </p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Target Diff</p>
                      <p
                        className={`font-medium ${
                          bunCount >= targetCount
                            ? 'text-green-600'
                            : 'text-red-600'
                        }`}
                      >
                        {bunCount >= targetCount ? '+' : ''}
                        {bunCount - targetCount}
                      </p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Style</p>
                      <p className="font-medium">{plan.styleNumber}</p>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
