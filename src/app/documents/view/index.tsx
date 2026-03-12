import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { 
  ArrowLeft, 
  Download, 
  Share2, 
  MoreHorizontal, 
  History,
  FileText,
  Clock,
  User,
  ExternalLink,
  ChevronRight,
  ShieldCheck,
  FileEdit
} from 'lucide-react';
import { useDocumentStore } from '@/lib/stores/useDocumentStore';
import { StatusBadge } from '@/components/shared/StatusBadge';
import { AuditPanel } from '@/components/viewer/AuditPanel';
import { ShareModal } from '@/components/shared/ShareModal';

export default function DocumentViewerPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { setActiveDocument, activeDocument } = useDocumentStore();
  const [showAudit, setShowAudit] = useState(false);
  const [showShare, setShowShare] = useState(false);

  useEffect(() => {
    if (id) {
      setActiveDocument(id);
    }
  }, [id, setActiveDocument]);

  if (!activeDocument) {
    return (
      <div className="h-[60vh] flex flex-col items-center justify-center space-y-4">
        <div className="bg-muted p-4 rounded-full animate-bounce">
          <FileText className="size-8 text-muted-foreground" />
        </div>
        <p className="text-xl font-bold font-['Fraunces'] text-foreground">Document not found</p>
        <button 
          onClick={() => navigate('/documents')}
          className="text-primary font-bold hover:underline"
        >
          Back to Documents
        </button>
      </div>
    );
  }

  return (
    <div className="relative flex h-[calc(100vh-64px)] overflow-hidden bg-muted/20">
      {/* Main Content Area */}
      <div className={`flex-1 flex flex-col min-w-0 transition-all duration-500`}>
        {/* Viewer Top Bar */}
        <div className="bg-background border-b border-border h-16 flex items-center justify-between px-6 shrink-0 z-10 shadow-sm">
          <div className="flex items-center gap-4 min-w-0">
            <Link 
              to="/documents" 
              className="p-2 hover:bg-muted rounded-full text-muted-foreground transition-colors shrink-0"
              title="Back"
            >
              <ArrowLeft className="size-5" />
            </Link>
            <div className="h-6 w-px bg-border hidden sm:block"></div>
            <div className="min-w-0">
              <h1 className="text-base font-bold text-foreground truncate font-['Fraunces']">{activeDocument.title}</h1>
              <div className="flex items-center gap-2 mt-0.5">
                 <StatusBadge status={activeDocument.status} />
                 <span className="text-[10px] text-muted-foreground font-mono uppercase tracking-tighter">REF: {activeDocument.id.split('-')[0].toUpperCase()}</span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button className="hidden sm:flex items-center gap-2 px-3 py-1.5 hover:bg-muted rounded-lg text-sm font-medium transition-colors font-['Syne']">
              <Download className="size-4" />
              <span>PDF</span>
            </button>
            <button 
              onClick={() => setShowShare(true)}
              className="p-2 hover:bg-muted rounded-lg text-muted-foreground transition-colors" 
              title="Share Document"
            >
              <Share2 className="size-5" />
            </button>
            <button 
              onClick={() => setShowAudit(!showAudit)}
              className={`p-2 rounded-lg transition-colors flex items-center gap-2 md:px-3 md:py-1.5 ${showAudit ? 'bg-primary/10 text-primary' : 'hover:bg-muted text-muted-foreground'}`}
              title="View History"
            >
              <History className="size-5" />
              <span className="hidden md:block text-sm font-medium">History</span>
            </button>
            <button className="p-2 hover:bg-muted rounded-lg text-muted-foreground transition-colors">
              <MoreHorizontal className="size-5" />
            </button>
          </div>
        </div>

        {/* PDF Placeholder Viewer */}
        <div className="flex-1 overflow-y-auto p-4 md:p-8 flex justify-center bg-slate-100 dark:bg-slate-950/50">
           <div className="w-full max-w-4xl space-y-8 pb-12">
              {/* Document Info Card */}
              <div className="bg-card border border-border rounded-2xl p-6 shadow-sm flex flex-col md:flex-row gap-6 md:items-center">
                 <div className="size-16 bg-primary/10 rounded-2xl flex items-center justify-center shrink-0">
                    <FileText className="size-8 text-primary" />
                 </div>
                 <div className="flex-1 space-y-1">
                    <h2 className="text-xl font-bold font-['Fraunces']">{activeDocument.title}</h2>
                    <div className="flex flex-wrap gap-x-4 gap-y-1 text-xs text-muted-foreground font-['Syne']">
                       <span className="flex items-center gap-1.5"><Clock className="size-3.5" /> Created {new Date(activeDocument.createdAt).toLocaleDateString()}</span>
                       <span className="flex items-center gap-1.5"><User className="size-3.5" /> Owner: Aarav Sharma</span>
                       <span className="flex items-center gap-1.5 text-secondary font-bold font-['DM Mono'] uppercase tracking-widest"><ShieldCheck className="size-3.5" /> Certified</span>
                    </div>
                 </div>
                 <button 
                    onClick={() => navigate(`/documents/${activeDocument.id}/edit`)}
                    className="mt-4 md:mt-0 bg-primary text-white px-6 py-2.5 rounded-xl font-bold text-sm shadow-lg shadow-primary/20 flex items-center justify-center gap-2 active:scale-95 transition-all"
                 >
                    Prepare for Signing <ChevronRight className="size-4" />
                 </button>
              </div>

              {/* View Section */}
              <div className="relative group">
                {/* Mock Sheet */}
                <div className="aspect-[1/1.4] bg-white dark:bg-slate-900 rounded-lg shadow-2xl border border-border relative p-12 overflow-hidden mx-auto pointer-events-none select-none">
                  {/* Watermark */}
                  <div className="absolute inset-0 flex items-center justify-center opacity-[0.03] rotate-[-45deg] pointer-events-none uppercase font-bold text-6xl tracking-[1em] select-none">
                    Preview Only • SignFlow Nepal
                  </div>

                  {/* Header Decoration */}
                  <div className="w-24 h-2 bg-slate-100 dark:bg-slate-800 rounded-full mb-8"></div>
                  
                  {/* Content Lines */}
                  <div className="space-y-4">
                    <div className="h-4 bg-slate-50 dark:bg-slate-800/50 rounded w-1/3 mb-10"></div>
                    <div className="h-3 bg-slate-50 dark:bg-slate-800/30 rounded w-full"></div>
                    <div className="h-3 bg-slate-50 dark:bg-slate-800/30 rounded w-full"></div>
                    <div className="h-3 bg-slate-50 dark:bg-slate-800/30 rounded w-5/6"></div>
                    <div className="h-3 bg-slate-50 dark:bg-slate-800/30 rounded w-full mt-8"></div>
                    <div className="h-3 bg-slate-50 dark:bg-slate-800/30 rounded w-4/5"></div>

                    {/* Signature Fields (Abstract) */}
                    <div className="mt-20 flex justify-between gap-10">
                       <div className="flex-1 space-y-4">
                          <div className="h-10 bg-primary/5 border border-dashed border-primary/20 rounded flex items-center justify-center text-[10px] font-bold text-primary/40 uppercase tracking-widest">Awaiting Signature</div>
                          <div className="h-px bg-slate-100 dark:bg-slate-800 w-full"></div>
                          <p className="text-[10px] text-muted-foreground uppercase tracking-widest font-bold">Party A: Aarav Sharma</p>
                       </div>
                       <div className="flex-1 space-y-4">
                          <div className="h-10 bg-muted border border-dashed border-border rounded flex items-center justify-center text-[10px] font-bold text-muted-foreground/40 uppercase tracking-widest">Party B: Bikash Tamang</div>
                          <div className="h-px bg-slate-100 dark:bg-slate-800 w-full"></div>
                          <p className="text-[10px] text-muted-foreground uppercase tracking-widest font-bold">Party B: Recipient</p>
                       </div>
                    </div>
                  </div>
                </div>

                {/* Overlays */}
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100 backdrop-blur-[1px]">
                   <div className="bg-white dark:bg-card p-4 rounded-2xl shadow-2xl scale-90 group-hover:scale-100 transition-transform flex flex-col items-center gap-4 border border-border">
                      <div className="size-12 bg-primary/10 rounded-full flex items-center justify-center">
                         <ExternalLink className="size-6 text-primary" />
                      </div>
                      <div className="text-center">
                         <p className="font-bold font-['Fraunces'] text-foreground">Interactive Viewer</p>
                         <p className="text-[10px] text-muted-foreground">Open in full editor mode to place fields</p>
                      </div>
                      <button className="bg-primary text-white px-6 py-2 rounded-lg font-bold text-xs shadow-lg shadow-primary/20 transition-all hover:scale-105">
                         Open Editor
                      </button>
                   </div>
                </div>
              </div>
           </div>
        </div>
      </div>

      {/* Preparation Footer */}
      <div className="absolute bottom-0 left-0 right-0 bg-background/80 backdrop-blur-md border-t border-border p-4 flex items-center justify-center z-10 sm:hidden">
         <button 
           onClick={() => navigate(`/documents/${activeDocument.id}/edit`)}
           className="w-full bg-primary text-white py-3 rounded-xl font-bold flex items-center justify-center gap-2 shadow-lg shadow-primary/20"
         >
            <FileEdit className="size-4" />
            Prepare for Signing
         </button>
      </div>

      {/* Audit Panel Drawer */}
      <aside 
        className={`transition-all duration-500 ease-in-out border-l border-border bg-card z-20 overflow-hidden
          ${showAudit ? 'w-full md:w-[400px]' : 'w-0 border-none'}`}
      >
        <div className="w-[400px] h-full">
           <AuditPanel documentId={activeDocument.id} onClose={() => setShowAudit(false)} />
        </div>
      </aside>

      {/* Share Modal */}
      <ShareModal 
        isOpen={showShare}
        onClose={() => setShowShare(false)}
        documentTitle={activeDocument.title}
        shareUrl={`https://signflow.com.np/sign/${activeDocument.id}`}
      />
    </div>
  );
}
