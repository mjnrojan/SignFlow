import { 
  ArrowLeft, 
  Users, 
  Clock, 
  MessageSquare, 
  ShieldCheck, 
  Send,
  Calendar as CalendarIcon,
  ChevronRight,
  Eye,
  CheckCircle2,
  Mail,
  Smartphone,
  Loader2,
  FileText,
  MoreHorizontal
} from 'lucide-react';
import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDocumentStore } from '@/lib/stores/useDocumentStore';
import { useRecipientStore } from '@/lib/stores/useRecipientStore';
import { useTranslation } from 'react-i18next';
import { StatusBadge } from '@/components/shared/StatusBadge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { DocumentStatus } from '@/types/document.types';

export default function DocumentSendPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { activeDocument, setActiveDocument, updateDocumentStatus } = useDocumentStore();
  const { recipients } = useRecipientStore();
  
  const [isSequential, setIsSequential] = useState(true);
  const [hasDeadline, setHasDeadline] = useState(false);
  const [remindersEnabled, setRemindersEnabled] = useState(true);
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [isSending, setIsSending] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  useEffect(() => {
    if (id) {
      setActiveDocument(id);
    }
  }, [id, setActiveDocument]);

  useEffect(() => {
    if (activeDocument) {
      setSubject(`SignFlow Nepal: Please sign "${activeDocument.title}"`);
      setMessage(`नमस्ते, Please review and sign this document at your earliest convenience. Regards, Aarav Sharma.`);
    }
  }, [activeDocument]);

  const handleSend = () => {
    setIsSending(true);
    // Simulate API call
    setTimeout(() => {
      if (activeDocument) {
        updateDocumentStatus(activeDocument.id, DocumentStatus.SENT);
      }
      setIsSending(false);
      setIsSuccess(true);
    }, 1500);
  };

  if (!activeDocument) {
    return (
      <div className="h-[60vh] flex flex-col items-center justify-center space-y-4">
        <Loader2 className="size-10 animate-spin text-primary" />
        <p className="text-xl font-bold font-['Fraunces'] text-foreground">{t('editor.initializing')}</p>
      </div>
    );
  }

  if (isSuccess) {
    return (
      <div className="h-[calc(100vh-64px)] flex flex-col items-center justify-center px-6 animate-in fade-in zoom-in-95 duration-500">
        <div className="size-20 bg-primary/10 rounded-full flex items-center justify-center mb-6 ring-8 ring-primary/5">
           <CheckCircle2 className="size-10 text-primary" />
        </div>
        <h2 className="text-3xl font-bold font-['Fraunces'] text-foreground text-center mb-2">
           {t('workflow.success.title')}
        </h2>
        <p className="text-muted-foreground font-['Syne'] text-center max-w-md mb-8">
           {t('workflow.success.description')}
        </p>
        <div className="flex flex-col sm:flex-row gap-3 w-full max-w-sm">
           <Button 
            className="flex-1 rounded-xl h-12 font-bold font-['Syne']" 
            onClick={() => navigate('/documents')}
           >
            View My Documents
           </Button>
           <Button 
            variant="outline" 
            className="flex-1 rounded-xl h-12 font-bold font-['Syne']"
            onClick={() => navigate('/dashboard')}
           >
            Dashboard
           </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-full bg-muted/20 pb-20">
      {/* Top Header */}
      <div className="bg-background border-b border-border h-16 flex items-center justify-between px-6 shrink-0 sticky top-0 z-30 shadow-sm">
        <div className="flex items-center gap-4">
          <button 
            onClick={() => navigate(-1)}
            className="p-2 hover:bg-muted rounded-full text-muted-foreground transition-colors"
          >
            <ArrowLeft className="size-5" />
          </button>
          <div className="h-6 w-px bg-border"></div>
          <div>
            <h1 className="text-sm font-bold text-foreground font-['Fraunces']">{t('workflow.title')}</h1>
            <p className="text-[10px] text-muted-foreground font-['Syne'] uppercase tracking-widest">Step 3 of 3: Finalize Request</p>
          </div>
        </div>
        
        <div className="flex items-center gap-3">
           <Button variant="ghost" size="sm" className="hidden sm:flex text-xs font-bold font-['Syne']" onClick={() => navigate(-1)}>
              {t('workflow.actions.back')}
           </Button>
           <Button 
            className="bg-primary hover:bg-primary/90 text-white font-bold h-9 px-6 rounded-xl shadow-lg shadow-primary/20 active:scale-95 transition-all text-xs uppercase tracking-widest font-['Syne']"
            onClick={handleSend}
            disabled={isSending}
           >
            {isSending ? <Loader2 className="size-4 animate-spin mr-2" /> : <Send className="size-4 mr-2" />}
            {t('workflow.actions.send')}
           </Button>
        </div>
      </div>

      <div className="max-w-5xl mx-auto w-full px-6 py-10 grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column: Settings */}
        <div className="lg:col-span-2 space-y-8">
          
          {/* Document Summary Card */}
          <div className="bg-card border border-border rounded-3xl p-8 shadow-sm flex flex-col md:flex-row gap-6 items-center animate-in slide-in-from-bottom-4 duration-500">
             <div className="size-20 bg-primary/5 rounded-2xl flex items-center justify-center shrink-0 border border-primary/10 relative overflow-hidden group">
                <div className="absolute inset-0 bg-primary/5 group-hover:scale-110 transition-transform duration-500"></div>
                <FileText className="size-10 text-primary relative z-10" />
             </div>
             <div className="flex-1 text-center md:text-left">
                <div className="flex flex-col md:flex-row md:items-center gap-2 mb-2">
                   <h2 className="text-xl font-bold font-['Fraunces'] text-foreground">{activeDocument.title}</h2>
                   <StatusBadge status={activeDocument.status} />
                </div>
                <p className="text-xs text-muted-foreground font-['Syne'] mb-4">
                   {activeDocument.fields.length} {t('editor.tabs.fields')} placed across {Math.max(...activeDocument.fields.map(f => f.position.pageNumber), 1)} pages.
                </p>
                <div className="flex flex-wrap justify-center md:justify-start gap-4">
                   <div className="flex items-center gap-2 text-[10px] font-bold text-muted-foreground uppercase tracking-widest px-3 py-1.5 bg-muted/50 rounded-full">
                      <ShieldCheck className="size-3 text-secondary" />
                      Legal Grade
                   </div>
                   <div className="flex items-center gap-2 text-[10px] font-bold text-muted-foreground uppercase tracking-widest px-3 py-1.5 bg-muted/50 rounded-full">
                      <Eye className="size-3 text-primary" />
                      Visibility: Public
                   </div>
                </div>
             </div>
          </div>

          {/* Recipient Workflow Section */}
          <div className="bg-card border border-border rounded-3xl p-8 shadow-sm animate-in slide-in-from-bottom-4 duration-500 delay-100">
            <div className="flex items-center justify-between mb-8">
               <div className="flex items-center gap-3">
                  <div className="p-2 bg-primary/10 rounded-xl text-primary">
                     <Users className="size-5" />
                  </div>
                  <div>
                     <h3 className="text-base font-bold font-['Fraunces']">{t('workflow.recipients')}</h3>
                     <p className="text-xs text-muted-foreground font-['Syne']">Define signing order and roles.</p>
                  </div>
               </div>
               
               <div className="flex bg-muted p-1 rounded-xl">
                  <button 
                    onClick={() => setIsSequential(true)}
                    className={`px-4 py-1.5 text-xs font-bold rounded-lg transition-all ${isSequential ? 'bg-background text-primary shadow-sm' : 'text-muted-foreground hover:text-foreground'}`}
                  >
                     {t('workflow.order.sequential')}
                  </button>
                  <button 
                     onClick={() => setIsSequential(false)}
                     className={`px-4 py-1.5 text-xs font-bold rounded-lg transition-all ${!isSequential ? 'bg-background text-primary shadow-sm' : 'text-muted-foreground hover:text-foreground'}`}
                  >
                     {t('workflow.order.parallel')}
                  </button>
               </div>
            </div>

            <div className="space-y-4 relative">
              {/* Vertical line for sequential */}
              {isSequential && recipients.length > 1 && (
                <div className="absolute left-[31px] top-6 bottom-6 w-0.5 bg-gradient-to-b from-primary/50 via-primary/20 to-transparent z-0"></div>
              )}
              
              {recipients.map((recipient, index) => (
                <div 
                  key={recipient.id}
                  className="relative z-10 flex items-center gap-4 bg-muted/10 border border-border/50 rounded-2xl p-4 group hover:border-primary/30 transition-all hover:bg-background"
                >
                  <div className="flex items-center justify-center size-8 rounded-full bg-primary/20 text-primary text-[10px] font-bold shrink-0">
                    {index + 1}
                  </div>
                  
                  <div 
                    className="size-10 rounded-full flex items-center justify-center text-white font-bold text-xs shadow-md shrink-0"
                    style={{ backgroundColor: recipient.color }}
                  >
                    {recipient.name.split(' ').map(n => n[0]).join('')}
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-bold text-foreground truncate">{recipient.name}</p>
                    <p className="text-[10px] text-muted-foreground truncate">{recipient.email}</p>
                  </div>
                  
                  <div className="flex items-center gap-4">
                     <span className="text-[10px] font-bold text-primary px-3 py-1 bg-primary/5 rounded-lg border border-primary/10 uppercase tracking-widest hidden sm:block">
                        {recipient.role}
                     </span>
                     <div className="size-8 rounded-full border border-border flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary cursor-pointer transition-all">
                        <MoreHorizontal className="size-4" />
                     </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Notification Message */}
          <div className="bg-card border border-border rounded-3xl p-8 shadow-sm animate-in slide-in-from-bottom-4 duration-500 delay-200">
             <div className="flex items-center gap-3 mb-8">
                <div className="p-2 bg-primary/10 rounded-xl text-primary">
                   <MessageSquare className="size-5" />
                </div>
                <div>
                   <h3 className="text-base font-bold font-['Fraunces']">{t('workflow.message.title')}</h3>
                   <p className="text-xs text-muted-foreground font-['Syne']">Customized email and SMS notification.</p>
                </div>
             </div>

             <div className="space-y-6">
                <div className="space-y-2">
                   <Label className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest pl-1">{t('workflow.message.subject')}</Label>
                   <Input 
                    value={subject} 
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSubject(e.target.value)} 
                    className="rounded-xl border-border focus:ring-primary focus:border-primary font-['Syne'] text-sm py-6 bg-muted/10 focus:bg-background transition-all"
                   />
                </div>
                <div className="space-y-2">
                   <Label className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest pl-1">{t('workflow.message.body')}</Label>
                   <Textarea 
                    value={message} 
                    onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setMessage(e.target.value)}
                    rows={4}
                    className="rounded-2xl border-border focus:ring-primary focus:border-primary font-['Syne'] text-sm bg-muted/10 focus:bg-background transition-all resize-none"
                   />
                </div>
             </div>
          </div>
        </div>

        {/* Right Column: Workflow Settings */}
        <div className="space-y-8 h-fit lg:sticky lg:top-24">
          <div className="bg-card border border-border rounded-3xl p-8 shadow-sm">
             <div className="flex items-center gap-3 mb-8">
                <div className="p-2 bg-primary/10 rounded-xl text-primary">
                   <Clock className="size-5" />
                </div>
                <h3 className="text-base font-bold font-['Fraunces']">{t('workflow.settings.title')}</h3>
             </div>

             <div className="space-y-6">
                <div className="flex items-center justify-between group">
                   <div className="space-y-0.5">
                      <Label className="text-xs font-bold text-foreground transition-colors group-hover:text-primary cursor-pointer">{t('workflow.settings.deadline')}</Label>
                      <p className="text-[10px] text-muted-foreground">Document expires if not signed.</p>
                   </div>
                   <Switch checked={hasDeadline} onCheckedChange={setHasDeadline} />
                </div>
                
                {hasDeadline && (
                  <div className="animate-in slide-in-from-top-2 duration-300">
                     <div className="relative">
                        <CalendarIcon className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
                        <Input type="date" className="pl-10 rounded-xl h-12 bg-muted/20 border-border" />
                     </div>
                  </div>
                )}
                
                <div className="h-px bg-border/50"></div>

                <div className="flex items-center justify-between group">
                   <div className="space-y-0.5">
                      <Label className="text-xs font-bold text-foreground transition-colors group-hover:text-primary cursor-pointer">{t('workflow.settings.reminders')}</Label>
                      <p className="text-[10px] text-muted-foreground">{t('workflow.settings.reminderDesc')}</p>
                   </div>
                   <Switch checked={remindersEnabled} onCheckedChange={setRemindersEnabled} />
                </div>
                
                <div className="h-px bg-border/50"></div>

                <div className="space-y-4">
                   <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">{t('workflow.message.preview')}</p>
                   <div className="border border-border rounded-2xl p-4 bg-muted/10 space-y-4 shadow-inner">
                      <div className="flex items-center gap-2">
                         <div className="size-6 bg-primary rounded-full flex items-center justify-center text-white text-[8px] font-bold">SF</div>
                         <span className="text-[10px] font-bold">SignFlow Nepal</span>
                         <span className="text-[9px] text-muted-foreground ml-auto">Now</span>
                      </div>
                      <div className="space-y-1.5 pt-1">
                         <div className="flex items-center gap-1.5 text-xs font-bold text-primary">
                            <Mail className="size-3" />
                            <span>{subject.slice(0, 20)}...</span>
                         </div>
                         <p className="text-[10px] text-muted-foreground line-clamp-2 leading-relaxed italic">
                            "{message.slice(0, 80)}..."
                         </p>
                      </div>
                      <div className="flex gap-2">
                         <div className="flex-1 h-3 bg-muted/20 rounded-full"></div>
                         <div className="flex-1 h-3 bg-muted/20 rounded-full"></div>
                      </div>
                   </div>
                </div>
             </div>
          </div>

          {/* Social Share Simulation */}
          <div className="bg-gradient-to-br from-primary via-primary/90 to-[#E8760A] rounded-3xl p-8 text-white shadow-xl shadow-primary/30 group">
             <div className="flex items-center gap-3 mb-6">
                <Smartphone className="size-6 drop-shadow-md group-hover:scale-110 transition-transform" />
                <h3 className="text-base font-bold font-['Fraunces']">Omnichannel Sending</h3>
             </div>
             <p className="text-xs text-white/80 font-['Syne'] leading-relaxed mb-8">
                We'll notify recipients via **Email**, **SMS**, and generate secure **WhatsApp/Viber** links automatically.
             </p>
             <div className="space-y-3">
                <div className="flex items-center gap-3 bg-white/10 hover:bg-white/20 transition-all rounded-xl p-3 border border-white/5 cursor-pointer">
                   <div className="size-8 bg-green-500 rounded-lg flex items-center justify-center shadow-inner">
                      <Smartphone className="size-4 text-white" />
                   </div>
                   <div className="flex-1">
                      <p className="text-[10px] font-bold">WhatsApp Business</p>
                      <p className="text-[9px] text-white/60">Verified Link Delivery</p>
                   </div>
                   <ChevronRight className="size-4 text-white/40" />
                </div>
                <div className="flex items-center gap-3 bg-white/10 hover:bg-white/20 transition-all rounded-xl p-3 border border-white/5 cursor-pointer">
                   <div className="size-8 bg-indigo-500 rounded-lg flex items-center justify-center shadow-inner">
                      <Smartphone className="size-4 text-white" />
                   </div>
                   <div className="flex-1">
                      <p className="text-[10px] font-bold">Rakuten Viber</p>
                      <p className="text-[9px] text-white/60">Official Nepal Service</p>
                   </div>
                   <ChevronRight className="size-4 text-white/40" />
                </div>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
}

