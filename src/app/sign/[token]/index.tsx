import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  ShieldCheck, 
  ChevronLeft, 
  ChevronRight, 
  CheckCircle2, 
  Lock,
  Globe,
  FileText,
  AlertCircle
} from 'lucide-react';
import { useDocumentStore } from '@/lib/stores/useDocumentStore';
import { DocumentStatus } from '@/types/document.types';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { SignatureModal } from '@/components/signature/SignatureModal';

export default function SigningPage() {
  const { token } = useParams<{ token: string }>();
  const navigate = useNavigate();
  const { activeDocument, setActiveDocument, updateDocumentStatus } = useDocumentStore();
  
  const [currentPage, setCurrentPage] = useState(1);
  const [isCompleted, setIsCompleted] = useState(false);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [signatureData, setSignatureData] = useState<string | null>(null);

  useEffect(() => {
    const documentId = token?.includes('doc') ? token : 'doc_1';
    
    const timer = setTimeout(() => {
      setActiveDocument(documentId);
      setLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, [token, setActiveDocument]);

  const handleComplete = () => {
    if (!signatureData) {
      alert('Please place your signature before finishing.');
      return;
    }
    if (activeDocument) {
      updateDocumentStatus(activeDocument.id, DocumentStatus.COMPLETED);
    }
    setIsCompleted(true);
  };

  const handleSignatureSelect = (dataUrl: string) => {
    setSignatureData(dataUrl);
    setIsModalOpen(false);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-muted/30 flex flex-col items-center justify-center p-6">
        <div className="size-16 relative mb-6">
           <div className="absolute inset-0 border-4 border-primary/20 rounded-full"></div>
           <div className="absolute inset-0 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
        </div>
        <p className="text-xl font-bold font-['Fraunces'] text-foreground">Loading Secure Document...</p>
        <p className="text-sm text-muted-foreground font-['Syne'] mt-2">Connecting to SignFlow Nepal nodes</p>
      </div>
    );
  }

  if (!activeDocument) {
    return (
      <div className="min-h-screen bg-muted/30 flex flex-col items-center justify-center p-6 text-center">
        <AlertCircle className="size-16 text-destructive mb-6" />
        <h2 className="text-2xl font-bold font-['Fraunces'] mb-2">Invalid or Expired Link</h2>
        <p className="text-muted-foreground max-w-md mb-8">This signing link is no longer valid or has expired. Please contact the sender for a new request.</p>
        <Button onClick={() => navigate('/')}>Return to Homepage</Button>
      </div>
    );
  }

  if (isCompleted) {
    return (
      <div className="min-h-screen bg-background flex flex-col items-center justify-center p-6 text-center animate-in fade-in zoom-in-95 duration-500">
        <div className="size-24 bg-green-500/10 rounded-full flex items-center justify-center mb-8 ring-8 ring-green-500/5">
           <CheckCircle2 className="size-12 text-green-500" />
        </div>
        <h2 className="text-3xl font-bold font-['Fraunces'] mb-4">Document Signed!</h2>
        <p className="text-muted-foreground max-w-md mb-8 font-['Syne']">Thank you for signing <strong>{activeDocument.title}</strong>. A copy of the signed document has been sent to your email and the owner.</p>
        <div className="flex flex-col gap-3 w-full max-w-xs">
           <Button className="h-12 rounded-xl font-bold">Download Copy</Button>
           <Button variant="outline" className="h-12 rounded-xl font-bold" onClick={() => navigate('/')}>Learn about SignFlow</Button>
        </div>
        <div className="mt-12 pt-8 border-t border-border w-full max-w-md">
           <p className="text-[10px] text-muted-foreground uppercase tracking-widest font-bold mb-4">Secured by</p>
           <div className="flex items-center justify-center gap-2 grayscale opacity-50">
              <div className="size-8 bg-primary rounded flex items-center justify-center text-white font-black text-xs">SF</div>
              <span className="font-bold text-foreground">SignFlow Nepal</span>
           </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f8fafc] dark:bg-[#020617] flex flex-col">
      {/* Public Top Bar */}
      <header className="h-16 bg-background/80 backdrop-blur-md border-b border-border sticky top-0 z-50 px-4 md:px-8 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="size-8 bg-primary rounded flex items-center justify-center text-white font-black text-xs shadow-lg shadow-primary/20">SF</div>
          <div className="hidden sm:block">
            <h1 className="text-sm font-bold text-foreground font-['Fraunces'] line-clamp-1">{activeDocument.title}</h1>
            <div className="flex items-center gap-2 text-[10px] text-muted-foreground font-bold uppercase tracking-tighter">
              <Lock className="size-3" /> Secure E-Signature Experience
            </div>
          </div>
        </div>

        <div className="flex items-center gap-4">
           <div className="hidden lg:flex flex-col items-end mr-2">
              <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">Progress</p>
              <div className="flex items-center gap-3 w-32">
                 <Progress value={signatureData ? 100 : 20} className="h-1.5" />
                 <span className="text-[10px] font-bold text-foreground">{signatureData ? '100%' : '20%'}</span>
              </div>
           </div>
           <Button 
            className="bg-primary hover:bg-primary/90 text-white font-bold h-10 px-6 rounded-xl shadow-lg shadow-primary/20 active:scale-95 transition-all text-sm"
            onClick={handleComplete}
           >
            Finish <CheckCircle2 className="size-4 ml-2" />
           </Button>
        </div>
      </header>

      {/* Main Signing Experience */}
      <main className="flex-1 flex flex-col items-center py-8 px-4 md:px-8">
         <div className="w-full max-w-4xl space-y-6">
            
            {/* Context Notice */}
            <div className="bg-blue-500/5 border border-blue-500/20 rounded-2xl p-4 flex items-start gap-4 animate-in slide-in-from-top-4 duration-500">
               <Globe className="size-5 text-blue-500 shrink-0 mt-0.5" />
               <div>
                  <p className="text-xs font-bold text-blue-700 dark:text-blue-400">Public Signing Request</p>
                  <p className="text-[10px] text-blue-600/80 dark:text-blue-400/60 leading-relaxed font-['Syne']">
                    You have been invited to sign this document as <strong>Aarav Sharma</strong>. All actions are logged for audit purposes under Nepal E-Signature Act 2063.
                  </p>
               </div>
            </div>

            {/* Document Viewer */}
            <div className="relative bg-white dark:bg-slate-900 rounded-2xl shadow-2xl border border-border overflow-hidden min-h-[800px] flex flex-col">
               
               {/* Controls Over Viewer */}
               <div className="absolute top-4 left-1/2 -translate-x-1/2 flex items-center gap-2 bg-background/90 backdrop-blur-md border border-border px-4 py-2 rounded-full shadow-xl z-20">
                  <Button variant="ghost" size="icon" className="size-8 rounded-full" disabled={currentPage <= 1} onClick={() => setCurrentPage(p => p - 1)}>
                    <ChevronLeft className="size-4" />
                  </Button>
                  <span className="text-[10px] font-bold px-4 border-l border-r border-border min-w-[80px] text-center">
                    PAGE {currentPage} / 1
                  </span>
                  <Button variant="ghost" size="icon" className="size-8 rounded-full" disabled onClick={() => setCurrentPage(p => p + 1)}>
                    <ChevronRight className="size-4" />
                  </Button>
               </div>

               {/* Mock PDF Content */}
               <div className="flex-1 p-12 md:p-20 relative">
                  <div className="absolute inset-0 flex items-center justify-center opacity-[0.03] rotate-[-45deg] pointer-events-none uppercase font-bold text-6xl tracking-[1em] select-none">
                    Legal Document
                  </div>

                  <div className="max-w-2xl mx-auto space-y-8 relative z-10">
                     <div className="flex justify-between items-start mb-12">
                        <div className="space-y-2">
                           <div className="h-6 bg-slate-100 dark:bg-slate-800 rounded w-48"></div>
                           <div className="h-3 bg-slate-50 dark:bg-slate-800/50 rounded w-32"></div>
                        </div>
                        <ShieldCheck className="size-10 text-slate-200" />
                     </div>

                     <div className="space-y-4">
                        <div className="h-4 bg-slate-100 dark:bg-slate-800 rounded w-full"></div>
                        <div className="h-4 bg-slate-100 dark:bg-slate-800 rounded w-full"></div>
                        <div className="h-4 bg-slate-100 dark:bg-slate-800 rounded w-3/4"></div>
                     </div>

                     <div className="pt-12 space-y-4">
                        <div className="h-4 bg-slate-100 dark:bg-slate-800 rounded w-full"></div>
                        <div className="h-4 bg-slate-100 dark:bg-slate-800 rounded w-5/6"></div>
                     </div>

                     {/* Signature Field */}
                     <div className="mt-32 pt-20 border-t border-slate-100 dark:border-slate-800 grid grid-cols-1 md:grid-cols-2 gap-12">
                        <div className="space-y-6">
                           <div 
                            onClick={() => setIsModalOpen(true)}
                            className={`h-32 border-2 border-dashed rounded-2xl flex flex-col items-center justify-center gap-3 cursor-pointer transition-all group overflow-hidden relative ${signatureData ? 'border-primary bg-primary/5' : 'border-primary/30 bg-primary/5 hover:bg-primary/10'}`}
                           >
                              {signatureData ? (
                                <img src={signatureData} alt="Signature" className="max-w-full max-h-full object-contain animate-in fade-in duration-500" />
                              ) : (
                                <>
                                  <div className="p-3 bg-white dark:bg-card rounded-full shadow-lg group-hover:scale-110 transition-transform">
                                     <FileText className="size-5 text-primary" />
                                  </div>
                                  <span className="text-[10px] font-bold text-primary uppercase tracking-widest">Click to Sign</span>
                                </>
                              )}
                           </div>
                           <div className="space-y-1">
                              <p className="text-xs font-bold text-foreground">Aarav Sharma</p>
                              <p className="text-[10px] text-muted-foreground uppercase tracking-widest">Authorized Signatory</p>
                           </div>
                        </div>

                        <div className="space-y-6 opacity-30">
                           <div className="h-32 bg-muted border-2 border-dashed border-border rounded-2xl flex flex-col items-center justify-center gap-3 grayscale">
                              <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">Recipient Signature</span>
                           </div>
                           <div className="space-y-1">
                              <p className="text-xs font-bold text-foreground">Bikash Tamang</p>
                              <p className="text-[10px] text-muted-foreground uppercase tracking-widest">Co-Signatory</p>
                           </div>
                        </div>
                     </div>
                  </div>
               </div>
            </div>

            {/* Footer Actions */}
            <div className="flex flex-col md:flex-row items-center justify-between gap-4 pt-4">
               <div className="flex items-center gap-4">
                  <div className="flex -space-x-3">
                     {[1, 2, 3].map(i => (
                        <div key={i} className="size-8 rounded-full border-2 border-background bg-slate-200"></div>
                     ))}
                  </div>
                  <p className="text-[10px] font-bold text-muted-foreground tracking-wide font-['Syne']">
                     Signed by 3 others in the last hour
                  </p>
               </div>
               <div className="flex items-center gap-2">
                  <Button variant="ghost" size="sm" className="text-[10px] font-bold uppercase tracking-widest">Declined Signing</Button>
                  <Button variant="ghost" size="sm" className="text-[10px] font-bold uppercase tracking-widest text-destructive">Report Issue</Button>
               </div>
            </div>
         </div>
      </main>

      <SignatureModal 
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSelect={handleSignatureSelect}
        type="signature"
        defaultName="Aarav Sharma"
      />

      {/* Floating Action Button (Mobile Only) */}
      <div className="fixed bottom-6 right-6 lg:hidden z-50">
         <Button 
          className="size-14 rounded-full bg-primary text-white shadow-2xl shadow-primary/40 active:scale-95 transition-all p-0"
          onClick={handleComplete}
         >
            <Send className="size-6" />
         </Button>
      </div>
    </div>
  );
}

function Send({ className }: { className?: string }) {
   return (
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><line x1="22" y1="2" x2="11" y2="13"></line><polygon points="22 2 15 22 11 13 2 9 22 2"></polygon></svg>
   );
}
