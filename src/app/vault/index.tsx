import { useState, useEffect } from 'react';
import { useUserStore } from '@/lib/stores/useUserStore';
import { PageHeader } from '@/components/layout/PageHeader';
import { SignatureModal } from '@/components/signature/SignatureModal';
import { cn } from '@/lib/utils';
import { 
  PenLine, 
  Shield, 
  ShieldCheck, 
  X, 
  Fingerprint,
  Info
} from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function VaultPage() {
  const { user, updateUser } = useUserStore();
  const [isLoading, setIsLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalType, setModalType] = useState<'signature' | 'seal'>('signature');

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 400);
    return () => clearTimeout(timer);
  }, []);

  const handleSignatureSelect = (dataUrl: string) => {
    if (modalType === 'signature') {
      updateUser({ signatureBase64: dataUrl });
    } else {
      updateUser({ sealBase64: dataUrl });
    }
    setIsModalOpen(false);
  };

  if (isLoading) {
    return (
      <div className="flex flex-col min-h-full space-y-6 pb-20 animate-pulse">
        <div className="h-28 bg-muted rounded-[2.5rem] w-full" />
        <div className="h-24 bg-muted rounded-2xl w-full" />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-card border border-border rounded-3xl h-72" />
          <div className="bg-card border border-border rounded-3xl h-72" />
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-full space-y-6 pb-20 animate-in fade-in duration-700">
      <PageHeader 
        title="Signature Vault" 
        description="Manage your digital signatures and official company seals."
        actions={
          <div className="flex items-center gap-2 px-4 py-2 bg-primary/10 border border-primary/20 rounded-xl text-primary">
            <ShieldCheck className="size-4" />
            <span className="text-xs font-bold uppercase tracking-widest">Nepal E-Sign Compliant</span>
          </div>
        }
      />

      {/* Info Banner */}
      <div className="bg-primary/5 border border-primary/10 rounded-2xl p-6 flex flex-col md:flex-row items-center gap-6">
        <div className="size-14 bg-primary/10 rounded-2xl flex items-center justify-center shrink-0">
          <Fingerprint className="size-7 text-primary" />
        </div>
        <div className="flex-1 text-center md:text-left space-y-1">
          <h3 className="text-base font-bold font-['Fraunces']">Your identity, secured digitally</h3>
          <p className="text-sm text-muted-foreground font-['Syne']">
            Your signatures are encrypted and stored securely. They can be used across all documents in SignFlow Nepal.
          </p>
        </div>
        <Button variant="outline" className="rounded-xl font-bold gap-2 shrink-0">
          <Info className="size-4" /> Learn More
        </Button>
      </div>

      {/* Signature & Seal Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Default Signature Card */}
        <div 
          onClick={() => {
            setModalType('signature');
            setIsModalOpen(true);
          }}
          className={cn(
            "relative p-8 border-2 rounded-3xl flex flex-col items-center justify-center text-center space-y-4 transition-all cursor-pointer group overflow-hidden min-h-[280px]",
            user?.signatureBase64 
              ? "border-primary/20 bg-primary/5 hover:border-primary/40 hover:shadow-xl" 
              : "border-dashed border-border hover:border-primary/30 hover:shadow-lg"
          )}
        >
          {user?.signatureBase64 ? (
            <div className="w-full flex flex-col items-center animate-in zoom-in-95 duration-300">
              <div className="h-36 w-full flex items-center justify-center bg-white dark:bg-slate-900 rounded-2xl p-4 shadow-inner mb-4">
                <img src={user.signatureBase64} alt="Signature" className="max-h-full max-w-full object-contain" />
              </div>
              <p className="font-bold text-sm font-['Fraunces']">Default Signature</p>
              <p className="text-[10px] text-muted-foreground uppercase tracking-widest mt-1 font-['Syne']">Click to change</p>
              <button 
                onClick={(e) => {
                  e.stopPropagation();
                  updateUser({ signatureBase64: undefined });
                }}
                className="absolute top-3 right-3 p-2 text-muted-foreground hover:text-destructive transition-colors opacity-0 group-hover:opacity-100 bg-background/80 rounded-lg backdrop-blur-sm"
              >
                <X className="size-4" />
              </button>
            </div>
          ) : (
            <>
              <div className="size-20 bg-muted rounded-full flex items-center justify-center group-hover:bg-primary/10 transition-colors">
                <PenLine className="size-10 text-muted-foreground group-hover:text-primary transition-colors" />
              </div>
              <div>
                <p className="font-bold text-lg font-['Fraunces']">Default Signature</p>
                <p className="text-[10px] text-muted-foreground uppercase tracking-widest mt-1 font-bold">Not Set — Click to add</p>
              </div>
              <p className="text-xs text-muted-foreground font-['Syne'] max-w-[240px]">
                Draw, type, or upload your signature for use in document signing.
              </p>
            </>
          )}
        </div>

        {/* Official Seal Card */}
        <div 
          onClick={() => {
            setModalType('seal');
            setIsModalOpen(true);
          }}
          className={cn(
            "relative p-8 border-2 rounded-3xl flex flex-col items-center justify-center text-center space-y-4 transition-all cursor-pointer group overflow-hidden min-h-[280px]",
            user?.sealBase64 
              ? "border-secondary/20 bg-secondary/5 hover:border-secondary/40 hover:shadow-xl" 
              : "border-dashed border-border hover:border-secondary/30 hover:shadow-lg"
          )}
        >
          {user?.sealBase64 ? (
            <div className="w-full flex flex-col items-center animate-in zoom-in-95 duration-300">
              <div className="size-36 flex items-center justify-center bg-white dark:bg-slate-900 rounded-full p-6 shadow-inner mb-4">
                <img src={user.sealBase64} alt="Seal" className="max-h-full max-w-full object-contain" />
              </div>
              <p className="font-bold text-sm font-['Fraunces']">Official Company Seal</p>
              <p className="text-[10px] text-muted-foreground uppercase tracking-widest mt-1 font-['Syne']">Click to change</p>
              <button 
                onClick={(e) => {
                  e.stopPropagation();
                  updateUser({ sealBase64: undefined });
                }}
                className="absolute top-3 right-3 p-2 text-muted-foreground hover:text-destructive transition-colors opacity-0 group-hover:opacity-100 bg-background/80 rounded-lg backdrop-blur-sm"
              >
                <X className="size-4" />
              </button>
            </div>
          ) : (
            <>
              <div className="size-20 bg-muted rounded-full flex items-center justify-center group-hover:bg-secondary/10 transition-colors">
                <Shield className="size-10 text-muted-foreground group-hover:text-secondary transition-colors" />
              </div>
              <div>
                <p className="font-bold text-lg font-['Fraunces']">Official Company Seal</p>
                <p className="text-[10px] text-muted-foreground uppercase tracking-widest mt-1 font-bold">Not Uploaded — Click to add</p>
              </div>
              <p className="text-xs text-muted-foreground font-['Syne'] max-w-[240px]">
                Upload your registered company stamp or official seal for document authentication.
              </p>
            </>
          )}
        </div>
      </div>

      {/* Footer compliance badge */}
      <div className="flex items-center justify-center gap-3 py-4 text-[9px] text-muted-foreground font-bold uppercase tracking-[0.2em]">
        <ShieldCheck className="size-3.5 text-primary" />
        <span>Signatures are AES-256 encrypted and Nepal E-Sign compliant</span>
      </div>

      <SignatureModal 
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSelect={handleSignatureSelect}
        type={modalType}
        defaultName={user?.name}
      />
    </div>
  );
}
