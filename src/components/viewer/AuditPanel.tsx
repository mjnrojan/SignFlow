import { X, Search, Info } from 'lucide-react';
import { AuditTimeline } from './AuditTimeline';
import { useAuditLogs } from '@/lib/hooks/useAuditLogs';
import { Skeleton } from '@/components/ui/skeleton';

interface AuditPanelProps {
  documentId?: string;
  onClose?: () => void;
}

export function AuditPanel({ documentId, onClose }: AuditPanelProps) {
  const { data: logs, isLoading } = useAuditLogs();

  // Filter logs by document ID if provided
  const filteredLogs = logs?.filter(log => !documentId || log.documentId === documentId) || [];

  return (
    <div className="flex flex-col h-full bg-card border-l border-border animate-in slide-in-from-right duration-500">
      {/* Panel Header */}
      <div className="p-6 border-b border-border flex items-center justify-between bg-muted/20">
        <div>
          <h2 className="text-xl font-bold font-['Fraunces'] text-foreground">Audit Log</h2>
          <p className="text-[10px] text-muted-foreground font-bold uppercase tracking-widest mt-1">
            Verification & Chain of Custody
          </p>
        </div>
        {onClose && (
          <button 
            onClick={onClose}
            className="p-2 hover:bg-muted rounded-full text-muted-foreground hover:text-foreground transition-all"
          >
            <X className="size-5" />
          </button>
        )}
      </div>

      {/* Info Banner */}
      <div className="m-4 p-3 bg-primary/5 border border-primary/20 rounded-xl flex gap-3 items-start">
        <Info className="size-4 text-primary mt-0.5 shrink-0" />
        <p className="text-[10px] leading-relaxed text-slate-600 dark:text-slate-400 font-['Syne']">
          This audit trail contains a complete record of all actions performed on this document. Each event is timestamped and linked to a verified user.
        </p>
      </div>

      {/* Audit Search */}
      <div className="px-6 pb-2">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
          <input 
            type="text" 
            placeholder="Search audit trail..." 
            className="w-full bg-muted/50 border border-transparent focus:border-primary/30 rounded-lg pl-10 pr-4 py-2 text-xs outline-none transition-all font-['Syne']"
          />
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-y-auto px-6 py-4 custom-scrollbar">
        {isLoading ? (
          <div className="space-y-8">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="flex gap-4">
                <Skeleton className="size-8 rounded-full shrink-0" />
                <div className="flex-1 space-y-2 py-1">
                  <Skeleton className="h-4 w-3/4 rounded-md" />
                  <Skeleton className="h-3 w-1/2 rounded-md" />
                </div>
              </div>
            ))}
          </div>
        ) : (
          <AuditTimeline logs={filteredLogs} />
        )}
      </div>

      {/* Panel Footer */}
      <div className="p-6 border-t border-border bg-muted/20">
        <button className="w-full py-3 bg-secondary hover:bg-secondary/90 text-white rounded-xl font-bold text-sm shadow-md transition-all active:scale-[0.98] font-['Syne'] flex items-center justify-center gap-2">
          Download Certified Log
        </button>
      </div>
    </div>
  );
}
