import { Skeleton } from '@/components/ui/skeleton';

export function EditorSkeleton() {
  return (
    <div className="h-screen flex flex-col bg-background overflow-hidden">
      {/* Top Bar */}
      <header className="h-16 border-b border-border bg-card flex justify-between items-center px-6 shrink-0 z-30">
        <div className="flex items-center gap-4">
          <Skeleton className="size-8 rounded-full" />
          <div className="h-6 w-px bg-border"></div>
          <div className="space-y-1.5">
            <Skeleton className="h-4 w-48" />
            <Skeleton className="h-3 w-32" />
          </div>
        </div>
        <div className="flex gap-3">
          <Skeleton className="h-9 w-28 rounded-xl" />
          <Skeleton className="h-9 w-36 rounded-xl" />
        </div>
      </header>

      <div className="flex-1 flex overflow-hidden">
        {/* Left Sidebar */}
        <div className="w-72 border-r border-border bg-card p-6 shrink-0 hidden md:flex flex-col space-y-8">
          <div className="flex gap-2 p-1 bg-muted/30 rounded-lg">
            <Skeleton className="h-10 flex-1 rounded-md" />
            <Skeleton className="h-10 flex-1 rounded-md" />
          </div>
          
          <div className="space-y-4">
            <Skeleton className="h-3 w-24 mb-6" />
            {Array.from({ length: 5 }).map((_, i) => (
              <div key={i} className="flex gap-3 items-center p-3 rounded-xl border border-transparent">
                <Skeleton className="size-8 rounded-lg shrink-0" />
                <Skeleton className="h-4 flex-1" />
              </div>
            ))}
          </div>

          <div className="mt-auto p-4 bg-muted/20 border border-border rounded-xl space-y-2">
             <Skeleton className="h-3 w-16" />
             <Skeleton className="h-3 w-full" />
             <Skeleton className="h-3 w-3/4" />
          </div>
        </div>

        {/* Canvas Area */}
        <div className="flex-1 bg-muted/20 p-12 flex justify-center items-start overflow-hidden relative">
          <div className="w-full max-w-[800px] aspect-[1/1.414] bg-card border border-border rounded-sm shadow-2xl flex flex-col p-16 space-y-8">
             <Skeleton className="h-12 w-2/3 mx-auto mb-12" />
             <div className="space-y-4">
                {Array.from({ length: 12 }).map((_, i) => (
                  <Skeleton key={i} className={`h-3 w-full ${i % 3 === 0 ? 'w-5/6' : ''} ${i % 7 === 0 ? 'w-4/5' : ''}`} />
                ))}
             </div>
             <div className="mt-auto flex justify-between pt-12">
                <Skeleton className="h-3 w-32" />
                <Skeleton className="h-3 w-24" />
             </div>
          </div>

          {/* Zoom Overlay */}
          <div className="absolute bottom-10 left-1/2 -translate-x-1/2 bg-card/80 backdrop-blur-xl border border-border px-8 py-4 rounded-[2.5rem] shadow-2xl flex items-center gap-6">
             <Skeleton className="h-8 w-24 rounded-full" />
             <div className="h-6 w-px bg-border"></div>
             <Skeleton className="h-8 w-24 rounded-full" />
          </div>
        </div>

        {/* Right Sidebar */}
        <div className="w-80 border-l border-border bg-card p-6 shrink-0 hidden lg:flex flex-col space-y-8">
          <div className="flex items-center justify-between">
             <div className="flex items-center gap-3">
                <Skeleton className="size-10 rounded-lg" />
                <Skeleton className="h-4 w-32" />
             </div>
             <Skeleton className="size-8 rounded-md" />
          </div>

          <div className="space-y-6">
             <Skeleton className="h-3 w-28" />
             <div className="space-y-3">
                <Skeleton className="h-20 w-full rounded-2xl" />
                <Skeleton className="h-20 w-full rounded-2xl" />
             </div>
             <Skeleton className="h-10 w-full rounded-xl" />
          </div>

          <div className="space-y-6 pt-8 border-t border-border">
             <Skeleton className="h-3 w-32" />
             <div className="p-4 border border-border rounded-2xl flex items-center justify-between">
                <div className="flex items-center gap-3">
                   <Skeleton className="size-5 rounded-full" />
                   <Skeleton className="h-4 w-24" />
                </div>
                <Skeleton className="w-10 h-6 rounded-full" />
             </div>
          </div>

          <div className="mt-auto">
             <Skeleton className="h-12 w-full rounded-2xl" />
          </div>
        </div>
      </div>
    </div>
  );
}
