import { useState, useRef } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { useTranslation } from 'react-i18next';

interface TypeSignatureProps {
  onSave: (dataUrl: string) => void;
  defaultName?: string;
}

const FONTS = [
  { name: 'Alex Brush', family: '"Alex Brush", cursive', class: 'font-alex-brush' },
  { name: 'Great Vibes', family: '"Great Vibes", cursive', class: 'font-great-vibes' },
  { name: 'Dancing Script', family: '"Dancing Script", cursive', class: 'font-dancing-script' },
  { name: 'Satisfy', family: '"Satisfy", cursive', class: 'font-satisfy' },
];

export function TypeSignature({ onSave, defaultName = '' }: TypeSignatureProps) {
  const { t } = useTranslation();
  const [text, setText] = useState(defaultName);
  const [selectedFont, setSelectedFont] = useState(FONTS[0]);
  const [isSaving, setIsSaving] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const handleSave = () => {
    if (!text.trim() || isSaving) return;
    
    setIsSaving(true);
    const canvas = canvasRef.current;
    if (!canvas) {
      setIsSaving(false);
      return;
    }

    const ctx = canvas.getContext('2d');
    if (!ctx) {
      setIsSaving(false);
      return;
    }

    console.log('[TypeSignature] Rendering signature for:', text);

    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Set font style
    ctx.fillStyle = '#1D4ED8'; 
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.font = `60px ${selectedFont.family}`;
    
    // Render text
    ctx.fillText(text, canvas.width / 2, canvas.height / 2);

    try {
        const dataUrl = canvas.toDataURL('image/png');
        console.log('[TypeSignature] Success, length:', dataUrl.length);
        onSave(dataUrl);
    } catch (err) {
        console.error('[TypeSignature] Capture error:', err);
    }

    // Reset saving state after a delay if modal persists
    setTimeout(() => setIsSaving(false), 2000);
  };

  return (
    <div className="space-y-4">
      {/* Hidden canvas for rendering the signature */}
      <canvas 
        ref={canvasRef} 
        width={600} 
        height={200} 
        className="hidden"
      />
 
      <div className="space-y-1.5">
        <label className="text-[9px] font-bold text-muted-foreground uppercase tracking-widest pl-1 opacity-70">
          {t('settings.profile.fullName')}
        </label>
        <Input
          value={text}
          disabled={isSaving}
          onChange={(e) => setText(e.target.value)}
          placeholder="Enter your full name"
          className="h-10 rounded-xl border-border bg-muted/20 focus:bg-background transition-all font-['Syne'] text-xs"
        />
      </div>
 
      <div className="space-y-1.5">
         <label className="text-[9px] font-bold text-muted-foreground uppercase tracking-widest pl-1 opacity-70">
          Choose Script Style
        </label>
        <div className="grid grid-cols-1 gap-2 max-h-[160px] overflow-y-auto pr-1 custom-scrollbar">
          {FONTS.map((font) => (
            <button
              key={font.name}
              disabled={isSaving}
              onClick={() => setSelectedFont(font)}
              className={cn(
                "w-full h-14 shrink-0 rounded-xl border transition-all flex flex-col items-center justify-center bg-white dark:bg-slate-950 group relative overflow-hidden",
                selectedFont.name === font.name 
                  ? "border-primary bg-primary/5 shadow-sm" 
                  : "border-border hover:border-primary/20"
              )}
            >
              <span 
                className={cn("text-xl text-foreground group-hover:scale-105 transition-transform", font.class)}
                style={{ fontFamily: font.family }}
              >
                {text || 'Signature'}
              </span>
              <span className="text-[7px] text-muted-foreground mt-0.5 uppercase tracking-tighter opacity-50">{font.name}</span>
              {selectedFont.name === font.name && (
                <div className="absolute top-1 right-1 size-1.5 bg-primary rounded-full" />
              )}
            </button>
          ))}
        </div>
      </div>
 
      <Button 
        type="button"
        disabled={isSaving || !text.trim()}
        className="w-full rounded-xl h-11 font-bold shadow-lg shadow-primary/10 bg-primary text-white hover:bg-primary/90 transition-all active:scale-[0.98] mt-2" 
        onClick={(e) => {
          e.preventDefault();
          handleSave();
        }}
      >
        {isSaving ? 'Processing...' : 'Adopt and Sign'}
      </Button>
    </div>
  );
}
