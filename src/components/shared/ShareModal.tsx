import { 
  X, 
  Copy, 
  Check, 
  MessageCircle, 
  Mail, 
  Smartphone, 
  Link as LinkIcon,
  Globe
} from 'lucide-react';
import { useState } from 'react';

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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/60 backdrop-blur-sm animate-in fade-in duration-300">
      <div 
        className="bg-card w-full max-w-lg rounded-[2.5rem] border border-border shadow-2xl overflow-hidden animate-in zoom-in-95 slide-in-from-bottom-8 duration-500"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="relative p-8 pb-4 text-center">
          <button 
            onClick={onClose}
            className="absolute top-6 right-6 p-2 hover:bg-muted rounded-full text-muted-foreground transition-all"
          >
            <X className="size-5" />
          </button>
          
          <div className="size-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
             <ShareIcon className="size-8 text-primary" />
          </div>
          <h2 className="text-2xl font-bold font-['Fraunces'] text-foreground">Share Document</h2>
          <p className="text-sm text-muted-foreground font-['Syne'] mt-1 truncate max-w-[80%] mx-auto">
            {documentTitle}
          </p>
        </div>

        {/* Tabs */}
        <div className="flex px-8 border-b border-border">
          <button 
            onClick={() => setActiveTab('link')}
            className={`flex-1 py-4 text-xs font-bold uppercase tracking-widest transition-all border-b-2 ${activeTab === 'link' ? 'border-primary text-primary' : 'border-transparent text-muted-foreground hover:text-foreground'}`}
          >
            Public Link
          </button>
          <button 
            onClick={() => setActiveTab('recipients')}
            className={`flex-1 py-4 text-xs font-bold uppercase tracking-widest transition-all border-b-2 ${activeTab === 'recipients' ? 'border-primary text-primary' : 'border-transparent text-muted-foreground hover:text-foreground'}`}
          >
            Invite People
          </button>
        </div>

        <div className="p-8 space-y-6">
          {activeTab === 'link' ? (
            <div className="space-y-6">
              {/* Copy Link Section */}
              <div className="space-y-3">
                <label className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest pl-1">Copy Public Link</label>
                <div className="flex gap-2">
                  <div className="flex-1 bg-muted/50 border border-border rounded-xl px-4 py-3 flex items-center gap-2 overflow-hidden">
                    <LinkIcon className="size-4 text-muted-foreground shrink-0" />
                    <span className="text-sm text-foreground truncate select-all">{shareUrl}</span>
                  </div>
                  <button 
                    onClick={handleCopy}
                    className={`px-5 rounded-xl font-bold text-sm transition-all flex items-center gap-2 shrink-0 ${copied ? 'bg-green-500 text-white' : 'bg-primary text-white shadow-lg shadow-primary/20 hover:scale-105'}`}
                  >
                    {copied ? <Check className="size-4" /> : <Copy className="size-4" />}
                    <span>{copied ? 'Copied' : 'Copy'}</span>
                  </button>
                </div>
              </div>

              {/* Quick Share Grid */}
              <div className="space-y-3">
                <label className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest pl-1">Share via Apps</label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                   <ShareButton icon={<MessageCircle className="size-5" />} label="WhatsApp" color="bg-[#25D366]" />
                   <ShareButton icon={<Smartphone className="size-5" />} label="Viber" color="bg-[#7360f2]" />
                   <ShareButton icon={<Mail className="size-5" />} label="Email" color="bg-[#EA4335]" />
                   <ShareButton icon={<Globe className="size-5" />} label="Others" color="bg-slate-700" />
                </div>
              </div>
            </div>
          ) : (
            <div className="space-y-6">
               <div className="space-y-3">
                <label className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest pl-1">Add Signers/Viewers</label>
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
                  <input 
                    type="email" 
                    placeholder="Enter email address..."
                    className="w-full bg-muted/50 border border-transparent focus:border-primary/20 rounded-xl pl-10 pr-4 py-3 text-sm outline-none transition-all"
                  />
                  <button className="absolute right-2 top-1/2 -translate-y-1/2 bg-foreground text-background px-3 py-1 rounded-lg text-xs font-bold font-['Syne']">
                    Add
                  </button>
                </div>
              </div>

              <div className="space-y-3">
                 <div className="flex items-center justify-between">
                    <h4 className="text-xs font-bold text-foreground">Who has access</h4>
                    <span className="text-[10px] text-muted-foreground uppercase">2 People</span>
                 </div>
                 <div className="space-y-2">
                    <AccessItem name="Aarav Sharma" email="aarav@nepal.np" role="Owner" />
                    <AccessItem name="Bikash Tamang" email="bikash@enterprise.co" role="Editor" />
                 </div>
              </div>
            </div>
          )}

          <div className="flex items-center gap-2 p-4 bg-primary/5 border border-primary/20 rounded-2xl">
             <LinkIcon className="size-4 text-primary shrink-0" />
             <p className="text-[10px] text-slate-600 dark:text-slate-400 font-['Syne'] leading-relaxed">
               Anyone with the link can view this document for the next 30 days unless restricted in settings.
             </p>
          </div>
        </div>

        <div className="p-6 bg-muted/30 border-t border-border flex justify-end gap-3">
          <button 
            onClick={onClose}
            className="px-6 py-2.5 rounded-xl font-bold text-sm text-muted-foreground hover:text-foreground hover:bg-muted transition-all"
          >
            Cancel
          </button>
          <button className="px-8 py-2.5 bg-secondary text-white rounded-xl font-bold text-sm shadow-lg shadow-secondary/20 transition-all hover:scale-105 active:scale-95">
            Save Changes
          </button>
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
