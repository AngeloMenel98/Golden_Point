export function ToursSkeleton() {
  return (
    <div className="space-y-4">
      {/* Header skeleton */}
      <div className="flex justify-between items-center mb-6">
        <div className="h-8 w-48 bg-gp-gray-light animate-pulse rounded" />
        <div className="h-10 w-32 bg-gp-gray-light animate-pulse rounded" />
      </div>

      {/* Search skeleton */}
      <div className="h-12 bg-gp-gray-light animate-pulse rounded-md" />
      
      {/* List skeleton */}
      <div className="bg-white rounded-lg border border-gp-gray-light overflow-hidden">
        {/* Row 1 */}
        <div className="flex items-center justify-between p-4 border-b border-gp-gray-light">
          <div className="flex-1 flex items-center gap-4">
            <div className="flex-1 space-y-2">
              <div className="h-5 w-32 bg-gp-gray-light animate-pulse rounded" />
              <div className="h-4 w-24 bg-gp-gray-light animate-pulse rounded" />
            </div>
            <div className="h-7 w-20 bg-gp-gray-light animate-pulse rounded" />
          </div>
          <div className="flex items-center gap-6">
            <div className="text-center space-y-1">
              <div className="h-5 w-6 bg-gp-gray-light animate-pulse rounded" />
              <div className="h-3 w-8 bg-gp-gray-light animate-pulse rounded" />
            </div>
            <div className="text-center space-y-1">
              <div className="h-5 w-6 bg-gp-gray-light animate-pulse rounded" />
              <div className="h-3 w-8 bg-gp-gray-light animate-pulse rounded" />
            </div>
          </div>
        </div>

        {/* Row 2 */}
        <div className="flex items-center justify-between p-4 border-b border-gp-gray-light">
          <div className="flex-1 flex items-center gap-4">
            <div className="flex-1 space-y-2">
              <div className="h-5 w-40 bg-gp-gray-light animate-pulse rounded" />
              <div className="h-4 w-28 bg-gp-gray-light animate-pulse rounded" />
            </div>
            <div className="h-7 w-20 bg-gp-gray-light animate-pulse rounded" />
          </div>
          <div className="flex items-center gap-6">
            <div className="text-center space-y-1">
              <div className="h-5 w-6 bg-gp-gray-light animate-pulse rounded" />
              <div className="h-3 w-8 bg-gp-gray-light animate-pulse rounded" />
            </div>
            <div className="text-center space-y-1">
              <div className="h-5 w-6 bg-gp-gray-light animate-pulse rounded" />
              <div className="h-3 w-8 bg-gp-gray-light animate-pulse rounded" />
            </div>
          </div>
        </div>

        {/* Row 3 */}
        <div className="flex items-center justify-between p-4">
          <div className="flex-1 flex items-center gap-4">
            <div className="flex-1 space-y-2">
              <div className="h-5 w-36 bg-gp-gray-light animate-pulse rounded" />
              <div className="h-4 w-20 bg-gp-gray-light animate-pulse rounded" />
            </div>
            <div className="h-7 w-20 bg-gp-gray-light animate-pulse rounded" />
          </div>
          <div className="flex items-center gap-6">
            <div className="text-center space-y-1">
              <div className="h-5 w-6 bg-gp-gray-light animate-pulse rounded" />
              <div className="h-3 w-8 bg-gp-gray-light animate-pulse rounded" />
            </div>
            <div className="text-center space-y-1">
              <div className="h-5 w-6 bg-gp-gray-light animate-pulse rounded" />
              <div className="h-3 w-8 bg-gp-gray-light animate-pulse rounded" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
