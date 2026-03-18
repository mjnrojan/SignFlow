import { useState, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { ShieldCheck, X, ShieldAlert } from 'lucide-react';

interface SealUploadProps {
  onSave: (dataUrl: string) => void;
}

export function SealUpload({ onSave }: SealUploadProps) {
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

  const clear = () => {
    setPreview(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleSave = () => {
    if (preview) {
      onSave(preview);
    }
  };

  return (
    <div className="space-y-4">
      {!preview ? (
        <div 
          onClick={() => fileInputRef.current?.click()}
          className="h-52 border border-dashed border-secondary/30 rounded-xl flex flex-col items-center justify-center gap-3 bg-secondary/5 hover:bg-secondary/10 hover:border-secondary transition-all cursor-pointer group"
        >
          <div className="size-12 bg-background rounded-full shadow-md flex items-center justify-center group-hover:rotate-12 transition-transform border border-secondary/20">
            <ShieldCheck className="size-6 text-secondary" />
          </div>
          <div className="text-center px-4">
             <p className="text-xs font-bold font-['Fraunces'] text-foreground">Upload Official Company Seal</p>
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
        <div className="space-y-3 animate-in fade-in slide-in-from-bottom-2 duration-300">
          <div className="relative h-52 border border-border rounded-xl bg-white dark:bg-slate-950 flex items-center justify-center p-6 overflow-hidden">
             <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-secondary/5 to-transparent"></div>
             <img src={preview} alt="Seal Preview" className="max-w-full max-h-full object-contain relative z-10 opacity-80" />
             <Button 
              variant="destructive" 
              size="icon" 
              className="absolute top-2 right-2 size-7 rounded-lg z-20"
              onClick={clear}
             >
                <X className="size-3" />
             </Button>
          </div>
          <div className="bg-secondary/5 border border-secondary/10 p-2.5 rounded-lg flex items-start gap-2.5">
             <ShieldAlert className="size-3.5 text-secondary shrink-0 mt-0.5" />
             <p className="text-[8px] text-secondary/80 font-bold uppercase tracking-wider leading-relaxed">
               Applied at 80% opacity to mimic real stamp ink.
             </p>
          </div>
        </div>
      )}
 
      <Button 
        className="w-full rounded-xl h-11 font-bold bg-secondary hover:bg-secondary/90 text-white shadow-lg shadow-secondary/10 transition-all active:scale-[0.98]" 
        onClick={handleSave}
        disabled={!preview}
      >
        Attach Official Seal
      </Button>
    </div>
  );
}
