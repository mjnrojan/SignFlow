export function EditorSkeleton() {
  return (
    <div className="h-screen flex flex-col bg-background overflow-hidden animate-pulse">
      {/* Fake Header */}
      <div className="h-16 border-b border-border bg-card flex justify-between items-center px-4 shrink-0">
        <div className="flex items-center gap-4">
          <div className="w-8 h-8 rounded bg-muted"></div>
          <div className="space-y-2">
            <div className="h-4 w-48 bg-muted rounded"></div>
            <div className="h-3 w-32 bg-muted rounded"></div>
          </div>
        </div>
        <div className="flex gap-2">
          <div className="h-9 w-24 bg-muted rounded-lg"></div>
          <div className="h-9 w-24 bg-muted rounded-lg"></div>
        </div>
      </div>

      <div className="flex-1 flex overflow-hidden">
        {/* Fake Left Sidebar (Tools) */}
        <div className="w-64 border-r border-border bg-card p-4 shrink-0 hidden md:block space-y-4">
          <div className="h-5 w-32 bg-muted rounded mb-6"></div>
          
          <div className="space-y-3">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="flex gap-3 items-center">
                <div className="w-8 h-8 rounded-md bg-muted shrink-0"></div>
                <div className="h-4 flex-1 bg-muted rounded"></div>
              </div>
            ))}
          </div>
        </div>

        {/* Fake Canvas Center */}
        <div className="flex-1 bg-muted/30 p-8 flex justify-center overflow-auto">
          {/* Document Page */}
          <div className="w-full max-w-[800px] aspect-[1/1.4] bg-card border border-border rounded-sm shadow-md flex justify-center items-center">
            {/* Faint lines representing text */}
            <div className="w-3/4 space-y-6 opacity-30">
              <div className="h-4 bg-muted/60 w-1/3 mx-auto mb-12"></div>
              {Array.from({ length: 15 }).map((_, i) => (
                <div key={i} className={`h-2 bg-muted/50 w-full ${i % 3 === 0 ? 'w-5/6' : ''} ${i % 5 === 0 ? 'w-2/3' : ''}`}></div>
              ))}
            </div>
          </div>
        </div>

        {/* Fake Right Sidebar (Properties) */}
        <div className="w-72 border-l border-border bg-card p-4 shrink-0 hidden lg:block space-y-6">
          <div className="h-5 w-40 bg-muted rounded"></div>
          
          <div className="space-y-4 pt-4 border-t border-border">
            <div className="h-4 w-24 bg-muted rounded"></div>
            <div className="h-10 w-full bg-muted rounded-lg"></div>
          </div>
          
          <div className="space-y-4 pt-4 border-t border-border">
            <div className="h-4 w-32 bg-muted rounded"></div>
            <div className="flex gap-2">
              <div className="w-6 h-6 rounded bg-muted"></div>
              <div className="h-4 w-20 bg-muted rounded mt-1"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
