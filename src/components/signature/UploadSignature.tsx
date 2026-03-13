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
    <div className="space-y-6">
      {!preview ? (
        <div 
          onClick={() => fileInputRef.current?.click()}
          className="h-64 border-2 border-dashed border-border rounded-2xl flex flex-col items-center justify-center gap-4 bg-muted/10 hover:bg-muted/20 hover:border-primary/30 transition-all cursor-pointer group"
        >
          <div className="size-16 bg-background rounded-2xl shadow-xl flex items-center justify-center group-hover:scale-110 transition-transform">
            <Upload className="size-8 text-primary" />
          </div>
          <div className="text-center">
             <p className="text-sm font-bold font-['Fraunces'] text-foreground">Upload image of signature</p>
             <p className="text-[10px] text-muted-foreground font-['Syne'] mt-1">PNG, JPG up to 5MB. Transparent background preferred.</p>
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
        <div className="space-y-4">
          <div className="relative h-64 border border-border rounded-xl bg-white dark:bg-slate-900 flex items-center justify-center p-8 overflow-hidden">
             <img src={preview} alt="Signature Preview" className="max-w-full max-h-full object-contain" />
             <Button 
              variant="destructive" 
              size="icon" 
              className="absolute top-2 right-2 size-8 rounded-full"
              onClick={clear}
             >
                <X className="size-4" />
             </Button>
          </div>
          <div className="flex items-center gap-2 text-[10px] font-bold text-muted-foreground uppercase tracking-widest bg-muted/30 p-2 rounded-lg">
             <FileImage className="size-4 text-primary" />
             Image Preview Ready
          </div>
        </div>
      )}

      <Button 
        className="w-full rounded-xl h-12 font-bold" 
        onClick={handleSave}
        disabled={!preview}
      >
        Use this Image
      </Button>
    </div>
  );
}
