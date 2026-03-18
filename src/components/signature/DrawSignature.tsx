import { useRef, useState } from 'react';
import SignatureCanvas from 'react-signature-canvas';
import { Button } from '@/components/ui/button';
import { RotateCcw } from 'lucide-react';
import { useTranslation } from 'react-i18next';

interface DrawSignatureProps {
  onSave: (dataUrl: string) => void;
}

export function DrawSignature({ onSave }: DrawSignatureProps) {
  const { t } = useTranslation();
  const [isSaving, setIsSaving] = useState(false);
  const sigCanvas = useRef<SignatureCanvas>(null);

  const clear = () => {
    sigCanvas.current?.clear();
  };

  const save = () => {
    const canvas = sigCanvas.current;
    if (!canvas || isSaving) return;
    
    setIsSaving(true);
    console.log('[DrawSignature] Attempting capture...');

    try {
      const trimmedCanvas = canvas.getTrimmedCanvas();
      const dataUrl = trimmedCanvas.toDataURL('image/png');
      
      if (dataUrl && dataUrl.length > 100) {
        console.log('[DrawSignature] Success, calling onSave');
        onSave(dataUrl);
      } else {
        console.log('[DrawSignature] Empty trim, using raw');
        onSave(canvas.getCanvas().toDataURL('image/png'));
      }
    } catch (err) {
      console.error('[DrawSignature] Capture error:', err);
      setIsSaving(false);
    }
    
    // Safety timeout to reset the button if the modal doesn't close for some reason
    setTimeout(() => setIsSaving(false), 2000);
  };

  return (
    <div className="space-y-4">
      <div className="relative h-52 w-full bg-white dark:bg-[#020617] border border-border rounded-xl overflow-hidden group shadow-inner">
        <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] dark:bg-[radial-gradient(#1e293b_1px,transparent_1px)] [background-size:20px_20px] opacity-10"></div>
        <SignatureCanvas
          ref={sigCanvas}
          penColor="#1D4ED8"
          canvasProps={{
            className: 'w-full h-full cursor-crosshair relative z-10',
          }}
        />
        <div className="absolute top-3 right-3 z-20">
          <Button
            type="button"
            variant="secondary"
            size="sm"
            disabled={isSaving}
            onClick={(e) => {
              e.preventDefault();
              clear();
            }}
            className="h-7 px-3 gap-1.5 rounded-lg bg-background/80 backdrop-blur-sm border shadow-sm font-bold text-[9px] uppercase tracking-wider hover:bg-background"
          >
            <RotateCcw className="size-2.5" />
            Clear
          </Button>
        </div>
        
        {/* Visual cues */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-muted-foreground/20 pointer-events-none select-none z-0">
           <p className="text-2xl font-['Fraunces'] font-black italic opacity-10 uppercase tracking-tighter">Sign Here</p>
        </div>
      </div>
      
      <div className="flex items-center gap-2 text-[8px] text-muted-foreground font-bold uppercase tracking-[0.2em] px-1 opacity-60">
        <div className="h-px flex-1 bg-border/50"></div>
        <span>{t?.('editor.fields.signature') || 'Biometric Signature Pad'}</span>
        <div className="h-px flex-1 bg-border/50"></div>
      </div>

      <Button 
        type="button"
        disabled={isSaving}
        className="w-full rounded-xl h-11 font-bold shadow-lg shadow-primary/10 bg-primary text-white hover:bg-primary/90 transition-all active:scale-[0.98]" 
        onClick={(e) => {
          e.preventDefault();
          save();
        }}
      >
        {isSaving ? 'Processing...' : 'Adopt and Sign'}
      </Button>
    </div>
  );
}
