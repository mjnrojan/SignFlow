import { useState, useEffect } from 'react';
import { useDocumentStore } from '@/lib/stores/useDocumentStore';
import { PageHeader } from '@/components/layout/PageHeader';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { 
  Search, 
  ShieldCheck, 
  Download, 
  ExternalLink,
  Calendar,
  Lock,
  History,
  Info
} from 'lucide-react';
import { DocumentStatus } from '@/types/document.types';
import { useNavigate } from 'react-router-dom';

export default function VaultPage() {
  const { documents } = useDocumentStore();
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 600);
    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return (
      <div className="flex flex-col min-h-full space-y-6 pb-20">
        <div className="h-32 bg-muted animate-pulse rounded-[2.5rem] w-full" />
        <div className="h-24 bg-muted animate-pulse rounded-2xl w-full" />
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
           {Array.from({ length: 6 }).map((_, i) => (
             <div key={i} className="bg-card border border-border rounded-3xl p-6 h-64 animate-pulse">
                <div className="flex justify-between mb-8">
                   <div className="size-12 bg-muted rounded-2xl" />
                   <div className="space-y-2 w-20">
                      <div className="h-2 bg-muted rounded w-full" />
                      <div className="h-2 bg-muted rounded w-3/4 ml-auto" />
                   </div>
                </div>
                <div className="space-y-4">
                   <div className="h-6 bg-muted rounded w-3/4" />
                   <div className="space-y-2">
                      <div className="h-3 bg-muted rounded w-full" />
                      <div className="h-3 bg-muted rounded w-5/6" />
                   </div>
                </div>
             </div>
           ))}
        </div>
      </div>
    );
  }

  const completedDocuments = documents.filter(doc => 
    doc.status === DocumentStatus.COMPLETED &&
    (doc.title.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  return (
    <div className="flex flex-col min-h-full space-y-6 pb-20">
      <PageHeader 
        title="Secure Vault" 
        description="All your legally signed and certified documents are stored here securely."
        actions={
          <div className="flex items-center gap-2 px-4 py-2 bg-secondary/10 border border-secondary/20 rounded-xl text-secondary">
             <ShieldCheck className="size-4" />
             <span className="text-xs font-bold uppercase tracking-widest">AES-256 Encrypted</span>
          </div>
        }
      />

      {/* Global Stats or Note */}
      <div className="bg-primary/5 border border-primary/10 rounded-2xl p-6 flex flex-col md:flex-row items-center gap-6">
         <div className="size-16 bg-primary/10 rounded-2xl flex items-center justify-center shrink-0">
            <Lock className="size-8 text-primary" />
         </div>
         <div className="flex-1 text-center md:text-left space-y-1">
            <h3 className="text-lg font-bold font-['Fraunces']">Your compliance is our priority</h3>
            <p className="text-sm text-muted-foreground font-['Syne']">
               These documents are immutable and timestamped on the SignFlow Nepal ledger. They are legally valid in any court of law in Nepal.
            </p>
         </div>
         <Button variant="outline" className="rounded-xl font-bold gap-2">
            <Info className="size-4" /> Policy Detail
         </Button>
      </div>

      {/* Toolbar */}
      <div className="flex flex-col md:flex-row gap-4 items-center">
        <div className="relative flex-1 group">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 size-4 text-muted-foreground group-focus-within:text-secondary transition-colors" />
          <Input 
            placeholder="Search vault for titles or references..." 
            className="pl-11 h-12 rounded-2xl bg-card border-border focus:ring-secondary/20 transition-all"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <Button variant="outline" className="rounded-xl h-12 gap-2 font-bold px-6">
           <Calendar className="size-4" />
           Date Range
        </Button>
      </div>

      {/* Vault Grid */}
      {completedDocuments.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {completedDocuments.map((doc, index) => (
            <div 
              key={doc.id}
              className="group bg-card border border-border rounded-3xl p-6 hover:shadow-2xl hover:border-secondary/30 transition-all duration-500 animate-in fade-in slide-in-from-bottom-4"
              style={{ animationDelay: `${index * 50}ms` }}
            >
              <div className="flex items-start justify-between mb-6">
                 <div className="size-12 bg-muted rounded-2xl flex items-center justify-center group-hover:bg-secondary/10 transition-colors">
                    <ShieldCheck className="size-6 text-muted-foreground group-hover:text-secondary" />
                 </div>
                 <div className="flex flex-col items-end">
                    <span className="text-[10px] font-bold text-secondary uppercase tracking-[0.2em] mb-1">CERTIFIED</span>
                    <span className="text-[9px] text-muted-foreground font-mono">#{doc.id.split('-')[0].toUpperCase()}</span>
                 </div>
              </div>

              <div className="space-y-4">
                 <h3 className="text-lg font-bold font-['Fraunces'] group-hover:text-secondary transition-colors truncate">{doc.title}</h3>
                 
                 <div className="space-y-2">
                    <div className="flex items-center justify-between text-[11px] text-muted-foreground font-['Syne']">
                       <span className="flex items-center gap-1.5"><Calendar className="size-3.5" /> Completed Date</span>
                       <span className="font-bold text-foreground">Oct 24, 2023</span>
                    </div>
                    <div className="flex items-center justify-between text-[11px] text-muted-foreground font-['Syne']">
                       <span className="flex items-center gap-1.5"><History className="size-3.5" /> Signers</span>
                       <span className="font-bold text-foreground">3 / 3 Signed</span>
                    </div>
                 </div>

                 <div className="h-px bg-border/50 w-full" />

                 <div className="flex items-center gap-2">
                    <Button 
                      onClick={() => navigate(`/documents/${doc.id}`)}
                      className="flex-1 bg-muted hover:bg-muted/80 text-foreground font-bold rounded-xl h-11 gap-2 border-none"
                    >
                       <ExternalLink className="size-4" /> View
                    </Button>
                    <Button className="flex-1 bg-secondary hover:bg-secondary/90 text-white font-bold rounded-xl h-11 gap-2 shadow-lg shadow-secondary/20 border-none transition-all active:scale-95">
                       <Download className="size-4" /> Download
                    </Button>
                 </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="h-96 flex flex-col items-center justify-center text-center p-8 bg-card border border-dashed border-border rounded-[40px] animate-in zoom-in-95 duration-700">
           <div className="size-24 bg-muted/50 rounded-full flex items-center justify-center mb-6 relative">
              <Lock className="size-10 text-muted-foreground/20" />
              <div className="absolute inset-0 rounded-full border-2 border-dashed border-muted-foreground/10 animate-spin-slow" />
           </div>
           <h3 className="text-2xl font-bold font-['Fraunces']">Vault is empty</h3>
           <p className="text-muted-foreground max-w-sm mt-2 font-['Syne']">
              Completed and certified documents will appear here. Start a new workflow to fill your vault.
           </p>
           <Button 
              onClick={() => navigate('/documents/upload')}
              className="mt-8 bg-primary text-white px-8 py-6 rounded-2xl font-bold shadow-xl shadow-primary/20 hover:scale-105 active:scale-95 transition-all"
           >
              Create New Document
           </Button>
        </div>
      )}
    </div>
  );
}
