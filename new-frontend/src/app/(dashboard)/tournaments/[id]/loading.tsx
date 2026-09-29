export default function Loading() {
  return (
    <div className="bg-white rounded-lg shadow-sm border border-gp-gray-light p-6 animate-pulse">
      {/* Header skeleton */}
      <div className="flex items-start justify-between mb-6">
        <div>
          <div className="h-8 w-64 bg-gp-gray-light animate-pulse rounded mb-2" />
          <div className="h-4 w-32 bg-gp-gray-light animate-pulse rounded" />
        </div>
        <div className="flex items-center gap-3">
          <div className="h-10 w-36 bg-gp-gray-light animate-pulse rounded" />
          <div className="h-7 w-24 bg-gp-gray-light animate-pulse rounded-full" />
        </div>
      </div>

      {/* Stats grid skeleton */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="bg-gp-light/50 rounded-lg p-4">
            <div className="h-4 w-20 bg-gp-gray-light animate-pulse rounded mb-2" />
            <div className="h-7 w-12 bg-gp-gray-light animate-pulse rounded" />
          </div>
        ))}
      </div>

      {/* Categories skeleton */}
      <div className="mb-6">
        <div className="h-6 w-24 bg-gp-gray-light animate-pulse rounded mb-3" />
        <div className="flex flex-wrap gap-2">
          <div className="h-7 w-20 bg-gp-gray-light animate-pulse rounded-full" />
          <div className="h-7 w-24 bg-gp-gray-light animate-pulse rounded-full" />
          <div className="h-7 w-16 bg-gp-gray-light animate-pulse rounded-full" />
        </div>
      </div>

      {/* Teams skeleton */}
      <div>
        <div className="h-6 w-40 bg-gp-gray-light animate-pulse rounded mb-3" />
        <div className="space-y-2">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="flex items-center justify-between p-3 bg-gp-light/30 rounded-lg"
            >
              <div className="h-5 w-32 bg-gp-gray-light animate-pulse rounded" />
              <div className="flex items-center gap-3">
                <div className="h-4 w-12 bg-gp-gray-light animate-pulse rounded" />
                <div className="h-6 w-6 bg-gp-gray-light animate-pulse rounded" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
