import { PenTool, Hash, Calendar, Type, ShieldCheck, Trash2 } from 'lucide-react';
import { FieldType, type IDocumentField } from '@/types/document.types';
import { useState, useRef, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { cn } from '@/lib/utils';

interface FieldOverlayProps {
  field: IDocumentField;
  active: boolean;
  onSelect: (id: string, force?: boolean) => void;
  onRemove: (id: string) => void;
  onUpdate?: (id: string, updates: any) => void;
  color?: string;
  recipientOrder?: number;
  containerWidth: number;
  containerHeight: number;
}

export function FieldOverlay({ 
  field, 
  active, 
  onSelect, 
  onRemove, 
  onUpdate,
  color = '#E8760A', 
  recipientOrder = 1,
  containerWidth,
  containerHeight
}: FieldOverlayProps) {
  const { t } = useTranslation();
  const [isResizing, setIsResizing] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const startPos = useRef({ x: 0, y: 0, width: 0, height: 0, initialX: 0, initialY: 0 });

  // Calculate pixel values based on percentages and container size
  const left = field.position.x * containerWidth;
  const top = field.position.y * containerHeight;
  const width = (field.position.width || 0.15) * containerWidth;
  const height = (field.position.height || 0.08) * containerHeight;

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

  const handleResizeStart = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsResizing(true);
    startPos.current = { 
      x: e.clientX, 
      y: e.clientY, 
      width: field.position.width || 0.15, 
      height: field.position.height || 0.08,
      initialX: field.position.x,
      initialY: field.position.y
    };
  };

  const handleDragStart = (e: React.MouseEvent) => {
    if (isResizing) return;
    e.stopPropagation();
    onSelect(field.id);
    setIsDragging(true);
    startPos.current = { 
      x: e.clientX, 
      y: e.clientY, 
      width: field.position.width || 0.15, 
      height: field.position.height || 0.08,
      initialX: field.position.x,
      initialY: field.position.y
    };
  };

  useEffect(() => {
    const handleMove = (e: MouseEvent) => {
      if (isResizing) {
        const deltaX = (e.clientX - startPos.current.x) / containerWidth;
        const deltaY = (e.clientY - startPos.current.y) / containerHeight;
        
        onUpdate?.(field.id, {
          position: {
            ...field.position,
            width: Math.max(0.05, startPos.current.width + deltaX),
            height: Math.max(0.03, startPos.current.height + deltaY)
          }
        });
      } else if (isDragging) {
        const deltaX = (e.clientX - startPos.current.x) / containerWidth;
        const deltaY = (e.clientY - startPos.current.y) / containerHeight;
        
        onUpdate?.(field.id, {
          position: {
            ...field.position,
            x: Math.max(0, Math.min(1 - (field.position.width || 0.15), startPos.current.initialX + deltaX)),
            y: Math.max(0, Math.min(1 - (field.position.height || 0.08), startPos.current.initialY + deltaY))
          }
        });
      }
    };

    const handleUp = () => {
      setIsResizing(false);
      setIsDragging(false);
    };

    if (isResizing || isDragging) {
      window.addEventListener('mousemove', handleMove);
      window.addEventListener('mouseup', handleUp);
    }

    return () => {
      window.removeEventListener('mousemove', handleMove);
      window.removeEventListener('mouseup', handleUp);
    };
  }, [isResizing, isDragging, containerWidth, containerHeight, field, onUpdate]);

  return (
    <div 
      onMouseDown={handleDragStart}
      className={`
        absolute pointer-events-auto cursor-move select-none group transition-all duration-200
        rounded-xl border-2 flex items-center justify-center shadow-sm
        ${active 
          ? 'bg-card border-primary shadow-xl ring-4 ring-primary/5 z-20 scale-[1.02]' 
          : 'border-slate-300 dark:border-slate-700 bg-white/90 dark:bg-slate-900/90 backdrop-blur-md border-dashed z-10'
        }
        ${isDragging || isResizing ? 'opacity-80 scale-105' : ''}
      `}
      style={{ 
        left, 
        top,
        width,
        height,
        borderColor: active ? color : undefined 
      }}
    >
      {/* Main Content Area */}
      <div className="relative w-full h-full p-2 flex items-center justify-center overflow-hidden">
        {field.value ? (
          <div className="w-full h-full flex items-center justify-center animate-in zoom-in-95 duration-300">
            <img 
              src={field.value} 
              alt={field.type} 
              className={cn(
                "max-w-full max-h-full object-contain pointer-events-none",
                field.type === FieldType.SEAL ? "rounded-full" : ""
              )}
            />
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center gap-1 w-full h-full overflow-hidden text-center relative group/inner">
            <div 
              className={`shrink-0 p-1.5 rounded-lg transition-colors ${active ? 'bg-primary text-primary-foreground shadow-lg' : 'bg-muted text-muted-foreground'}`}
              style={{ backgroundColor: active ? color : undefined }}
            >
              {getIcon()}
            </div>
            
            <div className="flex flex-col min-w-0">
              <span className={`text-[9px] font-bold uppercase tracking-widest leading-none truncate ${active ? 'text-primary' : 'text-muted-foreground'}`} style={{ color: active ? color : undefined }}>
                {t(`editor.fields.${field.type.toLowerCase()}`)}
              </span>
            </div>
          </div>
        )}
      </div>

      {/* Action Buttons for Active Field */}
      {active && !isDragging && !isResizing && (
        <div className="absolute -top-10 left-1/2 -translate-x-1/2 bg-card border border-border shadow-2xl rounded-lg py-1 px-1.5 flex items-center gap-1 animate-in zoom-in-90 fade-in duration-200 z-50">
          {(field.type === FieldType.SIGNATURE || field.type === FieldType.SEAL) && (
            <>
              <button 
                onMouseDown={(e) => { 
                  e.stopPropagation(); 
                  onSelect(field.id, true); // EXPLICITLY open modal
                }}
                className="p-1.5 bg-primary/10 hover:bg-primary/20 rounded text-primary transition-colors flex items-center gap-1.5 px-2.5"
                title={field.value ? t('common.edit') : t('common.sign')}
              >
                <PenTool className="size-3.5" />
                <span className="text-[10px] font-bold uppercase tracking-wider">
                  {field.value ? 'Change' : 'Sign'}
                </span>
              </button>
              <div className="w-px h-4 bg-border/50 mx-0.5"></div>
            </>
          )}
          
          <button 
            onMouseDown={(e) => { e.stopPropagation(); onRemove(field.id); }}
            className="p-1.5 hover:bg-destructive/10 rounded text-muted-foreground hover:text-destructive transition-colors"
            title={t('common.delete')}
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

      {/* Resize Handle */}
      {active && (
        <div 
          onMouseDown={handleResizeStart}
          className="absolute bottom-0 right-0 size-4 cursor-nwse-resize flex items-center justify-center group/resize"
        >
          <div className="size-2.5 bg-background border-2 border-primary rounded-full group-hover/resize:scale-125 transition-transform"></div>
        </div>
      )}
      
      {/* Visual Corners */}
      {active && (
        <>
          <div className="absolute top-0 left-0 size-1.5 bg-primary/20 rounded-full -translate-x-1/2 -translate-y-1/2"></div>
          <div className="absolute top-0 right-0 size-1.5 bg-primary/20 rounded-full translate-x-1/2 -translate-y-1/2"></div>
          <div className="absolute bottom-0 left-0 size-1.5 bg-primary/20 rounded-full -translate-x-1/2 translate-y-1/2"></div>
        </>
      )}
    </div>
  );
}
