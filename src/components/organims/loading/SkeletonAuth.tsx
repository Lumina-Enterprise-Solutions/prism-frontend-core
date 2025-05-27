import { Skeleton } from '../../atoms/Skeleton';

export default function SkeletonAuth() {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col items-center gap-2 text-center">
        <Skeleton className="w-48 h-6" />
        <Skeleton className="w-48 h-4" />
      </div>
      <div className="grid gap-4">
        <div className="grid grid-cols-2 gap-2">
          <div className="grid gap-2">
            <Skeleton className="w-24 h-4" />
            <Skeleton className="w-full h-10" />
          </div>
          <div className="grid gap-2">
            <Skeleton className="w-24 h-4" />
            <Skeleton className="w-full h-10" />
          </div>
        </div>
        <div className="grid gap-2">
          <Skeleton className="w-24 h-4" />
          <Skeleton className="w-full h-10" />
        </div>
        <div className="grid gap-2">
          <div className="flex items-center">
            <Skeleton className="w-24 h-4" />
          </div>
          <div className="relative">
            <Skeleton className="w-full h-10" />
          </div>
        </div>
        <div className="grid gap-2">
          <div className="flex items-center">
            <Skeleton className="w-24 h-4" />
          </div>
          <div className="relative">
            <Skeleton className="w-full h-10" />
          </div>
        </div>
      </div>
      <Skeleton className="w-full h-10" />
    </div>
  );
}
