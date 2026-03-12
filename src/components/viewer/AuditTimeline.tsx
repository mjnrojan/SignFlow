import { History, User, Monitor, Globe, ChevronDown, ChevronUp } from 'lucide-react';
import { useState } from 'react';
import type { IAuditLog } from '@/types/audit.types';

interface AuditTimelineProps {
  logs: IAuditLog[];
}

export function AuditTimeline({ logs }: AuditTimelineProps) {
  const [expandedLog, setExpandedLog] = useState<string | null>(null);

  if (!logs || logs.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-12 text-center">
        <div className="bg-muted size-12 rounded-full flex items-center justify-center mb-4">
          <History className="size-6 text-muted-foreground" />
        </div>
        <p className="text-sm font-medium font-['Fraunces']">No activity found</p>
        <p className="text-xs text-muted-foreground font-['Syne']">Updates will appear here in real-time.</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-bold uppercase tracking-widest text-muted-foreground font-['Syne']">
          Detailed Activity History
        </h3>
        <span className="text-[10px] text-primary font-bold bg-primary/10 px-2 py-0.5 rounded-full">
          {logs.length} Events
        </span>
      </div>

      <div className="relative">
        <div className="absolute left-4 top-0 bottom-0 w-px bg-border z-0"></div>
        
        <div className="space-y-8 relative z-10">
          {logs.map((log) => (
            <div key={log.id} className="flex gap-4 group">
              {/* Timeline dot */}
              <div className="size-8 rounded-full bg-background border-2 border-primary flex items-center justify-center shrink-0 shadow-sm ring-4 ring-background">
                <History className="size-4 text-primary" />
              </div>

              {/* Log content */}
              <div className="flex-1 pt-1 min-w-0">
                <div className="flex items-start justify-between gap-4">
                  <div className="min-w-0">
                    <p className="text-sm font-bold text-foreground leading-tight hover:text-primary transition-colors cursor-pointer">
                      {log.action}
                    </p>
                    <div className="flex items-center gap-2 mt-1">
                      <p className="text-[10px] text-muted-foreground font-medium uppercase font-['DM Mono']">
                        {new Date(log.timestamp).toLocaleDateString()} at {new Date(log.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </p>
                      <span className="text-border">•</span>
                      <p className="text-[10px] font-bold text-primary truncate max-w-[120px]">
                        {log.userEmail?.split('@')[0]}
                      </p>
                    </div>
                  </div>
                  <button 
                    onClick={() => setExpandedLog(expandedLog === log.id ? null : log.id)}
                    className="p-1 rounded-md hover:bg-muted text-muted-foreground transition-colors shrink-0"
                  >
                    {expandedLog === log.id ? <ChevronUp className="size-4" /> : <ChevronDown className="size-4" />}
                  </button>
                </div>

                {/* Expanded Details */}
                {expandedLog === log.id && (
                  <div className="mt-3 p-3 bg-muted/40 border border-border rounded-xl space-y-2 animate-in slide-in-from-top-2 duration-300">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-[11px]">
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <User className="size-3" />
                        <span className="font-bold text-foreground truncate">{log.userEmail}</span>
                      </div>
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <Globe className="size-3" />
                        <span>IP: <span className="text-foreground">{log.ipAddress || 'Unknown'}</span></span>
                      </div>
                      {log.deviceInfo && (
                        <div className="flex items-center gap-2 text-muted-foreground md:col-span-2">
                          <Monitor className="size-3" />
                          <span className="truncate">{log.deviceInfo}</span>
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
