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
      <DialogContent className="sm:max-w-[500px] border-none p-0 bg-card overflow-hidden shadow-2xl rounded-3xl">
        <DialogHeader className="p-8 pb-4 relative">
          <div className="absolute top-8 right-8 cursor-pointer text-muted-foreground hover:text-foreground transition-colors" onClick={onClose}>
             <X className="size-5" />
          </div>
          <DialogTitle className="text-2xl font-bold font-['Fraunces'] text-foreground">
            {type === 'seal' ? 'Apply Official Seal' : 'Adopt a Signature'}
          </DialogTitle>
          <DialogDescription className="text-xs text-muted-foreground font-['Syne'] mt-2">
            {type === 'seal' 
              ? 'Upload your registered company stamp or official seal.' 
              : 'Sign however you want. Your legal identity is secured via SignFlow Nepal.'}
          </DialogDescription>
        </DialogHeader>

        <div className="px-8 pb-10">
          {type === 'signature' ? (
            <Tabs defaultValue="draw" className="w-full">
              <TabsList className="grid w-full grid-cols-3 h-12 bg-muted/30 p-1.5 rounded-xl mb-8">
                <TabsTrigger value="draw" className="text-[10px] font-bold uppercase tracking-widest gap-2">
                  <PenTool className="size-3" />
                  Draw
                </TabsTrigger>
                <TabsTrigger value="type" className="text-[10px] font-bold uppercase tracking-widest gap-2">
                  <Type className="size-3" />
                  Type
                </TabsTrigger>
                <TabsTrigger value="upload" className="text-[10px] font-bold uppercase tracking-widest gap-2">
                  <Upload className="size-3" />
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
              <div className="flex items-center gap-2 mb-6 px-3 py-1.5 bg-secondary/5 border border-secondary/10 rounded-lg w-fit">
                <ShieldCheck className="size-3 text-secondary" />
                <span className="text-[10px] font-bold text-secondary uppercase tracking-widest">Seal Mode Active</span>
              </div>
              <SealUpload onSave={onSelect} />
            </div>
          )}

          <div className="mt-8 pt-6 border-t border-border flex items-center justify-between text-[9px] text-muted-foreground font-bold uppercase tracking-[0.2em]">
             <div className="flex items-center gap-2">
                <ShieldCheck className="size-3 text-primary" />
                Nepal E-Sign Compliant
             </div>
             <div className="opacity-50">v2.4.0-Secure</div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
