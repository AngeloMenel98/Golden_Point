export default function MatchCardSkeleton() {
  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden animate-pulse">
      <div className="h-1 bg-gray-100" />
      <div className="flex gap-5 px-5 py-4">
        <div className="flex-1 flex flex-col gap-3">
          <div className="h-4 bg-gray-100 rounded w-2/3" />
          <div className="h-px bg-gray-100" />
          <div className="h-4 bg-gray-100 rounded w-1/2" />
        </div>
        <div className="w-px bg-gray-100" />
        <div className="w-44 flex flex-col gap-2">
          <div className="h-3 bg-gray-100 rounded w-full" />
          <div className="h-3 bg-gray-100 rounded w-3/4" />
          <div className="h-3 bg-gray-100 rounded w-1/2" />
        </div>
      </div>
    </div>
  );
}
