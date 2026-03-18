import { 
  X, 
  Copy, 
  Check, 
  MessageCircle, 
  Mail, 
  Smartphone, 
  Link as LinkIcon,
  Globe,
  ShieldCheck
} from 'lucide-react';
import { useState } from 'react';
import { cn } from '@/lib/utils';

interface ShareModalProps {
  isOpen: boolean;
  onClose: () => void;
  documentTitle: string;
  shareUrl: string;
}

export function ShareModal({ isOpen, onClose, documentTitle, shareUrl }: ShareModalProps) {
  const [copied, setCopied] = useState(false);
  const [activeTab, setActiveTab] = useState<'link' | 'recipients'>('link');

  if (!isOpen) return null;

  const handleCopy = () => {
    navigator.clipboard.writeText(shareUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/40 backdrop-blur-md animate-in fade-in duration-300" onClick={onClose}>
      <div 
        className="bg-background/98 dark:bg-slate-950/98 backdrop-blur-2xl w-full max-w-md rounded-2xl border border-white/10 shadow-[0_32px_64px_-16px_rgba(0,0,0,0.3)] dark:shadow-[0_32px_64px_-16px_rgba(0,0,0,0.6)] overflow-hidden animate-in zoom-in-95 slide-in-from-bottom-4 duration-500"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="relative p-6 pb-2 text-center">
          <button 
            onClick={onClose}
            className="absolute top-5 right-5 p-1.5 hover:bg-muted rounded-lg text-muted-foreground transition-all"
          >
            <X className="size-4" />
          </button>
          
          <div className="size-12 bg-primary/10 rounded-xl flex items-center justify-center mx-auto mb-4">
             <ShareIcon className="size-6 text-primary" />
          </div>
          <h2 className="text-xl font-bold font-['Fraunces'] text-foreground tracking-tight">Access Control</h2>
          <p className="text-[10px] text-muted-foreground font-['Syne'] mt-1 truncate max-w-[85%] mx-auto font-bold uppercase tracking-widest opacity-70">
            {documentTitle}
          </p>
        </div>
 
        {/* Tabs */}
        <div className="flex px-6 mt-4">
          <div className="flex w-full bg-muted/30 p-1 rounded-xl">
            <button 
              onClick={() => setActiveTab('link')}
              className={`flex-1 py-2 text-[10px] font-bold uppercase tracking-widest transition-all rounded-lg ${activeTab === 'link' ? 'bg-background text-primary shadow-sm' : 'text-muted-foreground hover:text-foreground'}`}
            >
              Public Link
            </button>
            <button 
              onClick={() => setActiveTab('recipients')}
              className={`flex-1 py-2 text-[10px] font-bold uppercase tracking-widest transition-all rounded-lg ${activeTab === 'recipients' ? 'bg-background text-primary shadow-sm' : 'text-muted-foreground hover:text-foreground'}`}
            >
              Invite People
            </button>
          </div>
        </div>
 
        <div className="p-6 space-y-5">
          {activeTab === 'link' ? (
            <div className="space-y-5 animate-in fade-in duration-300">
              {/* Copy Link Section */}
              <div className="space-y-2">
                <label className="text-[9px] font-bold text-muted-foreground uppercase tracking-widest pl-1 opacity-70">Copy Web URL</label>
                <div className="flex gap-2">
                  <div className="flex-1 bg-muted/20 border border-border/50 rounded-xl px-4 py-2.5 flex items-center gap-2 overflow-hidden">
                    <LinkIcon className="size-3.5 text-muted-foreground shrink-0" />
                    <span className="text-xs text-foreground truncate select-all font-['DM Mono']">{shareUrl}</span>
                  </div>
                  <button 
                    onClick={handleCopy}
                    className={cn(
                      "px-4 rounded-xl font-bold text-xs transition-all flex items-center gap-1.5 shrink-0",
                      copied ? "bg-green-500 text-white" : "bg-primary text-white shadow-lg shadow-primary/10 hover:scale-105 active:scale-95"
                    )}
                  >
                    {copied ? <Check className="size-3.5" /> : <Copy className="size-3.5" />}
                    <span>{copied ? 'Done' : 'Copy'}</span>
                  </button>
                </div>
              </div>
 
              {/* Quick Share Grid */}
              <div className="space-y-2">
                <label className="text-[9px] font-bold text-muted-foreground uppercase tracking-widest pl-1 opacity-70">Distribution Channels</label>
                <div className="grid grid-cols-4 gap-2">
                   <ShareButton icon={<MessageCircle className="size-4" />} label="WhatsApp" color="bg-[#25D366]" />
                   <ShareButton icon={<Smartphone className="size-4" />} label="Viber" color="bg-[#7360f2]" />
                   <ShareButton icon={<Mail className="size-4" />} label="Email" color="bg-[#EA4335]" />
                   <ShareButton icon={<Globe className="size-4" />} label="Others" color="bg-slate-700" />
                </div>
              </div>
            </div>
          ) : (
            <div className="space-y-5 animate-in fade-in duration-300">
               <div className="space-y-2">
                <label className="text-[9px] font-bold text-muted-foreground uppercase tracking-widest pl-1 opacity-70">Add New Member</label>
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 size-3.5 text-muted-foreground" />
                  <input 
                    type="email" 
                    placeholder="name@company.com"
                    className="w-full bg-muted/20 border border-border/50 focus:border-primary/20 rounded-xl pl-10 pr-4 py-2.5 text-xs outline-none transition-all font-['Syne']"
                  />
                  <button className="absolute right-2 top-1/2 -translate-y-1/2 bg-foreground dark:bg-slate-800 text-background dark:text-white px-3 py-1 rounded-lg text-xs font-bold font-['Syne'] hover:scale-105 active:scale-95 transition-all">
                    Add
                  </button>
                </div>
              </div>
 
              <div className="space-y-2">
                 <div className="flex items-center justify-between px-1">
                    <h4 className="text-[10px] font-bold text-foreground uppercase tracking-tight">Active Permissions</h4>
                    <span className="text-[8px] text-muted-foreground font-bold uppercase tracking-widest opacity-60">2 Collaborators</span>
                 </div>
                 <div className="space-y-1 bg-muted/5 rounded-2xl p-1 border border-border/50">
                    <AccessItem name="Aarav Sharma" email="aarav@signflow.np" role="Owner" />
                    <AccessItem name="Bikash Tamang" email="bikash@tamang.com" role="Viewer" />
                 </div>
              </div>
            </div>
          )}
 
          <div className="flex items-center gap-3 p-3 bg-secondary/5 border border-secondary/10 rounded-xl">
             <div className="size-6 bg-secondary/10 rounded-lg flex items-center justify-center shrink-0">
                <ShieldCheck className="size-3.5 text-secondary" />
             </div>
             <p className="text-[8px] text-muted-foreground font-bold uppercase tracking-wider leading-relaxed">
               Secure SSL uplink active. Link expires in 30 days.
             </p>
          </div>
        </div>
 
        <div className="p-4 px-6 bg-muted/10 border-t border-border/50 flex justify-between items-center">
          <div className="text-[8px] text-muted-foreground font-bold uppercase tracking-[0.2em] opacity-40">
            SignFlow Nepal v2.4
          </div>
          <div className="flex gap-2">
            <button 
              onClick={onClose}
              className="px-4 py-2 rounded-xl font-bold text-xs text-muted-foreground hover:text-foreground hover:bg-muted transition-all"
            >
              Cancel
            </button>
            <button className="px-6 py-2 bg-secondary text-white rounded-xl font-bold text-xs shadow-lg shadow-secondary/10 hover:scale-105 active:scale-95 transition-all">
              Save
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function ShareIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8" />
      <polyline points="16 6 12 2 8 6" />
      <line x1="12" y1="2" x2="12" y2="15" />
    </svg>
  );
}

function ShareButton({ icon, label, color }: { icon: React.ReactNode, label: string, color: string }) {
  return (
    <button className="flex flex-col items-center gap-2 group p-2 hover:bg-muted/50 rounded-xl transition-all">
       <div className={`${color} text-white size-12 rounded-2xl flex items-center justify-center shadow-lg transform group-hover:-translate-y-1 transition-transform`}>
          {icon}
       </div>
       <span className="text-[10px] font-bold text-muted-foreground uppercase">{label}</span>
    </button>
  );
}

function AccessItem({ name, email, role }: { name: string, email: string, role: string }) {
  return (
    <div className="flex items-center justify-between p-2 rounded-xl hover:bg-muted/30 transition-colors">
       <div className="flex items-center gap-3">
          <div className="size-8 rounded-full bg-secondary/10 flex items-center justify-center text-[10px] font-bold text-secondary">
             {name.split(' ').map(n => n[0]).join('')}
          </div>
          <div className="min-w-0">
             <p className="text-xs font-bold text-foreground truncate">{name}</p>
             <p className="text-[10px] text-muted-foreground truncate">{email}</p>
          </div>
       </div>
       <div className="flex items-center gap-2">
          <span className="text-[10px] font-bold text-primary bg-primary/10 px-2 py-0.5 rounded-md">{role}</span>
       </div>
    </div>
  );
}
