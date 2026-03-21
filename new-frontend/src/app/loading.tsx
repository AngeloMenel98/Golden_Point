export default function Loading() {
  return (
    <div className="flex items-center justify-center min-h-[200px] w-full">
      <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-gp-pastel"></div>
      <span className="ml-3 font-medium text-gp-dark">Loading Golden Point...</span>
    </div>
  );
}
