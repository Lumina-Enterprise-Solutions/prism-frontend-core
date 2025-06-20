import {
  Check,
  Container,
  Download,
  Edit,
  Filter,
  Flag,
  FlagTriangleRight,
  RefreshCw,
  Search,
} from 'lucide-react';
import { Button } from '../../../components/atoms/Button';
import { Card, CardContent, CardTitle } from '../../../components/atoms/Card';
import { Badge } from '../../../components/atoms/Badge';
import BoardCard from '../../../components/molecules/advanced-card/board-card';
import type {
  BoardData,
  GarmentType,
  SewingLineStatus,
} from '../../../types/kanban-types';
import { useEffect, useMemo, useRef, useState } from 'react';
import { updateSewingLineStatus } from '../../../helper/sewingHelper';
import { Link, useParams } from 'react-router-dom';
import { useToast } from '../../../components/ui/use-toast';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '../../../components/ui/dropdown-menu';
import { Input } from '../../../components/atoms/Input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../../../components/ui/select';

export default function BoardPage() {
  const prevStatusesRef = useRef<Record<string, SewingLineStatus>>({});
  const [loading, setLoading] = useState(true);
  const [board, setBoard] = useState<BoardData | null>(null);
  const params = useParams();
  const boardId = params.id as string;
  const { toast } = useToast();
  const [view, setView] = useState<'all' | SewingLineStatus>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<
    'name' | 'efficiency' | 'bunCount' | 'type'
  >('name');
  const [filterType, setFilterType] = useState<'all' | GarmentType>('all');

  useEffect(() => {
    // In a real app, this would fetch from API
    const fetchBoard = async () => {
      setLoading(true);
      try {
        // Simulate API call
        await new Promise((resolve) => setTimeout(resolve, 10000));

        // Mock data
        const mockBoard = generateMockBoardData(boardId);

        // Update statuses based on current values
        const updatedLines = mockBoard.sewingLines.map((line) => {
          // Store previous status for animation
          if (board) {
            const existingLine = board.sewingLines.find(
              (l) => l.id === line.id
            );
            if (existingLine) {
              prevStatusesRef.current[line.id] = existingLine.status;
            }
          }

          return updateSewingLineStatus(line);
        });

        setBoard({
          ...mockBoard,
          sewingLines: updatedLines,
        });
      } catch (error) {
        console.error('Error fetching board data:', error);
        toast({
          title: 'Error',
          description: 'Failed to load board data. Please try again.',
          variant: 'destructive',
        });
      } finally {
        setLoading(false);
      }
    };

    fetchBoard();

    // Set up polling for real-time updates
    const intervalId = setInterval(() => {
      fetchBoard();
    }, 30000); // Update every 30 seconds

    return () => clearInterval(intervalId);
  }, [boardId, toast, board]);

  const handleRefresh = () => {
    setLoading(true);
    // In a real app, this would fetch fresh data from API
    setTimeout(() => {
      const refreshedBoard = generateMockBoardData(boardId);

      // Update statuses based on current values
      const updatedLines = refreshedBoard.sewingLines.map((line) => {
        // Store previous status for animation
        if (board) {
          const existingLine = board.sewingLines.find((l) => l.id === line.id);
          if (existingLine) {
            prevStatusesRef.current[line.id] = existingLine.status;
          }
        }

        return updateSewingLineStatus(line);
      });

      setBoard({
        ...refreshedBoard,
        sewingLines: updatedLines,
      });

      setLoading(false);
      toast({
        title: 'Refreshed',
        description: 'Board data has been updated.',
      });
    }, 1000);
  };

  const handleExport = () => {
    // In a real app, this would generate a CSV or PDF
    toast({
      title: 'Export Started',
      description: 'Your report is being generated and will download shortly.',
    });

    // Simulate download delay
    setTimeout(() => {
      toast({
        title: 'Export Complete',
        description: 'Your report has been downloaded.',
      });
    }, 2000);
  };

  const filteredLines = useMemo(() => {
    if (!board) return [];

    return board.sewingLines
      .filter((line) => {
        // Filter by status
        const statusMatch = view === 'all' || line.status === view;

        // Filter by garment type
        const typeMatch = filterType === 'all' || line.type === filterType;

        // Filter by search query
        const searchMatch =
          searchQuery === '' ||
          line.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          line.plan.styleNumber
            .toLowerCase()
            .includes(searchQuery.toLowerCase()) ||
          line.plan.buyer.toLowerCase().includes(searchQuery.toLowerCase());

        return statusMatch && typeMatch && searchMatch;
      })
      .sort((a, b) => {
        // Sort by selected criteria
        switch (sortBy) {
          case 'name':
            return a.name.localeCompare(b.name);
          case 'efficiency':
            return b.efficiency - a.efficiency;
          case 'bunCount':
            return b.bunCount - a.bunCount;
          case 'type':
            return a.type.localeCompare(b.type);
          default:
            return 0;
        }
      });
  }, [board, view, searchQuery, sortBy, filterType]);

  // Count by garment type
  const garmentTypeCounts = useMemo(() => {
    if (!board) return {};

    return board.sewingLines.reduce((acc, line) => {
      acc[line.type] = (acc[line.type] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);
  }, [board]);

  return (
    <div className="mx-auto w-full h-full sm:px-4 lg:px-6 py-4">
      <Card className="overflow-hidden shadow-sm sm:rounded-lg p-6">
        <CardTitle className="pb-4">
          <div className="flex flex-col items-center justify-center">
            <h1 className="text-4xl font-bold uppercase text-foreground">
              Kanban
            </h1>
            <p className="text-sm text-foreground">
              Supervise the distribution of cutting products to each sewing line
              in an easy and structured manner.
            </p>
            <p className="text-sm text-foreground">
              {board && (
                <p className="text-muted-foreground">
                  {board.sewingLines.length} sewing lines • Last updated:{' '}
                  {formatTime(new Date())}
                </p>
              )}
            </p>
          </div>
        </CardTitle>
        <div className="flex flex-wrap items-center pb-2 justify-between">
          <div className="flex flex-col items-center md:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search by line name, style, or buyer..."
                className="pl-8 shadow-none border border-muted-foreground/10"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <div className="flex gap-2">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="outline"
                    className="gap-2 py-2 shadow-none border border-muted-foreground/10"
                  >
                    <Filter className="h-4 w-4" />
                    {filterType !== 'all' && (
                      <Badge
                        variant="secondary"
                        className="rounded-sm px-1 font-normal"
                      >
                        {filterType}
                      </Badge>
                    )}
                    Type
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-[200px]">
                  <DropdownMenuLabel>Filter by Garment Type</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuGroup>
                    <DropdownMenuItem onClick={() => setFilterType('all')}>
                      All Types
                      {filterType === 'all' && (
                        <Check className="ml-auto h-4 w-4" />
                      )}
                    </DropdownMenuItem>
                    {(
                      [
                        'BRA',
                        'BRIEF',
                        'SHIRT',
                        'PANTS',
                        'DRESS',
                        'OTHER',
                      ] as GarmentType[]
                    ).map((type) => (
                      <DropdownMenuItem
                        key={type}
                        onClick={() => setFilterType(type)}
                      >
                        {type}{' '}
                        {garmentTypeCounts[type] &&
                          `(${garmentTypeCounts[type]})`}
                        {filterType === type && (
                          <Check className="ml-auto h-4 w-4" />
                        )}
                      </DropdownMenuItem>
                    ))}
                  </DropdownMenuGroup>
                </DropdownMenuContent>
              </DropdownMenu>
              <Select
                value={sortBy}
                onValueChange={(value) => setSortBy(value as any)}
              >
                <SelectTrigger className="w-full md:w-[180px] shadow-none border border-muted-foreground/10">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="name">Sort by Name</SelectItem>
                  <SelectItem value="efficiency">Sort by Efficiency</SelectItem>
                  <SelectItem value="bunCount">Sort by Bundle Count</SelectItem>
                  <SelectItem value="type">Sort by Garment Type</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={handleRefresh}
              disabled={loading}
              className="border border-muted-foreground/10 shadow-none"
            >
              <RefreshCw
                className={`h-4 w-4 mr-2 ${loading ? 'animate-spin' : ''}`}
              />
              Refresh
            </Button>
            <Link to={`/boards/${boardId}/edit`}>
              <Button
                variant="outline"
                size="sm"
                className="border border-muted-foreground/10 shadow-none"
              >
                <Edit className="h-4 w-4 mr-2" />
                Edit
              </Button>
            </Link>
            <Button
              variant="outline"
              size="sm"
              onClick={handleExport}
              className="border border-muted-foreground/10 shadow-none"
            >
              <Download className="h-4 w-4 mr-2" />
              Export
            </Button>
            <Link to={`/boards/${boardId}/view`} target="_blank">
              <Button size="sm">TV View</Button>
            </Link>
          </div>
        </div>
        <CardContent className="border border-muted-foreground/10 rounded-md p-4">
          <div className="grid grid-cols-4 gap-4">
            {board?.sewingLines.map((line) => (
              <BoardCard
                key={line.id}
                sewingLine={line}
                previousStatus={prevStatusesRef.current[line.id]}
              />
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

function formatTime(date: Date): string {
  return new Intl.DateTimeFormat('en-US', {
    hour: 'numeric',
    minute: 'numeric',
    hour12: true,
  }).format(date);
}

function generateMockBoardData(boardId: string): BoardData {
  const statuses: Array<'Excess' | 'Standard' | 'Low' | 'Timeout'> = [
    'Excess',
    'Standard',
    'Low',
    'Timeout',
  ];
  const garmentTypes: Array<
    'BRA' | 'BRIEF' | 'SHIRT' | 'PANTS' | 'DRESS' | 'OTHER'
  > = ['BRA', 'BRIEF', 'SHIRT', 'PANTS', 'DRESS', 'OTHER'];
  const buyers = [
    'Fashion Inc.',
    'Style Co.',
    'Apparel Global',
    'Textile Masters',
    'Garment World',
  ];
  const styleNames = [
    'Classic Fit',
    'Slim Cut',
    'Relaxed Fit',
    'Modern Style',
    'Comfort Fit',
  ];

  const lineCount = boardId === 'board-1' ? 12 : boardId === 'board-2' ? 16 : 8;

  return {
    id: boardId,
    name:
      boardId === 'board-1'
        ? 'Floor A Kanban'
        : boardId === 'board-2'
        ? 'Floor B Kanban'
        : 'Priority Lines',
    description: `Monitoring sewing lines for ${boardId}`,
    sewingLines: Array.from({ length: lineCount }, (_, i) => {
      const targetCount = Math.floor(Math.random() * 50) + 100;
      const status = statuses[Math.floor(Math.random() * statuses.length)];
      const type =
        garmentTypes[Math.floor(Math.random() * garmentTypes.length)];

      let bunCount, pacCount;

      switch (status) {
        case 'Excess':
          bunCount = targetCount + Math.floor(Math.random() * 30) + 10;
          pacCount = bunCount - Math.floor(Math.random() * 20);
          break;
        case 'Standard':
          bunCount = targetCount - Math.floor(Math.random() * 10);
          pacCount = bunCount - Math.floor(Math.random() * 15);
          break;
        case 'Low':
          bunCount = targetCount - Math.floor(Math.random() * 30) - 10;
          pacCount = bunCount - Math.floor(Math.random() * 10);
          break;
        case 'Timeout':
          bunCount = targetCount - Math.floor(Math.random() * 20);
          pacCount = bunCount - Math.floor(Math.random() * 10);
          break;
        default:
          bunCount = targetCount;
          pacCount = bunCount - 10;
      }

      // Generate random times for the day
      const now = new Date();
      const startTime = new Date(now);
      startTime.setHours(
        8 + Math.floor(Math.random() * 3),
        Math.floor(Math.random() * 60),
        0
      );

      const endTime = new Date(startTime);
      endTime.setHours(endTime.getHours() + 8 + Math.floor(Math.random() * 2));

      return {
        id: `line-${i + 1}`,
        name: `Sewing Line ${i + 1}`,
        status,
        bunCount: Math.max(0, bunCount),
        pacCount: Math.max(0, pacCount),
        targetCount,
        lastActivity: new Date(
          Date.now() - Math.floor(Math.random() * 3600000)
        ).toISOString(),
        efficiency: Math.floor(Math.random() * 40) + 60,
        type,
        plan: {
          contractNumber: `C-${10000 + Math.floor(Math.random() * 90000)}`,
          styleNumber: `S-${1000 + Math.floor(Math.random() * 9000)}`,
          styleName: styleNames[Math.floor(Math.random() * styleNames.length)],
          buyer: buyers[Math.floor(Math.random() * buyers.length)],
          startTime: startTime.toISOString(),
          endTime: endTime.toISOString(),
          targetPerHour: Math.floor(Math.random() * 30) + 50,
          totalTarget: targetCount,
        },
      };
    }),
  };
}
