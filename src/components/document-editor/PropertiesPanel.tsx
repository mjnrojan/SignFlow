import { 
  Settings2, 
  User, 
  CheckCircle, 
  AlertCircle, 
  Trash2, 
  ChevronRight,
  ShieldCheck,
  Type,
  Calendar,
  Layers,
  MoreVertical,
  Mail
} from 'lucide-react';
import { FieldType, type IDocumentField } from '@/types/document.types';
import { useTranslation } from 'react-i18next';
import { useRecipientStore } from '@/lib/stores/useRecipientStore';

interface PropertiesPanelProps {
  activeField: IDocumentField | null;
  recipientId: string | null;
  onUpdate?: (id: string, updates: Partial<IDocumentField>) => void;
  onRemove: (id: string) => void;
}

export function PropertiesPanel({ activeField, recipientId, onUpdate, onRemove }: PropertiesPanelProps) {
  const { t } = useTranslation();
  const { recipients } = useRecipientStore();

  if (!activeField) {
    return (
      <div className="w-80 bg-card border-l border-border h-full flex flex-col items-center justify-center p-8 text-center animate-in slide-in-from-right duration-500">
        <div className="size-16 bg-muted/30 rounded-full flex items-center justify-center mb-6">
           <Layers className="size-8 text-muted-foreground opacity-20" />
        </div>
        <h3 className="text-base font-bold font-['Fraunces'] text-foreground">
          {t('editor.properties.title')}
        </h3>
        <p className="text-xs text-muted-foreground font-['Syne'] mt-2 leading-relaxed">
          {t('editor.properties.noSelection')}
        </p>
      </div>
    );
  }

  const getIcon = () => {
     switch(activeField.type) {
        case FieldType.SIGNATURE: return <Settings2 className="size-4" />;
        case FieldType.DATE: return <Calendar className="size-4" />;
        case FieldType.TEXT: return <Type className="size-4" />;
        case FieldType.SEAL: return <ShieldCheck className="size-4" />;
        default: return <Settings2 className="size-4" />;
     }
  };

  return (
    <div className="w-80 bg-card border-l border-border h-full flex flex-col shrink-0 animate-in slide-in-from-right duration-500 overflow-hidden z-20">
      {/* Header */}
      <div className="p-6 border-b border-border bg-muted/10">
        <div className="flex items-center justify-between mb-4">
           <div className="flex items-center gap-2">
              <div className="p-2 bg-primary/10 rounded-lg text-primary">
                 {getIcon()}
              </div>
              <h3 className="text-sm font-bold font-['Fraunces'] text-foreground">
                {t('editor.properties.title')}
              </h3>
           </div>
           <button className="p-1 hover:bg-muted rounded-md text-muted-foreground transition-colors">
              <MoreVertical className="size-4" />
           </button>
        </div>
        
        <div className="flex items-center gap-3">
          <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest bg-muted/50 px-2 py-0.5 rounded-md">
            ID: {activeField.id.split('-')[1]?.toUpperCase() || activeField.id.toUpperCase()}
          </span>
          <span className="text-[10px] font-bold text-primary flex items-center gap-1">
             <CheckCircle className="size-3" />
             Verified
          </span>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-6 space-y-8 custom-scrollbar">
        {/* Recipient Selection */}
        <section className="space-y-4">
           <h4 className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest pl-1 font-['Syne']">
             {t('editor.properties.recipient')}
           </h4>
           <div className="space-y-2">
              {recipients.map((recipient) => (
                <button 
                  key={recipient.id}
                  onClick={() => onUpdate?.(activeField.id, { recipientId: recipient.id })}
                  className={`w-full flex items-center gap-3 p-3 rounded-xl border transition-all text-left group ${recipientId === recipient.id ? 'border-primary bg-primary/5 ring-1 ring-primary/20' : 'border-border bg-card hover:border-primary/30'}`}
                >
                   <div 
                    className="size-10 rounded-full flex items-center justify-center text-white font-bold text-xs ring-4 ring-background shadow-sm shrink-0"
                    style={{ backgroundColor: recipient.color }}
                   >
                    {recipient.name.split(' ').map(n => n[0]).join('')}
                   </div>
                   <div className="flex-1 min-w-0">
                      <p className={`text-xs font-bold truncate ${recipientId === recipient.id ? 'text-primary' : 'text-foreground'}`}>
                        {recipient.name}
                      </p>
                      <div className="flex items-center gap-1.5 text-[10px] text-muted-foreground">
                        <Mail className="size-3 shrink-0" />
                        <span className="truncate">{recipient.email}</span>
                      </div>
                   </div>
                   <ChevronRight className={`size-4 transition-transform group-hover:translate-x-0.5 ${recipientId === recipient.id ? 'text-primary' : 'text-muted-foreground opacity-50'}`} />
                </button>
              ))}
           </div>
           <button className="w-full py-2.5 text-[10px] font-bold text-primary uppercase tracking-[0.2em] bg-primary/5 hover:bg-primary/10 rounded-xl transition-all border border-dashed border-primary/20">
              {t('editor.recipients.add')}
           </button>
        </section>

        {/* Validation Options */}
        <section className="space-y-4">
           <h4 className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest pl-1 font-['Syne']">
             {t('editor.properties.general')}
           </h4>
           <div className="bg-muted/20 border border-border rounded-2xl p-4 space-y-4">
              <div className="flex items-center justify-between">
                 <div className="flex gap-3 items-center">
                    <AlertCircle className="size-4 text-orange-500 shrink-0" />
                    <span className="text-xs font-bold text-foreground">{t('editor.properties.required')}</span>
                 </div>
                 <label className="relative inline-flex items-center cursor-pointer">
                    <input 
                       type="checkbox" 
                       className="sr-only peer" 
                       checked={activeField.required}
                       onChange={() => onUpdate?.(activeField.id, { required: !activeField.required })} 
                    />
                    <div className="w-9 h-5 bg-border peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-primary"></div>
                 </label>
              </div>
              
              <div className="w-full h-px bg-border/50"></div>
              
              <div className="flex items-center justify-between opacity-50 cursor-not-allowed">
                 <div className="flex gap-3 items-center">
                    <User className="size-4 text-muted-foreground shrink-0" />
                    <span className="text-xs font-bold text-foreground">Pre-populated</span>
                 </div>
                 <div className="w-9 h-5 bg-muted rounded-full"></div>
              </div>
           </div>
        </section>

        {/* Appearance Placeholder */}
        <section className="space-y-4 opacity-50 grayscale select-none pointer-events-none">
           <h4 className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest pl-1 font-['Syne']">Appearance</h4>
           <div className="grid grid-cols-4 gap-2">
              <div className="h-10 bg-muted/30 rounded-lg border border-border"></div>
              <div className="h-10 bg-muted/30 rounded-lg border border-border"></div>
              <div className="h-10 bg-muted/30 rounded-lg border border-border"></div>
              <div className="h-10 bg-muted/30 rounded-lg border border-border"></div>
           </div>
        </section>
      </div>

      {/* Footer Actions */}
      <div className="p-6 bg-muted/30 border-t border-border mt-auto">
         <button 
           onClick={() => onRemove(activeField.id)}
           className="w-full py-4 bg-destructive/5 hover:bg-destructive/10 text-destructive rounded-2xl font-bold text-xs uppercase tracking-widest transition-all flex items-center justify-center gap-2 group border border-destructive/20 active:scale-[0.98]"
         >
            <Trash2 className="size-4 group-hover:rotate-12 transition-all" />
            <span>Discard Field</span>
         </button>
      </div>
    </div>
  );
}
