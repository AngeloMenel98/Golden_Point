export function TournamentsSkeleton() {
  return (
    <div className="space-y-6">
      {/* Header skeleton */}
      <div className="flex justify-between items-center mb-6">
        <div className="h-8 w-32 bg-gp-gray-light animate-pulse rounded" />
        <div className="h-10 w-40 bg-gp-gray-light animate-pulse rounded" />
      </div>

      {/* Tournament Cards Grid skeleton */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {/* Card 1 */}
        <div className="bg-white rounded-lg shadow-sm border border-gp-gray-light p-4">
          <div className="flex items-start justify-between mb-3">
            <div className="h-6 w-40 bg-gp-gray-light animate-pulse rounded" />
            <div className="h-6 w-16 bg-gp-gray-light animate-pulse rounded-full" />
          </div>
          <div className="flex items-center gap-4 text-sm mb-3">
            <div className="h-4 w-24 bg-gp-gray-light animate-pulse rounded" />
            <div className="h-4 w-20 bg-gp-gray-light animate-pulse rounded" />
          </div>
          <div className="flex gap-1 mb-3">
            <div className="h-5 w-16 bg-gp-gray-light animate-pulse rounded" />
            <div className="h-5 w-16 bg-gp-gray-light animate-pulse rounded" />
            <div className="h-5 w-10 bg-gp-gray-light animate-pulse rounded" />
          </div>
          <div className="pt-3 border-t border-gp-gray-light">
            <div className="h-9 w-full bg-gp-gray-light animate-pulse rounded" />
          </div>
        </div>

        {/* Card 2 */}
        <div className="bg-white rounded-lg shadow-sm border border-gp-gray-light p-4">
          <div className="flex items-start justify-between mb-3">
            <div className="h-6 w-36 bg-gp-gray-light animate-pulse rounded" />
            <div className="h-6 w-16 bg-gp-gray-light animate-pulse rounded-full" />
          </div>
          <div className="flex items-center gap-4 text-sm mb-3">
            <div className="h-4 w-24 bg-gp-gray-light animate-pulse rounded" />
            <div className="h-4 w-20 bg-gp-gray-light animate-pulse rounded" />
          </div>
          <div className="flex gap-1 mb-3">
            <div className="h-5 w-16 bg-gp-gray-light animate-pulse rounded" />
            <div className="h-5 w-16 bg-gp-gray-light animate-pulse rounded" />
          </div>
          <div className="pt-3 border-t border-gp-gray-light">
            <div className="h-9 w-full bg-gp-gray-light animate-pulse rounded" />
          </div>
        </div>

        {/* Card 3 */}
        <div className="bg-white rounded-lg shadow-sm border border-gp-gray-light p-4">
          <div className="flex items-start justify-between mb-3">
            <div className="h-6 w-32 bg-gp-gray-light animate-pulse rounded" />
            <div className="h-6 w-16 bg-gp-gray-light animate-pulse rounded-full" />
          </div>
          <div className="flex items-center gap-4 text-sm mb-3">
            <div className="h-4 w-24 bg-gp-gray-light animate-pulse rounded" />
            <div className="h-4 w-20 bg-gp-gray-light animate-pulse rounded" />
          </div>
          <div className="flex gap-1 mb-3">
            <div className="h-5 w-16 bg-gp-gray-light animate-pulse rounded" />
            <div className="h-5 w-16 bg-gp-gray-light animate-pulse rounded" />
            <div className="h-5 w-10 bg-gp-gray-light animate-pulse rounded" />
          </div>
          <div className="pt-3 border-t border-gp-gray-light">
            <div className="h-9 w-full bg-gp-gray-light animate-pulse rounded" />
          </div>
        </div>
      </div>
    </div>
  );
}
