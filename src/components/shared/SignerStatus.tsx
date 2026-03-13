import type { IRecipient } from '@/types/recipient.types';
import { RecipientStatus } from '@/types/recipient.types';
import { 
  CheckCircle2, 
  Clock, 
  Eye, 
  XCircle, 
  Mail,
  MoreHorizontal
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { useTranslation } from 'react-i18next';

interface SignerStatusProps {
  recipients: IRecipient[];
  className?: string;
}

export function SignerStatus({ recipients, className }: SignerStatusProps) {
  const { t } = useTranslation();

  const getStatusIcon = (status: RecipientStatus) => {
    switch (status) {
      case RecipientStatus.SIGNED:
        return <CheckCircle2 className="size-4 text-green-500" />;
      case RecipientStatus.VIEWED:
        return <Eye className="size-4 text-primary" />;
      case RecipientStatus.NOTIFIED:
        return <Mail className="size-4 text-blue-500" />;
      case RecipientStatus.DECLINED:
        return <XCircle className="size-4 text-destructive" />;
      case RecipientStatus.WAITING:
      default:
        return <Clock className="size-4 text-muted-foreground" />;
    }
  };

  const getStatusText = (status: RecipientStatus) => {
    switch (status) {
      case RecipientStatus.SIGNED:
        return t('recipient.status.signed');
      case RecipientStatus.VIEWED:
        return t('recipient.status.viewed');
      case RecipientStatus.NOTIFIED:
        return t('recipient.status.notified');
      case RecipientStatus.DECLINED:
        return t('recipient.status.declined');
      case RecipientStatus.WAITING:
      default:
        return t('recipient.status.waiting');
    }
  };

  if (!recipients || recipients.length === 0) return null;

  return (
    <div className={cn("space-y-3", className)}>
      <div className="flex items-center justify-between mb-4">
         <h3 className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">Signer Status</h3>
         <span className="text-[10px] font-bold text-primary bg-primary/5 px-2 py-0.5 rounded-full border border-primary/10">
            {recipients.filter(r => r.status === RecipientStatus.SIGNED).length} / {recipients.length} COMPLETED
         </span>
      </div>
      <div className="space-y-2">
        {recipients.map((recipient) => (
          <div 
            key={recipient.id}
            className="flex items-center gap-3 p-3 bg-muted/5 rounded-xl border border-border/50 hover:border-primary/20 transition-all group"
          >
            <div 
              className="size-8 rounded-full flex items-center justify-center text-white font-bold text-[10px] shrink-0 shadow-sm"
              style={{ backgroundColor: recipient.color }}
            >
              {recipient.name.split(' ').map(n => n[0]).join('')}
            </div>
            
            <div className="flex-1 min-w-0">
               <div className="flex items-center gap-2">
                  <p className="text-xs font-bold text-foreground truncate">{recipient.name}</p>
                  <span className="text-[8px] bg-muted/50 text-muted-foreground px-1.5 py-0.5 rounded uppercase tracking-tighter shrink-0">{recipient.role}</span>
               </div>
               <p className="text-[9px] text-muted-foreground truncate">{recipient.email}</p>
            </div>

            <div className="flex items-center gap-2 px-2 py-1 bg-background rounded-lg border border-border/50 shadow-sm">
               {getStatusIcon(recipient.status)}
               <span className={cn(
                 "text-[9px] font-bold uppercase tracking-tight",
                 recipient.status === RecipientStatus.SIGNED ? "text-green-600" : 
                 recipient.status === RecipientStatus.VIEWED ? "text-primary" : "text-muted-foreground"
               )}>
                 {getStatusText(recipient.status)}
               </span>
            </div>

            <button className="p-1 hover:bg-muted rounded text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity">
               <MoreHorizontal className="size-3" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
