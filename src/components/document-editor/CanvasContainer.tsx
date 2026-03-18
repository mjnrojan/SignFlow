import { useState, useRef } from 'react';
import { Document, Page } from 'react-pdf';
import { useDroppable } from '@dnd-kit/core';
import { ChevronLeft, ChevronRight, ZoomIn, ZoomOut, Loader2, ShieldCheck } from 'lucide-react';
import { FieldOverlay } from './FieldOverlay';
import { type IDocumentField } from '@/types/document.types';
import { useRecipientStore } from '@/lib/stores/useRecipientStore';
import 'react-pdf/dist/Page/AnnotationLayer.css';
import 'react-pdf/dist/Page/TextLayer.css';

interface CanvasContainerProps {
  fileUrl: string;
  fields: IDocumentField[];
  activeFieldId?: string | null;
  onSelectField: (id: string, force?: boolean) => void;
  onRemoveField: (id: string) => void;
  onUpdateField?: (id: string, updates: any) => void;
}

export function CanvasContainer({ fileUrl, fields, activeFieldId, onSelectField, onRemoveField, onUpdateField }: CanvasContainerProps) {
  const { getRecipientById } = useRecipientStore();
  const [numPages, setNumPages] = useState<number>(0);
  const [pageNumber, setPageNumber] = useState<number>(1);
  const [scale, setScale] = useState<number>(1.0);
  const [pageDimensions, setPageDimensions] = useState({ width: 0, height: 0 });
  const containerRef = useRef<HTMLDivElement>(null);
  const pageRef = useRef<HTMLDivElement>(null);

  const { setNodeRef, isOver } = useDroppable({
    id: `droppable-page-${pageNumber}`,
    data: { pageNumber }
  });

  const onDocumentLoadSuccess = ({ numPages }: { numPages: number }) => {
    setNumPages(numPages);
    setPageNumber(1);
  };

  const onPageLoadSuccess = (page: any) => {
    setPageDimensions({
      width: page.width || pageRef.current?.offsetWidth || 600,
      height: page.height || pageRef.current?.offsetHeight || 800
    });
  };

  const onDocumentLoadError = () => {
    setPageDimensions({ width: 600, height: 800 });
  };

  const handleZoom = (direction: 'in' | 'out') => {
    setScale(prev => {
      if (direction === 'in' && prev < 2.5) return prev + 0.1;
      if (direction === 'out' && prev > 0.5) return prev - 0.1;
      return prev;
    });
  };

  return (
    <div className="flex-1 bg-[#F1F3F5] dark:bg-[#0F1115] relative overflow-hidden flex flex-col h-full animate-in fade-in duration-500">
      {/* Zoom & Page Navigation Overlay */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex items-center gap-6 bg-card/80 backdrop-blur-xl border border-white/20 px-8 py-4 rounded-[2.5rem] shadow-2xl z-50 animate-in slide-in-from-bottom-6 duration-700">
         <div className="flex items-center gap-2 pr-6 border-r border-border/50">
            <button 
              disabled={pageNumber <= 1}
              onClick={() => setPageNumber(prev => Math.max(1, prev - 1))}
              className="p-2 hover:bg-muted disabled:opacity-20 rounded-full transition-all"
            >
               <ChevronLeft className="size-5" />
            </button>
            <span className="text-xs font-bold uppercase tracking-widest font-['DM Mono'] min-w-[60px] text-center">
               {pageNumber} / {numPages || '...'}
            </span>
            <button 
              disabled={pageNumber >= numPages}
              onClick={() => setPageNumber(prev => Math.min(numPages, prev + 1))}
              className="p-2 hover:bg-muted disabled:opacity-20 rounded-full transition-all"
            >
               <ChevronRight className="size-5" />
            </button>
         </div>

         <div className="flex items-center gap-4 pl-2">
            <button onClick={() => handleZoom('out')} className="p-2 hover:bg-muted rounded-full transition-colors">
               <ZoomOut className="size-5 text-muted-foreground" />
            </button>
            <span className="text-xs font-bold font-['DM Mono'] text-primary min-w-[40px] text-center">
               {Math.round(scale * 100)}%
            </span>
            <button onClick={() => handleZoom('in')} className="p-2 hover:bg-muted rounded-full transition-colors">
               <ZoomIn className="size-5 text-muted-foreground" />
            </button>
         </div>
      </div>

      {/* Main Canvas Scroll Area */}
      <div 
        ref={containerRef}
        className="flex-1 overflow-auto p-12 flex justify-center custom-scrollbar scroll-smooth"
      >
        <div 
          ref={setNodeRef}
          className={`
            relative shadow-[0_30px_90px_rgba(0,0,0,0.1)] dark:shadow-[0_30px_90px_rgba(0,0,0,0.3)] transition-all duration-300 transform-gpu bg-white dark:bg-slate-900
            ${isOver ? 'ring-8 ring-primary/10 scale-[1.005]' : ''}
          `}
          style={{ 
            width: pageDimensions.width * scale || (numPages === 0 ? 600 : 'auto'), 
            height: pageDimensions.height * scale || (numPages === 0 ? 800 : 'auto'),
            minWidth: numPages === 0 ? 600 : undefined,
            minHeight: numPages === 0 ? 800 : undefined
          }}
        >
          <Document 
            file={fileUrl} 
            onLoadSuccess={onDocumentLoadSuccess}
            onLoadError={onDocumentLoadError}
            loading={
               <div className="flex flex-col items-center justify-center p-20 space-y-4 min-h-[600px]">
                  <Loader2 className="size-12 animate-spin text-primary opacity-20" />
               </div>
            }
            error={
              <div className="absolute inset-0 flex flex-col items-center justify-center p-12 text-center space-y-4">
                 <div className="size-16 bg-muted rounded-2xl flex items-center justify-center mb-2">
                    <ShieldCheck className="size-8 text-muted-foreground opacity-20" />
                 </div>
                 <p className="text-sm font-bold font-['Fraunces'] text-muted-foreground">Preview Mode Active</p>
                 <p className="text-[10px] text-muted-foreground/60 max-w-[200px] font-['Syne']">
                    The PDF background could not be loaded, but you can still place and sign fields on this canvas.
                 </p>
              </div>
            }
          >
            <Page 
              pageNumber={pageNumber} 
              scale={scale} 
              inputRef={pageRef}
              onLoadSuccess={onPageLoadSuccess}
              className="relative shadow-lg ring-1 ring-border"
              renderTextLayer={false}
              renderAnnotationLayer={false}
            />
          </Document>

          {/* Draggable Interaction Layer */}
          <div 
            className="absolute inset-0 z-10 pointer-events-none"
          >
            {/* Placed Fields */}
            {fields.filter(f => f.position.pageNumber === pageNumber).map((field) => {
                const recipient = field.recipientId ? getRecipientById(field.recipientId) : null;
                return (
                  <FieldOverlay 
                    key={field.id} 
                    field={field} 
                    active={field.id === activeFieldId}
                    onSelect={onSelectField}
                    onRemove={onRemoveField}
                    onUpdate={onUpdateField}
                    color={recipient?.color}
                    recipientOrder={recipient?.order}
                    containerWidth={pageDimensions.width * scale || 600}
                    containerHeight={pageDimensions.height * scale || 800}
                  />
                );
            })}
          </div>
        </div>
      </div>
      
      {/* Background Decor */}
      <div className="absolute top-10 right-10 flex flex-col items-end gap-1 opacity-10 pointer-events-none">
         <div className="h-0.5 w-12 bg-primary"></div>
         <div className="h-0.5 w-24 bg-primary"></div>
         <div className="h-0.5 w-8 bg-primary"></div>
      </div>
    </div>
  );
}

