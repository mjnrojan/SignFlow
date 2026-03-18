import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle,
  DialogDescription
} from '@/components/ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { DrawSignature } from './DrawSignature';
import { TypeSignature } from './TypeSignature';
import { UploadSignature } from './UploadSignature';
import { SealUpload } from './SealUpload';
import { PenTool, Type, Upload, ShieldCheck, X } from 'lucide-react';
interface SignatureModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelect: (dataUrl: string) => void;
  type: 'signature' | 'seal';
  defaultName?: string;
}

export function SignatureModal({ isOpen, onClose, onSelect, type, defaultName }: SignatureModalProps) {

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-sm w-[95vw] max-h-[95vh] overflow-y-auto border-none p-0 bg-background/98 dark:bg-slate-950/98 backdrop-blur-2xl rounded-2xl shadow-[0_32px_64px_-16px_rgba(0,0,0,0.3)] dark:shadow-[0_32px_64px_-16px_rgba(0,0,0,0.6)] animate-in zoom-in-95 duration-200 custom-scrollbar border border-white/10">
        <DialogHeader className="p-5 pb-1 relative text-center">
          <div className="absolute top-5 right-5 cursor-pointer text-muted-foreground hover:text-foreground transition-colors p-1" onClick={onClose}>
             <X className="size-3.5" />
          </div>
          <DialogTitle className="text-lg font-bold font-['Fraunces'] text-foreground tracking-tight">
            {type === 'seal' ? 'Apply Official Seal' : 'Adopt a Signature'}
          </DialogTitle>
          <DialogDescription className="text-[9px] text-muted-foreground font-['Syne'] mt-1 font-bold uppercase tracking-widest leading-relaxed">
            {type === 'seal' 
              ? 'Upload your registered company stamp or official seal.' 
              : 'Sign however you want. Your legal identity is secured via SignFlow Nepal.'}
          </DialogDescription>
        </DialogHeader>
 
        <div className="px-6 pb-8">
          {type === 'signature' ? (
            <Tabs defaultValue="draw" className="w-full">
              <TabsList className="grid w-full grid-cols-3 h-10 bg-muted/50 p-1 rounded-xl mb-6">
                <TabsTrigger value="draw" className="text-[9px] font-bold uppercase tracking-widest gap-1.5 data-[state=active]:bg-background data-[state=active]:shadow-sm">
                  <PenTool className="size-2.5" />
                  Draw
                </TabsTrigger>
                <TabsTrigger value="type" className="text-[9px] font-bold uppercase tracking-widest gap-1.5 data-[state=active]:bg-background data-[state=active]:shadow-sm">
                  <Type className="size-2.5" />
                  Type
                </TabsTrigger>
                <TabsTrigger value="upload" className="text-[9px] font-bold uppercase tracking-widest gap-1.5 data-[state=active]:bg-background data-[state=active]:shadow-sm">
                  <Upload className="size-2.5" />
                  Upload
                </TabsTrigger>
              </TabsList>
              
              <TabsContent value="draw" className="mt-0 animate-in fade-in slide-in-from-bottom-2 duration-300">
                <DrawSignature onSave={onSelect} />
              </TabsContent>
              
              <TabsContent value="type" className="mt-0 animate-in fade-in slide-in-from-bottom-2 duration-300">
                <TypeSignature onSave={onSelect} defaultName={defaultName} />
              </TabsContent>
              
              <TabsContent value="upload" className="mt-0 animate-in fade-in slide-in-from-bottom-2 duration-300">
                <UploadSignature onSave={onSelect} />
              </TabsContent>
            </Tabs>
          ) : (
            <div className="animate-in fade-in slide-in-from-bottom-2 duration-300">
              <div className="flex items-center gap-2 mb-4 px-2.5 py-1 bg-secondary/5 border border-secondary/10 rounded-lg w-fit">
                <ShieldCheck className="size-2.5 text-secondary" />
                <span className="text-[9px] font-bold text-secondary uppercase tracking-widest">Seal Mode Active</span>
              </div>
              <SealUpload onSave={onSelect} />
            </div>
          )}
 
          <div className="mt-6 pt-5 border-t border-border/50 flex items-center justify-between text-[8px] text-muted-foreground font-bold uppercase tracking-[0.2em] opacity-80">
             <div className="flex items-center gap-1.5">
                <ShieldCheck className="size-2.5 text-primary" />
                Nepal E-Sign Compliant
             </div>
             <div className="text-[7px]">v2.4.0-Secure</div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
