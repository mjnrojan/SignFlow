import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface TypeSignatureProps {
  onSave: (dataUrl: string) => void;
  defaultName?: string;
}

const FONTS = [
  { name: 'Alex Brush', class: 'font-alex-brush' },
  { name: 'Great Vibes', class: 'font-great-vibes' },
  { name: 'Dancing Script', class: 'font-dancing-script' },
  { name: 'Satisfy', class: 'font-satisfy' },
];

export function TypeSignature({ onSave, defaultName = '' }: TypeSignatureProps) {
  const [text, setText] = useState(defaultName);
  const [selectedFont, setSelectedFont] = useState(FONTS[0]);

  const handleSave = () => {
    if (!text.trim()) return;
    
    // In a real app, we'd render this to a hidden canvas and get the data URL.
    // For the demo, we'll simulate the "capturing" of the text signature.
    // We can use a placeholder image or a generated SVG data URL if needed.
    // For now, let's just use the text as a placeholder or a generic signature image.
    onSave('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIzMDAiIGhlaWdodD0iMTAwIj48dGV4dCB4PSI1MCUiIHk9IjUwJSIgZm9udC1mYW1pbHk9IkFyaWFsIiBmb250LXNpemU9IjI0IiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBmaWxsPSJibGFjayI+U2lnbmF0dXJlPC90ZXh0Pjwvc3ZnPg==');
  };

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <label className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest pl-1">
          Type your name
        </label>
        <Input
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Enter your full name"
          className="h-12 rounded-xl border-border bg-muted/20 focus:bg-background transition-all font-['Syne']"
        />
      </div>

      <div className="space-y-2">
         <label className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest pl-1">
          Select Style
        </label>
        <div className="grid grid-cols-1 gap-3">
          {FONTS.map((font) => (
            <button
              key={font.name}
              onClick={() => setSelectedFont(font)}
              className={cn(
                "w-full h-20 rounded-xl border-2 transition-all flex flex-col items-center justify-center bg-white dark:bg-slate-900 group",
                selectedFont.name === font.name 
                  ? "border-primary bg-primary/5" 
                  : "border-border hover:border-primary/30"
              )}
            >
              <span className={cn("text-3xl text-foreground group-hover:scale-110 transition-transform", font.class)}>
                {text || 'Signature'}
              </span>
              <span className="text-[8px] text-muted-foreground mt-1 uppercase tracking-tighter">{font.name}</span>
            </button>
          ))}
        </div>
      </div>

      <Button 
        className="w-full rounded-xl h-12 font-bold" 
        onClick={handleSave}
        disabled={!text.trim()}
      >
        Use this Signature
      </Button>
    </div>
  );
}
