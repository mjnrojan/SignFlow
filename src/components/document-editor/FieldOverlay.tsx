import { PenTool, Hash, Calendar, Type, ShieldCheck, Trash2, Settings2 } from 'lucide-react';
import { FieldType, type IDocumentField } from '@/types/document.types';

interface FieldOverlayProps {
  field: IDocumentField;
  active: boolean;
  onSelect: (id: string) => void;
  onRemove: (id: string) => void;
  color?: string;
  recipientOrder?: number;
}

export function FieldOverlay({ field, active, onSelect, onRemove, color = '#E8760A', recipientOrder = 1 }: FieldOverlayProps) {
  const getIcon = () => {
    switch (field.type) {
      case FieldType.SIGNATURE: return <PenTool className="size-3.5" />;
      case FieldType.INITIALS: return <Hash className="size-3.5" />;
      case FieldType.DATE: return <Calendar className="size-3.5" />;
      case FieldType.TEXT: return <Type className="size-3.5" />;
      case FieldType.SEAL: return <ShieldCheck className="size-3.5" />;
      default: return <PenTool className="size-3.5" />;
    }
  };

  return (
    <div 
      onClick={(e) => { e.stopPropagation(); onSelect(field.id); }}
      className={`
        absolute pointer-events-auto cursor-move select-none group transition-all duration-200
        px-4 py-2.5 rounded-xl border-2 flex items-center gap-2.5 shadow-sm min-w-[120px]
        ${active 
          ? 'bg-card border-primary shadow-xl ring-4 ring-primary/5 z-20 scale-[1.02]' 
          : 'border-slate-300 dark:border-slate-700 bg-white/90 dark:bg-slate-900/90 backdrop-blur-md border-dashed z-10'
        }
      `}
      style={{ 
        left: field.position.x, 
        top: field.position.y,
        borderColor: active ? color : undefined 
      }}
    >
      {/* Icon & Label */}
      <div 
        className={`shrink-0 p-1.5 rounded-lg transition-colors ${active ? 'bg-primary text-white' : 'bg-muted text-muted-foreground'}`}
        style={{ backgroundColor: active ? color : undefined }}
      >
        {getIcon()}
      </div>
      
      <div className="flex flex-col flex-1 min-w-0">
        <span className={`text-[10px] font-bold uppercase tracking-widest leading-none ${active ? 'text-primary' : 'text-muted-foreground'}`} style={{ color: active ? color : undefined }}>
          {field.type}
        </span>
        <span className="text-[9px] text-muted-foreground truncate opacity-70">
          Required Field
        </span>
      </div>

      {/* Action Buttons for Active Field */}
      {active && (
        <div className="absolute -top-10 left-1/2 -translate-x-1/2 bg-card border border-border shadow-2xl rounded-lg py-1 px-1.5 flex items-center gap-1 animate-in zoom-in-90 fade-in duration-200 z-50">
          <button 
            onClick={(e) => { e.stopPropagation(); }}
            className="p-1.5 hover:bg-muted rounded text-muted-foreground hover:text-foreground transition-colors"
          >
            <Settings2 className="size-3.5" />
          </button>
          <div className="w-px h-4 bg-border/50 mx-0.5"></div>
          <button 
            onClick={(e) => { e.stopPropagation(); onRemove(field.id); }}
            className="p-1.5 hover:bg-red-500/10 rounded text-muted-foreground hover:text-red-500 transition-colors"
          >
            <Trash2 className="size-3.5" />
          </button>
        </div>
      )}

      {/* Recipient Indicator */}
      <div 
        className="absolute -top-2.5 -right-2.5 size-6 rounded-full flex items-center justify-center border-2 border-background shadow-lg text-[9px] font-bold text-white transition-all group-hover:scale-110"
        style={{ backgroundColor: color }}
      >
        {recipientOrder}
      </div>

      {/* Resize Handles (Visual) */}
      {active && (
        <>
          <div className="absolute -top-1.5 -left-1.5 size-3 bg-white border-2 border-primary rounded-full shadow-sm"></div>
          <div className="absolute -top-1.5 -right-1.5 size-3 bg-white border-2 border-primary rounded-full shadow-sm"></div>
          <div className="absolute -bottom-1.5 -left-1.5 size-3 bg-white border-2 border-primary rounded-full shadow-sm"></div>
          <div className="absolute -bottom-1.5 -right-1.5 size-3 bg-white border-2 border-primary rounded-full shadow-sm"></div>
        </>
      )}
    </div>
  );
}
