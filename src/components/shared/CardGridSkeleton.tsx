export function CardGridSkeleton({ count = 8 }: { count?: number }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 animate-pulse">
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} className="bg-card border border-border rounded-xl p-5 shadow-sm space-y-4">
          <div className="flex gap-4">
            {/* Thumbnail Placeholder */}
            <div className="bg-muted w-16 h-20 rounded-lg shrink-0"></div>
            
            {/* Text Flow */}
            <div className="flex-1 space-y-2 py-1">
              <div className="h-4 bg-muted rounded-md w-3/4"></div>
              <div className="h-3 bg-muted rounded-md w-1/2"></div>
              
              <div className="pt-2 flex flex-wrap gap-2">
                <div className="h-5 bg-muted rounded-full w-16"></div>
                <div className="h-5 bg-muted rounded-full w-12"></div>
              </div>
            </div>
          </div>
          
          <div className="pt-4 border-t border-border flex justify-between items-center">
            <div className="flex -space-x-2">
              <div className="w-6 h-6 rounded-full bg-muted border-2 border-card"></div>
              <div className="w-6 h-6 rounded-full bg-muted border-2 border-card"></div>
            </div>
            <div className="h-3 bg-muted rounded w-20"></div>
          </div>
        </div>
      ))}
    </div>
  )
}
