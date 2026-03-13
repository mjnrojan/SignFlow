import { 
  Users, 
  UserPlus, 
  Trash2, 
  Mail, 
  Settings,
  Shield,
  ChevronDown,
  Info
} from 'lucide-react';
import { useRecipientStore } from '@/lib/stores/useRecipientStore';
import { useTranslation } from 'react-i18next';

interface RecipientListProps {
  selectedRecipientId: string | null;
  onSelectRecipient: (id: string) => void;
}

export function RecipientList({ selectedRecipientId, onSelectRecipient }: RecipientListProps) {
  const { t } = useTranslation();
  const { recipients, removeRecipient } = useRecipientStore();

  const handleAddRecipient = () => {
    // This could open a modal in a real app
    alert(t('common.comingSoon'));
  };

  return (
    <div className="flex flex-col h-full bg-card animate-in fade-in duration-500">
      {/* Header */}
      <div className="p-6 border-b border-border">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2">
            <Users className="size-5 text-primary" />
            <h3 className="text-sm font-bold font-['Fraunces'] text-foreground">
              {t('editor.recipients.title')}
            </h3>
          </div>
          <span className="text-[10px] font-bold text-muted-foreground bg-muted px-2 py-0.5 rounded-full uppercase">
            {recipients.length} {t('common.total', { defaultValue: 'Total' })}
          </span>
        </div>
        <p className="text-xs text-muted-foreground font-['Syne']">
          Define who needs to sign or view this document.
        </p>
      </div>

      {/* Recipient Cards */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3 custom-scrollbar">
        {recipients.map((recipient) => (
          <div 
            key={recipient.id}
            onClick={() => onSelectRecipient(recipient.id)}
            className={`
              group relative cursor-pointer border rounded-2xl p-4 transition-all hover:shadow-lg hover:shadow-primary/5
              ${selectedRecipientId === recipient.id 
                ? 'bg-primary/5 border-primary shadow-md' 
                : 'bg-muted/20 border-border hover:border-primary/30'
              }
            `}
          >
            <div className="flex items-start justify-between gap-3">
              <div className="flex items-center gap-3">
                <div 
                  className="size-10 rounded-full flex items-center justify-center text-white font-bold text-xs ring-4 ring-background shadow-md shrink-0"
                  style={{ backgroundColor: recipient.color }}
                >
                  {recipient.name.split(' ').map(n => n[0]).join('')}
                </div>
                <div className="min-w-0">
                  <p className="text-sm font-bold text-foreground truncate">{recipient.name}</p>
                  <div className="flex items-center gap-2 text-[10px] text-muted-foreground">
                    <Mail className="size-3" />
                    <span className="truncate">{recipient.email}</span>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                <button className="p-1.5 hover:bg-muted rounded-lg text-muted-foreground hover:text-foreground">
                  <Settings className="size-4" />
                </button>
                <button 
                  onClick={(e) => { e.stopPropagation(); removeRecipient(recipient.id); }}
                  className="p-1.5 hover:bg-destructive/10 rounded-lg text-muted-foreground hover:text-destructive"
                >
                  <Trash2 className="size-4" />
                </button>
              </div>
            </div>

            <div className="mt-4 flex items-center justify-between border-t border-border/50 pt-3">
               <div className="flex items-center gap-1.5">
                  <Shield className="size-3 text-primary" />
                  <span className="text-[10px] font-bold text-primary uppercase tracking-widest">
                    {t(`editor.recipients.role.${recipient.role.toLowerCase()}`)}
                  </span>
               </div>
               <div className="flex items-center gap-2">
                  <span className="text-[10px] text-muted-foreground">Order: {recipient.order}</span>
                  <ChevronDown className="size-3 text-muted-foreground" />
               </div>
            </div>
          </div>
        ))}

        <button 
          onClick={handleAddRecipient}
          className="w-full py-4 bg-primary/5 border border-dashed border-primary/20 rounded-2xl flex flex-col items-center justify-center gap-2 hover:bg-primary/10 transition-all group"
        >
           <div className="size-8 bg-primary rounded-full flex items-center justify-center text-white shadow-lg group-hover:scale-110 transition-transform">
              <UserPlus className="size-4" />
           </div>
           <span className="text-[10px] font-bold text-primary uppercase tracking-widest">
            {t('editor.recipients.add')}
           </span>
        </button>
      </div>

      {/* Footer Instructions */}
      <div className="p-6 bg-muted/30 border-t border-border mt-auto">
        <div className="flex gap-3 text-muted-foreground">
          <span className="shrink-0 p-1.5 bg-primary/10 rounded-lg text-primary">
            <Info className="size-4" />
          </span>
          <p className="text-[10px] font-['Syne'] leading-relaxed">
            Recipients will receive an email and SMS (if configured) to sign or view the document in the specified order.
          </p>
        </div>
      </div>
    </div>
  );
}
