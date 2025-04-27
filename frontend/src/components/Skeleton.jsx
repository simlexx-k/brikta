export const Skeleton = () => (
  <div className="animate-pulse space-y-4">
    {[...Array(6)].map((_, i) => (
      <div key={i} className="h-20 bg-gray-100 rounded-lg" />
    ))}
  </div>
); 