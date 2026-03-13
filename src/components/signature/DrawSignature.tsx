import { useRef } from 'react';
import SignatureCanvas from 'react-signature-canvas';
import { Button } from '@/components/ui/button';
import { RotateCcw } from 'lucide-react';

interface DrawSignatureProps {
  onSave: (dataUrl: string) => void;
}

export function DrawSignature({ onSave }: DrawSignatureProps) {
  const sigCanvas = useRef<SignatureCanvas>(null);

  const clear = () => {
    sigCanvas.current?.clear();
  };

  const save = () => {
    if (sigCanvas.current?.isEmpty()) return;
    const dataUrl = sigCanvas.current?.getTrimmedCanvas().toDataURL('image/png');
    if (dataUrl) {
      onSave(dataUrl);
    }
  };

  return (
    <div className="space-y-4">
      <div className="relative h-64 w-full bg-white dark:bg-slate-900 border-2 border-dashed border-border rounded-xl overflow-hidden group">
        <SignatureCanvas
          ref={sigCanvas}
          penColor="black"
          canvasProps={{
            className: 'w-full h-full cursor-crosshair',
          }}
        />
        <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
          <Button
            variant="ghost"
            size="icon"
            onClick={clear}
            className="size-8 rounded-full bg-background/80 backdrop-blur-sm"
          >
            <RotateCcw className="size-4" />
          </Button>
        </div>
      </div>
      <div className="flex justify-between items-center text-[10px] text-muted-foreground font-['Syne'] uppercase tracking-widest">
        <span>Draw your legal signature above</span>
        <Button 
          variant="link" 
          className="h-auto p-0 text-[10px] font-bold" 
          onClick={clear}
        >
          Clear Pad
        </Button>
      </div>
      <Button 
        className="w-full rounded-xl h-12 font-bold" 
        onClick={save}
      >
        Use this Signature
      </Button>
    </div>
  );
}
