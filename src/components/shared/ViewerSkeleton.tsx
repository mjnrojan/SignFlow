export function ViewerSkeleton() {
  return (
    <div className="h-screen flex flex-col bg-background overflow-hidden animate-pulse">
      {/* Fake Header */}
      <div className="h-16 border-b border-border bg-card flex justify-between items-center px-4 shrink-0">
        <div className="flex items-center gap-4">
          <div className="w-8 h-8 rounded-full bg-muted"></div>
          <div className="space-y-2">
            <div className="h-4 w-40 bg-muted rounded"></div>
            <div className="h-3 w-64 bg-muted rounded"></div>
          </div>
        </div>
        <div className="flex gap-2">
          <div className="h-9 w-20 bg-muted rounded-lg"></div>
          <div className="h-9 w-32 bg-muted rounded-lg"></div>
        </div>
      </div>

      <div className="flex-1 flex overflow-hidden">
        {/* Fake Canvas Center */}
        <div className="flex-1 bg-muted/30 p-8 flex justify-center overflow-auto">
          {/* Document Page */}
          <div className="w-full max-w-[800px] aspect-[1/1.4] bg-card border border-border shadow-md rounded-sm"></div>
        </div>

        {/* Fake Right Sidebar (Audit & Details) */}
        <div className="w-80 border-l border-border bg-card shrink-0 hidden lg:flex flex-col">
          {/* Tabs */}
          <div className="flex border-b border-border px-4 py-2">
            <div className="h-8 w-20 bg-muted rounded-md mr-2"></div>
            <div className="h-8 w-24 bg-muted/50 rounded-md"></div>
          </div>
          
          {/* Audit Trail Timeline */}
          <div className="p-4 space-y-6 flex-1 overflow-auto">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="flex gap-4">
                <div className="w-8 h-8 rounded-full bg-muted shrink-0 mt-1"></div>
                <div className="space-y-2 flex-1 pt-1">
                  <div className="h-4 w-full bg-muted rounded"></div>
                  <div className="h-3 w-3/4 bg-muted rounded"></div>
                  <div className="h-3 w-24 bg-muted rounded pt-2 opacity-50"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
