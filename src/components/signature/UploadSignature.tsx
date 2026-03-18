import { useState, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Upload, X, FileImage } from 'lucide-react';

interface UploadSignatureProps {
  onSave: (dataUrl: string) => void;
}

export function UploadSignature({ onSave }: UploadSignatureProps) {
  const [preview, setPreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = () => {
    if (preview) {
      onSave(preview);
    }
  };

  const clear = () => {
    setPreview(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <div className="space-y-4">
      {!preview ? (
        <div 
          onClick={() => fileInputRef.current?.click()}
          className="h-52 border border-dashed border-border rounded-xl flex flex-col items-center justify-center gap-3 bg-muted/5 hover:bg-muted/10 hover:border-primary/20 transition-all cursor-pointer group"
        >
          <div className="size-12 bg-background rounded-xl shadow-md flex items-center justify-center group-hover:scale-105 transition-transform">
            <Upload className="size-5 text-primary" />
          </div>
          <div className="text-center px-4">
             <p className="text-xs font-bold font-['Fraunces'] text-foreground">Upload image of signature</p>
             <p className="text-[9px] text-muted-foreground font-['Syne'] mt-1 opacity-70">PNG, JPG up to 5MB. Transparent preferred.</p>
          </div>
          <input 
            type="file" 
            ref={fileInputRef} 
            className="hidden" 
            accept="image/*" 
            onChange={handleFileChange} 
          />
        </div>
      ) : (
        <div className="space-y-3">
          <div className="relative h-52 border border-border rounded-xl bg-white dark:bg-slate-950 flex items-center justify-center p-6 overflow-hidden">
             <img src={preview} alt="Signature Preview" className="max-w-full max-h-full object-contain" />
             <Button 
              variant="destructive" 
              size="icon" 
              className="absolute top-2 right-2 size-7 rounded-lg"
              onClick={clear}
             >
                <X className="size-3" />
             </Button>
          </div>
          <div className="flex items-center gap-2 text-[9px] font-bold text-muted-foreground uppercase tracking-widest bg-muted/20 p-2 rounded-lg">
             <FileImage className="size-3 text-primary" />
             Image Preview Ready
          </div>
        </div>
      )}
 
      <Button 
        className="w-full rounded-xl h-11 font-bold shadow-lg shadow-primary/10 bg-primary text-white hover:bg-primary/90 transition-all active:scale-[0.98]" 
        onClick={handleSave}
        disabled={!preview}
      >
        Use this Image
      </Button>
    </div>
  );
}
