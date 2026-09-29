'use client';

interface SkeletonProps {
  className?: string;
}

export function Skeleton({ className = '' }: SkeletonProps) {
  return (
    <div className={`animate-pulse bg-gp-gray-light/50 rounded ${className}`} />
  );
}

export function ClubFormCardSkeleton() {
  return (
    <div className="border-2 border-gp-dark rounded-xl p-6 relative bg-white opacity-70">
      <div className="grid grid-cols-2 gap-6">
        <div className="space-y-4">
          <div className="space-y-1">
            <Skeleton className="h-4 w-24" />
            <Skeleton className="h-10 w-full" />
          </div>
          <div className="space-y-1">
            <Skeleton className="h-4 w-20" />
            <Skeleton className="h-10 w-full" />
          </div>
          <div className="space-y-1">
            <Skeleton className="h-4 w-16" />
            <Skeleton className="h-10 w-1/3" />
          </div>
        </div>
        <div className="space-y-2">
          <Skeleton className="h-5 w-48" />
          <div className="space-y-3">
            <Skeleton className="h-10 w-full" />
            <Skeleton className="h-10 w-full" />
          </div>
        </div>
      </div>
      <div className="absolute -right-4 top-1/2 -translate-y-1/2">
        <Skeleton className="h-10 w-10 rounded-full" />
      </div>
    </div>
  );
}